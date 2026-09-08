import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  ClipboardCheck,
  FileCheck2,
  FileClock,
  FileSearch,
  FolderCheck,
  Landmark,
  Mail,
  MapPin,
  Phone,
  ReceiptText,
  Scale,
  ShieldCheck,
  WalletCards,
} from "lucide-react";
import BookkeepingCleanupReviewForm from "@/components/BookkeepingCleanupReviewForm";
import BookkeepingCleanupReviewTracking from "@/components/BookkeepingCleanupReviewTracking";
import { buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { serializeJsonLd } from "@/lib/seo/jsonLd";
import { siteConfig } from "@/lib/siteConfig";

const canonicalUrl = `${siteConfig.websiteUrl}/bookkeeping-cleanup-review`;

export const metadata: Metadata = {
  title: "Bookkeeping Cleanup Scope Review | IntegraFin Katy TX",
  description:
    "Request a bookkeeping cleanup review for behind books, unreconciled accounts, missing records, or tax-preparation readiness in Katy and Fort Bend County.",
  alternates: { canonical: canonicalUrl },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    type: "website",
    url: canonicalUrl,
    siteName: "IntegraFin",
    title: "Behind on Your Books? Get a Clear Cleanup Plan.",
    description:
      "Start with a focused review of the periods, accounts, records, and open questions that may need attention.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IntegraFin Tax & Accounting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookkeeping Cleanup Scope Review | IntegraFin",
    description: "Request a clear bookkeeping cleanup scope review from IntegraFin in Katy, Texas.",
    images: ["/og-image.jpg"],
  },
};

const problems = [
  { text: "Several months of bookkeeping are incomplete", icon: FileClock },
  { text: "Bank or credit-card accounts are not reconciled", icon: Landmark },
  { text: "Transactions are duplicated, missing, or uncategorized", icon: ReceiptText },
  { text: "Personal and business activity has become mixed", icon: WalletCards },
  { text: "Tax preparation or reporting is waiting on cleaner books", icon: CalendarClock },
];

const reviewCoverage = [
  "Periods and accounts involved",
  "Current condition of the accounting file",
  "Missing statements or supporting records",
  "Reconciliation and classification issues",
  "Immediate deadline or reporting purpose",
  "Recommended next steps and written scope",
];

const processSteps = [
  {
    title: "Submit the short request",
    text: "Share the basic business and bookkeeping situation—no documents are needed yet.",
  },
  {
    title: "Discuss the current books",
    text: "The team clarifies the periods, accounts, records, and purpose of the cleanup.",
  },
  {
    title: "Receive a written scope",
    text: "Deliverables, exclusions, fees, responsibilities, and timing dependencies are documented.",
  },
  {
    title: "Approve before work begins",
    text: "If the scope fits, approve it and continue through IntegraFin’s secure records process.",
  },
];

const trustSignals = [
  { title: "Katy, Texas office", text: "A published local office serving Katy and Fort Bend County.", icon: MapPin },
  { title: "Local and remote service", text: "Meet locally or use the remote service workflow when appropriate.", icon: Building2 },
  { title: "Documented cleanup workflow", text: "The review starts with records, accounts, periods, and open items.", icon: ClipboardCheck },
  { title: "Written scope first", text: "Services, responsibilities, fees, and timing are confirmed before work begins.", icon: FileCheck2 },
  { title: "Connected support", text: "Bookkeeping, tax, payroll-record, and business-accounting support are available under separate scopes.", icon: BadgeCheck },
];

const mayInclude = [
  "Accounting-file and statement review",
  "Catch-up categorization",
  "Bank and credit-card reconciliation repair",
  "Owner-activity separation where records allow",
  "Open-item and missing-record documentation",
  "Cleaner reports for the agreed periods",
];

const usuallySeparate = [
  "Tax-return preparation",
  "Payroll corrections or filings",
  "IRS or state notice responses",
  "Ongoing monthly bookkeeping",
  "Assurance, audit, forensic, legal, or valuation work",
];

