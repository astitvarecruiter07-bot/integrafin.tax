export type ServiceLandingPageSlug =
  | "business-tax-accounting"
  | "individual-tax-preparation"
  | "tax-resolution"
  | "bookkeeping-cleanup"
  | "payroll-tax-support"
  | "quickbooks-bookkeeping-services"
  | "contractor-bookkeeping-services";

type TextBlock = {
  title: string;
  description: string;
};

type LinkBlock = {
  href: string;
  label: string;
  description?: string;
};

type FaqBlock = {
  question: string;
  answer: string;
};

export type ServiceLandingPageData = {
  slug: ServiceLandingPageSlug;
  url: string;
  lastModified: string;
  metaTitle: string;
  metaDescription: string;
  name: string;
  serviceType: string;
  keywords: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroBullets: string[];
  primaryCta: string;
  secondaryCta: string;
  hubHref: string;
  hubLabel: string;
  quickAnswerTitle: string;
  quickAnswer: string;
  highlights: TextBlock[];
  processTitle: string;
  processDescription: string;
  processSteps: TextBlock[];
  situationsTitle: string;
  situations: TextBlock[];
  checklistTitle: string;
  checklistIntro: string;
  checklist: string[];
  whyTitle: string;
  whyChoose: string[];
  officialResourcesTitle: string;
  officialResourcesIntro: string;
  officialResources: LinkBlock[];
  helpfulLinks: LinkBlock[];
  faqs: FaqBlock[];
  relatedServiceLabel: string;
};

const baseUrl = "https://integrafin.tax";

const contactLink = { href: "/contact", label: "Book A Consultation" };

export const serviceLandingPageSlugs: ServiceLandingPageSlug[] = [
  "business-tax-accounting",
  "individual-tax-preparation",
  "tax-resolution",
  "bookkeeping-cleanup",
  "payroll-tax-support",
  "quickbooks-bookkeeping-services",
  "contractor-bookkeeping-services",
];

export const focusedServiceLinks = [
  {
    href: "/business-tax-accounting",
    label: "Small Business Tax Accountant Katy",
    description: "Year-round tax, accounting, bookkeeping, and advisory support for small businesses.",
  },
  {
    href: "/individual-tax-preparation",
    label: "Individual Tax Preparation Katy TX",
    description: "Personal tax filing support for W-2, 1099, rental, investment, and multi-state situations.",
  },
  {
    href: "/tax-resolution",
    label: "Tax Resolution Katy TX",
    description: "Underlying back-tax, payment-plan, penalty, audit, payroll-tax, and unfiled-return support.",
  },
  {
    href: "/bookkeeping-cleanup",
    label: "Bookkeeping Cleanup",
    description: "Cleanup for behind books, unreconciled accounts, duplicate entries, and tax-ready reports.",
  },
  {
    href: "/payroll-tax-support",
    label: "Payroll Tax Support",
    description: "Payroll tax records, filing workflow, notice review, and deposit support for employers.",
  },
  {
    href: "/quickbooks-bookkeeping-services",
    label: "QuickBooks Cleanup Katy TX",
    description: "QuickBooks setup, cleanup, monthly bookkeeping, reconciliation, and reporting support.",
  },
  {
    href: "/contractor-bookkeeping-services",
    label: "Contractor Bookkeeping Services",
    description: "Bookkeeping, job-costing record support, cleanup, and tax-ready reporting for Texas contractors and trades.",
  },
] as const;

