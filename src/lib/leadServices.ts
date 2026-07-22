export const LEAD_SERVICE_OPTIONS = [
  { value: "Individual Tax Preparation", label: "Individual Tax Preparation" },
  { value: "Business Tax and Accounting", label: "Business Tax and Accounting" },
  { value: "Bookkeeping Cleanup", label: "Bookkeeping Cleanup" },
  { value: "QuickBooks Bookkeeping", label: "QuickBooks Bookkeeping" },
  { value: "IRS Notice and Tax Resolution", label: "IRS Notice and Tax Resolution" },
  { value: "Payroll Tax Support", label: "Payroll Tax Support" },
  { value: "LLC Formation and Tax Setup", label: "LLC Formation and Tax Setup" },
  { value: "Other Enquiry", label: "Other Enquiry" },
] as const;

export type LeadService = (typeof LEAD_SERVICE_OPTIONS)[number]["value"];

const leadServiceValues = new Set<string>(LEAD_SERVICE_OPTIONS.map(({ value }) => value));

export function normalizeLeadService(value: unknown): LeadService | "" {
  if (typeof value !== "string") return "";
  return leadServiceValues.has(value) ? (value as LeadService) : "";
}

export function getContactHref(service: LeadService) {
  return `/contact?service=${encodeURIComponent(service)}#contact-form`;
}

export function getLeadCtaLabel(service: LeadService, fallback = "Request a Consultation") {
  const labels: Partial<Record<LeadService, string>> = {
    "IRS Notice and Tax Resolution": "Request an IRS notice review",
    "Bookkeeping Cleanup": "Request a cleanup assessment",
    "Business Tax and Accounting": "Book a small-business tax consultation",
    "LLC Formation and Tax Setup": "Book an entity tax-setup call",
    "QuickBooks Bookkeeping": "Request QuickBooks support",
    "Payroll Tax Support": "Request payroll support",
    "Individual Tax Preparation": "Request tax preparation help",
  };

  return labels[service] || fallback;
}

export const SERVICE_BY_LANDING_SLUG = {
  "business-tax-accounting": "Business Tax and Accounting",
  "individual-tax-preparation": "Individual Tax Preparation",
  "tax-resolution": "IRS Notice and Tax Resolution",
  "bookkeeping-cleanup": "Bookkeeping Cleanup",
  "payroll-tax-support": "Payroll Tax Support",
  "quickbooks-bookkeeping-services": "QuickBooks Bookkeeping",
} as const satisfies Record<string, LeadService>;
