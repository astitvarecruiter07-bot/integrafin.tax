'use server';

import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import ContactLead, { LEAD_STATUSES } from '@/models/ContactLead';
import { requireAdminAuth } from '@/lib/adminAuth';
import { headers } from 'next/headers';
import { checkRateLimit } from '@/lib/rateLimit';
import { revalidatePath } from 'next/cache';
import { after } from 'next/server';
import { sendLeadConfirmation, sendNewLeadNotification } from '@/lib/leadNotifications';
import { getLeadResponseSlaMinutes } from '@/lib/leadSla';

const ADMIN_UNAUTHORIZED_MESSAGE = 'Your admin session expired. Sign in again to continue.';

const LeadSchema = z.object({
  name: z.string().min(2, 'Name is too short').max(100),
  email: z.union([z.literal(''), z.string().email('Invalid email address')]).default(''),
  phone: z.union([
    z.literal(''),
    z.string().min(10, 'Phone number is too short').max(20),
  ]).default(''),
  company: z.string().max(100).optional(),
  service: z.string().min(2, 'Please select a service'),
  message: z.string().max(2000).default(''),
  source: z.string().max(100).default('contact-page'),
  revenue: z.string().max(100).optional(),
  jurisdiction: z.string().max(100).optional(),
  attribution: z.object({
    firstLandingPage: z.string().max(500).startsWith('/').optional(),
    currentSubmissionPage: z.string().max(500).startsWith('/').optional(),
    referrer: z.string().max(500).optional(),
    utmSource: z.string().max(200).optional(),
    utmMedium: z.string().max(200).optional(),
    utmCampaign: z.string().max(200).optional(),
    utmContent: z.string().max(200).optional(),
    utmTerm: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
    gbraid: z.string().max(200).optional(),
    wbraid: z.string().max(200).optional(),
    msclkid: z.string().max(200).optional(),
    firstTouchAt: z.string().datetime({ offset: true }).optional(),
  }).optional(),
}).refine((lead) => Boolean(lead.email.trim() || lead.phone.trim()), {
  message: 'Please provide an email address or phone number.',
  path: ['email'],
});

const NewsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
  source: z.string().max(100).default('newsletter'),
  attribution: LeadSchema.shape.attribution,
});

export type LeadInput = z.infer<typeof LeadSchema>;
export type NewsletterInput = z.infer<typeof NewsletterSchema>;

const LEAD_LIMIT = 5;
const LEAD_WINDOW_MS = 10 * 60 * 1000;
const LeadIdSchema = z.string().regex(/^[a-f\d]{24}$/i, 'Invalid lead ID');
const LeadStatusSchema = z.enum(LEAD_STATUSES);
const MoneySchema = z.number().finite().min(0).max(1_000_000_000).nullable().optional();

const UpdateLeadStatusSchema = z.object({
  leadId: LeadIdSchema,
  status: LeadStatusSchema,
});

const UpdateLeadDetailsSchema = z.object({
  leadId: LeadIdSchema,
  estimatedValue: MoneySchema,
  actualRevenue: MoneySchema,
  reasonLost: z.string().trim().max(1000).optional(),
  internalNotes: z.string().trim().max(5000).optional(),
  appointmentAt: z.string().datetime({ offset: true }).nullable().optional(),
});

const FirstResponseSchema = z.object({
  leadId: LeadIdSchema,
});

const firstResponseStatuses = new Set<(typeof LEAD_STATUSES)[number]>([
  'contact_attempted',
  'contacted',
  'qualified',
  'unqualified',
  'appointment_booked',
  'proposal_sent',
  'client_won',
  'client_lost',
]);

