import type { Metadata } from "next";
import Link from "next/link";

const pageUrl = "https://integrafin.tax/texas/irs-notice-help-katy-tx";

export const metadata: Metadata = {
  title: "IRS Notice Help Katy TX | IntegraFin Tax & Accounting",
  description:
    "Received an IRS notice in Katy, TX? IntegraFin helps review IRS letters, organize tax records, plan response steps, and discuss payment options.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: "IRS Notice Help Katy TX | IntegraFin Tax & Accounting",
    description:
      "Nearby Katy IRS notice help for individuals, self-employed taxpayers, and small business owners who need clear next steps.",
    url: pageUrl,
  },
};

const noticeTypes = [
  "Balance due or payment request notices",
  "Return changes or correction notices",
  "Refund change or refund delay notices",
  "Identity verification letters",
  "Missing information or document request letters",
  "Business tax, payroll, or filing-status notices",
];

const noticeDetails = [
  {
    title: "CP14 balance due notice",
    description:
      "A CP14 generally says the IRS shows a balance due. Read the amount, due date, tax year, and payment instructions before deciding whether to pay, verify payments, or review payment-plan options.",
    source: "https://www.irs.gov/individuals/understanding-your-cp14-notice",
  },
  {
    title: "CP2000 income mismatch notice",
    description:
      "A CP2000 is a proposed change, not a final bill. It usually means third-party information, such as W-2, 1099, or payment records, does not match what was reported on the tax return.",
    source: "https://www.irs.gov/individuals/understanding-your-cp2000-series-notice",
  },
  {
    title: "Letter 12C missing information",
    description:
      "Letter 12C asks for more information before the IRS can finish processing a return. Common requests include missing forms, corrected schedules, income verification, withholding details, or identification information.",
    source: "https://www.irs.gov/individuals/understanding-your-letter-12c",
  },
  {
    title: "Identity verification letters",
    description:
      "Identity verification notices may mean the IRS needs to confirm whether you filed the return. Follow the exact instructions on the IRS letter before sharing information or responding.",
    source: "https://www.irs.gov/identity-theft-fraud-scams/verify-your-return",
  },
];

const firstSteps = [
  "Read the full IRS letter and find the CP or LTR notice number.",
  "Check the tax year, deadline, proposed change, and response instructions.",
  "Compare the notice with your filed return, payments, transcripts, and business records.",
  "Do not send money, documents, or amended returns until the notice instructions are clear.",
  "If you call the IRS, use the phone number shown on the notice and keep a copy of the letter nearby.",
];

const serviceSteps = [
  "Review the IRS notice and identify the issue, deadline, and requested action.",
  "Organize tax returns, transcripts, income records, payment history, bookkeeping reports, and payroll summaries.",
  "Map the response options, including correction support, document gathering, payment planning, or tax resolution next steps.",
  "Help Katy and Fort Bend County clients stay organized after the notice so future filing and bookkeeping are cleaner.",
];

const localClients = [
  "Katy small business owners who received IRS or payroll tax notices",
  "Self-employed workers and 1099 contractors with income or estimated-tax questions",
  "Families and individuals who received a balance due, refund change, or identity letter",
  "LLCs, S-Corps, partnerships, and sole proprietors with bookkeeping gaps before responding",
  "Fulshear, Richmond, Rosenberg, Sugar Land, and Fort Bend County clients who use nearby Katy-based support",
];

const documentChecklist = [
  "IRS notice or letter, including every page and envelope if available",
  "Tax return for the year shown on the notice",
  "IRS online account balance, transcript, or payment history if available",
  "Proof of payments, estimated tax payments, or extension payments",
  "W-2, 1099, K-1, brokerage, bank, or business income documents",
  "Bookkeeping reports, bank statements, and reconciliation details for business notices",
  "Payroll summaries, payroll tax filings, and state payroll records if the notice involves payroll",
  "Prior IRS letters, response confirmations, fax receipts, or mailed-document tracking",
];