const faqs = [
  {
    question: "Can you help if my books are more than one year behind?",
    answer:
      "Yes. IntegraFin can scope multi-period cleanup when the accounting file, statements, prior returns, and other available records can be reviewed. The amount and condition of the records determine the next step.",
  },
  {
    question: "Do I need perfect records before requesting a review?",
    answer:
      "No. Incomplete records are a common reason to request a review. The first step is identifying what exists, what is missing, and which open questions could affect the scope.",
  },
  {
    question: "Can cleanup be completed before tax preparation?",
    answer:
      "Often, but timing depends on the periods involved, available statements, file condition, deadlines, and response time for open questions. Tax preparation is a separate scope unless included in writing.",
  },
  {
    question: "Can IntegraFin continue with monthly bookkeeping afterward?",
    answer:
      "Potentially. After the cleanup scope is complete, IntegraFin can discuss a separate monthly bookkeeping scope based on the business, software, accounts, and reporting needs.",
  },
  {
    question: "How are timing and pricing determined?",
    answer:
      "They are based on the months involved, account count, transaction volume, file condition, missing records, deadlines, requested deliverables, and responsibilities on both sides. Exact terms are confirmed in a written scope.",
  },
  {
    question: "What information should I avoid submitting through this form?",
    answer:
      "Do not submit Social Security numbers, EINs, bank or card details, tax returns, passwords, login credentials, or sensitive documents. IntegraFin will confirm a secure records process if more information is needed.",
  },
] as const;

const pageSchema = buildWebPageSchema({
  url: canonicalUrl,
  name: "Bookkeeping Cleanup Scope Review",
  description:
    "A focused bookkeeping cleanup review for owner-managed businesses in Katy, Fort Bend County, and West Houston.",
});
const faqSchema = buildFaqSchema(canonicalUrl, faqs);

function SectionHeading({
  eyebrow,
  title,
  text,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  inverse?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <p className={`text-xs font-black uppercase tracking-[0.2em] ${inverse ? "text-emerald-300" : "text-[#087a55]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-black leading-[1.08] tracking-[-0.04em] sm:text-4xl lg:text-[2.75rem] ${inverse ? "text-white" : "text-[#0b213b]"}`}>
        {title}
      </h2>
      {text ? <p className={`mx-auto mt-4 max-w-2xl text-base leading-7 ${inverse ? "text-slate-300" : "text-slate-600"}`}>{text}</p> : null}
    </div>
  );
}

