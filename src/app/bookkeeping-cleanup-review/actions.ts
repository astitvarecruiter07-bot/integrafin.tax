"use server";

import { randomUUID } from "node:crypto";
import { after } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import {
  BookkeepingCleanupReviewInputSchema,
  CLEANUP_REVIEW_FORM,
  cleanupContactPreferenceLabels,
  cleanupMonthsBehindLabels,
  cleanupNeedLabels,
  cleanupSoftwareLabels,
  normalizeLeadPhone,
} from "@/lib/bookkeepingCleanupReview";
import type { AttributionSnapshots } from "@/lib/attribution";
import { sendLeadConfirmation, sendNewLeadNotification } from "@/lib/leadNotifications";
import { getLeadResponseSlaMinutes } from "@/lib/leadSla";
import dbConnect from "@/lib/mongodb";
import { checkRateLimit } from "@/lib/rateLimit";
import ContactLead from "@/models/ContactLead";

const LEAD_LIMIT = 5;
const LEAD_WINDOW_MS = 10 * 60 * 1000;
const OPEN_OPPORTUNITY_STATUSES = [
  "new",
  "contact_attempted",
  "contacted",
  "qualified",
  "appointment_booked",
  "proposal_sent",
] as const;

const TouchSnapshotSchema = z.strictObject({
  landingPage: z.string().trim().max(500).startsWith("/"),
  referrer: z.string().trim().max(500).optional(),
  utmSource: z.string().trim().max(200).optional(),
  utmMedium: z.string().trim().max(200).optional(),
  utmCampaign: z.string().trim().max(200).optional(),
  utmContent: z.string().trim().max(200).optional(),
  utmTerm: z.string().trim().max(200).optional(),
  gclid: z.string().trim().max(200).optional(),
  gbraid: z.string().trim().max(200).optional(),
  wbraid: z.string().trim().max(200).optional(),
  msclkid: z.string().trim().max(200).optional(),
  fbclid: z.string().trim().max(200).optional(),
  capturedAt: z.string().datetime({ offset: true }),
});

const AttributionSnapshotsSchema = z.strictObject({
  firstTouch: TouchSnapshotSchema,
  lastNonDirectTouch: TouchSnapshotSchema.optional(),
  submissionTouch: TouchSnapshotSchema,
});

const CleanupReviewSubmissionSchema = z.strictObject({
  review: BookkeepingCleanupReviewInputSchema,
  attributionSnapshots: AttributionSnapshotsSchema.optional(),
});

type ParsedTouchSnapshot = z.output<typeof TouchSnapshotSchema>;
type PreparedTouchSnapshot = Omit<ParsedTouchSnapshot, "capturedAt"> & {
  capturedAt: Date;
};
type PreparedAttributionSnapshots = {
  firstTouch: PreparedTouchSnapshot;
  lastNonDirectTouch?: PreparedTouchSnapshot;
  submissionTouch: PreparedTouchSnapshot;
};

export type CleanupReviewSubmission = {
  review: z.input<typeof BookkeepingCleanupReviewInputSchema>;
  attributionSnapshots?: AttributionSnapshots;
};

