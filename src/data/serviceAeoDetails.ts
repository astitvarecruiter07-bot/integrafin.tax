import type { ServiceLandingPageSlug } from "@/data/serviceLandingPages";

export type ServiceAeoDetails = {
  whoThisAppliesTo: string;
  included: readonly string[];
  notIncluded: readonly string[];
  timingAndDeadlines: readonly string[];
  pricingFactors: readonly string[];
  limitations: readonly string[];
  published: string;
  lastReviewed: string;
};

export const serviceAeoDetails: Record<ServiceLandingPageSlug, ServiceAeoDetails> = {
  "small-business-bookkeeping-services": {
    whoThisAppliesTo:
      "Owner-managed companies, LLCs, S corporations, partnerships, sole proprietors, consultants, practices, retailers, restaurants, contractors, and other small businesses that need current monthly records and a documented reporting process.",
    included: [
      "Review of the accounting file, agreed accounts, reporting needs, record condition, and monthly close responsibilities",
      "Recurring transaction organization, reconciliations, balance review, financial reports, and open-item documentation within the written scope",
      "Coordination of available owner, payroll, contractor, and tax-ready records without assuming separate filings are included",
    ],
    notIncluded: [
      "Historical cleanup, tax returns, payroll processing, notices, corrections, or advisory projects unless included in writing",
      "Audits, reviews, attestations, valuations, fraud examinations, legal advice, or assurance that records are complete",
      "Guaranteed deadlines, tax savings, financing, business results, or accuracy when source records are incomplete",
    ],
    timingAndDeadlines: [
      "Monthly close timing depends on when complete statements, reports, source documents, and client answers are received.",
      "Behind periods may require cleanup before recurring bookkeeping can start from reliable opening balances.",
      "Tax, payroll, lending, and agency deadlines should be identified during intake because each may require a separate scope and timetable.",
    ],
    pricingFactors: [
      "Number of entities, accounts, payment systems, months, transactions, and reporting requirements",
      "Condition of the accounting file, reconciliations, opening balances, integrations, owner activity, and supporting records",
      "Cleanup, payroll, tax preparation, notices, multi-state work, or expedited deliverables outside monthly bookkeeping",
    ],
    limitations: [
      "Reports are prepared from the records supplied; unsupported items are documented rather than treated as verified business activity.",
      "Bookkeeping organizes financial records but does not provide an audit opinion or guarantee any tax, lending, or operating outcome.",
    ],
    published: "August 1, 2026",
    lastReviewed: "August 1, 2026",
  },
  "business-tax-accounting": {
    whoThisAppliesTo:
      "Katy LLCs, S corporations, partnerships, sole proprietors, contractors, consultants, practices, retailers, and other owner-managed businesses that need tax work connected to reliable books and payroll records.",
    included: [
      "Business return-preparation workflow and filing-document organization",
      "Bookkeeping, owner-activity, payroll-record, and tax-payment review",
      "Entity and year-round planning questions supported by the available facts",
    ],
    notIncluded: [
      "Legal advice, entity documents, audits, reviews, attestations, or assurance work",
      "Guaranteed tax savings, refunds, filing acceptance, or agency outcomes",
      "Notice representation or cleanup projects unless included in the written engagement",
    ],
    timingAndDeadlines: [
      "Start before filing season when books, payroll, ownership, or prior returns need review.",
      "Extension and estimated-payment deadlines are separate from the final return deadline.",
      "The engagement timeline depends on record completeness, entity complexity, open questions, and agency deadlines.",
    ],
    pricingFactors: [
      "Entity type, number of owners, states, schedules, and open tax years",
      "Bookkeeping condition, payroll and contractor records, assets, loans, and owner activity",
      "Planning, cleanup, notice, amendment, or expedited work outside the core filing scope",
    ],
    limitations: [
      "Tax treatment depends on complete facts, records, current law, eligibility, and timely client decisions.",
      "Legal formation, contracts, and ownership disputes require qualified legal counsel.",
    ],
    published: "June 30, 2026",
    lastReviewed: "July 29, 2026",
  },
  "individual-tax-preparation": {
    whoThisAppliesTo:
      "Katy-area W-2 employees, families, 1099 workers, investors, rental owners, retirees, and taxpayers with Texas residency or multi-state filing questions.",
    included: [
      "Income-form, filing-status, dependent, deduction, credit, and payment review",
      "Personal return preparation based on the documents and facts provided",
      "Filing handoff and practical next-year withholding or estimated-payment notes",
    ],
    notIncluded: [
      "Legal, investment, estate-planning, valuation, or immigration advice",
      "Missing business bookkeeping, amended returns, notices, or representation unless separately scoped",
      "Guaranteed refunds, credits, deductions, processing time, or agency acceptance",
    ],
    timingAndDeadlines: [
      "Begin after expected tax forms arrive and before the applicable filing or extension deadline.",
      "An extension generally extends filing time, not the deadline to pay an expected balance.",
      "Late, corrected, missing, foreign, rental, or multi-state documents can change the preparation timeline.",
    ],
    pricingFactors: [
      "Number and type of W-2, 1099, K-1, brokerage, rental, retirement, and business schedules",
      "States involved, prior-year carryovers, dependents, credits, and record condition",
      "Amendments, notices, bookkeeping, research, or expedited work outside the initial return scope",
    ],
    limitations: [
      "The final return depends on complete documents, eligibility, taxpayer representations, and current law.",
      "Refund timing, identity verification, offsets, examinations, and agency processing are outside IntegraFin's control.",
    ],
    published: "June 30, 2026",
    lastReviewed: "July 29, 2026",
  },
  "tax-resolution": {
    whoThisAppliesTo:
      "Katy individuals and businesses with back-tax balances, unfiled returns, payment problems, penalties, audits, payroll-tax issues, or unresolved federal or state compliance matters.",
    included: [
      "Transcript, return, notice, payment-history, balance, and filing-status review",
      "Document organization and fact-based mapping of potentially relevant procedures",
      "Missing-return, payment-plan, penalty, audit, or payroll-tax workflow when agreed in writing",
    ],
    notIncluded: [
      "Guaranteed settlements, penalty removal, levy release, payment terms, or agency approval",
      "Legal representation, litigation, or communications beyond available authorization and written scope",
      "A standalone CP14, CP2000, or Letter 12C triage project when the dedicated notice service is more appropriate",
    ],
    timingAndDeadlines: [
      "Read every notice promptly and preserve the response, appeal, collection, or document deadline shown.",
      "Missing returns may need to be filed before some payment or resolution procedures can be considered.",
      "Timing depends on filing compliance, transcripts, record availability, authorization, and IRS or state processing.",
    ],
    pricingFactors: [
      "Number of tax years, entities, agencies, notices, balances, and missing returns",
      "Transcript work, bookkeeping reconstruction, payroll records, financial disclosures, and correspondence",
      "Representation needs, deadlines, appeals, follow-up, and work outside the initial assessment",
    ],
    limitations: [
      "Available options and outcomes depend on eligibility, financial facts, documentation, law, authorization, and agency review.",
      "Do not ignore a notice or assume that contacting a preparer pauses an official deadline.",
    ],
    published: "June 30, 2026",
    lastReviewed: "July 29, 2026",
  },
  "bookkeeping-cleanup": {
    whoThisAppliesTo:
      "Businesses with months or years of behind books, unreconciled accounts, duplicate or uncategorized activity, mixed owner transactions, or reports that cannot yet support tax preparation.",
    included: [
      "Accounting-file, statement, feed, chart-of-accounts, and prior-report review",
      "Catch-up categorization, reconciliation repair, owner-activity separation, and open-item documentation",
      "Cleaner reports and a practical monthly workflow after the agreed cleanup period",
    ],
    notIncluded: [
      "Audits, reviews, attestations, fraud examinations, valuations, or assurance that records are complete",
      "Tax returns, payroll filings, notice responses, or legal work unless separately engaged",
      "Inventing missing support or treating unsupported transactions as verified business expenses",
    ],
    timingAndDeadlines: [
      "Start before a tax, lending, notice, or management deadline leaves no time to resolve open records.",
      "Cleanup time depends on months involved, account count, statement access, transaction volume, and owner responses.",
      "A target date is confirmed only after the file and available source records are reviewed.",
    ],
    pricingFactors: [
      "Months or years behind, transaction volume, number of bank, card, loan, payroll, and merchant accounts",
      "Condition of reconciliations, feeds, opening balances, owner activity, and supporting documents",
      "Tax-preparation, QuickBooks-specific, notice, payroll, or rush work outside the cleanup scope",
    ],
    limitations: [
      "Reports are limited by the records supplied and unresolved items are documented rather than guessed.",
      "Cleanup improves record reliability but does not provide an audit opinion or guarantee a tax outcome.",
    ],
    published: "June 30, 2026",
    lastReviewed: "July 29, 2026",
  },
  "payroll-tax-support": {
    whoThisAppliesTo:
      "Employers that need wage, deposit, quarterly filing, year-end form, contractor, payroll-provider, or payroll-notice records organized and connected to the business books.",
    included: [
      "Payroll report, deposit, filing, wage, contractor, and notice record review",
      "Reconciliation of payroll totals to available bookkeeping and business-tax records",
      "Deadline and document workflow for agreed employer filing or notice-support tasks",
    ],
    notIncluded: [
      "Employment-law, benefits-law, worker-classification legal opinions, or HR advice",
      "Payroll processing or agency representation unless expressly included and authorized",
      "Guaranteed penalty relief, deposit correction, filing acceptance, or agency outcome",
    ],
    timingAndDeadlines: [
      "Payroll deposits and quarterly or annual forms can have different federal and state due dates.",
      "Start before quarter-end or year-end when payroll totals, worker records, or provider reports do not agree.",
      "For a notice, follow the response date printed on the letter while the records and available assistance are reviewed.",
    ],
    pricingFactors: [
      "Number of employees, contractors, states, quarters, entities, payroll systems, and notices",
      "Condition of deposits, filings, wage reports, books, and provider records",
      "Corrections, correspondence, amended forms, representation, or urgent work outside routine support",
    ],
    limitations: [
      "Employer obligations depend on worker facts, jurisdiction, filing frequency, and current law.",
      "When classification or employment-law questions are material, qualified legal advice may be required.",
    ],
    published: "June 30, 2026",
    lastReviewed: "July 29, 2026",
  },
  "quickbooks-bookkeeping-services": {
    whoThisAppliesTo:
      "Katy businesses using QuickBooks that need file setup, bank-feed repair, duplicate cleanup, reconciliation, reporting, or an ongoing monthly bookkeeping rhythm.",
    included: [
      "QuickBooks chart, feed, rules, opening-balance, user, transaction, and report review",
      "Agreed setup, cleanup, categorization, reconciliation, and open-item documentation",
      "Monthly reports and tax-preparation handoff based on the maintained file",
    ],
    notIncluded: [
      "Independent audit, review, attestation, fraud examination, or assurance over the file",
      "Tax filing, payroll processing, app subscriptions, migrations, or historical reconstruction unless separately scoped",
      "Automatic acceptance of bank-feed rules or unsupported classifications without owner input",
    ],
    timingAndDeadlines: [
      "Begin setup before activity accumulates and cleanup before tax, lending, or management deadlines.",
      "Timing depends on file access, months involved, transaction volume, account count, and owner responses.",
      "Monthly close timing is agreed after the record-delivery workflow and open questions are understood.",
    ],
    pricingFactors: [
      "QuickBooks product, file condition, users, feeds, accounts, classes, locations, and connected applications",
      "Months behind, transaction volume, reconciliation history, payroll, inventory, loans, and owner activity",
      "Migration, tax, payroll, notice, training, or expedited work outside the bookkeeping scope",
    ],
    limitations: [
      "QuickBooks is the software context, not proof that every imported or categorized transaction is correct.",
      "Results depend on source documents, owner responses, file access, and the agreed cleanup or monthly scope.",
    ],
    published: "June 30, 2026",
    lastReviewed: "July 29, 2026",
  },
  "contractor-bookkeeping-services": {
    whoThisAppliesTo:
      "Texas general contractors, remodelers, electricians, plumbers, HVAC businesses, roofers, landscapers, painters, concrete companies, and subcontractor-heavy trade businesses that need cleaner books and organized records for operations or tax preparation.",
    included: [
      "Review of the agreed accounting file, statements, available job records, vendor and subcontractor payments, payroll reports, and prior reports",
      "Agreed reconciliation, transaction organization, cleanup, open-item documentation, and financial-report preparation",
      "A practical bookkeeping workflow for the agreed period and recurring process, based on available records",
    ],
    notIncluded: [
      "Tax returns, payroll processing or filings, sales-tax filings, notice response, specialized construction software implementation, or representation unless included in writing",
      "Legal worker-classification advice, contract review, lien advice, audits, reviews, attestations, valuations, or assurance services",
      "Guaranteed job profitability, tax savings, financing, agency outcomes, or reports supported by missing or unverifiable records",
    ],
    timingAndDeadlines: [
      "Begin cleanup before business-tax, payroll, 1099, lender, or agency deadlines leave too little time to investigate open items.",
      "Monthly close timing depends on when complete statements, payroll reports, invoices, job records, and client responses are available.",
      "Official agency deadlines continue to apply while records are being organized; do not assume bookkeeping support extends a filing or notice date.",
    ],
    pricingFactors: [
      "Number of entities, accounts, months, transactions, jobs, payment systems, payroll providers, and available source records",
      "Condition of reconciliations, accounting file, job documentation, owner activity, subcontractor records, and open balances",
      "Cleanup, tax, payroll, sales-tax, notice, software, or expedited work outside the recurring bookkeeping scope",
    ],
    limitations: [
      "Reports and job-cost information depend on the records supplied and the agreed method of organizing them; unresolved items are documented rather than guessed.",
      "Contractor bookkeeping is not an audit, review, attestation, legal opinion, or guarantee of a tax or business outcome.",
    ],
    published: "July 31, 2026",
    lastReviewed: "July 31, 2026",
  },
};
