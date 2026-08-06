export type InternalLink = {
  href: string;
  label: string;
};

export type BlogLinkSource = {
  slug: string;
  title: string;
  category?: string;
  keywords?: string[];
};

export type BlogIntentLinks = {
  primary: InternalLink;
  supporting: readonly InternalLink[];
};

const individualTaxPreparation = {
  href: "/individual-tax-preparation",
  label: "Individual Tax Preparation Katy TX",
} as const;

const businessTaxAccounting = {
  href: "/business-tax-accounting",
  label: "Small Business Tax Accountant Katy",
} as const;

const irsNoticeHelp = {
  href: "/texas/irs-notice-help-katy-tx",
  label: "IRS Notice Help Katy TX",
} as const;

const taxResolution = {
  href: "/tax-resolution",
  label: "Tax Resolution Katy TX",
} as const;

const payrollTaxSupport = {
  href: "/payroll-tax-support",
  label: "Payroll Tax Support",
} as const;

const bookkeepingServices = {
  href: "/texas/katy-bookkeeping-services",
  label: "Bookkeeping Services Katy TX",
} as const;

const llcTaxSetup = {
  href: "/llc-formation-tax-setup",
  label: "LLC Tax Setup Texas",
} as const;

const taxCalculator = {
  href: "/tax-calculator",
  label: "Federal Tax Calculator",
} as const;

const explicitBlogIntentLinks: Record<string, BlogIntentLinks> = {
  "irs-trump-account-gift-tax-update": {
    primary: individualTaxPreparation,
    supporting: [taxCalculator, businessTaxAccounting],
  },
  "arizona-tax-cut-2026": {
    primary: individualTaxPreparation,
    supporting: [taxCalculator, businessTaxAccounting],
  },
  "missed-estimated-tax-payment-june-15-deadline": {
    primary: individualTaxPreparation,
    supporting: [taxCalculator, taxResolution],
  },
  "federal-scholarship-tax-credit-2027-guide": {
    primary: individualTaxPreparation,
    supporting: [taxCalculator, businessTaxAccounting],
  },
  "reduce-self-employment-tax-business-owners": {
    primary: businessTaxAccounting,
    supporting: [llcTaxSetup, payrollTaxSupport],
  },
  "tax-planning-strategies-2025": {
    primary: individualTaxPreparation,
    supporting: [taxCalculator, businessTaxAccounting],
  },
  "small-business-accounting-tips": {
    primary: businessTaxAccounting,
    supporting: [bookkeepingServices, payrollTaxSupport],
  },
  "irs-compliance-guide": {
    primary: businessTaxAccounting,
    supporting: [irsNoticeHelp, payrollTaxSupport],
  },
  "tax-resolution-options": {
    primary: taxResolution,
    supporting: [irsNoticeHelp, individualTaxPreparation],
  },
  "payroll-best-practices": {
    primary: payrollTaxSupport,
    supporting: [businessTaxAccounting, bookkeepingServices],
  },
  "financial-planning-for-startups": {
    primary: llcTaxSetup,
    supporting: [businessTaxAccounting, bookkeepingServices],
  },
};

const fallbackBlogIntentLinks: Record<string, BlogIntentLinks> = {
  "tax resolution": {
    primary: taxResolution,
    supporting: [irsNoticeHelp, individualTaxPreparation],
  },
  payroll: {
    primary: payrollTaxSupport,
    supporting: [businessTaxAccounting, bookkeepingServices],
  },
  accounting: {
    primary: businessTaxAccounting,
    supporting: [bookkeepingServices, payrollTaxSupport],
  },
  compliance: {
    primary: irsNoticeHelp,
    supporting: [taxResolution, businessTaxAccounting],
  },
  "business advisory": {
    primary: llcTaxSetup,
    supporting: [businessTaxAccounting, bookkeepingServices],
  },
  "tax planning": {
    primary: individualTaxPreparation,
    supporting: [taxCalculator, businessTaxAccounting],
  },
  "tax news": {
    primary: individualTaxPreparation,
    supporting: [taxCalculator, businessTaxAccounting],
  },
};

const defaultBlogIntentLinks: BlogIntentLinks = {
  primary: businessTaxAccounting,
  supporting: [individualTaxPreparation, taxCalculator],
};

export function getBlogIntentLinks(post: BlogLinkSource): BlogIntentLinks {
  const explicit = explicitBlogIntentLinks[post.slug];
  if (explicit) {
    return explicit;
  }

  const category = post.category?.trim().toLowerCase();
  if (category && fallbackBlogIntentLinks[category]) {
    return fallbackBlogIntentLinks[category];
  }

  const searchableText = [post.title, ...(post.keywords || [])].join(" ").toLowerCase();

  if (searchableText.includes("payroll")) {
    return fallbackBlogIntentLinks.payroll;
  }
  if (searchableText.includes("irs notice") || searchableText.includes("audit")) {
    return fallbackBlogIntentLinks.compliance;
  }
  if (searchableText.includes("bookkeep") || searchableText.includes("accounting")) {
    return fallbackBlogIntentLinks.accounting;
  }
  if (searchableText.includes("startup") || searchableText.includes("llc")) {
    return fallbackBlogIntentLinks["business advisory"];
  }

  return defaultBlogIntentLinks;
}

