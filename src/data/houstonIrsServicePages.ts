export type HoustonIrsServiceSlug =
  | "irs-notice-help"
  | "irs-payment-plan-help"
  | "unfiled-tax-return-help";

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

export type HoustonIrsServicePageData = {
  slug: HoustonIrsServiceSlug;
  path: string;
  lastReviewed: string;
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  serviceName: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  quickAnswerTitle: string;
  quickAnswer: string;
  situationsTitle: string;
  situationsIntro: string;
  situations: TextBlock[];
  firstStepsTitle: string;
  firstSteps: TextBlock[];
  supportTitle: string;
  supportIntro: string;
  supportItems: TextBlock[];
  documentsTitle: string;
  documentsIntro: string;
  documents: string[];
  processTitle: string;
  processSteps: TextBlock[];
  officialResources: LinkBlock[];
  relatedLinks: LinkBlock[];
  faqs: FaqBlock[];
};

const basePath = "/texas/houston";

export const houstonIrsServicePages: Record<HoustonIrsServiceSlug, HoustonIrsServicePageData> = {
  "irs-notice-help": {
    slug: "irs-notice-help",
    path: `${basePath}/irs-notice-help`,
    lastReviewed: "July 19, 2026",
    metaTitle: "IRS Notice Help in Houston, TX | IntegraFin",
    metaDescription:
      "Get Houston IRS notice help for balance-due letters, proposed changes, missing information, and response planning. Schedule an IntegraFin consultation.",
    primaryKeyword: "IRS notice help Houston",
    supportingKeywords: [
      "IRS letter help Houston TX",
      "CP2000 help Houston",
      "IRS tax notice accountant Houston",
      "Houston tax resolution help",
    ],
    serviceName: "IRS Notice Review and Response Support",
    eyebrow: "Houston IRS Notice Support",
    heroTitle: "IRS Notice Help in Houston, TX",
    heroDescription:
      "Received an IRS letter? IntegraFin helps Houston individuals and business owners identify the issue, organize the supporting records, and prepare a practical response plan before the stated deadline.",
    quickAnswerTitle: "What should you do after receiving an IRS notice?",
    quickAnswer:
      "Read every page, find the CP or LTR number, note the response date, and compare the notice with the filed return and payment records. Do not assume the notice is correct or incorrect before checking the underlying documents. If a response is requested, follow the instructions and address printed on the notice.",
    situationsTitle: "Houston IRS notices we can help review",
    situationsIntro:
      "The notice number and the taxpayer's records determine the next step. Common review situations include:",
    situations: [
      { title: "Balance-due notice", description: "The IRS shows unpaid tax, penalties, or interest and the taxpayer needs to reconcile the stated balance with returns and payments." },
      { title: "Proposed return change", description: "A notice such as a CP2000 proposes changes based on income or payment information that may not match the filed return." },
      { title: "Request for information", description: "The IRS asks for forms or documentation before it can finish processing a return or claim." },
      { title: "Business or payroll notice", description: "A company receives correspondence involving a business return, payroll filing, deposit, or account mismatch." },
      { title: "Identity or verification letter", description: "The taxpayer is asked to verify a return or identity through the official IRS process described in the letter." },
      { title: "Prior response not reflected", description: "Documents were previously sent, but the account or a later notice does not appear to reflect the response." },
    ],
    firstStepsTitle: "First steps before responding",
    firstSteps: [
      { title: "1. Confirm the notice", description: "Use the CP or LTR number and official IRS notice search. Be cautious with unexpected texts, emails, or payment demands." },
      { title: "2. Protect the deadline", description: "Write down the response date and preserve the original letter and envelope. Appeal or dispute rights can depend on a timely response." },
      { title: "3. Compare the records", description: "Review the cited tax year, return, transcript, payments, and supporting forms before agreeing, paying, or disputing the change." },
      { title: "4. Use the stated channel", description: "Follow the notice instructions for online upload, fax, mail, or telephone contact, and keep proof of anything submitted." },
    ],
    supportTitle: "How IntegraFin supports a notice review",
    supportIntro:
      "Our role depends on the notice and the written engagement. We begin with the letter and the records rather than promising a particular outcome.",
    supportItems: [
      { title: "Notice and deadline review", description: "Identify the issue, tax period, amount, requested action, and response date shown by the IRS." },
      { title: "Return-to-record comparison", description: "Trace the questioned amount to the filed return, information forms, payments, and bookkeeping when applicable." },
      { title: "Document organization", description: "Build a clear support file and identify missing information before a response is prepared." },
      { title: "Response planning", description: "Explain available next steps and prepare or coordinate the response included in the agreed scope." },
    ],
    documentsTitle: "Documents for an IRS notice consultation",
    documentsIntro: "Bring what you have. The initial review can identify additional records needed for the specific letter.",
    documents: [
      "Every page of the IRS notice and the original envelope, if available",
      "The filed tax return for the year or period listed",
      "W-2, 1099, K-1, brokerage, payroll, or business records connected to the issue",
      "IRS transcript or online account details, if already available",
      "Proof of tax, extension, estimated, or installment payments",
      "Copies and delivery proof for any earlier response",
    ],
    processTitle: "A careful notice-response workflow",
    processSteps: [
      { title: "Review", description: "We read the notice and confirm the issue, deadline, and records needed." },
      { title: "Reconcile", description: "We compare the IRS information with the return, payments, and source documents." },
      { title: "Prepare", description: "We organize the facts and the response or next-step recommendation covered by the engagement." },
      { title: "Track", description: "The client keeps submission proof and watches for IRS confirmation or follow-up correspondence." },
    ],
    officialResources: [
      { href: "https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter", label: "IRS: Understanding your notice or letter", description: "Search by notice number and review the official response instructions." },
      { href: "https://www.irs.gov/individuals/get-transcript", label: "IRS: Get a tax transcript", description: "Request official tax records when a return or account comparison is needed." },
      { href: "https://www.irs.gov/payments/online-account-for-individuals", label: "IRS: Online account for individuals", description: "Review balances, payments, records, and available account notices." },
    ],
    relatedLinks: [],
    faqs: [
      { question: "Should I ignore an IRS notice if I think it is wrong?", answer: "No. Read it carefully and respond by the stated date when a response is requested. A timely, documented disagreement is safer than assuming the IRS will correct the issue automatically." },
      { question: "Can IntegraFin guarantee that the notice will be removed?", answer: "No. Results depend on the notice, applicable law, IRS records, and the taxpayer's documents. We provide a fact-based review and explain the support available under the engagement." },
      { question: "Can you help with a CP2000 notice?", answer: "Yes. We can compare the proposed changes with the filed return and source documents, identify agreements or disagreements, and organize a response plan." },
      { question: "Do you have a Houston office?", answer: "No. IntegraFin serves Houston remotely from its Katy office. In-person meetings can be scheduled at 2039 N Mason Rd, Suite 604, Katy, TX 77449." },
      { question: "Should I send sensitive tax documents by ordinary email?", answer: "No. Confirm the approved document method during onboarding before sending Social Security numbers, returns, or other sensitive records." },
    ],
  },
  "irs-payment-plan-help": {
    slug: "irs-payment-plan-help",
    path: `${basePath}/irs-payment-plan-help`,
    lastReviewed: "July 19, 2026",
    metaTitle: "IRS Payment Plan Help in Houston | IntegraFin",
    metaDescription:
      "Explore IRS payment-plan help for Houston taxpayers who cannot pay in full. Review balances, filing compliance, documents, and practical next steps.",
    primaryKeyword: "IRS payment plan help Houston",
    supportingKeywords: [
      "IRS installment agreement Houston",
      "help paying IRS debt Houston",
      "Houston back tax payment plan",
      "IRS balance due help Houston",
    ],
    serviceName: "IRS Payment Plan and Balance-Due Support",
    eyebrow: "Houston IRS Payment Options",
    heroTitle: "IRS Payment Plan Help for Houston Taxpayers",
    heroDescription:
      "If you cannot pay an IRS balance in full, IntegraFin can help organize the account information, review filing compliance, and evaluate the records needed for an appropriate payment-option discussion.",
    quickAnswerTitle: "Can you arrange monthly payments with the IRS?",
    quickAnswer:
      "The IRS offers short-term and long-term payment arrangements for eligible taxpayers. The available route depends on the amount owed, taxpayer type, filing compliance, payment history, and ability to pay. Interest and applicable penalties generally continue until the balance is paid, so compare options using current IRS guidance.",
    situationsTitle: "When payment-plan support may be useful",
    situationsIntro:
      "A payment plan is not the same as eliminating a debt. The review should start with a verified balance and realistic budget.",
    situations: [
      { title: "New balance due", description: "A filed return or IRS notice shows a balance that cannot be paid in one payment." },
      { title: "Several tax periods", description: "The taxpayer needs to understand balances, filings, and payments across more than one year or form." },
      { title: "Existing plan at risk", description: "A missed payment, new unpaid tax, or unfiled return may threaten an existing installment agreement." },
      { title: "Business tax debt", description: "A business owner needs to separate company liabilities, payroll obligations, and personal tax balances before choosing next steps." },
      { title: "Unclear IRS balance", description: "Payments, credits, penalties, or prior adjustments need to be reconciled before an application is submitted." },
      { title: "Cash-flow pressure", description: "The taxpayer needs a payment amount grounded in actual household or business cash flow rather than a guess." },
    ],
    firstStepsTitle: "What to check before requesting a plan",
    firstSteps: [
      { title: "1. Confirm required returns", description: "The IRS generally requires required returns to be filed before it will consider many payment arrangements." },
      { title: "2. Verify the balance", description: "Use notices, transcripts, or an IRS account to identify the tax, penalties, interest, and periods involved." },
      { title: "3. Review current cash flow", description: "List recurring income, necessary expenses, assets, and existing debt payments using supportable numbers." },
      { title: "4. Compare current options", description: "Review official IRS eligibility, fees, payment methods, and ongoing compliance requirements before applying." },
    ],
    supportTitle: "How IntegraFin helps prepare for a payment option",
    supportIntro:
      "We do not promise IRS acceptance or a specific monthly amount. We help clients understand the account and prepare accurate information for the available process.",
    supportItems: [
      { title: "Balance and period review", description: "Organize the notices and account records showing which returns and tax periods are involved." },
      { title: "Filing-compliance check", description: "Identify required returns or current obligations that may need attention before or during the request." },
      { title: "Financial-information preparation", description: "Help assemble income, expense, asset, and liability records when the selected option requires them." },
      { title: "Option and application support", description: "Explain the relevant IRS routes and assist with the agreed application or communication workflow." },
    ],
    documentsTitle: "Payment-plan review checklist",
    documentsIntro: "Accurate account and cash-flow records make the option review more useful.",
    documents: [
      "IRS balance-due notices for every period involved",
      "Account transcripts or online account balance details",
      "Filed returns and a list of any returns still outstanding",
      "Proof of recent payments and existing agreement details",
      "Current household or business income and necessary-expense records",
      "Bank, loan, asset, payroll, and bookkeeping records when relevant",
    ],
    processTitle: "Payment-plan preparation process",
    processSteps: [
      { title: "Account review", description: "Confirm the balances, tax periods, and current notices." },
      { title: "Compliance review", description: "Identify filing or current-payment issues that could affect eligibility." },
      { title: "Option comparison", description: "Compare the official IRS routes with the taxpayer's verified ability to pay." },
      { title: "Application and follow-up", description: "Complete the agreed request method and preserve confirmation and future correspondence." },
    ],
    officialResources: [
      { href: "https://www.irs.gov/payments/payment-plans-installment-agreements", label: "IRS: Payment plans and installment agreements", description: "Review current plan types, eligibility, fees, and application methods." },
      { href: "https://www.irs.gov/taxtopics/tc202", label: "IRS Topic 202: Tax payment options", description: "Compare short-term, long-term, and other payment possibilities." },
      { href: "https://www.irs.gov/payments", label: "IRS: Payments", description: "Use official payment tools and review alternatives when full payment is not possible." },
    ],
    relatedLinks: [],
    faqs: [
      { question: "Does an IRS payment plan stop interest and penalties?", answer: "Generally, interest and applicable penalties continue until the balance is paid. Review the current IRS terms and pay as much as practical as early as possible." },
      { question: "Do I need to file missing returns before requesting a plan?", answer: "Filing compliance commonly affects eligibility. We can help identify outstanding returns and organize the order of work before a request is made." },
      { question: "Can IntegraFin guarantee approval or a low payment?", answer: "No. The IRS determines eligibility and terms using the taxpayer's facts and current procedures. We help prepare accurate information and explain the available workflow." },
      { question: "Can a Houston business request a payment plan?", answer: "Business options and application methods differ from individual routes, especially when payroll taxes are involved. The first step is to identify the taxpayer, form, periods, and current IRS instructions." },
      { question: "Where does IntegraFin meet Houston clients?", answer: "Most Houston engagements can be handled remotely. In-person appointments are available at IntegraFin's Katy office; there is no separate Houston office." },
    ],
  },
  "unfiled-tax-return-help": {
    slug: "unfiled-tax-return-help",
    path: `${basePath}/unfiled-tax-return-help`,
    lastReviewed: "July 19, 2026",
    metaTitle: "Unfiled Tax Return Help Houston, TX | IntegraFin",
    metaDescription:
      "Get help organizing and preparing past-due tax returns in Houston. Rebuild missing records, review transcripts, and plan filing and payment next steps.",
    primaryKeyword: "unfiled tax return help Houston",
    supportingKeywords: [
      "past due tax returns Houston",
      "back tax filing help Houston",
      "late tax return accountant Houston",
      "missing tax returns Houston TX",
    ],
    serviceName: "Past-Due and Unfiled Tax Return Support",
    eyebrow: "Houston Past-Due Return Support",
    heroTitle: "Unfiled Tax Return Help in Houston, TX",
    heroDescription:
      "Behind on one or more returns? IntegraFin helps Houston individuals and business owners identify missing years, reconstruct available records, prepare accurate filings, and connect any resulting balance with a practical next-step plan.",
    quickAnswerTitle: "What should you do when tax returns are unfiled?",
    quickAnswer:
      "Start by identifying every missing return and gathering the income, withholding, business, and payment records for each period. The IRS says past-due returns should be filed even when the balance cannot be paid in full. If you received a notice, use the filing instructions and address shown on that notice.",
    situationsTitle: "Common past-due filing situations",
    situationsIntro:
      "Missing returns can involve different taxpayers and records. The filing plan should reflect the actual years, entities, and notices involved.",
    situations: [
      { title: "Several individual returns missing", description: "W-2, 1099, investment, rental, or self-employment information must be organized by tax year." },
      { title: "Business books are incomplete", description: "Bank, card, payroll, sales, loan, and owner activity need reconstruction before business returns can be prepared." },
      { title: "IRS substitute return concern", description: "The taxpayer received an assessment or notice after the IRS prepared or proposed figures without the taxpayer's complete return." },
      { title: "Records are unavailable", description: "Transcripts, payer forms, bank records, and reasonable documentation must be gathered to rebuild the filing file." },
      { title: "Refund may be at risk", description: "A taxpayer expects a refund from an older year and needs to address the applicable claim deadline promptly." },
      { title: "Filing and payment problems overlap", description: "Past-due returns may create balances that require a separate payment-option review after accurate filing." },
    ],
    firstStepsTitle: "How to start catching up",
    firstSteps: [
      { title: "1. List the missing returns", description: "Separate individual, business, payroll, and information returns by form and tax period." },
      { title: "2. Gather official records", description: "Use available returns, IRS transcripts, employer or payer forms, bank statements, and bookkeeping files." },
      { title: "3. Reconstruct the books", description: "For a business, reconcile income and expenses rather than estimating categories to produce a quick return." },
      { title: "4. File in a controlled order", description: "Prepare complete returns, follow any notice-specific delivery instructions, and retain signed copies and filing proof." },
    ],
    supportTitle: "How IntegraFin helps with past-due returns",
    supportIntro:
      "We focus on accurate filing and documented records. We do not promise that late-filing penalties, balances, or enforcement activity will disappear.",
    supportItems: [
      { title: "Missing-period inventory", description: "Create a clear list of taxpayers, entities, forms, years, notices, and known deadlines." },
      { title: "Transcript and document review", description: "Compare available IRS information with client records and identify gaps or possible mismatches." },
      { title: "Bookkeeping reconstruction", description: "Organize and reconcile business activity needed to support late business or self-employment filings." },
      { title: "Return and next-step coordination", description: "Prepare the agreed returns and connect any resulting balance or notice with a separate resolution plan." },
    ],
    documentsTitle: "Records for past-due return preparation",
    documentsIntro: "Organize records by tax year. Do not combine several years into one undifferentiated folder.",
    documents: [
      "Prior filed returns and a list of missing years",
      "W-2, 1099, K-1, brokerage, retirement, and other income forms",
      "IRS wage-and-income and account transcripts, when available",
      "Bank, credit-card, loan, payroll, and bookkeeping records for businesses",
      "Estimated-tax, extension, withholding, and other payment proof",
      "IRS notices, substitute-return information, and previous correspondence",
    ],
    processTitle: "Past-due filing workflow",
    processSteps: [
      { title: "Scope the gap", description: "Identify every missing return, entity, period, and immediate deadline." },
      { title: "Build the records", description: "Collect transcripts and source documents, then reconstruct bookkeeping where required." },
      { title: "Prepare and review", description: "Prepare each return from the available facts and review open assumptions with the taxpayer." },
      { title: "File and plan", description: "Submit using the correct method, retain proof, and address any resulting balance or follow-up notice." },
    ],
    officialResources: [
      { href: "https://www.irs.gov/businesses/small-businesses-self-employed/filing-past-due-tax-returns", label: "IRS: Filing past-due tax returns", description: "Review why and how the IRS says past-due returns should be filed." },
      { href: "https://www.irs.gov/individuals/get-transcript", label: "IRS: Get a tax transcript", description: "Request wage-and-income, account, or return transcript information." },
      { href: "https://www.irs.gov/forms-instructions", label: "IRS: Forms and instructions", description: "Find official forms and instructions for the applicable tax year." },
    ],
    relatedLinks: [],
    faqs: [
      { question: "Should I file a past-due return if I cannot pay the tax?", answer: "The IRS says required past-due returns should be filed even when the balance cannot be paid in full. Filing and payment are related but distinct problems." },
      { question: "Can you prepare returns if some records are missing?", answer: "We can help identify transcripts and other available source records and assess what can be reconstructed. The return still needs supportable information; missing records are not permission to invent figures." },
      { question: "Will filing old returns remove every penalty?", answer: "No. Filing stops the return from remaining unfiled, but penalties, interest, tax balances, and relief eligibility depend on the facts and IRS rules." },
      { question: "Can you help with both business and personal missing returns?", answer: "Yes, depending on scope. We separate each taxpayer, entity, form, and period so business activity and owner returns can be coordinated without mixing the records." },
      { question: "Does IntegraFin have a Houston office?", answer: "No. Houston clients are served remotely from IntegraFin's Katy office, with in-person appointments available in Katy when useful." },
    ],
  },
};

const clusterLinks: LinkBlock[] = [
  { href: `${basePath}/irs-notice-help`, label: "Houston IRS Notice Help" },
  { href: `${basePath}/irs-payment-plan-help`, label: "Houston IRS Payment Plan Help" },
  { href: `${basePath}/unfiled-tax-return-help`, label: "Houston Unfiled Tax Return Help" },
  { href: "/tax-resolution", label: "Tax Resolution Services" },
  { href: "/texas/houston-tax-accountant", label: "Houston Tax and Accounting Hub" },
  { href: "/contact", label: "Schedule a Consultation" },
];

Object.values(houstonIrsServicePages).forEach((page) => {
  page.relatedLinks = clusterLinks.filter((link) => link.href !== page.path);
});

export const houstonIrsServicePageList = Object.values(houstonIrsServicePages);

export function isHoustonIrsServiceSlug(value: string): value is HoustonIrsServiceSlug {
  return value in houstonIrsServicePages;
}