function RecordsReviewVisual() {
  return (
    <figure className="relative mt-9 hidden overflow-hidden rounded-3xl border border-white/15 bg-white/[0.07] p-4 shadow-2xl shadow-black/20 sm:p-5 lg:block">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-emerald-400/10 blur-2xl" aria-hidden="true" />
      <div className="relative rounded-2xl bg-[#f8faf9] p-4 text-[#142b45] sm:p-5">
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b213b] text-emerald-300">
              <FolderCheck className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.15em] text-[#087a55]">Review workspace</p>
              <p className="text-sm font-black">Bookkeeping cleanup scope</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-black text-emerald-800">Written plan</span>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            ["Periods", "Months involved", CalendarClock],
            ["Accounts", "Bank, card & loan", Landmark],
            ["Records", "Statements & support", ReceiptText],
            ["Open items", "Questions to resolve", FileSearch],
          ].map(([label, text, Icon]) => {
            const VisualIcon = Icon as typeof FileSearch;
            return (
              <div key={String(label)} className="rounded-xl border border-slate-200 bg-white p-3.5">
                <div className="flex items-center gap-3">
                  <VisualIcon className="h-4 w-4 shrink-0 text-[#087a55]" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-wide text-slate-500">{String(label)}</p>
                    <p className="text-sm font-bold text-[#142b45]">{String(text)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#0b213b] px-4 py-3 text-white">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-300" aria-hidden="true" />
          <p className="text-xs font-semibold leading-5">Next step: confirm deliverables, exclusions, fees, and timing in writing.</p>
        </div>
      </div>
      <figcaption className="relative mt-3 text-center text-[11px] font-medium text-slate-300">
        Illustrative review workflow—no client data shown.
      </figcaption>
    </figure>
  );
}

export default function BookkeepingCleanupReviewPage() {
  return (
    <main className="cleanup-review-landing min-h-screen bg-white text-slate-800">
      <BookkeepingCleanupReviewTracking />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }} />

      <header className="border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 py-3">
          <Image
            src="/images/logo1.png"
            alt="IntegraFin Tax & Accounting"
            width={168}
            height={46}
            priority
            className="h-9 w-auto sm:h-10"
          />
          <a
            href={siteConfig.contact.phoneHref}
            data-analytics-label="cleanup_review_header_phone"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 text-sm font-black text-[#0b213b] transition hover:border-[#087a55] hover:text-[#087a55] focus:outline-none focus:ring-4 focus:ring-emerald-100 sm:px-5"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Call </span>{siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0b213b] px-4 py-10 text-white sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="absolute inset-0 cleanup-review-grid opacity-25" aria-hidden="true" />
        <div className="absolute left-[-8rem] top-[-10rem] h-96 w-96 rounded-full bg-emerald-500/15 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(30rem,.98fr)] lg:items-start">
          <div className="pt-2 lg:pt-8">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-emerald-200">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Katy &amp; Fort Bend bookkeeping support
            </p>
            <h1 className="mt-6 max-w-3xl text-[2.65rem] font-black leading-[1.02] tracking-[-0.055em] text-white sm:text-6xl lg:text-[4.25rem]">
              Behind on Your Books? <span className="text-emerald-300">Get a Clear Cleanup Plan.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
              IntegraFin helps Katy and Fort Bend business owners identify missing records, unreconciled accounts, and the practical steps needed to organize their books before tax preparation, lending, or important business decisions.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#bookkeeping-review-form"
                data-analytics-label="cleanup_review_hero_cta"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#11a36d] px-6 py-3.5 font-black text-white shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#18b77c] focus:outline-none focus:ring-4 focus:ring-emerald-300/40"
              >
                Request My Bookkeeping Review <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-slate-300 sm:justify-start">
                <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden="true" /> No public document upload
              </span>
            </div>
            <p className="mt-5 text-sm font-bold leading-6 text-slate-200">
              Katy office <span className="px-1.5 text-emerald-300">•</span> Local and remote appointments <span className="px-1.5 text-emerald-300">•</span> Written scope before work begins
            </p>
            <RecordsReviewVisual />
          </div>

          <aside className="scroll-mt-4 rounded-3xl border border-white/20 bg-white p-5 text-slate-800 shadow-2xl shadow-black/30 sm:p-7 lg:p-8" aria-labelledby="review-form-title">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#087a55]">Start with the essentials</p>
            <h2 id="review-form-title" className="mt-2 text-2xl font-black leading-tight tracking-[-0.035em] text-[#0b213b] sm:text-3xl">
              Request a bookkeeping cleanup scope review
            </h2>
            <p className="mb-5 mt-3 text-sm leading-6 text-slate-600">
              Tell us what needs attention. The team will review the request before any work or pricing is confirmed.
            </p>
            <BookkeepingCleanupReviewForm />
          </aside>
        </div>
      </section>

      <section className="bg-[#f4f7f6] px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Common situations"
            title="Does This Sound Like Your Bookkeeping?"
            text="These are common recordkeeping situations—not assumptions about your business."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {problems.map(({ text, icon: Icon }, index) => (
              <article key={text} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-[#087a55]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-black text-slate-300">0{index + 1}</span>
                </div>
                <h3 className="mt-5 text-base font-black leading-6 text-[#142b45]">{text}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#087a55]">What the review covers</p>
            <h2 className="mt-3 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-[#0b213b] sm:text-4xl lg:text-[2.75rem]">
              Start With a Clear Review of What Needs Attention
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              The initial review is used to understand the bookkeeping situation and prepare a practical written scope. It is not an automatic engagement or a guaranteed completion date.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {reviewCoverage.map((item) => (
              <li key={item} className="flex min-h-20 items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[#087a55]">
                  <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                </span>
                <span className="font-bold leading-6 text-[#142b45]">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-[#0b213b] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Four clear steps"
            title="From Request to an Approved Scope"
            text="Submitting the form starts a review. Bookkeeping work begins only after the written scope is approved."
            inverse
          />
          <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/15 bg-white/[0.06] p-5 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-300 text-sm font-black text-[#0b213b]">{index + 1}</span>
                <h3 className="mt-5 text-lg font-black text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why IntegraFin"
            title="A Transparent Starting Point for Behind Books"
            text="Trust comes from a published office, a documented process, and clear scope boundaries—not exaggerated promises."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {trustSignals.map(({ title, text, icon: Icon }) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-5">
                <Icon className="h-6 w-6 text-[#087a55]" aria-hidden="true" />
                <h3 className="mt-4 font-black text-[#142b45]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f6] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Scope clarity"
            title="Know What May Be Included—and What Usually Is Separate"
          />
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-[#087a55]">
                  <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-black text-[#0b213b]">The cleanup scope may include</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {mayInclude.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#087a55]" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-[#455b73]">
                  <Scale className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-black text-[#0b213b]">Usually separate unless included in writing</h3>
              </div>
              <ul className="mt-6 space-y-3">
                {usuallySeparate.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" /> {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
          <p className="mx-auto mt-6 max-w-5xl rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm leading-6 text-slate-600">
            Submission does not guarantee eligibility, completion time, tax results, financing approval, or a specific price. Exact deliverables, pricing, responsibilities, and timing are confirmed in a written scope.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionHeading eyebrow="Frequently asked questions" title="Straight Answers Before You Request a Review" />
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 open:border-emerald-300 open:shadow-lg open:shadow-slate-200/50" open={index === 0}>
                <summary className="flex min-h-8 cursor-pointer list-none items-center justify-between gap-4 font-black text-[#142b45] marker:hidden">
                  {faq.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-[#087a55] transition group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="mt-4 border-t border-slate-100 pt-4 text-sm leading-6 text-slate-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eaf7f1] px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <CircleDollarSign className="mx-auto h-10 w-10 text-[#087a55]" aria-hidden="true" />
          <h2 className="mt-5 text-3xl font-black leading-[1.08] tracking-[-0.04em] text-[#0b213b] sm:text-4xl lg:text-5xl">
            Ready to Understand What Your Books Need?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Start with a focused review, then decide whether the written scope fits your business and deadline.
          </p>
          <a
            href="#bookkeeping-review-form"
            data-analytics-label="cleanup_review_final_cta"
            className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#087a55] px-7 py-3.5 font-black text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#056344] focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Request My Bookkeeping Review <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-5 text-sm text-slate-600">
            Prefer phone support during business hours?{" "}
            <a href={siteConfig.contact.phoneHref} data-analytics-label="cleanup_review_final_phone" className="font-black text-[#0b213b] underline decoration-emerald-400 underline-offset-4">
              Call {siteConfig.contact.phoneDisplay}
            </a>
          </p>
        </div>
      </section>

      <footer className="bg-[#08192d] px-4 py-9 text-slate-300 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-7 sm:grid-cols-[1.2fr_1fr_auto] sm:items-start">
          <div>
            <p className="font-black text-white">{siteConfig.legalName}</p>
            <p className="mt-2 text-sm leading-6">{siteConfig.office.street}<br />{siteConfig.office.cityStatePostal}</p>
          </div>
          <div className="space-y-2 text-sm">
            <a href={siteConfig.contact.phoneHref} data-analytics-label="cleanup_review_footer_phone" className="flex items-center gap-2 hover:text-white">
              <Phone className="h-4 w-4 text-emerald-300" aria-hidden="true" /> {siteConfig.contact.phoneDisplay}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="h-4 w-4 text-emerald-300" aria-hidden="true" /> {siteConfig.contact.email}
            </a>
          </div>
          <div className="flex gap-4 text-sm">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
