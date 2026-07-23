import type { Metadata } from "next";
import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Landmark,
  ListChecks,
  Scale,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { getContactHref, type LeadService } from "@/lib/leadServices";

const pageUrl = "https://integrafin.tax/pricing";

export const metadata: Metadata = {
  title: "Tax & Accounting Pricing and Scope | IntegraFin",
  description:
    "Compare IntegraFin tax, bookkeeping, payroll, IRS notice, and LLC setup scope. See inclusions, exclusions, quote factors, records needed, and timing.",
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tax & Accounting Pricing and Scope | IntegraFin",
    description:
      "Understand what affects an IntegraFin quote, what may be included, and which work normally requires a separate scope.",
    url: pageUrl,
  },
};

type ServiceGuide = {
  id: string;
  title: string;
  summary: string;
  quoteLabel: string;
  serviceHref: string;
  leadService: LeadService;
  Icon: ComponentType<{ className?: string }>;
  included: string[];
  separate: string[];
  quoteFactors: string[];
  records: string[];
  timing: string;
};

const serviceGuides: ServiceGuide[] = [
  {
    id: "individual-tax",
    title: "Individual tax preparation",
    summary:
      "A written quote is based on the returns, schedules, states, filing years, and records involved—not only the number of tax forms.",
    quoteLabel: "Quoted after filing-scope review",
    serviceHref: "/individual-tax-preparation",
    leadService: "Individual Tax Preparation",
    Icon: UserRound,
    included: [
      "Document and prior-return intake for the agreed filing year",
      "Preparation of the federal and state returns named in the engagement",
      "Open-question list, taxpayer review, and filing authorization workflow",
      "Electronic filing when the return and agency system are eligible",
    ],
    separate: [
      "Amended or prior-year returns and additional states",
      "Business, rental, foreign-reporting, estate, trust, or notice work",
      "Bookkeeping reconstruction or missing-record cleanup",
    ],
    quoteFactors: [
      "Income types, schedules, entities, rentals, and investments",
      "Number of states and filing years",
      "Record completeness, deadlines, and unresolved tax questions",
    ],
    records: [
      "Prior-year return and identity information",
      "W-2, 1099, K-1, investment, retirement, and payment records",
      "Deduction, credit, dependent, business, and state records that apply",
    ],
    timing:
      "The working timeline begins after the agreed records are received. Open questions, missing documents, filing-season volume, and agency availability can change completion timing.",
  },
  {
    id: "business-tax",
    title: "Business tax returns",
    summary:
      "The quote identifies the entity, tax year, return type, states, bookkeeping condition, owner coordination, and filing deadline.",
    quoteLabel: "Entity-specific written quote",
    serviceHref: "/business-tax-accounting",
    leadService: "Business Tax and Accounting",
    Icon: Building2,
    included: [
      "Entity and filing-history intake for the agreed return",
      "Review of available trial balance, financial reports, and tax records",
      "Preparation, open questions, client review, and authorization workflow",
      "Electronic filing when eligible and included in the engagement",
    ],
    separate: [
      "Bookkeeping cleanup, payroll filings, sales tax, and owner returns",
      "Amended returns, prior years, notices, elections, and extra states",
      "Audit, review, assurance, legal, valuation, or transaction services",
    ],
    quoteFactors: [
      "Entity type, states, filing years, ownership, and activity",
      "Bookkeeping quality and required adjusting work",
      "Payroll, inventory, fixed assets, loans, and related-party transactions",
    ],
    records: [
      "Prior return, formation and election records, and ownership details",
      "Year-end balance sheet, profit and loss, and general ledger",
      "Payroll, contractor, asset, loan, state, and owner-transaction records",
    ],
    timing:
      "Timing depends on tax-ready books, owner answers, third-party forms, extension status, and filing deadlines. Cleanup is scheduled separately when the books are not ready.",
  },
  {
    id: "monthly-bookkeeping",
    title: "Monthly bookkeeping",
    summary:
      "Recurring scope is built from transaction volume, accounts, entities, reporting frequency, software, and the condition of the starting books.",
    quoteLabel: "Recurring scope after books review",
    serviceHref: "/quickbooks-bookkeeping-services",
    leadService: "QuickBooks Bookkeeping",
    Icon: BookOpenCheck,
    included: [
      "Agreed transaction classification and account reconciliations",
      "Monthly open-question workflow and missing-document follow-up",
      "Agreed bookkeeping reports after the monthly close",
      "Defined software access and close-calendar responsibilities",
    ],
    separate: [
      "Historical cleanup, catch-up work, migrations, and new-file setup",
      "Bill pay, invoicing, collections, payroll, sales tax, and inventory",
      "Controller, CFO, tax return, assurance, and advisory work",
    ],
    quoteFactors: [
      "Monthly transactions, bank and credit-card accounts, and entities",
      "Software, integrations, classes, locations, and reporting detail",
      "Close frequency, record quality, and client response time",
    ],
    records: [
      "Accounting-file access and prior bookkeeping reports",
      "Bank, card, loan, payment-platform, and payroll statements",
      "Business activity, owner transactions, and reporting requirements",
    ],
    timing:
      "The close calendar is agreed after access and records are reviewed. Reports can be delayed by missing statements, unresolved transactions, or late client responses.",
  },
  {
    id: "bookkeeping-cleanup",
    title: "Bookkeeping cleanup",
    summary:
      "Cleanup is scoped by the months, accounts, entities, transaction volume, unreconciled balances, and reporting purpose.",
    quoteLabel: "Project quote after diagnostic review",
    serviceHref: "/bookkeeping-cleanup",
    leadService: "Bookkeeping Cleanup",
    Icon: ClipboardCheck,
    included: [
      "Diagnostic review of the agreed file, periods, and accounts",
      "Agreed classification, reconciliation, and balance-review work",
      "Open-question list and record requests",
      "Closing summary and agreed bookkeeping reports",
    ],
    separate: [
      "Tax returns, payroll corrections, sales-tax filings, and notices",
      "Forensic accounting, fraud review, audit, or assurance",
      "Ongoing monthly bookkeeping after the cleanup period",
    ],
    quoteFactors: [
      "Number of months, accounts, transactions, and entities",
      "Missing statements, duplicates, unreconciled balances, and migrations",
      "Payroll, inventory, loans, payment platforms, and owner activity",
    ],
    records: [
      "Accounting-file access and the last reliable close date",
      "Bank, card, loan, payroll, and payment-platform statements",
      "Prior returns, financial reports, and known problem balances",
    ],
    timing:
      "A reliable timeline is provided after the diagnostic review. Missing records and unanswered transaction questions are the most common reasons a cleanup takes longer.",
  },
  {
    id: "payroll-support",
    title: "Payroll record and tax support",
    summary:
      "Payroll work is defined by employee count, pay frequency, states, filing periods, provider, missing filings, and notice history.",
    quoteLabel: "Quoted after payroll-status review",
    serviceHref: "/payroll-tax-support",
    leadService: "Payroll Tax Support",
    Icon: Landmark,
    included: [
      "Review of the payroll records and periods named in the engagement",
      "Deposit, wage-summary, and filing-status organization",
      "Agreed reconciliation, filing, or notice-support workflow",
      "Clear client approvals and responsibility calendar",
    ],
    separate: [
      "Human-resources, employment-law, benefits, and workers compensation",
      "Historical corrections, multi-state registrations, and agency notices",
      "Bookkeeping, business returns, and owner compensation planning",
    ],
    quoteFactors: [
      "Employees, states, pay frequency, entities, and filing periods",
      "Provider access, missing returns, deposit history, and amendments",
      "Notices, prior errors, and year-end reporting requirements",
    ],
    records: [
      "Payroll-provider reports and employee/contractor summaries",
      "Filed Forms 941, 940, W-2/W-3, state returns, and deposit records",
      "Agency notices and bookkeeping payroll-liability balances",
    ],
    timing:
      "Recurring deadlines and agency response dates control the schedule. Correction work begins only after the affected periods and available records are confirmed.",
  },
  {
    id: "irs-notice",
    title: "IRS notice assistance",
    summary:
      "The initial scope is based on the exact notice, response deadline, tax periods, returns, records, transcript needs, and available professional authorization.",
    quoteLabel: "Quoted after notice and deadline review",
    serviceHref: "/tax-resolution",
    leadService: "IRS Notice and Tax Resolution",
    Icon: Scale,
    included: [
      "Review of the notice, deadline, tax periods, and available records",
      "Comparison with the relevant return or filing history",
      "Explanation of the initial response options and missing information",
      "Preparation of the response work specifically named in the engagement",
    ],
    separate: [
      "Missing or amended returns, bookkeeping, and transcript projects",
      "Payment arrangements, penalty requests, appeals, or collection matters",
      "Representation that requires separate authorization or another professional",
    ],
    quoteFactors: [
      "Notice type, deadline, tax periods, and procedural stage",
      "Missing returns, records, transcripts, and financial disclosures",
      "Required correspondence, calls, authorization, and follow-up",
    ],
    records: [
      "Complete notice including every page and envelope date if available",
      "Relevant return, supporting documents, payments, and prior correspondence",
      "Timeline of IRS or state contacts and any approaching deadline",
    ],
    timing:
      "Deadlines are reviewed first. Agency processing and outcomes are outside IntegraFin's control, and no relief, settlement, response time, or result is guaranteed.",
  },
  {
    id: "llc-setup",
    title: "LLC formation tax setup",
    summary:
      "The quote separates formation support, tax classification, EIN readiness, bookkeeping launch, payroll questions, and first-year compliance work.",
    quoteLabel: "Quoted after owner and entity intake",
    serviceHref: "/llc-formation-tax-setup",
    leadService: "LLC Formation and Tax Setup",
    Icon: FileText,
    included: [
      "Owner, activity, formation-state, and tax-setup intake",
      "EIN readiness and federal tax-classification workflow",
      "Bookkeeping, banking, owner-transaction, and payroll-record checklist",
      "First-year tax and accounting next-step summary",
    ],
    separate: [
      "Government fees, registered-agent costs, and software subscriptions",
      "Legal formation advice, contracts, licenses, and liability advice",
      "Elections, payroll setup, bookkeeping, and returns beyond written scope",
    ],
    quoteFactors: [
      "Owners, formation state, activity, tax treatment, and launch stage",
      "EIN, election, payroll, sales-tax, and bookkeeping needs",
      "Existing formation work and first-year deadlines",
    ],
    records: [
      "Owner and responsible-party details",
      "Available formation, EIN, election, and registered-agent records",
      "Expected activity, banking, payroll, contractor, and software plans",
    ],
    timing:
      "The plan is scheduled after the owner and formation facts are confirmed. Government approvals, legal work, and third-party processing times are outside IntegraFin's control.",
  },
];