export const serviceLandingPages: Record<ServiceLandingPageSlug, ServiceLandingPageData> = {
  "business-tax-accounting": {
    slug: "business-tax-accounting",
    url: `${baseUrl}/business-tax-accounting`,
    lastModified: "2026-07-29",
    metaTitle: "Small Business Tax Accountant Katy TX | IntegraFin",
    metaDescription:
      "Small business tax accountant in Katy for LLCs, S corps, partnerships, and sole proprietors. Get tax preparation, bookkeeping, payroll-record, and planning support.",
    name: "Small Business Tax Accountant in Katy",
    serviceType: "Katy small business tax preparation, accounting, bookkeeping, and advisory support",
    keywords:
      "small business tax accountant Katy, Katy business tax preparation, small business accounting Katy, LLC tax accountant Katy",
    eyebrow: "Katy Small Business Tax & Accounting",
    heroTitle: "Small business tax accountant support for Katy owners",
    heroDescription:
      "IntegraFin helps Katy small business owners connect bookkeeping, tax preparation, payroll records, entity questions, and year-round planning in one practical workflow.",
    heroBullets: [
      "LLCs, S corps, partnerships, and sole proprietors",
      "Bookkeeping, payroll records, and tax-ready reporting",
      "Federal, state, and local filing support conversations",
    ],
    primaryCta: "Request Business Tax Support",
    secondaryCta: "Call (832) 647-1819",
    hubHref: "/services#business",
    hubLabel: "View Business Services Hub",
    quickAnswerTitle: "Quick Answer: Small Business Tax Accounting in Katy",
    quickAnswer:
      "A small business tax accountant connects monthly records, payroll details, owner activity, estimated taxes, and filing documents in one review rhythm. IntegraFin applies that workflow to Katy LLCs, S corporations, partnerships, sole proprietors, and other owner-managed businesses.",
    highlights: [
      {
        title: "Business tax preparation",
        description:
          "Return-preparation support for business owners who need clean books, owner records, income details, expenses, assets, and filing documents reviewed before tax season.",
      },
      {
        title: "Accounting and reporting",
        description:
          "Practical financial reporting for owners who need useful profit and loss reports, balance sheet review, tax-ready schedules, and management visibility.",
      },
      {
        title: "Year-round advisory",
        description:
          "Entity, payroll, estimated-tax, 1099, sales tax, and records conversations tied to the facts of the business instead of one-size-fits-all advice.",
      },
    ],
    processTitle: "Business Tax Workflow",
    processDescription:
      "The goal is to move from scattered records to a tax-ready file that can support filing, planning, lending, and future IRS or state questions.",
    processSteps: [
      {
        title: "1. Business and entity intake",
        description:
          "We review the entity type, owners, payroll status, industry, accounting system, filing history, and open notices or deadlines.",
      },
      {
        title: "2. Records and bookkeeping review",
        description:
          "Bank, credit card, payroll, sales, loan, asset, and contractor records are checked for gaps before tax decisions are made.",
      },
      {
        title: "3. Tax preparation checklist",
        description:
          "We organize the return-preparation documents and identify missing schedules, owner records, basis details, or support needed for deductions.",
      },
      {
        title: "4. Planning and filing handoff",
        description:
          "The final workflow connects filing needs with estimated tax questions, payroll records, 1099 tracking, and next-year bookkeeping improvements.",
      },
    ],
    situationsTitle: "Common Business Tax Situations",
    situations: [
      {
        title: "Katy service business books are not ready",
        description:
          "A local contractor, consultant, healthcare practice, retailer, or other service business cannot move confidently into filing because income, expenses, bank reconciliations, payroll, or owner activity need cleanup first.",
      },
      {
        title: "Business structure changed",
        description:
          "An LLC, S corporation election, partnership, or ownership change needs tax and recordkeeping review before assumptions are made.",
      },
      {
        title: "Payroll and contractors are growing",
        description:
          "The business needs cleaner payroll records, contractor details, 1099 tracking, and filing support before year end.",
      },
      {
        title: "Tax payments feel unclear",
        description:
          "The owner needs help reviewing estimated taxes, prior payments, entity filings, and cash-flow expectations.",
      },
    ],
    checklistTitle: "Business Records Checklist",
    checklistIntro:
      "Bring or upload whatever is available. The first review usually shows what is complete and what still needs to be collected.",
    checklist: [
      "Business tax returns and prior-year depreciation schedules",
      "Bank, credit card, loan, and payment processor statements",
      "Bookkeeping reports, reconciliations, and chart of accounts",
      "Payroll reports, payroll tax filings, and contractor payment records",
      "Invoices, receipts, asset purchases, mileage logs, and lease documents",
      "Estimated tax payments, extension payments, notices, and state filings",
      "Entity documents, ownership changes, EIN letters, and business licenses",
    ],
    whyTitle: "Why IntegraFin For Business Owners",
    whyChoose: [
      "One workflow for bookkeeping, tax preparation, payroll records, and advisory conversations.",
      "Conservative, fact-based tax wording that avoids promised refunds or automatic tax savings.",
      "Katy-based service with remote document support for business owners across the United States.",
      "Clear next steps when records, payroll details, notices, or entity questions are blocking filing.",
    ],
    officialResourcesTitle: "Official Business Tax Resources",
    officialResourcesIntro:
      "These official IRS pages are useful when checking business recordkeeping, federal tax responsibilities, and startup filing basics.",
    officialResources: [
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/business-taxes",
        label: "IRS: Business Taxes",
        description: "Overview of federal tax topics that apply to businesses.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
        label: "IRS: Recordkeeping",
        description: "IRS guidance on why businesses should keep accurate records.",
      },
      {
        href: "https://www.irs.gov/publications/p583",
        label: "IRS Publication 583",
        description: "Starting a business and keeping records.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes",
        label: "IRS: Estimated Taxes",
        description: "General IRS information on estimated tax payments.",
      },
    ],
    helpfulLinks: [
      contactLink,
      { href: "/bookkeeping-cleanup", label: "Bookkeeping Cleanup" },
      { href: "/payroll-tax-support", label: "Payroll Tax Support" },
      { href: "/llc-formation-tax-setup", label: "LLC Formation Tax Setup" },
      { href: "/tax-calculator", label: "Federal Tax Calculator" },
    ],
    faqs: [
      {
        question: "Do you help with small business tax preparation?",
        answer:
          "Yes. IntegraFin helps small business owners organize records, review bookkeeping, collect filing documents, and prepare for business tax filing conversations.",
      },
      {
        question: "Can you help if my books are messy before filing?",
        answer:
          "Yes. Bookkeeping cleanup often comes before business tax preparation. We review the records, identify gaps, and organize a practical cleanup path.",
      },
      {
        question: "Do you work with LLCs and S corporations?",
        answer:
          "Yes. IntegraFin supports LLCs, S corporations, partnerships, sole proprietors, and self-employed business owners with tax and accounting workflows.",
      },
      {
        question: "Can business tax planning guarantee lower taxes?",
        answer:
          "No. Tax results depend on the business facts, records, entity type, income, expenses, payroll, and current law. We focus on accurate records and eligible planning opportunities.",
      },
    ],
    relatedServiceLabel: "Business tax and accounting",
  },
  "individual-tax-preparation": {
    slug: "individual-tax-preparation",
    url: `${baseUrl}/individual-tax-preparation`,
    lastModified: "2026-07-29",
    metaTitle: "Individual Tax Preparation Katy TX | IntegraFin",
    metaDescription:
      "Individual tax preparation in Katy, TX for W-2 employees, 1099 workers, families, investors, rental owners, and multi-state taxpayers. Schedule a consultation.",
    name: "Individual Tax Preparation in Katy, TX",
    serviceType: "Katy individual income tax preparation and filing support",
    keywords:
      "individual tax preparation Katy TX, personal tax preparation Katy, 1099 tax preparation Katy, tax filing help Katy",
    eyebrow: "Individual Tax Preparation Katy TX",
    heroTitle: "Individual tax preparation for Katy families and self-employed filers",
    heroDescription:
      "IntegraFin helps Katy-area individuals, families, self-employed taxpayers, and multi-state filers organize documents, review filing details, and avoid last-minute confusion.",
    heroBullets: [
      "W-2, 1099, rental, investment, and multi-state documents",
      "Tax-credit and deduction review based on your records",
      "Organized document workflow and clear next steps",
    ],
    primaryCta: "Request Tax Preparation Help",
    secondaryCta: "Call (832) 647-1819",
    hubHref: "/services#individual",
    hubLabel: "View Individual Services Hub",
    quickAnswerTitle: "Quick Answer: Individual Tax Preparation in Katy",
    quickAnswer:
      "Individual tax preparation is more than entering forms. For Katy-area filers, a useful review checks income documents, withholding, estimated payments, credits, deductions, dependents, investments, rental details, Texas residency, other-state activity, and prior-year carryovers before the return is finalized.",
    highlights: [
      {
        title: "Personal tax filing",
        description:
          "Support for taxpayers with wages, self-employment income, investment activity, rental details, education forms, retirement forms, or multi-state questions.",
      },
      {
        title: "Document organization",
        description:
          "A practical checklist helps you gather W-2, 1099, mortgage, charitable, health, education, and dependent records before filing.",
      },
      {
        title: "Planning for next year",
        description:
          "After filing, we can review withholding, estimated taxes, self-employment tax, and recordkeeping questions so next season is smoother.",
      },
    ],
    processTitle: "Individual Tax Preparation Process",
    processDescription:
      "The preparation process is built to reduce missing forms, rushed assumptions, and unsupported tax positions.",
    processSteps: [
      {
        title: "1. Intake and prior-year review",
        description:
          "We review the taxpayer profile, last return, filing status, dependents, state activity, and major life changes.",
      },
      {
        title: "2. Document collection",
        description:
          "Income forms, deductions, credits, payments, identity details, and carryover items are organized before preparation starts.",
      },
      {
        title: "3. Return preparation review",
        description:
          "The return is prepared based on available support and reviewed for missing forms, unusual changes, and practical questions.",
      },
      {
        title: "4. Filing and next-step notes",
        description:
          "We discuss filing status, refund or balance-due expectations, payment options, and planning ideas for the next tax year.",
      },
    ],
    situationsTitle: "Common Individual Tax Situations",
    situations: [
      {
        title: "Multiple income forms",
        description:
          "The taxpayer has W-2, 1099, brokerage, crypto, rental, or side-business forms and needs a cleaner filing workflow.",
      },
      {
        title: "Life changed this year",
        description:
          "Marriage, divorce, dependents, college, home purchase, retirement, relocation, or job changes created new tax questions.",
      },
      {
        title: "Self-employment income",
        description:
          "A freelancer, contractor, or 1099 worker needs income, expenses, estimated tax, and self-employment tax reviewed.",
      },
      {
        title: "Notice or prior-year issue",
        description:
          "The taxpayer has an IRS or state notice, unfiled return, or prior-year balance that needs to be considered before filing.",
      },
    ],
    checklistTitle: "Individual Tax Documents Checklist",
    checklistIntro:
      "A complete return starts with complete documents. The exact list depends on your facts, but these records are common.",
    checklist: [
      "Prior-year tax return and IRS or state notices",
      "W-2, 1099, K-1, brokerage, retirement, unemployment, and Social Security forms",
      "Business, freelance, rental, and expense records if applicable",
      "Mortgage interest, property tax, charitable, medical, education, and childcare records",
      "Estimated tax payments, extension payments, and withholding details",
      "Identity details, dependent information, bank information, and address changes",
    ],
    whyTitle: "Why IntegraFin For Individual Returns",
    whyChoose: [
      "Clear document requests before preparation begins.",
      "Tax-safe review of credits and deductions based on records rather than guesses.",
      "Support for taxpayers who also have business, bookkeeping, payroll, or IRS notice questions.",
      "Remote workflow plus Katy-area office support when a local appointment helps.",
    ],
    officialResourcesTitle: "Official Individual Tax Resources",
    officialResourcesIntro:
      "These official IRS pages are useful when checking filing documents, deductions, credits, and refund or payment questions.",
    officialResources: [
      {
        href: "https://www.irs.gov/filing/individuals",
        label: "IRS: Filing for Individuals",
        description: "IRS filing information for individual taxpayers.",
      },
      {
        href: "https://www.irs.gov/individuals/steps-to-take-now-to-get-a-jump-on-your-taxes",
        label: "IRS: Get Ready to File",
        description: "IRS guidance on preparing documents before filing.",
      },
      {
        href: "https://www.irs.gov/credits-deductions-for-individuals",
        label: "IRS: Credits and Deductions",
        description: "IRS overview of credits and deductions for individuals.",
      },
      {
        href: "https://www.irs.gov/refunds",
        label: "IRS: Refunds",
        description: "IRS refund information and refund status resources.",
      },
    ],
    helpfulLinks: [
      contactLink,
      { href: "/tax-calculator", label: "Federal Tax Calculator" },
      { href: "/tax-resolution", label: "Tax Resolution" },
      { href: "/services#individual", label: "Individual Services Hub" },
      { href: "/blog/tax-planning-strategies-2025", label: "Tax Planning Strategies" },
    ],
    faqs: [
      {
        question: "Can you prepare individual tax returns with 1099 income?",
        answer:
          "Yes. IntegraFin helps 1099 workers and self-employed taxpayers organize income, expenses, estimated tax payments, and filing documents.",
      },
      {
        question: "Can you guarantee a bigger refund?",
        answer:
          "No. Refunds depend on income, withholding, credits, deductions, payments, and current law. We review eligible items based on the documents you provide.",
      },
      {
        question: "Do you help with prior-year returns?",
        answer:
          "Yes. We can review prior-year filing needs, collect the missing documents, and connect the work with tax-resolution support when notices or balances are involved.",
      },
      {
        question: "Can you help if I moved between states?",
        answer:
          "Yes. Multi-state filing can require additional records about residency, income sourcing, withholding, and state documents.",
      },
    ],
    relatedServiceLabel: "Individual tax preparation",
  },
  "tax-resolution": {
    slug: "tax-resolution",
    url: `${baseUrl}/tax-resolution`,
    lastModified: "2026-07-29",
    metaTitle: "Tax Resolution Katy TX | Back Tax Help | IntegraFin",
    metaDescription:
      "Tax resolution in Katy for back taxes, unfiled returns, payment-plan review, penalty questions, audits, and payroll tax issues. Talk to IntegraFin.",
    name: "Tax Resolution Services in Katy, TX",
    serviceType: "Back tax, payment plan, penalty, audit, payroll tax, and unfiled return support",
    keywords:
      "tax resolution Katy TX, back tax help Katy, IRS payment plan help, penalty abatement support, unfiled tax returns",
    eyebrow: "Tax Resolution Katy TX",
    heroTitle: "Tax resolution for back taxes and unresolved filing problems",
    heroDescription:
      "IntegraFin helps Katy taxpayers and business owners move beyond initial notice triage by organizing records and evaluating next steps for back taxes, unfiled returns, payment arrangements, penalties, audits, or payroll tax issues.",
    heroBullets: [
      "Back-tax balances, audits, and unresolved filing issues",
      "Payment-plan and penalty-question support",
      "Unfiled returns and business payroll tax records",
    ],
    primaryCta: "Request Tax Resolution Help",
    secondaryCta: "Call (832) 647-1819",
    hubHref: "/services#tax-resolution",
    hubLabel: "View Tax Resolution Hub",
    quickAnswerTitle: "Quick Answer: Tax Resolution",
    quickAnswer:
      "Tax resolution addresses an underlying balance, missing return, audit, penalty, payroll tax problem, or other unresolved compliance issue. It starts with transcripts, filed returns, payment history, deadlines, and supporting records. If you only need help identifying and responding to a CP14, CP2000, or Letter 12C, use the dedicated Katy IRS notice-help page first.",
    highlights: [
      {
        title: "Resolution case assessment",
        description:
          "We identify the tax years, balances, filing gaps, deadlines, transcript issues, and records that determine which resolution paths can be evaluated.",
      },
      {
        title: "Back tax and payment planning",
        description:
          "Balances are reviewed against returns, transcripts, and payment history before discussing IRS payment-plan options or next steps.",
      },
      {
        title: "Unfiled return support",
        description:
          "Missing years are organized with income documents, business records, prior notices, and filing priorities so compliance can move forward.",
      },
    ],
    processTitle: "Tax Resolution Workflow",
    processDescription:
      "The work begins with fact-finding. Strong resolution planning depends on accurate balances, deadlines, records, and filing history.",
    processSteps: [
      {
        title: "1. Case and deadline review",
        description:
          "We review the tax years, filing status, IRS or state correspondence, response deadlines, balances, and contact instructions.",
      },
      {
        title: "2. Transcript and return comparison",
        description:
          "Returns, transcripts, notices, payments, and bookkeeping records are compared to understand the issue.",
      },
      {
        title: "3. Option mapping",
        description:
          "We discuss practical options such as response support, payment-plan review, missing return preparation, penalty documentation, or audit organization.",
      },
      {
        title: "4. Follow-through and record cleanup",
        description:
          "The next steps are documented so future filing, payment, payroll, and bookkeeping records are easier to manage.",
      },
    ],
    situationsTitle: "Common Tax Resolution Situations",
    situations: [
      {
        title: "Balance due notice",
        description:
          "A taxpayer receives a balance notice and needs to compare the amount with returns, payments, transcripts, and possible payment options.",
      },
      {
        title: "Audit or examination support",
        description:
          "An open examination requires returns, correspondence, bookkeeping, receipts, and other supporting records to be organized around the issues under review.",
      },
      {
        title: "Unfiled tax returns",
        description:
          "One or more missing returns need to be prepared before payment plans or other resolution options can be reviewed.",
      },
      {
        title: "Payroll tax or business notice",
        description:
          "A business needs payroll filings, deposits, bookkeeping reports, and owner records organized before responding.",
      },
    ],
    checklistTitle: "Tax Resolution Document Checklist",
    checklistIntro:
      "Bring the notice first. Then gather the return, payment history, income records, business records, and prior correspondence.",
    checklist: [
      "IRS or state notice, including every page",
      "Tax return for the year shown on the notice",
      "IRS transcript, online account balance, or payment history if available",
      "Proof of estimated tax, extension, withholding, or balance payments",
      "W-2, 1099, K-1, brokerage, business, rental, and payroll records",
      "Bookkeeping reports and bank statements for business notices",
      "Prior response letters, fax receipts, mailed tracking, or appeal documents",
    ],
    whyTitle: "Why IntegraFin For Tax Resolution",
    whyChoose: [
      "Record-first approach before promises are made.",
      "Connection between tax resolution, bookkeeping cleanup, payroll tax support, and return preparation.",
      "Clear explanation of next steps and documents needed for each notice type.",
      "Conservative wording around payment plans, settlements, penalties, and outcomes.",
    ],
    officialResourcesTitle: "Official Tax Resolution Resources",
    officialResourcesIntro:
      "These official IRS pages can help taxpayers understand notices, payment plans, offers, penalties, and transcripts.",
    officialResources: [
      {
        href: "https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter",
        label: "IRS: Understanding Notices and Letters",
        description: "IRS overview of notices, letters, and response basics.",
      },
      {
        href: "https://www.irs.gov/payments/payment-plans-installment-agreements",
        label: "IRS: Payment Plans",
        description: "IRS information on payment plans and installment agreements.",
      },
      {
        href: "https://www.irs.gov/payments/offer-in-compromise",
        label: "IRS: Offer in Compromise",
        description: "IRS information on offer in compromise eligibility and process.",
      },
      {
        href: "https://www.irs.gov/individuals/get-transcript",
        label: "IRS: Get Transcript",
        description: "IRS tax records and transcript access.",
      },
    ],
    helpfulLinks: [
      contactLink,
      { href: "/texas/houston/irs-notice-help", label: "Houston IRS Notice Help" },
      { href: "/texas/houston/irs-payment-plan-help", label: "Houston IRS Payment Plan Help" },
      { href: "/texas/houston/unfiled-tax-return-help", label: "Houston Unfiled Tax Return Help" },
      { href: "/texas/irs-notice-help-katy-tx", label: "IRS Notice Help Katy TX" },
      { href: "/payroll-tax-support", label: "Payroll Tax Support" },
      { href: "/individual-tax-preparation", label: "Individual Tax Preparation" },
      { href: "/services#tax-resolution", label: "Tax Resolution Hub" },
    ],
    faqs: [
      {
        question: "Can you help if I owe back taxes?",
        answer:
          "Yes. We can help organize returns, balances, transcripts, payment records, and next-step options such as payment-plan review.",
      },
      {
        question: "Can you guarantee an IRS settlement?",
        answer:
          "No. IRS outcomes depend on eligibility, financial facts, filing compliance, documentation, and IRS review. We avoid guaranteed settlement claims.",
      },
      {
        question: "Can you help with unfiled returns?",
        answer:
          "Yes. Missing returns often need to be filed before other resolution options can be reviewed. We help organize the documents and filing sequence.",
      },
      {
        question: "Should I ignore an IRS notice if I think it is wrong?",
        answer:
          "No. Notices usually include deadlines and instructions. Gather the notice, return, payment records, and support before responding.",
      },
    ],
    relatedServiceLabel: "Tax resolution",
  },
  "bookkeeping-cleanup": {
    slug: "bookkeeping-cleanup",
    url: `${baseUrl}/bookkeeping-cleanup`,
    lastModified: "2026-07-29",
    metaTitle: "Bookkeeping Cleanup Services | Catch-Up Books | IntegraFin",
    metaDescription:
      "Bookkeeping cleanup services for messy or behind books. IntegraFin helps reconcile accounts, fix categories, organize records, and prepare tax-ready reports.",
    name: "Bookkeeping Cleanup Services",
    serviceType: "Catch-up bookkeeping, reconciliation, cleanup, and tax-ready reporting",
    keywords:
      "bookkeeping cleanup, catch up bookkeeping, clean up books, messy bookkeeping, bookkeeping reconciliation",
    eyebrow: "Bookkeeping Cleanup",
    heroTitle: "Clean up messy books before tax season, lending, or growth decisions",
    heroDescription:
      "IntegraFin helps business owners repair behind bookkeeping, reconcile accounts, organize documents, and create reports that are easier to trust.",
    heroBullets: [
      "Catch-up bookkeeping for months or years behind",
      "Bank, credit card, loan, payroll, and merchant reconciliation",
      "Tax-ready reports and missing-records checklist",
    ],
    primaryCta: "Request Bookkeeping Cleanup",
    secondaryCta: "Call (832) 647-1819",
    hubHref: "/services#business",
    hubLabel: "View Business Services Hub",
    quickAnswerTitle: "Quick Answer: Bookkeeping Cleanup",
    quickAnswer:
      "Bookkeeping cleanup fixes the records that make tax preparation, business decisions, lending, or notice responses difficult. The work usually includes reviewing the accounting file, reconciling accounts, correcting categories, separating owner activity, and documenting missing support.",
    highlights: [
      {
        title: "Catch-up bookkeeping",
        description:
          "Bring months or years of transactions into a cleaner workflow using bank, credit card, payroll, sales, and payment records.",
      },
      {
        title: "Reconciliation repair",
        description:
          "Identify unreconciled accounts, duplicate transactions, old balances, missing statements, and payment processor differences.",
      },
      {
        title: "Tax-ready reporting",
        description:
          "Prepare reports and supporting schedules that make tax preparation, planning, and owner review more reliable.",
      },
    ],
    processTitle: "Bookkeeping Cleanup Process",
    processDescription:
      "Cleanup starts with the accounting file and statements, then moves toward reconciled reports and a better go-forward rhythm.",
    processSteps: [
      {
        title: "1. File and statement review",
        description:
          "We review accounting software access, bank statements, credit card statements, loan records, payroll reports, and prior tax returns.",
      },
      {
        title: "2. Reconciliation and error mapping",
        description:
          "Unreconciled accounts, duplicates, missing transfers, uncategorized expenses, and old balance issues are identified.",
      },
      {
        title: "3. Cleanup execution",
        description:
          "Transactions are categorized, accounts reconciled, owner activity separated, and missing support documented where needed.",
      },
      {
        title: "4. Tax-ready handoff",
        description:
          "You receive cleaner reports, open questions, and a go-forward monthly workflow to reduce repeat cleanup work.",
      },
    ],
    situationsTitle: "Common Cleanup Situations",
    situations: [
      {
        title: "Books are behind before filing",
        description:
          "The tax return is waiting because the accounting file has not been reconciled or reviewed.",
      },
      {
        title: "Personal and business activity mixed",
        description:
          "Owner draws, contributions, reimbursements, and personal expenses need to be separated where records allow.",
      },
      {
        title: "Accounting file is hard to trust",
        description:
          "The accounting file has duplicate entries, stale feeds, uncategorized activity, negative balances, or reports that do not match statements. Software-specific QuickBooks work is handled on the dedicated QuickBooks page.",
      },
      {
        title: "IRS or lender requested records",
        description:
          "The business needs cleaner profit and loss reports, balance sheet details, receipts, payroll summaries, or support schedules.",
      },
    ],
    checklistTitle: "Cleanup Records Checklist",
    checklistIntro:
      "Cleanup can start with partial records, but complete statements and software access make the work faster and more accurate.",
    checklist: [
      "Accounting software access or exports",
      "Business bank, credit card, loan, and payment processor statements",
      "Payroll reports, payroll tax filings, and contractor payment records",
      "Invoices, sales reports, receipts, bills, and vendor records",
      "Prior-year tax returns and depreciation schedules",
      "Loan, equipment, lease, asset, and inventory records if applicable",
      "IRS, state, sales tax, franchise tax, or payroll notices if any are open",
    ],
    whyTitle: "Why IntegraFin For Cleanup",
    whyChoose: [
      "Cleanup is connected to tax preparation, not treated as isolated data entry.",
      "Missing support and risky areas are documented clearly.",
      "Go-forward bookkeeping recommendations help prevent the same problem next year.",
      "Works alongside QuickBooks support, payroll-tax support, and IRS notice review when needed.",
    ],
    officialResourcesTitle: "Official Recordkeeping Resources",
    officialResourcesIntro:
      "These official IRS pages explain why records matter and what kinds of records businesses should keep.",
    officialResources: [
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
        label: "IRS: Recordkeeping",
        description: "IRS overview of business recordkeeping.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        label: "IRS: What Records To Keep",
        description: "IRS examples of records businesses may need to keep.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records",
        label: "IRS: How Long To Keep Records",
        description: "IRS guidance on record retention periods.",
      },
      {
        href: "https://www.irs.gov/publications/p583",
        label: "IRS Publication 583",
        description: "Starting a business and keeping records.",
      },
    ],
    helpfulLinks: [
      contactLink,
      { href: "/quickbooks-bookkeeping-services", label: "QuickBooks Bookkeeping Services" },
      { href: "/business-tax-accounting", label: "Business Tax & Accounting" },
      { href: "/texas/katy-bookkeeping-services", label: "Bookkeeping Services Katy TX" },
      { href: "/tax-resolution", label: "Tax Resolution" },
    ],
    faqs: [
      {
        question: "Can you clean up books that are more than one year behind?",
        answer:
          "Yes. We can scope cleanup for multiple months or years, depending on software access, statements, prior returns, and available support.",
      },
      {
        question: "Do I need perfect records before starting?",
        answer:
          "No. Cleanup often starts because records are incomplete. The first review identifies what exists and what still needs to be collected.",
      },
      {
        question: "Can cleanup be done before tax preparation?",
        answer:
          "Yes. That is one of the most common reasons to clean up books. Tax preparation is stronger when reports reconcile and support is organized.",
      },
      {
        question: "Can you set up monthly bookkeeping after cleanup?",
        answer:
          "Yes. A monthly workflow can help keep the file reconciled and reduce future cleanup work.",
      },
    ],
    relatedServiceLabel: "Bookkeeping cleanup",
  },
  "payroll-tax-support": {
    slug: "payroll-tax-support",
    url: `${baseUrl}/payroll-tax-support`,
    lastModified: "2026-07-29",
    metaTitle: "Payroll Tax Support | Employer Filing Help | IntegraFin",
    metaDescription:
      "Payroll tax support for employer records, deposits, quarterly filings, notices, wage reports, and cleanup questions. Get help from IntegraFin.",
    name: "Payroll Tax Support",
    serviceType: "Payroll tax recordkeeping, filing workflow, notice review, and employer support",
    keywords:
      "payroll tax support, payroll tax help, employer tax filings, payroll tax notice, payroll tax records",
    eyebrow: "Payroll Tax Support",
    heroTitle: "Payroll tax support for employers who need clean records and clear deadlines",
    heroDescription:
      "IntegraFin helps employers organize payroll records, review tax filings, prepare response documents, and connect payroll details with business tax preparation.",
    heroBullets: [
      "Payroll reports, deposits, and quarterly filing support",
      "Payroll tax notice and balance review",
      "Employee, contractor, and year-end wage record organization",
    ],
    primaryCta: "Request Payroll Tax Support",
    secondaryCta: "Call (832) 647-1819",
    hubHref: "/services#business",
    hubLabel: "View Business Services Hub",
    quickAnswerTitle: "Quick Answer: Payroll Tax Support",
    quickAnswer:
      "Payroll tax support helps employers keep wage records, deposits, filings, notices, and contractor details organized. The work is especially important when payroll records must support business tax returns, IRS notices, state questions, or year-end forms.",
    highlights: [
      {
        title: "Employer filing workflow",
        description:
          "Review payroll reports, tax deposits, quarterly filings, year-end forms, and recordkeeping checkpoints.",
      },
      {
        title: "Notice response support",
        description:
          "Organize payroll tax notices, payment records, payroll summaries, and filings before deciding how to respond.",
      },
      {
        title: "Business tax connection",
        description:
          "Tie payroll wages, owner compensation, contractor payments, and benefit records into business tax preparation.",
      },
    ],
    processTitle: "Payroll Tax Support Process",
    processDescription:
      "Payroll tax work requires close attention to payroll provider reports, deposit records, tax filings, notices, and year-end forms.",
    processSteps: [
      {
        title: "1. Payroll system and filing review",
        description:
          "We review payroll provider reports, filing status, deposit history, wage summaries, and current compliance questions.",
      },
      {
        title: "2. Records and notice collection",
        description:
          "IRS, state, unemployment, wage, and withholding notices are matched with payroll reports and payment records.",
      },
      {
        title: "3. Deposit and reporting workflow",
        description:
          "We organize the deposit, quarterly filing, annual filing, and recordkeeping workflow so deadlines are easier to track.",
      },
      {
        title: "4. Tax-preparation handoff",
        description:
          "Payroll totals, officer compensation, contractor payments, and tax filings are aligned with business tax preparation.",
      },
    ],
    situationsTitle: "Common Payroll Tax Situations",
    situations: [
      {
        title: "Payroll notice received",
        description:
          "The business received an IRS or state payroll notice and needs records organized before responding.",
      },
      {
        title: "Quarterly filings feel unclear",
        description:
          "The employer needs help reviewing payroll reports, deposits, Form 941 information, and state filing records.",
      },
      {
        title: "Year-end wage reports need review",
        description:
          "W-2, W-3, 1099, contractor, payroll, and benefit details need to be checked before year-end handoff.",
      },
      {
        title: "Payroll changed during the year",
        description:
          "New employees, owner payroll, contractor changes, benefits, or payroll-provider transitions created record gaps.",
      },
    ],
    checklistTitle: "Payroll Tax Records Checklist",
    checklistIntro:
      "Payroll tax questions move faster when payroll reports, filings, deposits, and notices are all available in one file.",
    checklist: [
      "Payroll provider access or payroll report exports",
      "Quarterly payroll tax filings and annual wage forms",
      "Federal, state, unemployment, and local payroll tax notices",
      "Deposit confirmations, payment history, and EFTPS records if available",
      "Employee wage reports, contractor payment records, and year-end forms",
      "Owner payroll, officer compensation, benefits, and reimbursement records",
      "Business tax returns and bookkeeping reports connected to payroll",
    ],
    whyTitle: "Why IntegraFin For Payroll Tax Support",
    whyChoose: [
      "Payroll tax records are reviewed together with bookkeeping and business tax preparation.",
      "Notice support starts with documents and filing history before response options are discussed.",
      "Employer records, contractor details, and owner compensation questions are handled carefully.",
      "Tax-safe language around penalties, deposits, payment plans, and compliance issues.",
    ],
    officialResourcesTitle: "Official Payroll Tax Resources",
    officialResourcesIntro:
      "These official IRS pages are useful for checking employment tax responsibilities, payroll deposits, and employer filing basics.",
    officialResources: [
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/employment-taxes",
        label: "IRS: Employment Taxes",
        description: "IRS overview of employment tax responsibilities.",
      },
      {
        href: "https://www.irs.gov/publications/p15",
        label: "IRS Publication 15",
        description: "Employer's Tax Guide.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/depositing-and-reporting-employment-taxes",
        label: "IRS: Depositing and Reporting Employment Taxes",
        description: "IRS guidance on payroll tax deposits and reporting.",
      },
      {
        href: "https://www.eftps.gov/eftps/",
        label: "EFTPS",
        description: "Federal tax payment system for federal tax deposits and payments.",
      },
    ],
    helpfulLinks: [
      contactLink,
      { href: "/business-tax-accounting", label: "Business Tax & Accounting" },
      { href: "/bookkeeping-cleanup", label: "Bookkeeping Cleanup" },
      { href: "/tax-resolution", label: "Tax Resolution" },
      { href: "/blog/payroll-best-practices", label: "Payroll Best Practices" },
    ],
    faqs: [
      {
        question: "Can you help if my business received a payroll tax notice?",
        answer:
          "Yes. We can help review the notice, organize payroll reports and payment history, and map the next documents needed before response planning.",
      },
      {
        question: "Can you guarantee payroll tax penalties will be removed?",
        answer:
          "No. Penalty outcomes depend on facts, records, reasonable-cause documentation, filing history, and agency review.",
      },
      {
        question: "Do payroll taxes connect to business tax preparation?",
        answer:
          "Yes. Payroll wages, officer compensation, payroll taxes, benefits, and contractor payments often affect business tax records and reports.",
      },
      {
        question: "Can you help with payroll cleanup before year end?",
        answer:
          "Yes. We can help organize payroll summaries, contractor records, wage reports, and filing records before year-end forms are finalized.",
      },
    ],
    relatedServiceLabel: "Payroll tax support",
  },
  "quickbooks-bookkeeping-services": {
    slug: "quickbooks-bookkeeping-services",
    url: `${baseUrl}/quickbooks-bookkeeping-services`,
    lastModified: "2026-07-29",
    metaTitle: "QuickBooks Cleanup Katy TX | Bookkeeping | IntegraFin",
    metaDescription:
      "QuickBooks cleanup in Katy, TX for setup errors, duplicates, unreconciled accounts, bank feeds, monthly books, and tax-ready reporting. Talk to IntegraFin.",
    name: "QuickBooks Cleanup and Bookkeeping in Katy, TX",
    serviceType: "QuickBooks-specific setup, cleanup, monthly reconciliation, and reporting support",
    keywords:
      "QuickBooks cleanup Katy TX, QuickBooks bookkeeper Katy, QuickBooks reconciliation Katy, QuickBooks setup Katy",
    eyebrow: "QuickBooks Cleanup Katy TX",
    heroTitle: "QuickBooks cleanup and bookkeeping for Katy businesses",
    heroDescription:
      "IntegraFin helps business owners set up, clean up, reconcile, and maintain QuickBooks files so reports are easier to review before tax season.",
    heroBullets: [
      "QuickBooks setup, cleanup, and monthly bookkeeping",
      "Bank, card, payroll, loan, and merchant reconciliation",
      "Reports aligned with tax preparation and advisory needs",
    ],
    primaryCta: "Request QuickBooks Support",
    secondaryCta: "Call (832) 647-1819",
    hubHref: "/services#business",
    hubLabel: "View Business Services Hub",
    quickAnswerTitle: "Quick Answer: QuickBooks Bookkeeping",
    quickAnswer:
      "QuickBooks bookkeeping works best when the chart of accounts, bank feeds, rules, reconciliations, payroll records, owner activity, and reports are reviewed regularly. IntegraFin helps make the file useful for tax preparation, planning, and management decisions.",
    highlights: [
      {
        title: "QuickBooks setup",
        description:
          "Chart of accounts, bank feeds, opening balances, products or services, users, and workflow setup based on the business facts.",
      },
      {
        title: "QuickBooks cleanup",
        description:
          "Review duplicate entries, uncategorized transactions, old bank feeds, unreconciled accounts, owner activity, and report issues.",
      },
      {
        title: "Monthly bookkeeping",
        description:
          "Reconcile accounts, categorize activity, review reports, flag missing records, and prepare a tax-ready monthly rhythm.",
      },
    ],
    processTitle: "QuickBooks Bookkeeping Process",
    processDescription:
      "The process focuses on a cleaner accounting file, reconciled statements, better reports, and stronger tax-preparation support.",
    processSteps: [
      {
        title: "1. File health review",
        description:
          "We review users, bank feeds, chart of accounts, opening balances, reconciliations, reports, and prior cleanup history.",
      },
      {
        title: "2. Bank and transaction workflow",
        description:
          "Transactions, transfers, merchant deposits, payroll, loans, owner activity, and rules are reviewed for consistency.",
      },
      {
        title: "3. Reconciliation and cleanup",
        description:
          "Accounts are reconciled, duplicate or stale items are identified, and unclear transactions are documented for owner review.",
      },
      {
        title: "4. Reports and tax handoff",
        description:
          "Profit and loss, balance sheet, general ledger, payroll, contractor, and tax support reports are prepared for review.",
      },
    ],
    situationsTitle: "Common QuickBooks Situations",
    situations: [
      {
        title: "New QuickBooks setup",
        description:
          "A new business needs a practical file setup before transactions, payroll, owner draws, or contractor payments pile up.",
      },
      {
        title: "Bank feeds created a mess",
        description:
          "Rules, duplicates, transfers, and uncategorized activity made the file harder to trust.",
      },
      {
        title: "Reports do not match statements",
        description:
          "The profit and loss, balance sheet, bank balances, or old reconciliations need review before filing.",
      },
      {
        title: "Monthly bookkeeping is slipping",
        description:
          "The owner needs a consistent review rhythm so records stay useful and tax season is less rushed.",
      },
    ],
    checklistTitle: "QuickBooks Records Checklist",
    checklistIntro:
      "QuickBooks support usually starts with software access plus the external records needed to verify the accounting file.",
    checklist: [
      "QuickBooks access, accountant access, or exports",
      "Bank, credit card, loan, payroll, and merchant statements",
      "Prior reconciliation reports and current balance sheet",
      "Invoices, bills, receipts, deposits, and sales reports",
      "Payroll reports, contractor records, and year-end forms",
      "Prior tax returns, depreciation schedules, and owner activity records",
      "Open IRS, state, payroll, or sales tax notices if any exist",
    ],
    whyTitle: "Why IntegraFin For QuickBooks",
    whyChoose: [
      "QuickBooks support is connected to tax preparation and bookkeeping cleanup.",
      "Reports are reviewed for usefulness, not just data entry completion.",
      "Owner transactions, payroll records, and contractor payments are handled with tax season in mind.",
      "A monthly rhythm can keep the file cleaner after setup or cleanup.",
    ],
    officialResourcesTitle: "Official Recordkeeping Resources",
    officialResourcesIntro:
      "QuickBooks is accounting software, but tax records still need to support IRS recordkeeping expectations.",
    officialResources: [
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
        label: "IRS: Recordkeeping",
        description: "IRS overview of why business records matter.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
        label: "IRS: What Records To Keep",
        description: "IRS examples of business records to keep.",
      },
      {
        href: "https://www.irs.gov/publications/p583",
        label: "IRS Publication 583",
        description: "Starting a business and keeping records.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/business-taxes",
        label: "IRS: Business Taxes",
        description: "IRS overview of federal business tax topics.",
      },
    ],
    helpfulLinks: [
      contactLink,
      { href: "/bookkeeping-cleanup", label: "Bookkeeping Cleanup" },
      { href: "/business-tax-accounting", label: "Business Tax & Accounting" },
      { href: "/texas/katy-bookkeeping-services", label: "Bookkeeping Services Katy TX" },
      { href: "/llc-formation-tax-setup", label: "LLC Formation Tax Setup" },
    ],
    faqs: [
      {
        question: "Can you clean up a QuickBooks file before tax filing?",
        answer:
          "Yes. QuickBooks cleanup before tax filing is common when accounts are not reconciled, categories are unclear, or reports do not match statements.",
      },
      {
        question: "Can you help set up QuickBooks for a new business?",
        answer:
          "Yes. We can help plan the setup, chart of accounts, bank-feed workflow, owner transactions, and tax-ready recordkeeping process.",
      },
      {
        question: "Do you provide monthly QuickBooks bookkeeping?",
        answer:
          "Yes. Monthly support can include transaction review, reconciliation, report review, and missing-document follow-up.",
      },
      {
        question: "Is QuickBooks cleanup the same as tax preparation?",
        answer:
          "No. Cleanup prepares records and reports. Tax preparation uses those records along with filing documents and tax review.",
      },
    ],
    relatedServiceLabel: "QuickBooks bookkeeping",
  },
  "contractor-bookkeeping-services": {
    slug: "contractor-bookkeeping-services",
    url: `${baseUrl}/contractor-bookkeeping-services`,
    lastModified: "2026-07-31",
    metaTitle: "Contractor Bookkeeping Services in Texas | IntegraFin",
    metaDescription:
      "Contractor bookkeeping for Texas construction and trade businesses. Organize job-cost records, reconciliations, subcontractor payments, and tax-ready reports with IntegraFin.",
    name: "Contractor Bookkeeping Services in Texas",
    serviceType: "Bookkeeping, cleanup, reporting, and tax-ready record support for contractors and construction businesses",
    keywords:
      "contractor bookkeeping services Texas, construction bookkeeping Texas, bookkeeping for contractors, job costing bookkeeping, contractor bookkeeping Dallas",
    eyebrow: "Texas Contractor Bookkeeping",
    heroTitle: "Contractor bookkeeping for Texas construction and trade businesses",
    heroDescription:
      "IntegraFin helps contractors and trade businesses organize the records behind their jobs, vendor and subcontractor payments, reconciliations, payroll reports, and tax preparation workflow. Service is based from Katy and available remotely across Texas.",
    heroBullets: [
      "Monthly bookkeeping and cleanup for construction and trade businesses",
      "Job-cost, subcontractor-payment, and payroll-record organization",
      "Financial reports prepared for business-tax review and owner decisions",
    ],
    primaryCta: "Request contractor bookkeeping support",
    secondaryCta: "Call (832) 647-1819",
    hubHref: "/texas-tax-accounting-services",
    hubLabel: "View Texas Services Hub",
    quickAnswerTitle: "Quick Answer: Contractor Bookkeeping",
    quickAnswer:
      "Contractor bookkeeping is a regular process for reconciling accounts, organizing income and direct costs, documenting subcontractor and payroll activity, and producing reports that are useful before tax preparation or a business decision. The exact setup depends on the company's records, contracts, software, and agreed scope.",
    highlights: [
      {
        title: "Monthly books and reconciliations",
        description:
          "Review bank, card, loan, payroll, and payment activity so reports are based on reconciled source records rather than an end-of-year estimate.",
      },
      {
        title: "Job-cost record support",
        description:
          "Organize available job, vendor, labor, material, and overhead records in a consistent workflow. Job-cost detail depends on the source records and software available.",
      },
      {
        title: "Tax-ready contractor records",
        description:
          "Prepare clearer financial reports and open-item lists for business-tax preparation, subcontractor reporting, payroll review, and owner planning conversations.",
      },
    ],
    processTitle: "A Practical Contractor Bookkeeping Process",
    processDescription:
      "The first step is to understand how the contractor receives payments, tracks jobs, pays workers and vendors, and stores source records. We then define a written bookkeeping scope and a repeatable monthly workflow.",
    processSteps: [
      {
        title: "1. Records and workflow review",
        description:
          "We review the accounting file, statements, job records, invoices, bills, payroll reports, contractor payments, and prior reports available for the agreed period.",
      },
      {
        title: "2. Cleanup priorities",
        description:
          "Unreconciled accounts, unclear transfers, duplicate activity, mixed owner transactions, and missing support are identified before they carry into tax work or reporting.",
      },
      {
        title: "3. Monthly organization",
        description:
          "Accounts are reconciled, activity is reviewed against available records, and unresolved items are documented for client follow-up rather than guessed.",
      },
      {
        title: "4. Reports and next steps",
        description:
          "The engagement delivers the agreed reports and open questions. Tax returns, payroll filings, sales-tax filings, notice work, or specialized construction reporting require separate scope unless included in writing.",
      },
    ],
    situationsTitle: "Common Contractor Bookkeeping Situations",
    situations: [
      {
        title: "Job costs are hard to see",
        description:
          "Revenue, materials, labor, subcontractor payments, equipment, and overhead are recorded, but the owner cannot easily trace the available records to a job or project discussion.",
      },
      {
        title: "Books are behind before tax season",
        description:
          "Bank statements, receipts, invoices, and payment data exist, but accounts have not been reconciled and the business return cannot be prepared from reliable reports.",
      },
      {
        title: "Subcontractor and payroll records need coordination",
        description:
          "A growing trade business needs payment records, payroll reports, and bookkeeping totals organized before year-end forms or tax preparation are reviewed.",
      },
      {
        title: "Cash flow feels unclear between projects",
        description:
          "The owner needs current financial reports and a documented list of open items before making decisions about upcoming work, equipment, staffing, or estimated taxes.",
      },
    ],
    checklistTitle: "Records to Gather for a Contractor Bookkeeping Review",
    checklistIntro:
      "Bring or upload what is available. Missing records are common, particularly during cleanup; the initial review helps identify the specific documents still needed.",
    checklist: [
      "Business bank, credit-card, loan, and line-of-credit statements",
      "Accounting software access or exports and prior reconciliation reports",
      "Customer invoices, payment-processor reports, deposits, and available job records",
      "Vendor bills, receipts, material purchases, equipment records, and lease documents",
      "Subcontractor payment records and available W-9 or year-end reporting information",
      "Payroll summaries, payroll tax filings, and payroll-provider reports",
      "Prior business tax returns, entity records, and estimated-tax payment information",
      "Any IRS, Texas Comptroller, payroll, or other agency notices",
    ],
    whyTitle: "Why IntegraFin for Contractor Bookkeeping",
    whyChoose: [
      "Bookkeeping is connected to business-tax preparation and recordkeeping rather than treated as isolated data entry.",
      "The workflow starts with real source records, open questions, and an agreed scope instead of assumptions about a contractor's books.",
      "Contractor-specific items such as job records, subcontractor payments, payroll reports, and direct costs can be discussed in the same organized review.",
      "Texas businesses can work remotely with a real Katy office; IntegraFin does not claim offices in cities where it has none.",
    ],
    officialResourcesTitle: "Official Contractor and Business Recordkeeping Resources",
    officialResourcesIntro:
      "These official resources help business owners understand general recordkeeping and Texas tax-administration topics. Requirements depend on the business's facts and registrations.",
    officialResources: [
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
        label: "IRS: Small Business Recordkeeping",
        description: "IRS guidance on keeping records that support business income and expenses.",
      },
      {
        href: "https://www.irs.gov/publications/p583",
        label: "IRS Publication 583",
        description: "IRS publication on starting a business and keeping records.",
      },
      {
        href: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee",
        label: "IRS: Worker Classification",
        description: "IRS starting point for worker-classification information; classification depends on facts and law.",
      },
      {
        href: "https://comptroller.texas.gov/taxes/",
        label: "Texas Comptroller: Taxes",
        description: "Official Texas information for franchise, sales, and other state-administered taxes.",
      },
    ],
    helpfulLinks: [
      contactLink,
      { href: "/texas/dallas-contractor-bookkeeping-services", label: "Dallas Contractor Bookkeeping" },
      { href: "/texas/fort-worth-catch-up-bookkeeping", label: "Fort Worth Catch-Up Bookkeeping" },
      { href: "/quickbooks-bookkeeping-services", label: "QuickBooks Bookkeeping Services" },
      { href: "/bookkeeping-cleanup", label: "Bookkeeping Cleanup" },
      { href: "/business-tax-accounting", label: "Business Tax and Accounting" },
      { href: "/texas-tax-accounting-services", label: "Texas Tax and Accounting Services" },
    ],
    faqs: [
      {
        question: "What does contractor bookkeeping usually include?",
        answer:
          "The scope may include reconciliations, transaction organization, financial reports, cleanup, and review of available job, subcontractor, or payroll records. The final work depends on the accounting file, source records, and written engagement.",
      },
      {
        question: "Can you help organize contractor books before tax preparation?",
        answer:
          "Yes. We can assess the bookkeeping cleanup and reconciliation work needed before business-tax preparation begins. Tax preparation is a separate service unless the written scope combines it.",
      },
      {
        question: "Can you help with job-costing records?",
        answer:
          "We can review the available accounting and source records and help establish an organized workflow for the agreed reports. The detail available depends on how jobs, invoices, labor, materials, and other costs are recorded.",
      },
      {
        question: "Can you determine whether a worker is an employee or independent contractor?",
        answer:
          "We can help organize the tax and payment records involved, but worker classification depends on the facts and applicable law. Material classification questions may require qualified legal or employment advice.",
      },
      {
        question: "Do you have contractor-bookkeeping offices throughout Texas?",
        answer:
          "No. IntegraFin is based in Katy and serves Texas contractors through organized remote workflows. In-person appointments are available at the Katy office by appointment.",
      },
    ],
    relatedServiceLabel: "contractor bookkeeping",
  },
};
