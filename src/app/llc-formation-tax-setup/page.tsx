import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileText,
  Landmark,
  ListChecks,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";

const pageUrl = "https://integrafin.tax/llc-formation-tax-setup";

export const metadata: Metadata = {
  title: "LLC Formation Tax Setup | EIN & Bookkeeping | IntegraFin",
  description:
    "Start an LLC with tax setup support from IntegraFin. Get help planning EIN, tax classification, bookkeeping, payroll records, and first-year compliance steps.",
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "LLC Formation Tax Setup | EIN & Bookkeeping | IntegraFin",
    description:
      "Formation support connected to tax setup, EIN planning, bookkeeping, payroll records, and first-year compliance workflow.",
    url: pageUrl,
  },
};

const processSteps = [
  {
    title: "1. Entity and owner intake",
    description:
      "We identify owners, business activity, state, expected revenue model, payroll plans, banking needs, and whether legal counsel should be involved before formation documents are filed.",
  },
  {
    title: "2. Formation document planning",
    description:
      "For Texas LLCs, we explain the basic Secretary of State formation path and what information is usually needed for a certificate of formation. State filing and legal decisions remain separate from tax advice.",
  },
  {
    title: "3. EIN and federal tax setup",
    description:
      "We help you understand when an EIN may be needed, why the IRS EIN application should be handled through the official IRS site, and how the responsible-party details should match the business facts.",
  },
  {
    title: "4. Tax classification review",
    description:
      "An LLC can be treated differently for federal tax purposes depending on ownership and elections. We review the tax workflow before you assume an LLC automatically changes how income is taxed.",
  },
  {
    title: "5. Bookkeeping and payroll launch",
    description:
      "We set up the recordkeeping checklist for bank accounts, owner contributions, expenses, receipts, payroll records, contractor payments, and tax-ready reports.",
  },
  {
    title: "6. First-year compliance calendar",
    description:
      "We map the first filing-year reminders: estimated taxes, payroll records if applicable, 1099 vendor tracking, Texas franchise-tax awareness, bookkeeping close dates, and return-preparation handoff.",
  },
];

const pricingBlocks = [
  {
    title: "Formation tax setup review",
    price: "Quoted after intake",
    description:
      "For founders who already know the entity they want and need help connecting formation facts to EIN, federal tax classification, and recordkeeping next steps.",
    includes: ["Entity and tax intake", "EIN readiness checklist", "First-year tax setup notes", "Formation records checklist"],
  },
  {
    title: "LLC plus bookkeeping launch",
    price: "Scoped quote",
    description:
      "For new LLCs that need the first accounting workflow built correctly before income, expenses, payroll, or contractor payments become messy.",
    includes: ["Chart-of-accounts planning", "Bank and expense workflow", "Owner contribution tracking", "Monthly close checklist"],
  },
  {
    title: "Entity tax planning follow-up",
    price: "Custom quote",
    description:
      "For owners who need to compare LLC tax treatment, S corporation election timing, payroll readiness, and reasonable recordkeeping before changing tax status.",
    includes: ["Tax classification review", "S corp readiness questions", "Payroll-record planning", "Written next-step summary"],
  },
];

const taxSetupItems = [
  "Confirm the legal business name, owners, management structure, and formation state.",
  "Keep the IRS EIN confirmation letter and Secretary of State filing records in the permanent file.",
  "Open a business bank account before mixing business and personal activity.",
  "Choose a bookkeeping workflow before the first tax filing season.",
  "Track owner contributions, draws, loans, reimbursements, payroll, and contractor payments separately.",
  "Review whether estimated taxes, payroll deposits, 1099 tracking, sales tax, or Texas franchise tax may apply.",
];

const officialResources = [
  {
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc",
    label: "IRS: Limited Liability Company (LLC)",
    description:
      "IRS overview of LLC federal tax classification and entity treatment.",
  },
  {
    href: "https://www.irs.gov/businesses/employer-identification-number",
    label: "IRS: Employer Identification Number",
    description:
      "Official IRS EIN information, including the reminder that the IRS online EIN application is free.",
  },
  {
    href: "https://www.irs.gov/publications/p583",
    label: "IRS Publication 583",
    description:
      "IRS starting-a-business and recordkeeping guidance for business owners.",
  },
  {
    href: "https://www.irs.gov/publications/p3402",
    label: "IRS Publication 3402",
    description:
      "IRS federal tax information for limited liability companies.",
  },
  {
    href: "https://www.sos.state.tx.us/corp/instructions/205.shtml",
    label: "Texas SOS: Form 205 instructions",
    description:
      "Texas Secretary of State instructions for a certificate of formation for an LLC.",
  },
  {
    href: "https://www.sos.state.tx.us/corp/forms/205_boc.pdf",
    label: "Texas SOS: Form 205 PDF",
    description:
      "Texas Secretary of State certificate of formation form for a limited liability company.",
  },
];

