export type CityResource = {
  href: string;
  label: string;
  description: string;
};

export type CityFaq = {
  question: string;
  answer: string;
};

export type TexasCityLandingData = {
  slug: string;
  city: string;
  county: string;
  primaryService: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  title: string;
  description: string;
  hero: string;
  intro: string[];
  localExpertise: string[];
  industries: string[];
  serviceDetails: { title: string; description: string }[];
  scenarios: string[];
  resourceIntro: string;
  resources: CityResource[];
  nearby: string[];
  serviceAreaNote: string;
  faq: CityFaq[];
};

const sharedResources: CityResource[] = [
  {
    href: "https://gov.texas.gov/business/page/small-business",
    label: "Texas Small Business Resources",
    description: "State programs and starting points for Texas entrepreneurs and growing employers.",
  },
  {
    href: "https://comptroller.texas.gov/taxes/",
    label: "Texas Comptroller Tax Resources",
    description: "Official information about Texas franchise, sales and other state-administered taxes.",
  },
  {
    href: "https://www.irs.gov/businesses/small-businesses-self-employed",
    label: "IRS Small Business and Self-Employed",
    description: "Federal filing, recordkeeping and payment guidance directly from the IRS.",
  },
];

const serviceDetails = (city: string, emphasis: "tax" | "bookkeeping" | "business") => [
  {
    title: emphasis === "bookkeeping" ? `Monthly bookkeeping in ${city}` : `Tax preparation in ${city}`,
    description:
      emphasis === "bookkeeping"
        ? `We reconcile accounts, classify activity, review open questions and produce reports that make the books easier to use. The goal is a repeatable monthly close, not a once-a-year scramble before a return is prepared.`
        : `We organize the records needed for individual and business returns, identify missing information early and prepare filing work around the facts of the engagement. Recommendations depend on entity type, activity and current law; no result or refund is promised.`,
  },
  {
    title: `Small-business accounting for ${city} owners`,
    description: `A useful accounting system should show what the business earned, what it spent, what it owes and which questions need attention. We help owners improve the chart of accounts, reconciliations and financial-reporting rhythm so decisions rest on cleaner records.`,
  },
  {
    title: emphasis === "business" ? "Entity and year-round tax planning" : "Business tax and estimated-tax planning",
    description: `Planning starts with current books and realistic projections. We can review entity activity, owner payments and upcoming filing needs, then explain possible actions in plain English. Eligibility and tax treatment always depend on the taxpayer's specific facts.`,
  },
  {
    title: "Payroll-record and reporting support",
    description: `For employers, we help reconcile payroll reports to the general ledger and organize the records used for federal and state filings. We do not treat payroll as a disconnected system; wages, taxes, contractor payments and books should tell the same story.`,
  },
  {
    title: "IRS notice review and response preparation",
    description: `An IRS letter should be read carefully before anyone pays, amends a return or sends documents. We help identify the notice type, response date and records involved, then prepare a fact-based next-step plan. IntegraFin is an independent tax and accounting firm and is not affiliated with the IRS.`,
  },
  {
    title: "Texas franchise and sales-tax workflow",
    description: `Texas has no individual state income tax, but businesses may still have franchise-tax, sales-tax, payroll and federal obligations. We help clients organize the relevant records and determine which questions should be addressed for their situation without suggesting that every tax applies to every business.`,
  },
];

