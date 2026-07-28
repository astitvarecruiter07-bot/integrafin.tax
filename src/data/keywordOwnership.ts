/**
 * Canonical search-intent ownership for priority commercial pages.
 *
 * Supporting pages may discuss an intent and should link to its owner using the
 * preferred anchor. They should not reuse the owner's exact title/H1/structured-
 * data keyword target as their own primary positioning.
 */
export type KeywordOwnershipRule = {
  intent: string;
  ownerUrl: string;
  supportingUrls: readonly string[];
  preferredAnchor: string;
  boundary: string;
};

export const keywordOwnershipRules = [
  {
    intent: "Katy tax and accounting firm",
    ownerUrl: "/",
    supportingUrls: ["/about", "/services", "/texas/katy-tax-accountant"],
    preferredAnchor: "Katy tax and accounting firm",
    boundary: "Broad brand, trust, service overview, and conversion intent.",
  },
  {
    intent: "Tax accountant Katy TX",
    ownerUrl: "/texas/katy-tax-accountant",
    supportingUrls: ["/", "/business-tax-accounting", "/individual-tax-preparation"],
    preferredAnchor: "Tax Accountant Katy TX",
    boundary: "Exact local accountant intent for both individuals and businesses.",
  },
  {
    intent: "Bookkeeping services Katy TX",
    ownerUrl: "/texas/katy-bookkeeping-services",
    supportingUrls: ["/bookkeeping-cleanup", "/quickbooks-bookkeeping-services", "/services"],
    preferredAnchor: "Bookkeeping Services Katy TX",
    boundary: "Local recurring and monthly bookkeeping; not platform-specific cleanup.",
  },
  {
    intent: "Small business tax accountant Katy",
    ownerUrl: "/business-tax-accounting",
    supportingUrls: ["/texas/katy-tax-accountant", "/industries", "/"],
    preferredAnchor: "Small Business Tax Accountant Katy",
    boundary: "Business return, entity, owner, payroll-record, and year-round tax workflow.",
  },
  {
    intent: "Individual tax preparation Katy TX",
    ownerUrl: "/individual-tax-preparation",
    supportingUrls: ["/", "/tax-calculator", "/texas/katy-tax-accountant"],
    preferredAnchor: "Individual Tax Preparation Katy TX",
    boundary: "Personal filing and document intent, including Texas and multi-state facts.",
  },
  {
    intent: "IRS notice help Katy TX",
    ownerUrl: "/texas/irs-notice-help-katy-tx",
    supportingUrls: ["/tax-resolution", "/services", "/texas/katy-tax-accountant"],
    preferredAnchor: "IRS Notice Help Katy TX",
    boundary: "Notice identification and response triage for CP14, CP2000, Letter 12C, and similar letters.",
  },
  {
    intent: "Tax resolution Katy TX",
    ownerUrl: "/tax-resolution",
    supportingUrls: ["/texas/irs-notice-help-katy-tx", "/services"],
    preferredAnchor: "Tax Resolution Katy TX",
    boundary: "Underlying back taxes, unfiled returns, payment arrangements, penalties, audits, and payroll-tax problems.",
  },
  {
    intent: "QuickBooks cleanup Katy TX",
    ownerUrl: "/quickbooks-bookkeeping-services",
    supportingUrls: ["/bookkeeping-cleanup", "/texas/katy-bookkeeping-services"],
    preferredAnchor: "QuickBooks Cleanup Katy TX",
    boundary: "QuickBooks-specific setup, feeds, reconciliation, cleanup, and reporting.",
  },
  {
    intent: "Bookkeeping cleanup",
    ownerUrl: "/bookkeeping-cleanup",
    supportingUrls: ["/quickbooks-bookkeeping-services", "/texas/katy-bookkeeping-services"],
    preferredAnchor: "Bookkeeping Cleanup Services",
    boundary: "Platform-agnostic catch-up and cleanup process for behind or unreliable books.",
  },
  {
    intent: "LLC tax setup Texas",
    ownerUrl: "/llc-formation-tax-setup",
    supportingUrls: ["/business-tax-accounting", "/payroll-tax-support", "/services"],
    preferredAnchor: "LLC Tax Setup Texas",
    boundary: "Tax classification, EIN, opening books, payroll readiness, and first-year calendar.",
  },
  {
    intent: "Payroll tax support",
    ownerUrl: "/payroll-tax-support",
    supportingUrls: ["/business-tax-accounting", "/llc-formation-tax-setup", "/services"],
    preferredAnchor: "Payroll Tax Support",
    boundary: "Employer records, deposits, filings, wage forms, and payroll-notice workflow.",
  },
  {
    intent: "Federal tax calculator",
    ownerUrl: "/tax-calculator",
    supportingUrls: ["/tax-calculator-guide", "/individual-tax-preparation", "/services"],
    preferredAnchor: "Federal Tax Calculator",
    boundary: "Interactive estimate tool; the guide remains supporting informational content.",
  },
] as const satisfies readonly KeywordOwnershipRule[];

export function getKeywordOwner(intent: string) {
  return keywordOwnershipRules.find(
    (rule) => rule.intent.toLocaleLowerCase() === intent.toLocaleLowerCase(),
  );
}