export const serviceGuideLinks = {
  "business-tax-accounting": [
    { href: "/blog/reduce-self-employment-tax-business-owners", label: "Self-Employment Tax Guide for Business Owners" },
    { href: "/blog/how-to-calculate-2026-quarterly-estimated-tax-payments", label: "2026 Quarterly Estimated Tax Payment Guide" },
    { href: "/blog/irs-compliance-guide", label: "Business IRS Filing and Record-Keeping Guide" },
  ],
  "individual-tax-preparation": [
    { href: "/blog/missed-estimated-tax-payment-june-15-deadline", label: "Missed Estimated Tax Payment Guide" },
    { href: "/blog/how-to-calculate-2026-quarterly-estimated-tax-payments", label: "How to Calculate 2026 Estimated Tax Payments" },
    { href: "/blog/tax-planning-strategies-2025", label: "Individual Tax-Planning Strategies" },
  ],
  "tax-resolution": [
    { href: "/blog/tax-resolution-options", label: "Tax Resolution Options Explained" },
    { href: "/blog/irs-compliance-guide", label: "IRS Filing and Record-Keeping Guide" },
    { href: "/blog/missed-estimated-tax-payment-june-15-deadline", label: "Missed Estimated Tax Payment Guide" },
  ],
  "bookkeeping-cleanup": [
    { href: "/blog/small-business-accounting-tips", label: "Small-Business Accounting Tips" },
    { href: "/blog/financial-planning-for-startups", label: "Financial Planning for Startups" },
    { href: "/blog/irs-compliance-guide", label: "Business Record-Keeping Guide" },
  ],
  "payroll-tax-support": [
    { href: "/blog/payroll-best-practices", label: "Payroll Best Practices for Business Owners" },
    { href: "/blog/reduce-self-employment-tax-business-owners", label: "Self-Employment Tax Guide" },
    { href: "/blog/irs-compliance-guide", label: "Business IRS Compliance Guide" },
  ],
  "quickbooks-bookkeeping-services": [
    { href: "/blog/small-business-accounting-tips", label: "Small-Business Accounting Tips" },
    { href: "/blog/financial-planning-for-startups", label: "Startup Financial-Planning Guide" },
    { href: "/blog/irs-compliance-guide", label: "Business Record-Keeping Guide" },
  ],
  "small-business-bookkeeping-services": [
    { href: "/blog/small-business-accounting-tips", label: "Small-Business Accounting Tips" },
    { href: "/blog/financial-planning-for-startups", label: "Financial Planning for Startups" },
    { href: "/blog/irs-compliance-guide", label: "Business Record-Keeping Guide" },
  ],
  "contractor-bookkeeping-services": [
    { href: "/blog/small-business-accounting-tips", label: "Small-Business Accounting Tips" },
    { href: "/blog/irs-compliance-guide", label: "Business Record-Keeping Guide" },
    { href: "/blog/payroll-best-practices", label: "Payroll Best Practices for Business Owners" },
  ],
  "llc-formation-tax-setup": [
    { href: "/blog/financial-planning-for-startups", label: "Financial Planning for Startups" },
    { href: "/blog/reduce-self-employment-tax-business-owners", label: "Self-Employment Tax Guide for Owners" },
    { href: "/blog/small-business-accounting-tips", label: "Small-Business Accounting Tips" },
  ],
  "irs-notice-help-katy-tx": [
    { href: "/blog/tax-resolution-options", label: "Tax Resolution Options Explained" },
    { href: "/blog/irs-compliance-guide", label: "IRS Filing and Record-Keeping Guide" },
    { href: "/blog/missed-estimated-tax-payment-june-15-deadline", label: "Missed Estimated Tax Payment Guide" },
  ],
  "katy-bookkeeping-services": [
    { href: "/blog/small-business-accounting-tips", label: "Small-Business Accounting Tips" },
    { href: "/blog/payroll-best-practices", label: "Payroll Best Practices" },
    { href: "/blog/irs-compliance-guide", label: "Business Record-Keeping Guide" },
  ],
  "texas-city-tax-accountant": [
    { href: "/blog/tax-planning-strategies-2025", label: "Tax-Planning Strategies" },
    { href: "/blog/small-business-accounting-tips", label: "Small-Business Accounting Tips" },
    { href: "/blog/tax-resolution-options", label: "Tax Resolution Options" },
  ],
} as const satisfies Record<string, readonly InternalLink[]>;
