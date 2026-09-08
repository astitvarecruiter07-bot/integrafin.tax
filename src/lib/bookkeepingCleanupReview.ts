import { z } from "zod";

export const CLEANUP_REVIEW_FORM = {
  id: "bookkeeping_cleanup_review",
  version: "1.0",
  offerId: "bookkeeping_cleanup_scope_review",
  pagePath: "/bookkeeping-cleanup-review",
  consentVersion: "service_contact_v1",
  consentText:
    "I agree that IntegraFin may contact me by phone or email about this service request. Consent is not a condition of purchase.",
} as const;

export const cleanupNeedValues = [
  "cleanup_catch_up",
  "monthly_bookkeeping",
  "cleanup_and_monthly",
  "not_sure",
] as const;

export const cleanupMonthsBehindValues = [
  "current",
  "1_3_months",
  "4_12_months",
  "more_than_12_months",
  "not_sure",
] as const;

export const cleanupSoftwareValues = [
  "quickbooks_online",
  "quickbooks_desktop",
  "xero",
  "spreadsheet_manual",
  "other",
  "not_sure",
] as const;

export const cleanupContactPreferenceValues = [
  "email",
  "phone_call",
  "no_preference",
] as const;

export type CleanupPrimaryNeed = (typeof cleanupNeedValues)[number];
export type CleanupMonthsBehind = (typeof cleanupMonthsBehindValues)[number];
export type CleanupSoftware = (typeof cleanupSoftwareValues)[number];
export type CleanupContactPreference = (typeof cleanupContactPreferenceValues)[number];

export const cleanupNeedLabels: Record<CleanupPrimaryNeed, string> = {
  cleanup_catch_up: "Cleanup or catch-up bookkeeping",
  monthly_bookkeeping: "Monthly bookkeeping",
  cleanup_and_monthly: "Cleanup and monthly bookkeeping",
  not_sure: "Not sure yet",
};

export const cleanupMonthsBehindLabels: Record<CleanupMonthsBehind, string> = {
  current: "Current",
  "1_3_months": "1–3 months",
  "4_12_months": "4–12 months",
  more_than_12_months: "More than 12 months",
  not_sure: "Not sure",
};

export const cleanupSoftwareLabels: Record<CleanupSoftware, string> = {
  quickbooks_online: "QuickBooks Online",
  quickbooks_desktop: "QuickBooks Desktop",
  xero: "Xero",
  spreadsheet_manual: "Spreadsheet or manual records",
  other: "Other",
  not_sure: "Not sure",
};

export const cleanupContactPreferenceLabels: Record<CleanupContactPreference, string> = {
  email: "Email",
  phone_call: "Phone call",
  no_preference: "No preference",
};

function cleanText(value: string) {
  return value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();
}

const optionalCleanText = (maxLength: number) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") return undefined;
      const cleaned = cleanText(value);
      return cleaned || undefined;
    },
    z.string().max(maxLength).optional(),
  );

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined),
    z.enum(values).optional(),
  );

const optionalTargetDate = z.preprocess(
  (value) => (typeof value === "string" && value.trim() ? value.trim() : undefined),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid target date.")
    .refine(
      (value) => !Number.isNaN(Date.parse(`${value}T12:00:00Z`)),
      "Enter a valid target date.",
    )
    .optional(),
);

export const BookkeepingCleanupReviewInputSchema = z.strictObject({
  name: z.string().transform(cleanText).pipe(z.string().min(2, "Enter your full name.").max(100)),
  businessName: z.string().transform(cleanText).pipe(z.string().min(2, "Enter your business name.").max(120)),
  email: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : ""),
    z.union([z.literal(""), z.string().email("Enter a valid email address.").max(254)]),
  ),
  phone: z.preprocess(
    (value) => (typeof value === "string" ? cleanText(value) : ""),
    z.union([
      z.literal(""),
      z.string().min(10, "Enter a complete phone number.").max(30).regex(
        /^[+\d][\d\s().-]+$/,
        "Enter a valid phone number.",
      ),
    ]),
  ),
  primaryNeed: z.enum(cleanupNeedValues, "Select the bookkeeping help you need."),
  monthsBehind: z.enum(cleanupMonthsBehindValues, "Select how far behind the books are."),
  accountingSoftware: optionalEnum(cleanupSoftwareValues),
  industry: optionalCleanText(100),
  targetDate: optionalTargetDate,
  contactPreference: optionalEnum(cleanupContactPreferenceValues),
  context: optionalCleanText(800),
  consentToContact: z.literal(true, "Please agree so IntegraFin can respond to your request."),
  website: z.literal("").optional(),
  idempotencyKey: z.string().uuid(),
}).superRefine((review, context) => {
  if (!review.email && !review.phone) {
    context.addIssue({
      code: "custom",
      path: ["email"],
      message: "Provide an email address or phone number.",
    });
  }

  if (review.contactPreference === "email" && !review.email) {
    context.addIssue({
      code: "custom",
      path: ["email"],
      message: "Email is required when it is your preferred contact method.",
    });
  }

  if (review.contactPreference === "phone_call" && !review.phone) {
    context.addIssue({
      code: "custom",
      path: ["phone"],
      message: "Phone is required when it is your preferred contact method.",
    });
  }
});

export type BookkeepingCleanupReviewInput = z.input<typeof BookkeepingCleanupReviewInputSchema>;
export type ParsedBookkeepingCleanupReview = z.output<typeof BookkeepingCleanupReviewInputSchema>;

export function normalizeLeadPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) return `1${digits}`;
  return digits;
}

export function getCleanupReviewResponseLabel(minutes: number) {
  if (minutes < 60) return `within ${minutes} minutes`;
  if (minutes === 60) return "within one business hour";
  if (minutes < 24 * 60 && minutes % 60 === 0) {
    return `within ${minutes / 60} business hours`;
  }
  const days = Math.ceil(minutes / (24 * 60));
  return `within ${days} business day${days === 1 ? "" : "s"}`;
}