function safePath(value: string) {
  const path = value.replace(/[\u0000-\u001F\u007F]/g, "").trim().split(/[?#]/, 1)[0];
  return path.startsWith("/") && !path.startsWith("//") ? path : CLEANUP_REVIEW_FORM.pagePath;
}

function safeCampaignValue(value: string | undefined, maxLength = 200) {
  if (!value) return undefined;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function safeReferrer(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return `${url.origin}${url.pathname}`;
  } catch {
    return value.startsWith("/") ? safePath(value) : undefined;
  }
}

function prepareTouchSnapshot(snapshot: ParsedTouchSnapshot): PreparedTouchSnapshot {
  return {
    landingPage: safePath(snapshot.landingPage),
    referrer: safeReferrer(snapshot.referrer),
    utmSource: safeCampaignValue(snapshot.utmSource),
    utmMedium: safeCampaignValue(snapshot.utmMedium),
    utmCampaign: safeCampaignValue(snapshot.utmCampaign),
    utmContent: safeCampaignValue(snapshot.utmContent),
    utmTerm: safeCampaignValue(snapshot.utmTerm),
    gclid: safeCampaignValue(snapshot.gclid),
    gbraid: safeCampaignValue(snapshot.gbraid),
    wbraid: safeCampaignValue(snapshot.wbraid),
    msclkid: safeCampaignValue(snapshot.msclkid),
    fbclid: safeCampaignValue(snapshot.fbclid),
    capturedAt: new Date(snapshot.capturedAt),
  };
}

function prepareAttributionSnapshots(
  snapshots: z.output<typeof AttributionSnapshotsSchema> | undefined,
  submittedAt: Date,
): PreparedAttributionSnapshots {
  if (!snapshots) {
    const submissionTouch: PreparedTouchSnapshot = {
      landingPage: CLEANUP_REVIEW_FORM.pagePath,
      capturedAt: submittedAt,
    };
    return {
      firstTouch: submissionTouch,
      submissionTouch,
    };
  }

  return {
    firstTouch: prepareTouchSnapshot(snapshots.firstTouch),
    lastNonDirectTouch: snapshots.lastNonDirectTouch
      ? prepareTouchSnapshot(snapshots.lastNonDirectTouch)
      : undefined,
    submissionTouch: prepareTouchSnapshot(snapshots.submissionTouch),
  };
}

function getLegacyAttribution(
  snapshots: ReturnType<typeof prepareAttributionSnapshots>,
  submittedAt: Date,
) {
  const first = snapshots.firstTouch;
  return {
    firstLandingPage: first.landingPage,
    currentSubmissionPage: snapshots.submissionTouch.landingPage,
    referrer: first.referrer,
    utmSource: first.utmSource,
    utmMedium: first.utmMedium,
    utmCampaign: first.utmCampaign,
    utmContent: first.utmContent,
    utmTerm: first.utmTerm,
    gclid: first.gclid,
    gbraid: first.gbraid,
    wbraid: first.wbraid,
    msclkid: first.msclkid,
    fbclid: first.fbclid,
    firstTouchAt: first.capturedAt,
    submittedAt,
  };
}

function buildInternalSummary(
  review: z.output<typeof BookkeepingCleanupReviewInputSchema>,
) {
  const details = [
    `Primary need: ${cleanupNeedLabels[review.primaryNeed]}`,
    `Books status: ${cleanupMonthsBehindLabels[review.monthsBehind]}`,
    review.accountingSoftware
      ? `Software: ${cleanupSoftwareLabels[review.accountingSoftware]}`
      : undefined,
    review.industry ? `Industry: ${review.industry}` : undefined,
    review.targetDate ? `Target date: ${review.targetDate}` : undefined,
    review.contactPreference
      ? `Preferred contact: ${cleanupContactPreferenceLabels[review.contactPreference]}`
      : undefined,
    review.context ? `Context: ${review.context}` : undefined,
  ].filter(Boolean);

  return details.join("\n");
}

async function rateLimitKey() {
  const headerStore = await headers();
  const firstForwarded = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim();
  return firstForwarded || headerStore.get("x-real-ip") || "unknown";
}

function acceptedResponse({
  bookingCorrelationId,
  leadEventId,
  created,
}: {
  bookingCorrelationId: string;
  leadEventId: string;
  created: boolean;
}) {
  return {
    success: true as const,
    created,
    bookingCorrelationId,
    leadEventId,
    message: created
      ? "Your bookkeeping review request was received."
      : "Your existing bookkeeping review request is already in our follow-up queue.",
  };
}

function isDuplicateKeyError(error: unknown) {
  return Boolean(
    error &&
      typeof error === "object" &&
      "code" in error &&
      (error as { code?: unknown }).code === 11000,
  );
}

export async function submitBookkeepingCleanupReview(data: CleanupReviewSubmission) {
  try {
    if (data?.review?.website) {
      return {
        success: false as const,
        message: "We could not submit the request. Please refresh the page and try again.",
      };
    }

    const limiter = checkRateLimit(
      `bookkeepingCleanupReview:${await rateLimitKey()}`,
      LEAD_LIMIT,
      LEAD_WINDOW_MS,
    );
    if (!limiter.allowed) {
      return {
        success: false as const,
        message: "Too many requests. Please wait a few minutes before trying again.",
      };
    }

    const validated = CleanupReviewSubmissionSchema.parse(data);
    const { review } = validated;
    const normalizedEmail = review.email;
    const normalizedPhone = review.phone ? normalizeLeadPhone(review.phone) : "";
    await dbConnect();

    const exactSubmission = await ContactLead.findOne({
      source: CLEANUP_REVIEW_FORM.id,
      submissionKey: review.idempotencyKey,
    });
    if (exactSubmission?.bookingCorrelationId && exactSubmission.leadEventId) {
      return acceptedResponse({
        bookingCorrelationId: exactSubmission.bookingCorrelationId,
        leadEventId: exactSubmission.leadEventId,
        created: false,
      });
    }

    const identityFilter = normalizedEmail && normalizedPhone
      ? {
          $or: [
            { normalizedEmail },
            { email: normalizedEmail },
            { normalizedPhone },
            { phone: review.phone },
          ],
        }
      : normalizedEmail
        ? { $or: [{ normalizedEmail }, { email: normalizedEmail }] }
        : normalizedPhone
          ? { $or: [{ normalizedPhone }, { phone: review.phone }] }
          : undefined;

    const existingOpportunity = identityFilter
      ? await ContactLead.findOne({
          recordKind: { $ne: "subscriber" },
          service: "Bookkeeping Cleanup",
          status: { $in: OPEN_OPPORTUNITY_STATUSES },
          ...identityFilter,
        }).sort({ createdAt: -1 })
      : null;

    if (existingOpportunity) {
      existingOpportunity.bookingCorrelationId ||= randomUUID();
      existingOpportunity.leadEventId ||= randomUUID();
      existingOpportunity.normalizedEmail ||= normalizedEmail || undefined;
      existingOpportunity.normalizedPhone ||= normalizedPhone || undefined;
      existingOpportunity.duplicateSubmissionCount =
        (existingOpportunity.duplicateSubmissionCount || 0) + 1;
      await existingOpportunity.save();
      return acceptedResponse({
        bookingCorrelationId: existingOpportunity.bookingCorrelationId,
        leadEventId: existingOpportunity.leadEventId,
        created: false,
      });
    }

    const submittedAt = new Date();
    const bookingCorrelationId = randomUUID();
    const leadEventId = randomUUID();
    const attributionSnapshots = prepareAttributionSnapshots(
      validated.attributionSnapshots,
      submittedAt,
    );
    const assignedOwner =
      process.env.LEAD_INTAKE_OWNER?.trim() || "IntegraFin intake team";
    const nextFollowUpAt = new Date(
      submittedAt.getTime() + getLeadResponseSlaMinutes() * 60_000,
    );

    let newLead;
    try {
      newLead = await ContactLead.create({
        recordKind: "sales_inquiry",
        name: review.name,
        company: review.businessName,
        email: review.email,
        phone: review.phone,
        normalizedEmail: normalizedEmail || undefined,
        normalizedPhone: normalizedPhone || undefined,
        service: "Bookkeeping Cleanup",
        serviceIntent:
          review.primaryNeed === "cleanup_and_monthly"
            ? "cleanup_and_monthly"
            : "single_service",
        primaryService: "Bookkeeping Cleanup",
        secondaryService:
          review.primaryNeed === "cleanup_and_monthly" ||
          review.primaryNeed === "monthly_bookkeeping"
            ? "Small Business Bookkeeping"
            : undefined,
        message: buildInternalSummary(review),
        source: CLEANUP_REVIEW_FORM.id,
        submissionKey: review.idempotencyKey,
        assignedOwner,
        nextFollowUpAt,
        bookingCorrelationId,
        leadEventId,
        attribution: getLegacyAttribution(attributionSnapshots, submittedAt),
        attributionSnapshots,
        bookkeepingCleanupReview: {
          primaryNeed: review.primaryNeed,
          monthsBehind: review.monthsBehind,
          accountingSoftware: review.accountingSoftware,
          industry: review.industry,
          targetDate: review.targetDate ? new Date(`${review.targetDate}T12:00:00Z`) : undefined,
          contactPreference: review.contactPreference,
          context: review.context,
          consentToContact: true,
          formId: CLEANUP_REVIEW_FORM.id,
          formVersion: CLEANUP_REVIEW_FORM.version,
          offerId: CLEANUP_REVIEW_FORM.offerId,
          pagePath: CLEANUP_REVIEW_FORM.pagePath,
          consentVersion: CLEANUP_REVIEW_FORM.consentVersion,
          consentText: CLEANUP_REVIEW_FORM.consentText,
          submittedAt,
        },
        status: "new",
        statusUpdatedAt: submittedAt,
        createdAt: submittedAt,
      });
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        const replayed = await ContactLead.findOne({
          source: CLEANUP_REVIEW_FORM.id,
          submissionKey: review.idempotencyKey,
        });
        if (replayed?.bookingCorrelationId && replayed.leadEventId) {
          return acceptedResponse({
            bookingCorrelationId: replayed.bookingCorrelationId,
            leadEventId: replayed.leadEventId,
            created: false,
          });
        }
      }
      throw error;
    }

    const leadId = newLead._id.toString();
    after(async () => {
      try {
        const [notificationResult, confirmationResult] = await Promise.all([
          sendNewLeadNotification({
            leadId,
            service: "Bookkeeping Cleanup",
            source: CLEANUP_REVIEW_FORM.id,
            utmSource: attributionSnapshots.submissionTouch.utmSource,
            utmMedium: attributionSnapshots.submissionTouch.utmMedium,
            utmCampaign: attributionSnapshots.submissionTouch.utmCampaign,
            submittedAt,
          }),
          sendLeadConfirmation({
            leadId,
            name: review.name,
            email: review.email,
            service: "Bookkeeping Cleanup scope review",
            submittedAt,
          }),
        ]);
        const notificationCheckedAt = new Date();
        await ContactLead.findByIdAndUpdate(leadId, {
          $set: {
            notificationStatus: notificationResult.sent
              ? "sent"
              : notificationResult.reason,
            notificationCheckedAt,
            ...(notificationResult.sent
              ? { notificationSentAt: notificationCheckedAt }
              : {}),
            confirmationEmailStatus: confirmationResult.sent
              ? "sent"
              : confirmationResult.reason,
            confirmationEmailCheckedAt: notificationCheckedAt,
            ...(confirmationResult.sent
              ? { confirmationEmailSentAt: notificationCheckedAt }
              : {}),
          },
        });
      } catch (error) {
        console.error("Could not record cleanup-review notification status.", {
          leadId,
          error: error instanceof Error ? error.name : "UnknownError",
        });
      }
    });

    return acceptedResponse({ bookingCorrelationId, leadEventId, created: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false as const,
        message: error.issues[0]?.message || "Review the highlighted information and try again.",
      };
    }

    console.error("Bookkeeping cleanup review submission failed.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return {
      success: false as const,
      message: "We could not save your request. Please try again or call (832) 647-1819.",
    };
  }
}