const faqItems = [
  {
    question: "Can IntegraFin form my LLC and help with tax setup?",
    answer:
      "IntegraFin can help business owners connect the formation process with tax setup, EIN planning, bookkeeping, payroll-record readiness, and first-year filing workflows. Legal formation questions may require coordination with legal counsel.",
  },
  {
    question: "Does an LLC automatically reduce taxes?",
    answer:
      "No. An LLC is a state-law business structure, and federal tax treatment depends on ownership, elections, and the facts of the business. Tax savings are not automatic and should not be promised before reviewing the records.",
  },
  {
    question: "Should I apply for an EIN before or after forming an LLC?",
    answer:
      "The timing depends on the business facts and formation sequence. The IRS provides official EIN information and the online EIN application for free. We help owners prepare the details before applying or coordinating the application.",
  },
  {
    question: "Can you help decide between LLC, S corporation, and C corporation tax treatment?",
    answer:
      "We can review tax and recordkeeping considerations, including payroll and filing implications. Legal liability, ownership agreements, and state-law formation decisions may require legal advice.",
  },
  {
    question: "What records should a new LLC keep from day one?",
    answer:
      "Keep formation records, EIN confirmation, ownership documents, bank statements, receipts, invoices, payroll records, contractor details, tax notices, and bookkeeping reports. Clean records make tax filing and future planning easier.",
  },
  {
    question: "Is the Texas LLC filing fee included in IntegraFin pricing?",
    answer:
      "Government filing fees, registered-agent costs, legal fees, software costs, and state charges are separate unless a written engagement specifically includes them. IntegraFin quotes service fees after reviewing the scope.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "LLC Formation Tax Setup",
  serviceType: "Business formation tax setup and bookkeeping launch support",
  description:
    "IntegraFin helps new business owners connect LLC formation, EIN planning, federal tax classification, bookkeeping, payroll records, and first-year compliance workflow.",
  url: pageUrl,
  provider: {
    "@type": "AccountingService",
    name: "IntegraFin Tax & Accounting",
    url: "https://integrafin.tax",
    telephone: "+1-832-647-1819",
    email: "contact@integrafin.tax",
    address: {
      "@type": "PostalAddress",
      streetAddress: "2039 N Mason Rd, Suite 604",
      addressLocality: "Katy",
      addressRegion: "TX",
      postalCode: "77449",
      addressCountry: "US",
    },
  },
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "AdministrativeArea", name: "Texas" },
    { "@type": "City", name: "Katy" },
  ],
  offers: pricingBlocks.map((block) => ({
    "@type": "Offer",
    name: block.title,
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
      description: block.price,
    },
    availability: "https://schema.org/InStock",
    url: pageUrl,
  })),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://integrafin.tax/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://integrafin.tax/services" },
    { "@type": "ListItem", position: 3, name: "LLC Formation Tax Setup", item: pageUrl },
  ],
};

export default function LlcFormationTaxSetupPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="bg-primary-dark pt-28 sm:pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-secondary">
                LLC Formation Tax Setup
              </p>
              <h1 className="max-w-4xl text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                Start an LLC with the tax, EIN, and bookkeeping setup handled clearly
              </h1>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#d7e3fc] sm:text-lg">
                IntegraFin helps new business owners connect formation decisions with federal tax classification,
                EIN planning, bookkeeping records, payroll readiness, and first-year compliance steps. We keep the
                advice fact-based and do not promise automatic tax savings from forming an LLC.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact?service=LLC%20Formation%20and%20Tax%20Setup#contact-form" className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-7 py-3 font-bold text-primary-dark">
                  Book an entity tax-setup call <ArrowRight className="h-4 w-4" />
                </Link>
                <a href="tel:+18326471819" className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-bold text-white">
                  Call (832) 647-1819
                </a>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/10 p-6 text-white shadow-sm">
              <h2 className="mb-4 text-2xl font-black">Best for new owners who need:</h2>
              <ul className="space-y-3 text-sm leading-relaxed text-[#d7e3fc]">
                <li>LLC tax setup before business activity gets messy</li>
                <li>EIN readiness and official IRS link guidance</li>
                <li>Bookkeeping records from day one</li>
                <li>Payroll and contractor-payment planning</li>
                <li>S corp or entity-tax follow-up questions</li>
              </ul>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-primary">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-black text-primary sm:text-3xl">
              Quick answer
            </h2>
            <p className="text-slate-700 leading-relaxed">
              A new LLC should not be treated as just a filing. The formation record, EIN, tax classification,
              bank account, bookkeeping system, payroll plan, and first-year filing calendar should line up. IntegraFin
              helps owners build that tax and accounting workflow before the first filing season.
            </p>
            <p className="mt-5 text-sm font-semibold text-slate-500">Last reviewed: June 30, 2026</p>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <h2 className="mb-5 text-2xl font-black text-primary sm:text-3xl">
              What this service includes
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Formation readiness", "Name, owner, address, management, registered-agent, and state-filing records checklist."],
                ["EIN planning", "Official IRS EIN path, responsible-party details, and permanent-record storage."],
                ["Tax classification", "Single-member, multi-member, partnership, corporate election, and S corp readiness discussion."],
                ["Books and payroll", "Banking, chart of accounts, owner transactions, contractor records, and payroll setup questions."],
              ].map(([title, description]) => (
                <section key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-black text-primary-dark">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ListChecks className="h-5 w-5" />
            </div>
            <h2 className="text-2xl font-black text-primary sm:text-3xl">
              Formation-to-tax setup process
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step) => (
              <section key={step.title} className="rounded-xl border border-slate-200 p-5">
                <h3 className="font-black text-primary-dark">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{step.description}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-primary">
              <ReceiptText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-primary sm:text-3xl">
                Pricing and scope
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Service fees are quoted after intake because formation support, tax setup, bookkeeping, payroll, and
                S corp review can require very different work. Government filing fees, legal fees, registered-agent
                costs, and software subscriptions are separate unless a written engagement says otherwise.
              </p>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {pricingBlocks.map((block) => (
              <section key={block.title} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-black text-primary-dark">{block.title}</h3>
                <p className="mt-3 text-sm font-black uppercase tracking-[0.16em] text-secondary">{block.price}</p>
                <p className="mt-4 text-sm leading-relaxed text-slate-700">{block.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {block.includes.map((item) => (
                    <li key={item} className="flex gap-2">
                      <ClipboardCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-black text-primary sm:text-3xl">
              Tax setup checklist for a new LLC
            </h2>
            <ul className="space-y-3 text-slate-700">
              {taxSetupItems.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <ShieldCheck className="mt-1 h-4 w-4 shrink-0 text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-primary">
              <Landmark className="h-6 w-6" />
            </div>
            <h2 className="mb-4 text-2xl font-black text-primary sm:text-3xl">
              Important tax-safety notes
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                IntegraFin is an independent tax and accounting firm. We are not the IRS, FinCEN, the Texas Secretary
                of State, or a law firm. We help clients organize tax and accounting next steps and identify when
                outside legal advice may be needed.
              </p>
              <p>
                LLC formation does not automatically create a deduction, refund, tax reduction, or liability result.
                Federal tax treatment depends on the entity facts, ownership, elections, payroll, records, and current law.
              </p>
              <p>
                Use official government websites for government filings and identity-sensitive applications. The IRS
                states that the online EIN application is free.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-5 text-2xl font-black text-primary sm:text-3xl">
            Official IRS and Texas resources
          </h2>
          <p className="mb-6 max-w-4xl text-slate-700 leading-relaxed">
            These links are provided so business owners can verify official guidance before filing, applying for an EIN,
            or making tax decisions.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {officialResources.map((resource) => (
              <a key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-slate-200 p-5 hover:border-secondary">
                <h3 className="font-black text-primary-dark">{resource.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{resource.description}</p>
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm sm:p-10">
          <h2 className="mb-6 text-2xl font-black text-primary sm:text-3xl">
            LLC formation tax setup FAQ
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {faqItems.map((faq) => (
              <section key={faq.question} className="rounded-xl bg-slate-50 p-5">
                <h3 className="font-black text-primary-dark">{faq.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
              </section>
            ))}
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-primary-dark p-7 text-center text-white shadow-sm sm:p-10">
          <h2 className="text-2xl font-black sm:text-3xl">
            Ready to set up your LLC records the right way?
          </h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-[#d7e3fc]">
            Start with a formation tax setup review so your EIN, bookkeeping, payroll records, and first-year tax
            calendar are not left as afterthoughts.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact?service=LLC%20Formation%20and%20Tax%20Setup#contact-form" className="inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-7 py-3 font-bold text-primary-dark">
              Book an entity tax-setup call <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/services#startup" className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-7 py-3 font-bold text-white">
              Review Startup Services
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