const faqItems = [
  {
    question: "Why does IntegraFin not publish one fixed price for every service?",
    answer:
      "Tax and accounting work can differ by entity, filing year, state, transaction volume, record condition, deadlines, and required follow-up. IntegraFin reviews the relevant facts before issuing a written scope and quote.",
  },
  {
    question: "Will I receive a written quote before work begins?",
    answer:
      "The service, deliverables, client responsibilities, fees, payment terms, and important exclusions should be stated in the applicable proposal or engagement letter before the agreed work begins.",
  },
  {
    question: "Are government filing fees and software costs included?",
    answer:
      "Government charges, registered-agent fees, legal fees, software subscriptions, payment-processing costs, and other third-party charges are separate unless the written proposal expressly includes them.",
  },
  {
    question: "Can the price change after work starts?",
    answer:
      "A change in records, entities, filing periods, deadlines, or requested deliverables can change the scope. Additional work should be identified and approved before it is added.",
  },
  {
    question: "Is an initial consultation free?",
    answer:
      "Availability, whether an introductory scope call is complimentary, and what it covers are confirmed when the appointment is scheduled. A scope call is not a substitute for an engagement or individualized tax, legal, or financial advice.",
  },
  {
    question: "How do cancellation and refund terms work?",
    answer:
      "The applicable proposal or engagement letter controls cancellation, refund, credit, retainer, and completed-work terms. Review those terms before authorizing work or making payment.",
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://integrafin.tax/" },
    { "@type": "ListItem", position: 2, name: "Services", item: "https://integrafin.tax/services" },
    { "@type": "ListItem", position: 3, name: "Pricing and Scope", item: pageUrl },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="bg-primary-dark pt-28 pb-14 text-white sm:pt-32 sm:pb-18">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">
            Clear scope before engagement
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Tax and accounting service pricing and scope guide
          </h1>
          <p className="mt-6 max-w-4xl text-base leading-relaxed text-[#d7e3fc] sm:text-lg">
            IntegraFin provides a written quote after reviewing the service, records, deadlines, entities,
            filing periods, and follow-up involved. This guide explains what may be included, what normally
            requires a separate scope, and what information is needed for a useful quote.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact#contact-form"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3 font-bold text-primary-dark"
            >
              Request a written quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+18326471819"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 bg-white/10 px-7 py-3 font-bold text-white"
            >
              Call (832) 647-1819
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["1. Identify the work", "Confirm the service, entity, tax periods, states, deadlines, and immediate goal."],
            ["2. Review the records", "Check record availability, bookkeeping condition, notices, prior filings, and open questions."],
            ["3. Define the scope", "State deliverables, exclusions, responsibilities, timing dependencies, and third-party costs."],
            ["4. Approve in writing", "Review the applicable proposal or engagement terms before work and payment begin."],
          ].map(([title, description]) => (
            <article key={title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <ListChecks className="h-5 w-5 text-secondary" />
              <h2 className="mt-4 font-black text-primary-dark">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm font-semibold text-slate-500">Last reviewed: July 24, 2026</p>
      </section>

      <section className="border-y border-slate-200 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-black text-primary sm:text-4xl">Compare service scope</h2>
            <p className="mt-4 leading-relaxed text-slate-700">
              Select a service to review its likely inclusions, separate work, quote factors, records,
              and timing dependencies. The final engagement—not this page—controls the actual service and fee.
            </p>
          </div>
          <nav aria-label="Pricing guide sections" className="mt-7 flex flex-wrap gap-2">
            {serviceGuides.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-primary hover:border-secondary"
              >
                {service.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-6 py-12 sm:py-16">
        {serviceGuides.map((service) => {
          const Icon = service.Icon;
          return (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-28 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="grid gap-6 bg-primary-dark p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-secondary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="text-2xl font-black sm:text-3xl">{service.title}</h2>
                  </div>
                  <p className="mt-4 max-w-4xl leading-relaxed text-[#d7e3fc]">{service.summary}</p>
                </div>
                <p className="rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-center text-sm font-black text-secondary">
                  {service.quoteLabel}
                </p>
              </div>

              <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
                <section>
                  <h3 className="flex items-center gap-2 font-black text-primary-dark">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    May be included in the written scope
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                    {service.included.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 font-black text-primary-dark">
                    <ShieldCheck className="h-5 w-5 text-secondary" />
                    Usually separate unless stated
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                    {service.separate.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 font-black text-primary-dark">
                    <Scale className="h-5 w-5 text-secondary" />
                    What affects the quote
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                    {service.quoteFactors.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </section>
                <section>
                  <h3 className="flex items-center gap-2 font-black text-primary-dark">
                    <ClipboardCheck className="h-5 w-5 text-secondary" />
                    Helpful records for intake
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
                    {service.records.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </section>
              </div>

              <div className="border-t border-slate-200 bg-slate-50 p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-slate-700">
                  <strong className="text-primary-dark">Timing:</strong> {service.timing}
                </p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={getContactHref(service.leadService)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white"
                  >
                    Request this service quote <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href={service.serviceHref}
                    className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-primary"
                  >
                    Review full service details
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="bg-primary-dark py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-white/10 bg-white/10 p-7">
            <FileText className="h-7 w-7 text-secondary" />
            <h2 className="mt-4 text-2xl font-black">Before you approve work</h2>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#d7e3fc]">
              <li>Confirm the exact deliverables, entities, filing periods, states, and deadlines.</li>
              <li>Confirm what IntegraFin needs from you and when those records are due.</li>
              <li>Identify government, software, legal, and other third-party costs separately.</li>
              <li>Review payment, cancellation, refund, retainer, and change-of-scope terms.</li>
              <li>Do not rely on an oral estimate when the written engagement says something different.</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-white/10 bg-white/10 p-7">
            <ShieldCheck className="h-7 w-7 text-secondary" />
            <h2 className="mt-4 text-2xl font-black">Important limitations</h2>
            <p className="mt-5 text-sm leading-relaxed text-[#d7e3fc]">
              Fees do not guarantee a refund, tax savings, penalty relief, agency approval, processing time,
              clean bookkeeping result, or other outcome. Tax, accounting, payroll, formation, and notice work
              depends on accurate records, timely client decisions, applicable law, professional authorization,
              agency systems, and the written engagement.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <h2 className="text-2xl font-black text-primary sm:text-4xl">Pricing and scope FAQ</h2>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {faqItems.map((faq) => (
            <article key={faq.question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="font-black text-primary-dark">{faq.question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-primary-dark p-7 text-center text-white sm:p-10">
          <h2 className="text-2xl font-black sm:text-3xl">Request a scope review</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-[#d7e3fc]">
            Tell us the service, entity, filing periods, current records, and important deadline.
            Do not send Social Security numbers, tax documents, banking details, or account credentials
            through the public form.
          </p>
          <Link
            href="/contact#contact-form"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-lg bg-secondary px-7 py-3 font-bold text-primary-dark"
          >
            Request a written quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
