import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://integrafin.tax/texas/katy-bookkeeping-services";

export const metadata: Metadata = {
  title: "Bookkeeping Services Katy TX | Small Business | IntegraFin",
  description:
    "Need bookkeeping services in Katy, TX? IntegraFin helps with monthly bookkeeping, cleanup, reconciliations, and tax-ready reports. Book a consultation.",
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Bookkeeping Services Katy TX | Small Business | IntegraFin",
    description:
      "Katy bookkeeping services for small businesses that need monthly support, cleanup, reconciliations, and tax-ready reports.",
    url: pageUrl,
  },
};

const serviceHighlights = [
  {
    title: "Monthly bookkeeping",
    description:
      "Keep income, expenses, accounts, and reports organized each month so tax season does not become a scramble.",
  },
  {
    title: "Bookkeeping cleanup",
    description:
      "Fix messy categories, missing reconciliations, duplicate entries, old balances, and incomplete business records.",
  },
  {
    title: "Tax-ready records",
    description:
      "Prepare cleaner profit and loss reports, balance sheet details, owner records, and supporting documents for filing and planning.",
  },
];

const monthlyWorkflow = [
  "Review bank, credit card, loan, payroll, and payment-processor activity.",
  "Categorize transactions based on your business operations and available support.",
  "Reconcile business accounts so reports match bank and card statements.",
  "Flag missing receipts, unusual activity, owner draws, payroll records, or tax-sensitive items.",
  "Prepare practical reports your tax preparer, lender, or management team can actually use.",
];

const cleanupSteps = [
  "Review the current accounting file, bank activity, chart of accounts, and prior-year return.",
  "Find unreconciled accounts, duplicate transactions, uncategorized expenses, and old balance issues.",
  "Separate business activity from personal or owner activity where records allow.",
  "Organize sales, contractor, payroll, loan, equipment, and tax payment records before filing season.",
  "Create a go-forward bookkeeping rhythm so the same cleanup problem does not repeat every year.",
];

const commonScenarios = [
  {
    title: "Books are behind before tax filing",
    description:
      "A Katy business owner has bank statements, receipts, and sales deposits, but the accounting file is not reconciled and the tax return cannot move forward confidently.",
  },
  {
    title: "Owner draws and personal expenses are mixed",
    description:
      "A local LLC needs help separating owner activity from business activity so reports are easier to review before tax planning or filing.",
  },
  {
    title: "Payroll and contractor records need cleanup",
    description:
      "A growing service business needs payroll summaries, contractor payments, and bookkeeping reports to line up before year-end review.",
  },
  {
    title: "IRS or Texas notice needs better records",
    description:
      "A business receives a notice and needs income, expense, payroll, or payment records organized before deciding the next response step.",
  },
];

const whoWeHelp = [
  "Katy LLCs, S-Corps, partnerships, and sole proprietors",
  "Real estate, construction, consulting, healthcare, ecommerce, and local service businesses",
  "Self-employed professionals and 1099 workers with mixed income streams",
  "New business owners setting up bookkeeping before the first tax filing",
  "Established businesses with books that are behind, messy, or hard to trust",
  "Fulshear, Richmond, Rosenberg, Sugar Land, Cinco Ranch, and Fort Bend County clients near Katy",
];

const whyChoose = [
  "Katy-based tax and accounting support with one workflow for books, filing records, payroll details, and IRS notice preparation",
  "Plain-English cleanup priorities so you know what is missing, what can be fixed, and what should be handled before tax season",
  "Monthly bookkeeping rhythm that supports better decisions instead of once-a-year record scrambling",
  "Local Fort Bend County service coverage without claiming fake offices in nearby cities",
  "Direct connection between bookkeeping, tax preparation, tax planning, and business advisory conversations",
];

const recordsChecklist = [
  "Business bank and credit card statements",
  "Accounting software access, exports, or prior reports",
  "Invoices, sales reports, merchant deposits, and payment processor statements",
  "Receipts, bills, vendor records, and contractor payment details",
  "Payroll summaries, payroll tax filings, and employee or contractor records",
  "Loan statements, equipment purchases, asset records, and lease documents",
  "Prior-year tax return and current-year estimated tax payment records",
  "IRS, Texas, sales tax, payroll, or franchise tax notices if any are open",
];

const reviewDetails = {
  reviewer: "IntegraFin Tax & Accounting team",
  date: "June 16, 2026",
};

const localSignals = [
  {
    label: "Office",
    value: "2039 N Mason Rd, Suite 604, Katy, TX 77449",
  },
  {
    label: "Phone",
    value: "(832) 647-1819",
  },
  {
    label: "Service Area",
    value: "Katy, Fulshear, Richmond, Rosenberg, Sugar Land, Cinco Ranch, and Fort Bend County",
  },
];