function sanitizeAttributionPath(value: string | undefined) {
  if (!value) return undefined;
  const path = value.trim().split(/[?#]/, 1)[0];
  return path.startsWith('/') && !path.startsWith('//') ? path : undefined;
}

function sanitizeAttributionReferrer(value: string | undefined) {
  if (!value) return undefined;

  try {
    const referrer = new URL(value);
    return `${referrer.origin}${referrer.pathname}`;
  } catch {
    return sanitizeAttributionPath(value);
  }
}

function prepareAttribution(
  attribution: LeadInput['attribution'] | NewsletterInput['attribution'],
  submittedAt: Date,
) {
  return {
    firstLandingPage: sanitizeAttributionPath(attribution?.firstLandingPage),
    currentSubmissionPage: sanitizeAttributionPath(attribution?.currentSubmissionPage),
    referrer: sanitizeAttributionReferrer(attribution?.referrer),
    utmSource: attribution?.utmSource,
    utmMedium: attribution?.utmMedium,
    utmCampaign: attribution?.utmCampaign,
    utmContent: attribution?.utmContent,
    utmTerm: attribution?.utmTerm,
    gclid: attribution?.gclid,
    gbraid: attribution?.gbraid,
    wbraid: attribution?.wbraid,
    msclkid: attribution?.msclkid,
    firstTouchAt: attribution?.firstTouchAt ? new Date(attribution.firstTouchAt) : undefined,
    submittedAt,
  };
}

async function getLeadRateLimitKey() {
  const headerStore = await headers();
  const forwardedFor = headerStore.get('x-forwarded-for');
  const realIp = headerStore.get('x-real-ip');
  const firstForwarded = forwardedFor?.split(',')[0]?.trim();
  return firstForwarded || realIp || 'unknown';
}

export async function submitLead(data: LeadInput) {
  try {
    const rateLimitKey = await getLeadRateLimitKey();
    const rateResult = checkRateLimit(`submitLead:${rateLimitKey}`, LEAD_LIMIT, LEAD_WINDOW_MS);
    if (!rateResult.allowed) {
      return {
        success: false,
        message: 'Too many requests. Please wait a few minutes before submitting again.',
      };
    }

    const validatedData = LeadSchema.parse(data);
    
    await dbConnect();
    
    const submittedAt = new Date();
    const newLead = await ContactLead.create({
      ...validatedData,
      attribution: prepareAttribution(validatedData.attribution, submittedAt),
      status: 'new',
      createdAt: submittedAt,
    });

    const leadId = newLead._id.toString();
    after(async () => {
      try {
        const [notificationResult, confirmationResult] = await Promise.all([
          sendNewLeadNotification({
            leadId,
            service: validatedData.service,
            source: validatedData.source,
            submittedAt,
          }),
          sendLeadConfirmation({
            leadId,
            name: validatedData.name,
            email: validatedData.email,
            service: validatedData.service,
            submittedAt,
          }),
        ]);
        const notificationCheckedAt = new Date();
        await ContactLead.findByIdAndUpdate(leadId, {
          $set: {
            notificationStatus: notificationResult.sent ? 'sent' : notificationResult.reason,
            notificationCheckedAt,
            ...(notificationResult.sent ? { notificationSentAt: notificationCheckedAt } : {}),
            confirmationEmailStatus: confirmationResult.sent ? 'sent' : confirmationResult.reason,
            confirmationEmailCheckedAt: notificationCheckedAt,
            ...(confirmationResult.sent ? { confirmationEmailSentAt: notificationCheckedAt } : {}),
          },
        });
      } catch (error) {
        console.error('Could not record lead email status.', {
          leadId,
          error: error instanceof Error ? error.name : 'UnknownError',
        });
      }
    });
    
    return {
      success: true,
      message: 'Thank you. Your request has been submitted for team follow-up.',
      leadId,
    };
  } catch (error) {
    console.error('Lead submission error:', error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }
    
    return {
      success: false,
      message: 'Processing failed. Please try again or call us directly at (832) 647-1819.',
    };
  }
}

export async function submitNewsletterSignup(data: NewsletterInput) {
  try {
    const rateLimitKey = await getLeadRateLimitKey();
    const rateResult = checkRateLimit(`newsletter:${rateLimitKey}`, LEAD_LIMIT, LEAD_WINDOW_MS);
    if (!rateResult.allowed) {
      return {
        success: false,
        message: 'Too many requests. Please wait a few minutes before submitting again.',
      };
    }

    const validatedData = NewsletterSchema.parse(data);

    await dbConnect();

    const emailPrefix = validatedData.email.split('@')[0] || 'Newsletter Subscriber';

    const submittedAt = new Date();
    await ContactLead.create({
      name: emailPrefix,
      email: validatedData.email,
      phone: 'Not provided',
      service: 'Newsletter Signup',
      message: 'Requested IntegraFin tax and accounting updates.',
      source: validatedData.source,
      attribution: prepareAttribution(validatedData.attribution, submittedAt),
      status: 'new',
      createdAt: submittedAt,
    });

    return {
      success: true,
      message: 'You are subscribed. We will send useful tax updates, not noise.',
    };
  } catch (error) {
    console.error('Newsletter signup error:', error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: error.issues[0].message,
      };
    }

    return {
      success: false,
      message: 'Signup failed. Please try again or email contact@integrafin.tax.',
    };
  }
}

export async function getLeads() {
  try {
    await requireAdminAuth();
    await dbConnect();
    const leads = await ContactLead.find({}).sort({ createdAt: -1 }).lean();
    return { success: true as const, leads: serializeLead(leads) };
  } catch (error) {
    console.error('Error fetching leads:', error);
    return {
      success: false as const,
      message: error instanceof Error && error.message === 'Unauthorized'
        ? ADMIN_UNAUTHORIZED_MESSAGE
        : 'Could not load leads from the database.',
      leads: [],
    };
  }
}

function serializeLead(lead: unknown) {
  return JSON.parse(JSON.stringify(lead));
}

function adminActionError(error: unknown, fallbackMessage: string) {
  if (error instanceof z.ZodError) {
    return { success: false as const, message: error.issues[0]?.message || fallbackMessage };
  }

  if (error instanceof Error && error.message === 'Unauthorized') {
    return {
      success: false as const,
      code: 'UNAUTHORIZED' as const,
      message: ADMIN_UNAUTHORIZED_MESSAGE,
    };
  }

  console.error(fallbackMessage, error);
  return { success: false as const, message: fallbackMessage };
}

export async function updateLeadStatus(input: unknown) {
  try {
    await requireAdminAuth();
    const { leadId, status } = UpdateLeadStatusSchema.parse(input);
    await dbConnect();

    const now = new Date();
    const update: Record<string, unknown> = {
      status,
      statusUpdatedAt: now,
    };

    if (firstResponseStatuses.has(status)) {
      const currentLead = await ContactLead.findById(leadId).select('firstResponseAt').lean();
      if (!currentLead) {
        return { success: false as const, message: 'Lead not found.' };
      }
      if (!currentLead.firstResponseAt) update.firstResponseAt = now;
    }

    const lead = await ContactLead.findByIdAndUpdate(
      leadId,
      { $set: update },
      { returnDocument: 'after', runValidators: true },
    ).lean();

    if (!lead) return { success: false as const, message: 'Lead not found.' };

    revalidatePath('/admin/leads');
    return { success: true as const, message: 'Lead status updated.', lead: serializeLead(lead) };
  } catch (error) {
    return adminActionError(error, 'Could not update the lead status.');
  }
}

export async function updateLeadDetails(input: unknown) {
  try {
    await requireAdminAuth();
    const data = UpdateLeadDetailsSchema.parse(input);
    await dbConnect();

    const set: Record<string, unknown> = {
      reasonLost: data.reasonLost || '',
      internalNotes: data.internalNotes || '',
    };
    const unset: Record<string, 1> = {};

    if (data.estimatedValue === null || data.estimatedValue === undefined) {
      unset.estimatedValue = 1;
    } else {
      set.estimatedValue = data.estimatedValue;
    }

    if (data.actualRevenue === null || data.actualRevenue === undefined) {
      unset.actualRevenue = 1;
    } else {
      set.actualRevenue = data.actualRevenue;
    }

    if (data.appointmentAt === null || data.appointmentAt === undefined) {
      unset.appointmentAt = 1;
    } else {
      set.appointmentAt = new Date(data.appointmentAt);
    }

    const update: Record<string, unknown> = { $set: set };
    if (Object.keys(unset).length) update.$unset = unset;

    const lead = await ContactLead.findByIdAndUpdate(
      data.leadId,
      update,
      { returnDocument: 'after', runValidators: true },
    ).lean();

    if (!lead) return { success: false as const, message: 'Lead not found.' };

    revalidatePath('/admin/leads');
    return { success: true as const, message: 'Lead details saved.', lead: serializeLead(lead) };
  } catch (error) {
    return adminActionError(error, 'Could not save the lead details.');
  }
}

export async function recordFirstResponse(input: unknown) {
  try {
    await requireAdminAuth();
    const { leadId } = FirstResponseSchema.parse(input);
    await dbConnect();

    const now = new Date();
    const lead = await ContactLead.findOneAndUpdate(
      { _id: leadId, firstResponseAt: null },
      { $set: { firstResponseAt: now, statusUpdatedAt: now } },
      { returnDocument: 'after', runValidators: true },
    ).lean();

    if (!lead) {
      const existingLead = await ContactLead.findById(leadId).lean();
      if (!existingLead) return { success: false as const, message: 'Lead not found.' };
      return {
        success: true as const,
        message: 'First response was already recorded.',
        lead: serializeLead(existingLead),
      };
    }

    revalidatePath('/admin/leads');
    return { success: true as const, message: 'First response recorded.', lead: serializeLead(lead) };
  } catch (error) {
    return adminActionError(error, 'Could not record the first response.');
  }
}

export async function getLeadMetrics() {
  try {
    await requireAdminAuth();
    await dbConnect();

    const overdueBefore = new Date(Date.now() - getLeadResponseSlaMinutes() * 60_000);
    const [statusCounts, valueTotals, overdueNewCount] = await Promise.all([
      ContactLead.aggregate<{ _id: string; count: number }>([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
      ContactLead.aggregate<{ _id: null; openPipelineValue: number; wonRevenue: number }>([
        {
          $group: {
            _id: null,
            openPipelineValue: {
              $sum: {
                $cond: [
                  {
                    $in: [
                      '$status',
                      ['new', 'contact_attempted', 'contacted', 'qualified', 'appointment_booked', 'proposal_sent'],
                    ],
                  },
                  { $ifNull: ['$estimatedValue', 0] },
                  0,
                ],
              },
            },
            wonRevenue: {
              $sum: {
                $cond: [{ $eq: ['$status', 'client_won'] }, { $ifNull: ['$actualRevenue', 0] }, 0],
              },
            },
          },
        },
      ]),
      ContactLead.countDocuments({
        status: 'new',
        firstResponseAt: null,
        createdAt: { $lt: overdueBefore },
      }),
    ]);

    const counts = Object.fromEntries(statusCounts.map(({ _id, count }) => [_id, count]));
    const totals = valueTotals[0];

    return {
      success: true as const,
      metrics: {
        total: Object.values(counts).reduce((sum, count) => sum + Number(count), 0),
        newCount: counts.new || 0,
        qualifiedCount: counts.qualified || 0,
        appointmentCount: counts.appointment_booked || 0,
        clientWonCount: counts.client_won || 0,
        overdueNewCount,
        estimatedValue: totals?.openPipelineValue || 0,
        wonRevenue: totals?.wonRevenue || 0,
        responseSlaMinutes: getLeadResponseSlaMinutes(),
        generatedAt: Date.now(),
      },
    };
  } catch (error) {
    console.error('Could not load lead metrics.', error);
    return {
      success: false as const,
      message: 'Could not load lead metrics.',
      metrics: {
        total: 0,
        newCount: 0,
        qualifiedCount: 0,
        appointmentCount: 0,
        clientWonCount: 0,
        overdueNewCount: 0,
        estimatedValue: 0,
        wonRevenue: 0,
        responseSlaMinutes: getLeadResponseSlaMinutes(),
        generatedAt: Date.now(),
      },
    };
  }
}