const irsResources = [
  {
    href: "https://www.irs.gov/individuals/understanding-your-irs-notice-or-letter",
    label: "IRS: Understanding your IRS notice or letter",
  },
  {
    href: "https://www.irs.gov/individuals/understanding-your-cp14-notice",
    label: "IRS: Understanding your CP14 notice",
  },
  {
    href: "https://www.irs.gov/individuals/understanding-your-cp2000-series-notice",
    label: "IRS: Understanding your CP2000 notice",
  },
  {
    href: "https://www.irs.gov/individuals/understanding-your-letter-12c",
    label: "IRS: Understanding your Letter 12C",
  },
  {
    href: "https://www.irs.gov/newsroom/what-taxpayers-should-do-if-they-get-a-letter-or-notice-from-the-irs",
    label: "IRS: What to do if you get a letter or notice",
  },
  {
    href: "https://www.irs.gov/payments/online-account-for-individuals",
    label: "IRS: Online account for individuals",
  },
  {
    href: "https://www.irs.gov/individuals/get-transcript",
    label: "IRS: Get tax records and transcripts",
  },
  {
    href: "https://www.irs.gov/payments/payment-plans-installment-agreements",
    label: "IRS: Payment plans and installment agreements",
  },
  {
    href: "https://www.irs.gov/identity-theft-fraud-scams/verify-your-return",
    label: "IRS: Verify your return",
  },
];

const faqItems = [
  {
    question: "What should I do first if I receive an IRS notice in Katy, TX?",
    answer:
      "Read the full notice, find the CP or LTR number, check the deadline, and compare the notice with your tax return and payment records. IntegraFin can help organize those records and map the next step.",
  },
  {
    question: "Should I ignore an IRS notice if I think it is wrong?",
    answer:
      "No. IRS notices usually include instructions and deadlines. If the notice looks wrong, gather the notice, tax return, payment records, and supporting documents before responding.",
  },
  {
    question: "Can IntegraFin help with IRS notices for small businesses?",
    answer:
      "Yes. We help Katy-area business owners review notices, organize bookkeeping and payroll records, compare IRS information with business records, and plan the response workflow.",
  },
  {
    question: "Can you help if I owe the IRS but cannot pay in full?",
    answer:
      "Yes. We can help organize your balance information and discuss IRS payment-plan options. The IRS provides online payment agreement options for many individual taxpayers who qualify.",
  },
  {
    question: "Do you have to be in Katy to help with my IRS letter?",
    answer:
      "No. IntegraFin is based in Katy and supports nearby Fort Bend County clients, including Fulshear, Richmond, Rosenberg, Sugar Land, and surrounding areas through secure document workflows.",
  },
  {
    question: "What documents should I bring for IRS notice help?",
    answer:
      "Bring the IRS notice, the tax return for that year, payment records, IRS transcript or online account information if available, bookkeeping records, payroll reports, and any prior IRS correspondence.",
  },
  {
    question: "Can IntegraFin help me understand a CP14, CP2000, or Letter 12C?",
    answer:
      "Yes. We help review the notice type, compare it with your records, and organize the next-step documents. A CP14 may involve a balance due, a CP2000 may involve proposed income or payment changes, and Letter 12C usually asks for more information before processing can continue.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "IRS Notice Help in Katy, TX",
  serviceType: "IRS Notice Help and Tax Resolution Support",
  keywords:
    "IRS notice help Katy TX, IRS letter help Katy TX, tax resolution Katy TX, IRS tax help Fort Bend County",
  provider: {
    "@type": "AccountingService",
    name: "IntegraFin Tax & Accounting",
    url: "https://integrafin.tax",
    telephone: "+1-832-647-1819",
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
    { "@type": "City", name: "Fulshear" },
    { "@type": "City", name: "Richmond" },
    { "@type": "City", name: "Rosenberg" },
    { "@type": "City", name: "Sugar Land" },
    { "@type": "AdministrativeArea", name: "Fort Bend County" },
  ],
  description:
    "IntegraFin helps Katy and Fort Bend County clients review IRS notices, organize tax records, and plan response or payment-option next steps.",
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
      name: "IRS Notice Help Katy TX",
      item: pageUrl,
    },
  ],
};