const irsResources = [
  {
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping",
    label: "IRS: Recordkeeping for small businesses",
  },
  {
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/why-should-i-keep-records",
    label: "IRS: Why businesses should keep records",
  },
  {
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep",
    label: "IRS: What kind of records to keep",
  },
  {
    href: "https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records",
    label: "IRS: How long to keep records",
  },
  {
    href: "https://www.irs.gov/taxtopics/tc305",
    label: "IRS Topic 305: Recordkeeping",
  },
  {
    href: "https://www.irs.gov/forms-pubs/about-publication-583",
    label: "IRS Publication 583: Starting a Business and Keeping Records",
  },
];

const faqItems = [
  {
    question: "Do you provide monthly bookkeeping services in Katy, TX?",
    answer:
      "Yes. IntegraFin provides monthly bookkeeping support for Katy-area small businesses, including transaction review, account reconciliation, reporting, and tax-season record organization.",
  },
  {
    question: "Can you clean up bookkeeping that is behind before tax filing?",
    answer:
      "Yes. We can review the accounting file, bank activity, old reports, and prior-year records to identify missing reconciliations, uncategorized transactions, duplicate entries, and record gaps before filing.",
  },
  {
    question: "Can you help with QuickBooks bookkeeping cleanup?",
    answer:
      "Yes. We can review QuickBooks records, exports, and reports as part of a cleanup or monthly bookkeeping workflow. The goal is to make the file easier to reconcile, review, and use for tax preparation.",
  },
  {
    question: "What records do I need for bookkeeping cleanup?",
    answer:
      "Start with bank and credit card statements, accounting software access or exports, invoices, receipts, payroll records, sales reports, loan statements, prior-year returns, and any IRS or state notices.",
  },
  {
    question: "Do you help LLCs, S-Corps, and self-employed workers?",
    answer:
      "Yes. We support Katy LLCs, S-Corps, partnerships, sole proprietors, and self-employed professionals who need cleaner records for tax filing, planning, and business decisions.",
  },
  {
    question: "Can bookkeeping help if I received an IRS notice?",
    answer:
      "Good bookkeeping can make notice review easier because records are organized by income, expenses, payroll, payments, and supporting documents. IntegraFin can connect bookkeeping cleanup with IRS notice response planning when needed.",
  },
  {
    question: "Do I have to visit the Katy office in person?",
    answer:
      "No. IntegraFin is based in Katy, but many bookkeeping workflows can be handled through an organized document process, calls, and scheduled check-ins.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Bookkeeping Services in Katy, TX",
  serviceType: "Small Business Bookkeeping and Bookkeeping Cleanup",
  keywords:
    "bookkeeping services Katy TX, small business bookkeeping Katy TX, bookkeeping cleanup Katy TX, QuickBooks bookkeeping Katy TX",
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
    { "@type": "City", name: "Katy" },
    { "@type": "Place", name: "Cinco Ranch" },
    { "@type": "City", name: "Fulshear" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Rosenberg" },
    { "@type": "City", name: "Sugar Land" },
    { "@type": "AdministrativeArea", name: "Fort Bend County" },
  ],
  description:
    "IntegraFin provides Katy bookkeeping services for small businesses that need monthly bookkeeping, cleanup, reconciliations, reporting, and tax-ready records.",
  url: pageUrl,
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
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://integrafin.tax/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Texas Tax and Accounting Services",
      item: "https://integrafin.tax/texas-tax-accounting-services",
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Bookkeeping Services Katy TX",
      item: pageUrl,
    },
  ],
};