export const texasCityPages: TexasCityLandingData[] = [
  {
    slug: "katy-tax-accountant",
    city: "Katy",
    county: "Harris, Fort Bend and Waller counties",
    primaryService: "Tax Accountant",
    primaryKeyword: "tax accountant Katy TX",
    supportingKeywords: ["tax preparation Katy TX", "business tax accountant Katy TX", "small business accounting Katy", "IRS tax help Katy TX"],
    title: "Tax Accountant in Katy, TX for Businesses | IntegraFin",
    description: "Katy tax accountant for business tax, bookkeeping, payroll records and IRS notice help. Visit our Mason Road office or schedule a consultation.",
    hero: "Local tax preparation, bookkeeping and IRS notice support from IntegraFin's Katy office for business owners, self-employed professionals and families.",
    intro: [
      "Katy sits across Harris, Fort Bend and Waller counties, so local businesses often operate across more than one taxing and permitting jurisdiction. A contractor may work throughout west Houston, a retailer may sell in person and online, and a consultant may serve clients nationwide from a Katy home office. Those differences affect records and questions even when the federal filing rules are the same.",
      "IntegraFin is based at 2039 N Mason Rd, Suite 604, Katy, TX 77449. Our tax accountant services in Katy combine organized return preparation with bookkeeping, payroll-record support and notice response planning. Clients can meet by appointment or use a secure remote workflow when that is more practical.",
      "We begin with the records and the actual issue. That may mean reconciling accounts before a business return, reviewing estimated-tax payments, separating owner and business activity, or reading an IRS notice line by line. We explain options without promising a refund, tax reduction or resolution outcome.",
    ],
    localExpertise: [
      "Katy's mix of established neighborhoods, new development, medical practices, construction trades and owner-operated service companies creates very different accounting needs. Local context helps us ask better intake questions: where work occurs, how sales are collected, whether workers are employees or contractors, and which books or payroll systems hold the source data.",
      "Local service also means continuity. The same records used for monthly reporting should support year-end filing and any later response to an agency notice. Keeping that chain organized reduces avoidable rework and gives the owner a clearer view of cash, obligations and upcoming decisions.",
    ],
    industries: ["professional and consulting firms", "construction and home-service companies", "healthcare and wellness practices", "restaurants, retail and e-commerce sellers", "real-estate professionals and independent contractors"],
    serviceDetails: serviceDetails("Katy", "tax"),
    scenarios: [
      "A Katy LLC has mixed personal and business transactions and needs a clean separation before return preparation begins.",
      "A growing home-service company wants monthly reconciliations and payroll reports aligned before adding more employees.",
      "A self-employed professional needs help organizing income, expenses and estimated payments for a year-round planning discussion.",
      "A family receives an IRS notice and wants the return, notice and supporting records reviewed before responding.",
      "A retailer needs its bookkeeping to distinguish sales, sales tax collected, refunds, processor fees and deposits.",
    ],
    resourceIntro: "Katy owners can pair professional tax help with official local and state business resources. These links are provided for general information; each organization controls its own programs and requirements.",
    resources: [
      { href: "https://www.katyedc.org/", label: "Katy Area Economic Development Council", description: "Economic-development and business information for the Katy area." },
      { href: "https://www.katychamber.com/", label: "Katy Area Chamber of Commerce", description: "Local networking, events and member resources for area businesses." },
      ...sharedResources,
    ],
    nearby: ["Fulshear", "Richmond", "Sugar Land", "Cypress", "Houston", "Brookshire"],
    serviceAreaNote: "Katy is IntegraFin's physical office location. Meetings are available by appointment, and secure virtual service is available for clients who prefer not to travel.",
    faq: [
      { question: "Where is IntegraFin's Katy office?", answer: "IntegraFin is located at 2039 N Mason Rd, Suite 604, Katy, TX 77449. Schedule an appointment before visiting so the right team member and document list are ready." },
      { question: "Do you provide year-round accounting or only tax preparation?", answer: "Both. Engagements may include recurring bookkeeping, payroll-record review, tax planning, return preparation and IRS notice support, depending on the client's needs." },
      { question: "Can you guarantee a refund or lower tax bill?", answer: "No. Tax results depend on complete records, applicable law and the taxpayer's facts. We focus on accurate preparation, documented positions and lawful planning rather than guaranteed outcomes." },
      { question: "Can you help a new Katy business choose an entity?", answer: "We can discuss tax and recordkeeping considerations and coordinate with legal counsel when legal formation advice is needed. The right choice depends on ownership, operations, risk and expected income." },
      { question: "What should I bring to a first tax meeting?", answer: "Bring prior returns, current bookkeeping reports, income documents, estimated-payment records, entity documents and any IRS or Texas notices. We will tailor the final request list after the initial review." },
      { question: "Can you review an IRS notice received by a Katy resident?", answer: "Yes. We can review the letter and related return, identify the stated response date and help organize a response plan. Representation availability depends on the engagement and notice." },
    ],
  },
  {
    slug: "houston-tax-accountant",
    city: "Houston",
    county: "Harris County and the Greater Houston area",
    primaryService: "Small Business Tax & Accounting",
    primaryKeyword: "Houston small business accounting",
    supportingKeywords: ["tax accountant Houston", "bookkeeping cleanup Houston", "business tax preparation Houston", "IRS notice help Houston"],
    title: "Houston Small Business Tax & Accounting | IntegraFin",
    description: "Houston small business accounting, tax preparation, bookkeeping cleanup and IRS notice support from IntegraFin. Schedule a secure consultation.",
    hero: "Practical accounting and tax support for Houston companies that need cleaner books, coordinated filing records and a reliable year-round process.",
    intro: [
      "Houston's economy ranges from energy and logistics to healthcare, construction, restaurants and professional services. That scale creates opportunity, but it also creates accounting complexity: project revenue, multiple payment systems, contractor reporting, payroll activity and business travel can all land in the same books.",
      "IntegraFin helps Houston small businesses convert that activity into an organized accounting and tax workflow. We serve Houston from our Katy office through secure document exchange and virtual meetings. We do not claim a separate Houston office, and clients who want an in-person appointment can schedule one in Katy.",
      "Our work starts with clarity rather than a sales promise. We identify what is reconciled, what is missing, which deadlines matter and what decisions require current numbers. Tax preparation, planning and notice support are based on the client's records and applicable rules; outcomes are never guaranteed.",
    ],
    localExpertise: [
      "A Houston company's accounting should reflect how it actually earns money. Project-based firms need job and subcontractor visibility. Medical and professional practices need consistent revenue and expense classification. Retail and food businesses need deposits, processor fees, refunds and sales-tax records to reconcile.",
      "Understanding the operating pattern makes the tax work more reliable. Instead of waiting until filing season to discover gaps, a year-round process can surface unreconciled accounts, missing payroll entries and unusual transactions while the facts are still easier to retrieve.",
    ],
    industries: ["energy and industrial service providers", "logistics, transportation and distribution businesses", "medical and professional practices", "construction contractors and trades", "restaurants, retailers and online sellers"],
    serviceDetails: serviceDetails("Houston", "business"),
    scenarios: [
      "A project-based Houston company needs job costs and contractor payments organized before business return preparation.",
      "A practice with several payment channels wants deposits, fees and refunds reconciled to its operating accounts.",
      "An owner has outgrown spreadsheet bookkeeping and needs an accountable monthly close with clear open questions.",
      "A company receives a federal notice involving payroll or business-return information and needs the source records assembled.",
      "A multichannel seller needs books that distinguish gross sales, returns, sales tax, shipping and payment-processor fees.",
    ],
    resourceIntro: "Houston has a broad network of public and nonprofit business-support organizations. Use these official starting points to confirm current programs, licensing information and events.",
    resources: [
      { href: "https://www.houstontx.gov/obo/", label: "City of Houston Office of Business Opportunity", description: "City resources for businesses, vendors and entrepreneurs." },
      { href: "https://www.sbdc.uh.edu/sbdc/", label: "University of Houston Texas Gulf Coast SBDC", description: "Advising and training resources for Gulf Coast small businesses." },
      ...sharedResources,
    ],
    nearby: ["Katy", "Sugar Land", "Cypress", "Spring", "The Woodlands", "Missouri City"],
    serviceAreaNote: "IntegraFin serves Houston remotely from its Katy office. We do not list or represent a separate Houston location. In-person meetings can be scheduled at the Katy address.",
    faq: [
      { question: "Does IntegraFin have a Houston office?", answer: "No. IntegraFin's office is in Katy. Houston clients are served through secure remote workflows, with Katy appointments available when an in-person meeting is useful." },
      { question: "Can you clean up books before preparing a Houston business return?", answer: "Yes. We can scope reconciliations and bookkeeping cleanup before tax preparation. The required work depends on the condition of the records and the number of accounts and periods involved." },
      { question: "Do you work with Houston contractors and project-based firms?", answer: "Yes. We help organize revenue, direct costs, subcontractor activity, payroll records and overhead so the books better support filing and management decisions." },
      { question: "Can you advise whether a worker is an employee or contractor?", answer: "We can review tax-record and reporting implications, but classification depends on the facts and applicable law. Complex situations may also require employment-law advice." },
      { question: "Can you represent every client before the IRS?", answer: "Representation depends on the matter, professional authorization and the agreed scope. We first review the notice and explain what assistance is available; no resolution is guaranteed." },
      { question: "How does remote accounting work for Houston clients?", answer: "Clients share records through a secure process, meet virtually and receive organized questions and deliverables. Sensitive tax documents should not be sent through ordinary unsecured email." },
    ],
  },
  {
    slug: "sugar-land-small-business-accountant",
    city: "Sugar Land",
    county: "Fort Bend County",
    primaryService: "Small Business Accountant",
    primaryKeyword: "small business accountant Sugar Land TX",
    supportingKeywords: ["bookkeeping services Sugar Land TX", "business tax preparation Sugar Land", "tax planning Sugar Land", "tax accountant near Sugar Land"],
    title: "Small Business Accountant in Sugar Land, TX | IntegraFin",
    description: "Sugar Land small business accounting, bookkeeping, business tax preparation and IRS notice support. Get a practical plan from nearby IntegraFin.",
    hero: "Accounting, bookkeeping and tax support for Sugar Land owners who want reliable reports, organized filings and fewer year-end surprises.",
    intro: [
      "Sugar Land combines corporate employment centers with a large base of independent practices, consultants, retailers and family-owned companies. Many owners manage sophisticated operations but still rely on bookkeeping that was designed for a much smaller business. As transaction volume grows, unclear categories and unreconciled balances become harder to correct at year end.",
      "IntegraFin provides small-business accounting in Sugar Land from our nearby Katy office. The service can include monthly bookkeeping, cleanup, tax preparation, payroll-record review and IRS notice support. Secure remote collaboration keeps the workflow practical without suggesting that IntegraFin maintains a Sugar Land office.",
      "Good accounting is not simply data entry. It is a documented process for closing the books, resolving questions and preserving support for filings. We help owners understand what their reports do and do not show, then plan next steps around actual numbers instead of broad tax-saving promises.",
    ],
    localExpertise: [
      "Sugar Land businesses often serve clients across Fort Bend County and the Houston region. That can mean multiple revenue streams, business vehicles, home-office questions, professional subscriptions, owner reimbursements and employees working at different sites. Capturing the facts consistently is more useful than adding a city name to a generic checklist.",
      "Nearby support also makes it easier to connect bookkeeping with tax preparation. When the books, payroll reports and returns are reviewed as parts of one system, discrepancies can be investigated before they create a filing delay or a confusing response to an agency question.",
    ],
    industries: ["medical, dental and wellness practices", "engineering, technology and consulting firms", "real-estate and property-service businesses", "retail, hospitality and e-commerce companies", "professional and family-owned service firms"],
    serviceDetails: serviceDetails("Sugar Land", "business"),
    scenarios: [
      "A professional practice needs monthly financial statements that separate owner activity from operating expenses.",
      "A Sugar Land retailer needs processor deposits and sales-tax records reconciled across online and in-store systems.",
      "A consultant with growing subcontractor costs needs cleaner vendor records and year-end reporting support.",
      "A family-owned company wants current books before discussing an equipment purchase or owner compensation change.",
      "An individual receives an IRS matching notice and needs the cited documents compared with the filed return.",
    ],
    resourceIntro: "Sugar Land and Fort Bend entrepreneurs can consult these official organizations for local development, advising and state tax information. Program eligibility and availability should be confirmed directly.",
    resources: [
      { href: "https://sugarlandecodev.com/", label: "Sugar Land Economic Development", description: "City economic-development information and business resources." },
      { href: "https://www.fortbendchamber.com/", label: "Fort Bend Chamber of Commerce", description: "Countywide business programs, events and advocacy." },
      ...sharedResources,
    ],
    nearby: ["Missouri City", "Richmond", "Rosenberg", "Katy", "Fulshear", "Houston"],
    serviceAreaNote: "IntegraFin's office is in Katy, not Sugar Land. Sugar Land clients can work securely online or schedule an appointment at 2039 N Mason Rd, Suite 604, Katy, TX 77449.",
    faq: [
      { question: "Can a nearby Katy accountant support a Sugar Land company?", answer: "Yes. IntegraFin serves Sugar Land businesses through secure virtual workflows and scheduled appointments at its Katy office." },
      { question: "What does monthly bookkeeping include?", answer: "Scope may include transaction classification, bank and credit-card reconciliations, review questions and financial reports. Payroll, sales-tax and cleanup work are scoped according to the engagement." },
      { question: "Can you help an S corporation with owner payroll questions?", answer: "We can review the accounting and tax context and coordinate records with the payroll process. Specific compensation decisions depend on facts and current rules and may require additional professional advice." },
      { question: "Do you promise tax savings for Sugar Land businesses?", answer: "No. We identify lawful planning questions and explain potential choices, but savings depend on facts, eligibility, timing and complete records. No outcome is guaranteed." },
      { question: "Can you help if several months of bookkeeping are behind?", answer: "Yes. We can assess the accounts and periods involved, propose a cleanup scope and identify documents needed before current monthly work begins." },
      { question: "Do you handle IRS notices for individuals as well as companies?", answer: "We can review notices for both, subject to scope and professional authorization. The first step is to compare the letter with the relevant return and supporting records." },
    ],
  },
  {
    slug: "cypress-bookkeeping-services",
    city: "Cypress",
    county: "northwest Harris County",
    primaryService: "Bookkeeping Services",
    primaryKeyword: "bookkeeping services Cypress TX",
    supportingKeywords: ["small business accountant Cypress TX", "tax accountant Cypress", "bookkeeping cleanup Cypress", "payroll accounting Cypress TX"],
    title: "Cypress Bookkeeping Services for Business | IntegraFin",
    description: "Cypress bookkeeping services for reconciliations, cleanup, tax-ready reports and small-business accounting. Schedule a consultation with IntegraFin.",
    hero: "Monthly bookkeeping and cleanup for Cypress businesses that need dependable numbers before payroll, tax filing and growth decisions.",
    intro: [
      "Cypress has grown into a major northwest Houston business and residential market, with contractors, clinics, restaurants, retailers and professional firms serving a wide surrounding area. Owners often start with simple bookkeeping, then add cards, loans, payroll and payment platforms faster than the accounting process can absorb them.",
      "IntegraFin's bookkeeping services for Cypress focus on reconciliation and review. We trace deposits and expenses to source activity, identify open questions and build reports that can support both tax preparation and day-to-day decisions. Service is provided securely from our Katy office; IntegraFin does not claim a Cypress location.",
      "The purpose is not to make every month look perfect. It is to create an honest, repeatable close that shows unresolved items and documents how they were handled. That discipline is especially important when a return, lender request or IRS letter later depends on the same records.",
    ],
    localExpertise: [
      "Cypress service businesses often combine field work, mobile purchasing, online invoices and subcontractor payments. Without a consistent receipt and coding process, the owner may see cash leave the bank but still lack useful job or category information. A local-industry lens helps shape a workflow employees can actually follow.",
      "Bookkeeping also needs boundaries. We explain which tasks are included, what requires owner input and where payroll, legal or investment questions need another specialist. That is more trustworthy than presenting bookkeeping as a cure for every financial problem.",
    ],
    industries: ["construction trades and home-service teams", "medical, dental and wellness offices", "restaurants, shops and e-commerce sellers", "real-estate agents and property services", "consultants, agencies and technology providers"],
    serviceDetails: serviceDetails("Cypress", "bookkeeping"),
    scenarios: [
      "A Cypress contractor has months of bank activity but incomplete job and subcontractor detail before filing season.",
      "A clinic needs merchant deposits, patient-payment activity and operating expenses reconciled each month.",
      "A retailer wants reports that separate sales, refunds, discounts, fees and sales tax collected.",
      "A growing employer needs payroll reports tied to the books before quarterly and annual reconciliation.",
      "An owner wants a clean handoff from catch-up work into a dependable monthly bookkeeping calendar.",
    ],
    resourceIntro: "Cypress businesses can use county-area and state resources alongside their professional accounting team. Confirm memberships, events and program terms with each organization.",
    resources: [
      { href: "https://www.cyfairchamber.com/", label: "Cy-Fair Houston Chamber of Commerce", description: "Business networking and community resources serving the Cy-Fair area." },
      { href: "https://www.sbdc.uh.edu/sbdc/", label: "University of Houston Texas Gulf Coast SBDC", description: "Small-business advising and training for the wider Houston region." },
      ...sharedResources,
    ],
    nearby: ["Katy", "Houston", "Spring", "The Woodlands", "Jersey Village", "Tomball"],
    serviceAreaNote: "IntegraFin serves Cypress remotely from its Katy office and does not represent a Cypress office. In-person appointments are available at the Katy address when scheduled in advance.",
    faq: [
      { question: "How often should a Cypress small business close its books?", answer: "Many businesses benefit from a monthly close, but the right frequency depends on volume and decision needs. The important point is to reconcile consistently and resolve open items." },
      { question: "Can you repair prior bookkeeping before starting monthly service?", answer: "Yes. We first assess the periods and accounts involved, then scope catch-up or cleanup separately so the current workflow starts from a supportable position." },
      { question: "Will bookkeeping make my business audit-proof?", answer: "No service can promise that. Organized records can make filings and questions easier to support, but an agency can select returns for examination and outcomes depend on the facts." },
      { question: "Do you support QuickBooks?", answer: "We can work with common bookkeeping records and assess the current setup. Software choice and any migration should be based on transaction flow, integrations and reporting needs." },
      { question: "Can you track profitability by project or service line?", answer: "Often, if the source data is captured consistently. We can discuss class, location or project tracking and explain the additional discipline required from the business." },
      { question: "Is tax preparation included with monthly bookkeeping?", answer: "Only if it is included in the engagement. We define bookkeeping, tax preparation, payroll-record and advisory scopes clearly so clients know which work is covered." },
    ],
  },
  {
    slug: "spring-tax-accountant",
    city: "Spring",
    county: "north Harris County",
    primaryService: "Tax Accountant",
    primaryKeyword: "tax accountant Spring TX",
    supportingKeywords: ["tax preparation Spring TX", "small business accounting Spring", "bookkeeping services Spring TX", "IRS notice help Spring TX"],
    title: "Tax Accountant in Spring, TX for Businesses | IntegraFin",
    description: "Spring tax accountant for business returns, bookkeeping, tax planning and IRS notice review. Secure year-round support from IntegraFin today.",
    hero: "Year-round tax and accounting support for Spring business owners, independent professionals and families with complex records.",
    intro: [
      "Spring businesses operate within the broader north Houston economy while serving distinct local neighborhoods and commercial corridors. Independent practices, trades, logistics providers and consultants may collect income in several ways and incur costs across a wide service territory. Filing quality depends on bringing those records together accurately.",
      "IntegraFin provides tax accountant services to Spring clients through secure remote collaboration from our Katy office. We assist with return preparation, bookkeeping, tax-planning discussions, payroll-record reconciliation and IRS notice review. We do not advertise a separate office in Spring.",
      "Every engagement begins with scope. We identify the taxpayer, entities, returns, periods and records involved before recommending work. That protects the client from vague promises and helps the team distinguish routine preparation from cleanup, amended-return or representation questions.",
    ],
    localExpertise: [
      "A Spring-area owner may have jobs across Harris and Montgomery counties, employees in the field and customers paying by card, transfer and check. Those facts shape the document request and bookkeeping design even though federal tax rules do not change at a city boundary.",
      "Local awareness is useful when it leads to better questions, not when it is used to manufacture an office. We combine regional business context with federal and Texas source materials and tell clients when a question falls outside our agreed tax or accounting scope.",
    ],
    industries: ["field-service and construction companies", "healthcare and personal-service practices", "transportation and logistics providers", "consultants and independent professionals", "restaurants, retailers and e-commerce sellers"],
    serviceDetails: serviceDetails("Spring", "tax"),
    scenarios: [
      "A Spring consultant receives income through multiple platforms and needs complete year-end records before return preparation.",
      "A trades business wants payroll, subcontractor and job-purchase activity reconciled before tax planning.",
      "A new entity needs a bookkeeping structure that separates owner funds from business operations.",
      "A taxpayer receives an IRS letter about reported income and needs the source forms compared with the filed return.",
      "A business with overdue reconciliations needs a staged cleanup rather than an unrealistic one-step filing promise.",
    ],
    resourceIntro: "Spring-area owners can review these regional and state resources for business advising, networking and official tax information.",
    resources: [
      { href: "https://www.springkleinchamber.org/", label: "Spring-Klein Chamber of Commerce", description: "Local business connections and community resources serving the Spring and Klein area." },
      { href: "https://www.sbdc.uh.edu/sbdc/", label: "University of Houston Texas Gulf Coast SBDC", description: "Advising and educational resources for Houston-region entrepreneurs." },
      ...sharedResources,
    ],
    nearby: ["The Woodlands", "Houston", "Cypress", "Tomball", "Humble", "Katy"],
    serviceAreaNote: "IntegraFin does not maintain a Spring office. Spring clients are served through secure remote workflows, with scheduled in-person meetings available at the Katy office.",
    faq: [
      { question: "Can IntegraFin prepare both personal and business returns?", answer: "Depending on scope, we can support individuals and common business entity returns. We confirm the entities, forms and years involved before accepting the engagement." },
      { question: "Do you offer tax planning during the year?", answer: "Yes. Useful planning requires current records and projections. We discuss possible actions and limitations without guaranteeing a specific tax result." },
      { question: "Can you help if I missed a filing or payment?", answer: "We can review the periods and notices involved and help organize a compliance plan. Penalties, interest, relief and payment options depend on the facts and agency rules." },
      { question: "What happens if my Spring business books are incomplete?", answer: "We identify missing accounts and periods, then determine whether cleanup is needed before filing. We do not fill gaps with unsupported estimates." },
      { question: "Is IntegraFin connected with the IRS?", answer: "No. IntegraFin is an independent tax and accounting firm. IRS links on this page are provided as official public resources." },
      { question: "Can all work be handled remotely?", answer: "Most document review and meetings can be handled securely online. We will explain any item that requires an original document, signature or different process." },
    ],
  },
  {
    slug: "the-woodlands-tax-accountant",
    city: "The Woodlands",
    county: "Montgomery County and north Harris County",
    primaryService: "Business Tax & Accounting",
    primaryKeyword: "tax accountant The Woodlands TX",
    supportingKeywords: ["business accounting The Woodlands", "bookkeeping The Woodlands TX", "tax preparation The Woodlands", "IRS notice help The Woodlands"],
    title: "Business Tax Accountant in The Woodlands, TX | IntegraFin",
    description: "The Woodlands business tax, bookkeeping, planning and IRS notice support. Work securely with IntegraFin's year-round accounting team. Schedule today.",
    hero: "Coordinated tax and accounting support for The Woodlands professionals, owner-led companies and families who value organized records.",
    intro: [
      "The Woodlands supports corporate offices, medical providers, professional firms and a strong base of owner-led businesses. Clients in those fields often have more than a simple annual filing need: they may manage an entity, payroll, investments, real estate or income from several sources.",
      "IntegraFin helps The Woodlands clients coordinate bookkeeping and tax work through a secure remote process from our Katy office. Services may include business and individual tax preparation, monthly accounting, cleanup, payroll-record review and IRS notice response planning. No Woodlands office is claimed.",
      "Complexity is handled by breaking the work into supportable steps. We inventory accounts and filings, reconcile source records, document assumptions and identify questions that need legal, payroll or investment expertise. Clear boundaries and complete facts are central to safe tax advice.",
    ],
    localExpertise: [
      "Professional and executive households may have equity compensation, investment statements, business interests or multistate documents. Owner-led companies may also need current reports for compensation, cash-flow and tax-planning discussions. The right workflow keeps personal and entity records separate while coordinating the timing of both.",
      "Regional knowledge helps with logistics and industry context, but we do not suggest that city lines create special federal deductions. Tax positions are based on law and documented facts, and recommendations are qualified when eligibility or treatment requires further review.",
    ],
    industries: ["professional and executive consulting firms", "medical and healthcare practices", "technology and engineering companies", "real-estate and property businesses", "specialty retailers and service providers"],
    serviceDetails: serviceDetails("The Woodlands", "business"),
    scenarios: [
      "An owner needs business books completed before personal and entity tax-planning projections can be meaningful.",
      "A professional household has several income documents and wants a structured intake that reduces missed information.",
      "A practice needs payroll and owner-payment records reconciled to the general ledger before year end.",
      "A company is considering a major purchase and needs current financial reports before discussing tax treatment.",
      "A taxpayer receives an IRS notice and wants an independent review before choosing how to respond.",
    ],
    resourceIntro: "These regional and official resources can help The Woodlands owners research local business programs and government tax requirements.",
    resources: [
      { href: "https://www.woodlandschamber.org/", label: "The Woodlands Area Chamber of Commerce", description: "Regional business connections, events and member information." },
      { href: "https://www.mctx.org/departments/departments_a_-_c/community_development/", label: "Montgomery County Community Development", description: "Official county information and community-development resources." },
      ...sharedResources,
    ],
    nearby: ["Spring", "Tomball", "Conroe", "Houston", "Cypress", "Magnolia"],
    serviceAreaNote: "IntegraFin serves The Woodlands from its Katy office through secure virtual meetings and document exchange. It does not advertise a separate office in The Woodlands.",
    faq: [
      { question: "Can you coordinate business and personal tax work?", answer: "Yes, when included in scope. Coordinating the records can help identify inconsistencies, but each return and taxpayer is prepared according to its own facts." },
      { question: "Do you advise on investments or legal structures?", answer: "We address tax and accounting implications within our scope. Investment recommendations and legal advice should come from appropriately licensed advisers and attorneys." },
      { question: "Can you help with multistate income?", answer: "We can review the states, income sources and filing history involved. Filing obligations are fact-specific, and additional state expertise may be needed for unusual matters." },
      { question: "Do you guarantee an IRS notice will be resolved in my favor?", answer: "No. We help review facts, organize documents and prepare next steps, but agency decisions and outcomes cannot be guaranteed." },
      { question: "How secure is the remote process?", answer: "We use an organized document workflow and discourage sending sensitive tax records through ordinary unsecured email. Specific access steps are provided during onboarding." },
      { question: "How do I prepare for a consultation?", answer: "Gather recent returns, bookkeeping reports, payroll summaries, entity records, relevant income documents and notices. A tailored list follows after the initial discussion." },
    ],
  },
  {
    slug: "fulshear-tax-accountant",
    city: "Fulshear",
    county: "Fort Bend County",
    primaryService: "Tax Accountant",
    primaryKeyword: "tax accountant Fulshear TX",
    supportingKeywords: ["bookkeeping services Fulshear TX", "small business accountant Fulshear", "tax preparation Fulshear TX", "IRS tax help Fulshear"],
    title: "Tax Accountant in Fulshear, TX for Business | IntegraFin",
    description: "Fulshear tax accountant for business tax, bookkeeping, payroll records and IRS notice help from nearby Katy. Schedule a secure consultation.",
    hero: "Nearby Katy-based tax preparation and accounting for Fulshear's growing community of business owners, professionals and families.",
    intro: [
      "Fulshear's rapid residential and commercial growth is creating new professional practices, contractors, property services and owner-operated companies. New businesses may add accounts, employees and vendors quickly, while established owners may discover that a once-simple bookkeeping setup no longer supports their filing or planning needs.",
      "IntegraFin provides tax accountant support to Fulshear from our nearby Katy office. We help organize tax preparation, monthly bookkeeping, payroll-related records and IRS notice responses through secure online collaboration and scheduled Katy appointments. We do not claim a separate Fulshear office.",
      "Growth does not automatically produce a tax benefit, and no city page can determine what a taxpayer qualifies for. We review the entity, records and transactions first, explain the rules relevant to the engagement and use cautious language when treatment depends on additional facts.",
    ],
    localExpertise: [
      "Fulshear owners may serve customers across Fort Bend County while purchasing equipment, hiring contractors or operating from home. Capturing those facts consistently is important for the books and for later tax questions. A workflow should be simple enough to follow while the business is busy.",
      "Nearby service gives Fulshear clients access to an actual Katy office without a fictional local listing. More importantly, it lets bookkeeping, filing and notice work share one documented record set instead of being rebuilt by separate providers each year.",
    ],
    industries: ["new professional and consulting firms", "construction and home-service businesses", "real-estate and property professionals", "healthcare, wellness and personal services", "local retailers and online sellers"],
    serviceDetails: serviceDetails("Fulshear", "tax"),
    scenarios: [
      "A new Fulshear LLC needs separate accounts and a bookkeeping routine before its first business return.",
      "A fast-growing contractor needs job purchases, vehicles, payroll and subcontractor records organized.",
      "A professional working from home wants documented income and expense records for a planning discussion.",
      "A business owner receives an IRS notice and needs to identify the return, period and documents involved.",
      "A company adding staff wants payroll reports and the general ledger to reconcile throughout the year.",
    ],
    resourceIntro: "Fulshear and Fort Bend County owners can explore these official organizations for local development, advising and state tax information.",
    resources: [
      { href: "https://www.fulsheartexas.gov/", label: "City of Fulshear", description: "Official city information for residents, businesses and the local community." },
      { href: "https://www.fortbendchamber.com/", label: "Fort Bend Chamber of Commerce", description: "Business programs and connections across Fort Bend County." },
      ...sharedResources,
    ],
    nearby: ["Katy", "Richmond", "Rosenberg", "Sugar Land", "Simonton", "Brookshire"],
    serviceAreaNote: "IntegraFin's physical office is in nearby Katy. Fulshear clients can work remotely or schedule an appointment at 2039 N Mason Rd, Suite 604, Katy, TX 77449.",
    faq: [
      { question: "How close is IntegraFin to Fulshear?", answer: "IntegraFin serves Fulshear from its Katy office. Travel time varies by location and traffic, so clients should use current directions and schedule before visiting." },
      { question: "Can you set up bookkeeping for a new Fulshear business?", answer: "Yes. We can review accounts, transaction flow and reporting needs, then build an appropriate bookkeeping process. Legal formation and banking decisions may require other advisers." },
      { question: "Do you help with Texas franchise tax?", answer: "We can help assess filing workflow and organize relevant information. Requirements, thresholds and reports depend on entity facts and current Texas Comptroller rules." },
      { question: "Can you help with overdue books?", answer: "Yes. Cleanup is scoped by the periods, accounts and source records available. We identify limitations rather than inventing unsupported transactions." },
      { question: "Do you guarantee penalty relief?", answer: "No. Relief depends on law, agency criteria and taxpayer facts. We can help review notices and prepare support for options that may be available." },
      { question: "Can meetings be virtual?", answer: "Yes. Fulshear clients can use secure document sharing and virtual meetings, with Katy appointments available when needed." },
    ],
  },
  {
    slug: "richmond-tax-accountant",
    city: "Richmond",
    county: "Fort Bend County",
    primaryService: "Tax Accountant",
    primaryKeyword: "tax accountant Richmond TX",
    supportingKeywords: ["bookkeeping services Richmond TX", "business tax preparation Richmond", "small business accountant Richmond TX", "IRS tax help Richmond"],
    title: "Tax Accountant in Richmond, TX for Business | IntegraFin",
    description: "Richmond tax accountant for business returns, bookkeeping, planning and IRS notice review. Get nearby, organized support from IntegraFin. Schedule today.",
    hero: "Tax preparation and small-business accounting for Richmond owners who need accurate records and straightforward next steps.",
    intro: [
      "Richmond is both a county center and part of a fast-changing Fort Bend business corridor. Longstanding local companies operate alongside new construction, healthcare, property and professional services. That mix means accounting systems can range from mature processes to a collection of bank downloads assembled near filing time.",
      "IntegraFin supports Richmond taxpayers from our Katy office with business and individual tax preparation, bookkeeping, payroll-record coordination and IRS notice review. Most work can be handled securely online. We describe Richmond as a service area, not as an office location.",
      "Our first job is to establish what can be supported. We reconcile records, ask about unusual items and explain where tax treatment depends on facts or current guidance. We do not advertise guaranteed refunds, guaranteed savings or automatic notice resolution.",
    ],
    localExpertise: [
      "Richmond businesses may serve local government, nearby developments, rural areas and the wider Houston market. A useful accounting process should capture how each business invoices, pays vendors, manages vehicles and equipment, and distinguishes owner transactions from business activity.",
      "Fort Bend proximity helps with practical service and regional context. Accuracy still comes from source documents and applicable federal and Texas rules, not from making broad claims about the city or treating every local company the same.",
    ],
    industries: ["construction, trades and property services", "legal, consulting and professional firms", "medical and personal-care practices", "restaurants, retail and hospitality", "agricultural and rural service businesses"],
    serviceDetails: serviceDetails("Richmond", "tax"),
    scenarios: [
      "A Richmond family business wants its books reviewed before both entity and owner returns are prepared.",
      "A contractor needs equipment, vehicle, subcontractor and payroll activity separated in the general ledger.",
      "A professional receives 1099 income and wants estimated payments reviewed using current projections.",
      "A retailer has unexplained differences between point-of-sale totals and bank deposits.",
      "A taxpayer receives an IRS notice and needs to preserve the response date while supporting documents are gathered.",
    ],
    resourceIntro: "Richmond owners can use local development and countywide organizations together with official state and federal tax resources.",
    resources: [
      { href: "https://www.richmondtx.gov/departments/economic-development", label: "City of Richmond Economic Development", description: "Official city information for local growth and business development." },
      { href: "https://www.fortbendchamber.com/", label: "Fort Bend Chamber of Commerce", description: "Countywide networking, education and business advocacy." },
      ...sharedResources,
    ],
    nearby: ["Rosenberg", "Sugar Land", "Fulshear", "Katy", "Missouri City", "Needville"],
    serviceAreaNote: "Richmond is served from IntegraFin's Katy office. We do not claim a Richmond office; clients may use secure remote service or schedule a Katy appointment.",
    faq: [
      { question: "Do you serve both Richmond businesses and individuals?", answer: "Yes, subject to the engagement. We confirm the returns, entities, years and services involved before work begins." },
      { question: "Can you prepare a return if the books are not reconciled?", answer: "The records may need cleanup first. We assess what is missing and explain the additional scope rather than preparing from balances that cannot be supported." },
      { question: "Can you advise on vehicle and equipment deductions?", answer: "We can review tax treatment based on business use, records, timing and current rules. Buying an asset does not by itself guarantee a deduction or tax savings." },
      { question: "Do you help with IRS payment options?", answer: "We can review the notice and discuss procedures that may be relevant. Approval and terms depend on IRS rules and the taxpayer's facts and compliance history." },
      { question: "How do Richmond clients share documents?", answer: "We use an organized secure workflow and provide a tailored document list. Sensitive records should not be sent through ordinary unsecured email." },
      { question: "Is the consultation a substitute for legal advice?", answer: "No. We provide tax and accounting services within scope and recommend legal counsel when a matter involves contracts, liability or other legal issues." },
    ],
  },
  {
    slug: "rosenberg-bookkeeping-services",
    city: "Rosenberg",
    county: "Fort Bend County",
    primaryService: "Bookkeeping Services",
    primaryKeyword: "bookkeeping services Rosenberg TX",
    supportingKeywords: ["tax preparation Rosenberg TX", "small business accountant Rosenberg", "bookkeeping cleanup Rosenberg", "business accounting Rosenberg TX"],
    title: "Bookkeeping Services in Rosenberg, TX | IntegraFin",
    description: "Rosenberg bookkeeping services for monthly reconciliations, cleanup, tax-ready records and business accounting. Schedule with nearby IntegraFin.",
    hero: "Bookkeeping cleanup and monthly accounting for Rosenberg businesses that want dependable reports and tax-ready records.",
    intro: [
      "Rosenberg's location along major transportation routes supports retail, construction, logistics, restaurants and service businesses with very different transaction patterns. A high-volume shop and a project contractor may use the same accounting software, but they should not use the same close checklist.",
      "IntegraFin provides bookkeeping services to Rosenberg from our nearby Katy office. We reconcile financial accounts, review classifications, help clean up prior periods and connect the finished records with business tax preparation. Remote service is available, and no separate Rosenberg office is represented.",
      "Reliable bookkeeping preserves the trail from the source transaction to the report. When an item is unclear, we ask and document rather than choosing the tax treatment that sounds most favorable. This creates a stronger foundation for filing, planning and agency questions.",
    ],
    localExpertise: [
      "Rosenberg owners may manage inventory, card processors, fuel and vehicle costs, subcontractors or multiple job locations. The close needs to reflect those operating realities. Otherwise, a report can be technically produced while still being unreliable for tax or management use.",
      "Our nearby model is transparent: IntegraFin is based in Katy and serves Rosenberg as part of its Fort Bend coverage. Local relevance comes from the clients and situations we support, not from a virtual address or invented testimonial.",
    ],
    industries: ["retailers, restaurants and food businesses", "transportation and logistics providers", "construction contractors and trades", "automotive and equipment services", "professional and personal-service companies"],
    serviceDetails: serviceDetails("Rosenberg", "bookkeeping"),
    scenarios: [
      "A Rosenberg store needs gross sales, returns, processor fees, sales tax and deposits reconciled.",
      "A transportation business wants fuel, repairs, insurance and vehicle activity categorized consistently.",
      "A contractor has vendor and subcontractor payments that need better documentation before year end.",
      "An owner has not reconciled several accounts and needs a defined cleanup project before monthly service.",
      "A company wants payroll reports tied to its books so wages and tax liabilities are not duplicated or omitted.",
    ],
    resourceIntro: "Rosenberg businesses can consult city, county and government resources for local programs, business connections and current tax guidance.",
    resources: [
      { href: "https://rosenbergedc.com/", label: "Rosenberg Development Corporation", description: "Local economic-development information and business resources." },
      { href: "https://www.cfbca.org/", label: "Central Fort Bend Chamber", description: "Business networking and community programs for the central Fort Bend area." },
      ...sharedResources,
    ],
    nearby: ["Richmond", "Sugar Land", "Fulshear", "Needville", "Katy", "Missouri City"],
    serviceAreaNote: "IntegraFin serves Rosenberg remotely from its Katy office. There is no claimed Rosenberg branch. Scheduled appointments are available at the Katy location.",
    faq: [
      { question: "What is bookkeeping cleanup?", answer: "Cleanup addresses prior unreconciled or misclassified activity. The scope may include bank, credit-card, loan, payroll and balance-sheet review depending on the records." },
      { question: "Can you take over from another bookkeeper?", answer: "Yes. We first review access, account reconciliations, open items and reporting expectations, then agree on a transition date and any cleanup required." },
      { question: "Do you provide inventory accounting?", answer: "We can review the bookkeeping process and source data. Detailed inventory systems and valuation questions may require a specialized implementation or additional engagement." },
      { question: "Will you classify expenses to maximize deductions?", answer: "We classify transactions according to their documented business purpose and applicable treatment. We do not relabel personal or unsupported costs to create a deduction." },
      { question: "Can monthly books support tax planning?", answer: "Current reconciled books make projections more useful. Planning still depends on complete facts, timing and current law, so no particular savings can be promised." },
      { question: "How do I start bookkeeping service?", answer: "Schedule a consultation and gather recent statements, current reports, payroll summaries, loan documents and prior returns. We then assess scope and next steps." },
    ],
  },
  {
    slug: "missouri-city-tax-accountant",
    city: "Missouri City",
    county: "Fort Bend and Harris counties",
    primaryService: "Tax & Accounting Services",
    primaryKeyword: "tax accountant Missouri City TX",
    supportingKeywords: ["business accounting Missouri City", "bookkeeping services Missouri City TX", "tax preparation Missouri City", "IRS notice help Missouri City"],
    title: "Missouri City Tax Accountant for Business | IntegraFin",
    description: "Missouri City tax accountant for business tax, bookkeeping, planning and IRS notice review. Work securely with nearby IntegraFin. Schedule a consultation.",
    hero: "Tax preparation and accounting support for Missouri City businesses, independent professionals and families across Fort Bend and Harris counties.",
    intro: [
      "Missouri City spans Fort Bend and Harris counties and connects closely with Sugar Land and Houston. Its business community includes healthcare providers, consultants, home-service companies, retailers and real-estate professionals whose income and expenses may cross city and county lines.",
      "IntegraFin serves Missouri City from our Katy office through secure virtual collaboration. We support tax preparation, bookkeeping, business accounting, payroll-record review and IRS notice response planning. Clients are never told that IntegraFin has a Missouri City office when it does not.",
      "City and county geography can affect operations, but federal tax treatment depends on law and the taxpayer's facts. We focus on records, entity activity and filing history, qualify recommendations where needed and avoid guaranteed refund or tax-reduction language.",
    ],
    localExpertise: [
      "Missouri City owners often serve the wider southwest Houston market. A business may receive online and in-person payments, use contractors, reimburse owners and incur costs across several worksites. The accounting workflow needs to capture those patterns without mixing personal and company activity.",
      "Nearby knowledge is most valuable when it improves the questions asked and the resources shared. It does not replace documentary support, and it should never be used to build a fake local listing or fabricated client quote.",
    ],
    industries: ["healthcare and wellness practices", "consulting and professional services", "construction and home-service companies", "real-estate and property professionals", "retail, food and online businesses"],
    serviceDetails: serviceDetails("Missouri City", "business"),
    scenarios: [
      "A Missouri City practice needs deposits and operating expenses reconciled before return preparation.",
      "A home-service company wants employee, contractor, vehicle and job-cost records organized consistently.",
      "A real-estate professional needs commission income and business expenses separated from personal activity.",
      "A taxpayer has documents from several income sources and wants a structured completeness review.",
      "An owner receives a federal notice and needs the cited figures traced back to source forms and the filed return.",
    ],
    resourceIntro: "Missouri City and Fort Bend businesses can review these local, county and government resources for current programs and official guidance.",
    resources: [
      { href: "https://www.missouricitytx.gov/339/Economic-Development", label: "Missouri City Economic Development", description: "Official city information for businesses and economic development." },
      { href: "https://www.fortbendchamber.com/", label: "Fort Bend Chamber of Commerce", description: "Business education, events and advocacy across Fort Bend County." },
      ...sharedResources,
    ],
    nearby: ["Sugar Land", "Houston", "Richmond", "Rosenberg", "Katy", "Stafford"],
    serviceAreaNote: "IntegraFin has no Missouri City office. Clients are served securely from Katy and may schedule in-person appointments at 2039 N Mason Rd, Suite 604, Katy, TX 77449.",
    faq: [
      { question: "Does crossing county lines change federal tax rules?", answer: "Federal rules do not change at the county line, but business operations, permits and local records can differ. We review the actual jurisdictions and obligations involved." },
      { question: "Can you support a Missouri City home-based business?", answer: "Yes. We help organize income and expense records and discuss tax questions based on documented business use and other applicable facts." },
      { question: "Do you prepare sales-tax filings?", answer: "Sales-tax support depends on the engagement and registrations involved. Businesses should confirm current Texas Comptroller requirements for their products, services and locations." },
      { question: "Can you guarantee my IRS notice is wrong?", answer: "No. We compare the notice, return and source documents before reaching a conclusion. Some notices reflect missing or mismatched information; others may require a different response." },
      { question: "Do you work with families as well as businesses?", answer: "Yes, depending on scope. Coordinating owner and business information can be useful, while keeping each taxpayer's records and return requirements clear." },
      { question: "Where would an in-person meeting occur?", answer: "At IntegraFin's Katy office by appointment. Most Missouri City engagements can also be handled through secure remote meetings and document exchange." },
    ],
  },
];

export const dynamicTexasCityPages = texasCityPages.filter(
  ({ slug }) => !["houston-tax-accountant", "fulshear-tax-accountant"].includes(slug),
);

export function getTexasCityPage(slug: string) {
  return texasCityPages.find((page) => page.slug === slug);
}