export default function IrsNoticeHelpKatyPage() {
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
            Katy IRS Notice Support
          </p>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            IRS Notice Help in Katy, TX
          </h1>
          <p className="text-[#d7e3fc] mt-5 max-w-3xl mx-auto text-base md:text-lg">
            Received an IRS letter? IntegraFin helps Katy and Fort Bend County clients review
            the notice, organize tax records, understand response steps, and plan a practical
            path forward.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="bg-secondary text-primary-dark px-7 py-3 rounded-xl font-bold">
              Book IRS Notice Consultation
            </Link>
            <a href="tel:+18326471819" className="bg-white/10 text-white border border-white/20 px-7 py-3 rounded-xl font-bold">
              Call (832) 647-1819
            </a>
            <Link href="/services#tax-resolution" className="bg-white text-primary-dark px-7 py-3 rounded-xl font-bold">
              View Tax Resolution Services
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-12 sm:py-16">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-4">
            Quick Answer: What To Do With An IRS Notice
          </h2>
          <p className="text-slate-700 leading-relaxed">
            If you receive an IRS notice in Katy, start by reading the full letter, checking the
            notice number and deadline, and comparing the IRS statement with your return, payment
            records, and transcripts. IntegraFin can help you organize the documents and decide
            whether the next step is a correction, response, payment-plan review, or tax resolution
            workflow.
          </p>
          <p className="text-slate-500 text-sm mt-4">Last reviewed: June 15, 2026</p>
        </article>

        <div className="grid md:grid-cols-2 gap-8">
          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              Common IRS Notices We Help With
            </h2>
            <ul className="space-y-3 text-slate-700">
              {noticeTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-black text-primary mb-4">
              First Steps Before You Respond
            </h2>
            <ul className="space-y-3 text-slate-700">
              {firstSteps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            IRS Notice Types Katy Clients Ask About
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            {noticeDetails.map((notice) => (
              <div key={notice.title} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="font-bold text-primary-dark mb-2">{notice.title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">{notice.description}</p>
                <a
                  href={notice.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-primary hover:text-secondary"
                >
                  Read the IRS notice page
                </a>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            How IntegraFin Helps Katy Clients With IRS Letters
          </h2>
          <ul className="space-y-3 text-slate-700">
            {serviceSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-primary-dark rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100 text-white">
          <h2 className="text-2xl sm:text-3xl font-black mb-5">
            IRS Notice Help From Our Katy Office
          </h2>
          <p className="text-[#d7e3fc] leading-relaxed mb-5">
            IntegraFin Tax & Accounting is based at 2039 N Mason Rd, Suite 604, Katy,
            TX 77449. We support Katy, Fulshear, Richmond, Rosenberg, Sugar Land, and
            nearby Fort Bend County clients through secure document workflows and clear
            response planning.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-secondary mb-1">Office</p>
              <p>2039 N Mason Rd, Suite 604<br />Katy, TX 77449</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-secondary mb-1">Phone</p>
              <a href="tel:+18326471819" className="hover:text-secondary">(832) 647-1819</a>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <p className="font-bold text-secondary mb-1">Service Area</p>
              <p>Katy, Fulshear, Richmond, Rosenberg, Sugar Land, Fort Bend County</p>
            </div>
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            Who We Help In Katy And Fort Bend County
          </h2>
          <ul className="space-y-3 text-slate-700">
            {localClients.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-5">
            IRS Notice Document Checklist
          </h2>
          <p className="text-slate-700 mb-5 leading-relaxed">
            Bring or upload as many of these records as you have. Missing documents do not
            always stop the first review, but they help us understand the notice faster.
          </p>
          <ul className="grid md:grid-cols-2 gap-3 text-slate-700">
            {documentChecklist.map((item) => (
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
            Official IRS Resources
          </h2>
          <p className="text-slate-700 mb-5 leading-relaxed">
            These official IRS pages are useful when checking the notice number, reviewing tax
            records, or understanding payment-plan options.
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
            <Link href="/services#tax-resolution" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Tax Resolution Services
            </Link>
            <Link href="/texas-tax-accounting-services" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Texas Tax and Accounting Services
            </Link>
            <Link href="/texas/fulshear-tax-accountant" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Fulshear Tax Accountant Services
            </Link>
            <Link href="/blog/tax-resolution-options" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Tax Resolution Options
            </Link>
            <Link href="/contact" className="px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 font-semibold text-primary hover:border-secondary">
              Contact IntegraFin
            </Link>
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <article className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-black text-primary mb-6">
            IRS Notice Help FAQ
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
              Book IRS Notice Consultation
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