export default function KatyBookkeepingServicesPage() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="bg-primary-dark pt-28 sm:pt-32 pb-14 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-secondary text-xs font-black tracking-[0.2em] uppercase mb-3">
            Katy Small Business Bookkeeping
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Bookkeeping Services in Katy, TX
          </h1>
          <p className="text-[#d7e3fc] mt-5 max-w-3xl mx-auto text-base md:text-lg">
            IntegraFin helps Katy and Fort Bend County businesses clean up old books, reconcile
            accounts, organize records, and keep reports tax-ready through practical monthly
            bookkeeping support.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-secondary text-primary-dark px-7 py-3 rounded-xl font-bold">
              Book Bookkeeping Consultation
            </Link>
            <a href="tel:+18326471819" className="bg-white/10 text-white border border-white/20 px-7 py-3 rounded-xl font-bold">
              Call (832) 647-1819
            </a>
            <Link href="/services#business" className="bg-white text-primary-dark px-7 py-3 rounded-xl font-bold">
              View Business Services
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4">
            Quick Answer: Bookkeeping Services Katy TX
          </h2>
          <p className="text-slate-700 leading-relaxed">
            Bookkeeping services in Katy, TX should make your business records easier to trust.
            IntegraFin helps organize income and expense activity, reconcile accounts, prepare
            useful reports, identify missing records, and keep business books ready for tax
            preparation, planning, lending questions, and IRS notice review.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Last reviewed: {reviewDetails.date} by {reviewDetails.reviewer}.
          </p>
        </article>

        <div className="grid md:grid-cols-3 gap-6">
          {serviceHighlights.map((item) => (
            <article key={item.title} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="text-xl font-black text-primary mb-3">{item.title}</h2>
              <p className="text-slate-700 text-sm leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Monthly Bookkeeping Workflow
          </h2>
          <p className="text-slate-700 mb-5 leading-relaxed">
            A steady monthly process helps prevent year-end confusion. IRS recordkeeping guidance
            connects clean records with stronger business monitoring, clearer financial reports,
            better income and expense support, smoother return preparation, and proof for tax-return
            items. See the official{" "}
            <a
              href="https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-secondary"
            >
              IRS recordkeeping guidance
            </a>
            .
          </p>
          <ul className="space-y-3 text-slate-700">
            {monthlyWorkflow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Bookkeeping Cleanup Before Tax Preparation
          </h2>
          <p className="text-slate-700 mb-5 leading-relaxed">
            If your books are behind, cleanup comes before confident filing and planning. IntegraFin
            focuses on practical cleanup steps that help your tax records become easier to review.
          </p>
          <div className="grid md:grid-cols-2 gap-3">
            {cleanupSteps.map((item) => (
              <div key={item} className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Common Katy Bookkeeping Scenarios
          </h2>
          <p className="text-slate-700 mb-5 leading-relaxed">
            These are the situations where a focused bookkeeping cleanup or monthly bookkeeping
            rhythm can make the next tax conversation much clearer.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {commonScenarios.map((scenario) => (
              <div key={scenario.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold text-primary-dark mb-2">{scenario.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{scenario.description}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-primary-dark rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100 text-white">
          <h2 className="text-2xl sm:text-3xl font-black mb-5">
            Katy-Based Bookkeeping For Fort Bend Businesses
          </h2>
          <p className="text-[#d7e3fc] leading-relaxed mb-5">
            IntegraFin Tax & Accounting is based in Katy and supports nearby business owners with
            bookkeeping, tax preparation, IRS notice help, and year-round record organization.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {localSignals.map((signal) => (
              <div key={signal.label} className="bg-white/10 rounded-xl p-4">
                <p className="font-bold text-secondary mb-1">{signal.label}</p>
                {signal.label === "Phone" ? (
                  <a href="tel:+18326471819" className="hover:text-secondary">{signal.value}</a>
                ) : (
                  <p>{signal.value}</p>
                )}
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Why Choose IntegraFin For Katy Bookkeeping
          </h2>
          <ul className="space-y-3 text-slate-700">
            {whyChoose.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Who We Help
          </h2>
          <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
            {whoWeHelp.map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Bookkeeping Records Checklist
          </h2>
          <p className="text-slate-700 mb-5 leading-relaxed">
            Bring or upload whatever you have. Missing records are common during cleanup, and the
            first review helps identify what still needs to be collected.
          </p>
          <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
            {recordsChecklist.map((item) => (
              <li key={item} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                {item}
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Official IRS Recordkeeping Resources
          </h2>
          <p className="text-slate-700 mb-5 leading-relaxed">
            These official IRS pages are useful when checking what records to keep, why records
            matter, and how business records support tax filings or IRS questions.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {irsResources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary"
              >
                {resource.label}
              </a>
            ))}
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Helpful IntegraFin Pages
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Katy Tax Accountant Services
            </Link>
            <Link href="/texas/irs-notice-help-katy-tx" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              IRS Notice Help Katy TX
            </Link>
            <Link href="/texas-tax-accounting-services" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Texas Tax and Accounting Services
            </Link>
            <Link href="/texas/fulshear-tax-accountant" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Fulshear Tax Accountant Services
            </Link>
            <Link href="/services#business" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Business Tax and Accounting Services
            </Link>
            <Link href="/blog/small-business-accounting-tips" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Small Business Accounting Tips
            </Link>
            <Link href="/blog/payroll-best-practices" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Payroll Best Practices
            </Link>
            <Link href="/tax-calculator" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              1099 and Federal Tax Calculator
            </Link>
            <Link href="/contact" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Book A Bookkeeping Consultation
            </Link>
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-6">
            Katy Bookkeeping FAQ
          </h2>
          <div className="space-y-6">
            {faqItems.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-bold text-primary-dark">{faq.question}</h3>
                <p className="text-slate-700 mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/contact" className="inline-block bg-primary text-white px-7 py-3 rounded-xl font-bold text-center">
              Book Bookkeeping Consultation
            </Link>
            <a href="tel:+18326471819" className="inline-block bg-secondary text-primary-dark px-7 py-3 rounded-xl font-bold text-center">
              Call (832) 647-1819
            </a>
            <Link href="/services" className="inline-block bg-white border border-slate-300 text-primary px-7 py-3 rounded-xl font-bold text-center">
              View All Services
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
