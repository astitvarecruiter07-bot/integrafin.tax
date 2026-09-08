import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  CircleX,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  Gauge,
  Layers3,
  LockKeyhole,
  MessageSquareText,
  Phone,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildWebPageSchema,
  organizationRef,
} from "@/lib/seo/schema";
import { serializeJsonLd } from "@/lib/seo/jsonLd";

const pageUrl = "https://integrafin.tax/outsourced-accounting-for-cpa-ea-firms";
const leadService = "Outsourced Accounting for CPA and EA Firms" as const;

export const metadata: Metadata = {
  title: "Outsourced Accounting for CPA & EA Firms | IntegraFin",
  description:
    "Add flexible bookkeeping, tax preparation, payroll, and compliance capacity to your CPA or EA firm—without a long hiring cycle or losing control of client work.",
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Stop Letting Capacity Limit Your Accounting Firm",
    description:
      "A pilot-first outsourced delivery team for bookkeeping, tax preparation, payroll, and compliance workflows.",
    url: pageUrl,
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "IntegraFin outsourced accounting support for CPA and EA firms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop Letting Capacity Limit Your Accounting Firm",
    description:
      "Flexible bookkeeping, tax preparation, payroll, and compliance capacity for CPA and EA firms.",
    images: ["/og-image.jpg"],
  },
};

const services = [
  {
    icon: BookOpenCheck,
    title: "Bookkeeping production",
    promise: "Move recurring books through a consistent close workflow.",
    items: [
      "Monthly and catch-up bookkeeping",
      "Bank and credit-card reconciliations",
      "Cleanup, open items, and review notes",
      "Tax-ready reporting packages",
    ],
  },
  {
    icon: FileCheck2,
    title: "Tax preparation support",
    promise: "Give reviewers a cleaner, more complete file to review.",
    items: [
      "Source-document organization",
      "Workpapers and trial-balance mapping",
      "Draft individual and business returns",
      "Missing-item and reviewer-note tracking",
    ],
  },
  {
    icon: ReceiptText,
    title: "Payroll support",
    promise: "Keep payroll records and filing packages organized.",
    items: [
      "Payroll-to-ledger reconciliation",
      "Quarterly and year-end workpapers",
      "W-2 and 1099 workflow support",
      "Exception and notice follow-up support",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "Compliance coordination",
    promise: "Make deadlines and missing information visible earlier.",
    items: [
      "Due-date and status tracking",
      "Document request follow-up",
      "Firm-approved checklists",
      "Filing-package preparation support",
    ],
  },
] as const;

const valueLevers = [
  {
    icon: Target,
    label: "Desired outcome",
    title: "Accept good-fit work with confidence",
    description: "Add production capacity without immediately adding permanent headcount.",
  },
  {
    icon: ShieldCheck,
    label: "Confidence",
    title: "Review-ready, visible workflows",
    description: "Use documented steps, open-item tracking, and defined review checkpoints.",
  },
  {
    icon: Clock3,
    label: "Time to value",
    title: "Start with one controlled pilot",
    description: "Prove the handoff on a defined workload before expanding the engagement.",
  },
  {
    icon: Gauge,
    label: "Owner effort",
    title: "Fit into the systems you already use",
    description: "Build around approved software, permissions, and firm operating standards.",
  },
] as const;

const processSteps = [
  {
    number: "01",
    title: "Diagnose the bottleneck",
    description:
      "We map the work type, volume, software, deadlines, review process, and the point where work currently slows down.",
  },
  {
    number: "02",
    title: "Design the pilot",
    description:
      "Together, we choose a practical batch and define deliverables, access, owners, escalation rules, and acceptance criteria.",
  },
  {
    number: "03",
    title: "Prove the handoff",
    description:
      "Your team reviews the output and gives feedback while both sides refine instructions, workpapers, and communication rhythm.",
  },
  {
    number: "04",
    title: "Scale what works",
    description:
      "Once the workflow is accepted, capacity can expand against the agreed schedule, scope, and review controls.",
  },
] as const;

const faqs = [
  {
    question: "Will our firm lose control of the client relationship?",
    answer:
      "No. The engagement can operate as behind-the-scenes production support. Your firm owns the client relationship, engagement terms, technical decisions, fees, review, approval, and final communication. Any direct client interaction must be agreed in writing first.",
  },
  {
    question: "Who is responsible for reviewing and signing tax returns?",
    answer:
      "Your firm’s appropriately credentialed professionals retain responsibility for supervision, technical review, professional judgment, approval, signature, and filing. IntegraFin supports preparation and workflow tasks within the written scope.",
  },
  {
    question: "Do we have to outsource an entire service line?",
    answer:
      "No. A defined client group, work type, monthly batch, or seasonal queue can be used as the starting point. The goal is to prove one handoff before adding complexity or volume.",
  },
  {
    question: "Can IntegraFin work inside our existing software?",
    answer:
      "Platform fit is confirmed during discovery based on your stack, licensing, access controls, and workflow. The operating model is built around firm-approved systems wherever practical.",
  },
  {
    question: "How is sensitive client information handled?",
    answer:
      "Before production, both teams define approved systems, user permissions, document-transfer methods, confidentiality expectations, and access removal. Do not send tax returns, Social Security numbers, bank details, or client files through the public inquiry form.",
  },
  {
    question: "How is the engagement priced?",
    answer:
      "Pricing depends on service type, volume, record condition, software, turnaround, review cycles, communication needs, and seasonality. Scope and fees are confirmed in writing after those factors are reviewed.",
  },
] as const;

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${pageUrl}#service`,
  name: "Outsourced Accounting Support for CPA and EA Firms",
  serviceType: [
    "Outsourced bookkeeping support",
    "Tax preparation support",
    "Payroll support",
    "Accounting compliance support",
  ],
  description:
    "Pilot-first bookkeeping, tax preparation, payroll, and compliance workflow support for CPA and EA firms across the United States.",
  url: pageUrl,
  provider: organizationRef,
  areaServed: { "@type": "Country", name: "United States" },
  audience: {
    "@type": "ProfessionalAudience",
    audienceType: "CPA firms, enrolled agent firms, and accounting practices",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
  { name: "Home", item: "https://integrafin.tax/" },
  { name: "Services", item: "https://integrafin.tax/services" },
  { name: "Outsourced Accounting for CPA and EA Firms", item: pageUrl },
]);

const webPageSchema = buildWebPageSchema({
  url: pageUrl,
  name: "Outsourced Accounting for CPA and EA Firms",
  description:
    "Flexible bookkeeping, tax preparation, payroll, and compliance production support for CPA and EA firms.",
  mainEntityId: `${pageUrl}#service`,
});

const faqSchema = buildFaqSchema(pageUrl, faqs);

function PrimaryCta({ className = "" }: { className?: string }) {
  return (
    <a
      href="#capacity-assessment"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-secondary px-7 py-4 text-base font-black text-primary-dark shadow-[0_14px_35px_rgba(0,194,203,0.25)] transition hover:-translate-y-0.5 hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-200/40 ${className}`}
    >
      Request my capacity assessment
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

export default function OutsourcedAccountingForFirmsPage() {
  return (
    <main className="firm-outsourcing-landing min-h-screen bg-[#f6f8fc] pb-20 text-slate-800 md:pb-0">
      {[serviceSchema, breadcrumbSchema, webPageSchema, faqSchema].map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
        />
      ))}

      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link href="/" aria-label="IntegraFin home">
            <Image
              src="/images/logo1.png"
              alt="IntegraFin Tax and Accounting"
              width={150}
              height={40}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>
          <div className="flex items-center gap-3">
            <a
              href="tel:+18326471819"
              className="hidden items-center gap-2 text-sm font-black text-primary-dark hover:text-primary sm:inline-flex"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> (832) 647-1819
            </a>
            <a
              href="#capacity-assessment"
              className="inline-flex items-center justify-center rounded-lg bg-primary-dark px-4 py-2.5 text-sm font-black text-white transition hover:bg-primary"
            >
              Check firm fit
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-primary-dark py-14 text-white sm:py-20 lg:py-24">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -right-36 -top-32 h-[34rem] w-[34rem] rounded-full border border-cyan-300/40" />
          <div className="absolute -right-10 top-0 h-80 w-80 rounded-full border border-cyan-300/25" />
          <div className="absolute bottom-0 left-0 h-48 w-full bg-gradient-to-t from-blue-950/50 to-transparent" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-cyan-200">
              <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              For CPA &amp; EA firm owners
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl xl:text-7xl">
              Stop letting your team’s capacity cap your firm’s growth.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100 sm:text-xl">
              Plug a documented production team into your existing workflow for bookkeeping,
              tax preparation, payroll, and compliance support—while your firm keeps the client,
              the review, and the final word.
            </p>

            <ul className="mt-7 grid gap-3 text-sm font-bold text-white sm:grid-cols-3">
              {[
                "Start with one pilot",
                "Use your approved systems",
                "Scale only what works",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-4 py-3">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <PrimaryCta />
              <p className="mt-3 text-sm font-semibold text-blue-200">
                No client files needed. Start with your workflow, volume, and bottleneck.
              </p>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-white/15 bg-white/[0.09] p-5 shadow-2xl backdrop-blur-md sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.17em] text-cyan-300">The offer</p>
                <h2 className="mt-2 text-2xl font-black sm:text-3xl">The Firm Capacity System</h2>
              </div>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary-dark">
                <Layers3 className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {[
                [BookOpenCheck, "Bookkeeping queue", "Recurring close and cleanup support"],
                [FileCheck2, "Tax prep queue", "Workpapers, drafts, and open items"],
                [ReceiptText, "Payroll queue", "Reconciliation and package support"],
                [ClipboardCheck, "Compliance queue", "Deadlines, checklists, and follow-up"],
              ].map(([Icon, title, detail]) => (
                <div key={title as string} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-cyan-300">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-black">{title as string}</p>
                    <p className="mt-0.5 text-sm leading-5 text-blue-100">{detail as string}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-4">
              <p className="flex items-center gap-2 text-sm font-black text-cyan-200">
                <Sparkles className="h-4 w-4" aria-hidden="true" /> The first win
              </p>
              <p className="mt-2 text-sm leading-6 text-white">
                A clearly scoped pilot your reviewers can evaluate before you add more work.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-7">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
          {[
            [ShieldCheck, "Firm stays in control"],
            [Workflow, "Documented handoffs"],
            [MessageSquareText, "Visible open items"],
            [Users, "Flexible production capacity"],
          ].map(([Icon, text]) => (
            <div key={text as string} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
              <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm font-black text-primary-dark">{text as string}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-blue">The real constraint</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-primary-dark sm:text-4xl lg:text-5xl">
            You may not have a lead problem. You may have a fulfillment bottleneck.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            When skilled people are buried in repeatable production, every new client creates a
            tradeoff: delay the work, overload the team, or turn away revenue. A defined delivery
            layer gives partners and managers more room to review, advise, and lead.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            [Clock3, "Review gets squeezed", "Production runs late, so managers review under deadline pressure instead of on a predictable cadence."],
            [Users, "Senior talent does junior work", "Partners and managers spend expensive hours chasing documents, updating workpapers, and clearing routine items."],
            [CircleX, "Growth feels dangerous", "The firm hesitates to market, cross-sell, or accept good-fit clients because delivery is already at capacity."],
          ].map(([Icon, title, description]) => (
            <article key={title as string} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-700">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-black text-primary-dark">{title as string}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description as string}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-blue">A stronger value equation</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-primary-dark sm:text-4xl">
              More capacity is valuable only when it feels controllable.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The operating model is designed to improve the outcome and confidence while reducing
              the time and management effort required to test the relationship.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {valueLevers.map(({ icon: Icon, label, title, description }) => (
              <article key={label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
                <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-brand-blue">{label}</p>
                <h3 className="mt-2 text-lg font-black leading-6 text-primary-dark">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <PrimaryCta />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-blue">The delivery stack</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-primary-dark sm:text-4xl">
              One capacity partner. Four production queues.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Start with the queue creating the most drag. Add another only when the first handoff
              meets your firm’s documented expectations.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {services.map(({ icon: Icon, title, promise, items }) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-dark text-cyan-300">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-black text-primary-dark">{title}</h3>
                <p className="mt-2 font-bold leading-6 text-primary">{promise}</p>
                <ul className="mt-5 grid gap-3 border-t border-slate-200 pt-5 text-sm text-slate-700">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[3] text-brand-blue" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary-dark py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-300">The risk-reduction mechanism</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Don’t outsource the whole department. Prove one handoff.
            </h2>
            <p className="mt-5 text-lg leading-8 text-blue-100">
              A controlled pilot lets your reviewers judge the work, communication, and process
              against an agreed standard before the engagement expands.
            </p>
          </div>

          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step) => (
              <li key={step.number} className="rounded-3xl border border-white/15 bg-white/[0.08] p-6">
                <span className="text-sm font-black tracking-[0.16em] text-cyan-300">{step.number}</span>
                <h3 className="mt-4 text-xl font-black">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.15em] text-emerald-800">Strong fit</p>
              <h2 className="mt-3 text-2xl font-black text-primary-dark">This works best when your firm…</h2>
              <ul className="mt-6 grid gap-4 text-slate-700">
                {[
                  "Has a repeatable service with identifiable volume",
                  "Can name an internal owner and reviewer",
                  "Is willing to document standards and give pilot feedback",
                  "Wants a long-term operating solution, not an invisible shortcut",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <p className="text-sm font-black uppercase tracking-[0.15em] text-amber-800">Not the right fit</p>
              <h2 className="mt-3 text-2xl font-black text-primary-dark">This is not designed for firms that…</h2>
              <ul className="mt-6 grid gap-4 text-slate-700">
                {[
                  "Want to transfer professional responsibility or final review",
                  "Cannot provide approved access, instructions, or an escalation owner",
                  "Expect undefined work to be completed without a written scope",
                  "Need a guarantee before records and workflow are reviewed",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CircleX className="mt-0.5 h-5 w-5 shrink-0 text-amber-800" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-8 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.15em] text-brand-blue">Non-negotiable</p>
                <h2 className="mt-2 text-2xl font-black text-primary-dark">Your firm keeps the final word.</h2>
              </div>
              <p className="leading-7 text-slate-700">
                Your appropriately credentialed professionals retain supervision, technical judgment,
                review, approval, signature, filing authority, and responsibility to clients and regulators.
                IntegraFin performs only the production and workflow support defined in writing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="text-center">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-brand-blue">Objections, answered</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-primary-dark sm:text-4xl">
            What firm owners ask before the first call.
          </h2>
        </div>

        <div className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm open:border-blue-300 sm:p-6">
              <summary className="cursor-pointer list-none pr-8 text-lg font-black text-primary-dark marker:hidden">
                {faq.question}
              </summary>
              <p className="mt-4 max-w-4xl leading-7 text-slate-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section id="capacity-assessment" className="scroll-mt-24 bg-[#071d42] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary-dark">
              <LockKeyhole className="h-6 w-6" aria-hidden="true" />
            </div>
            <p className="mt-7 text-sm font-black uppercase tracking-[0.16em] text-cyan-300">Your next step</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Find the first workflow worth taking off your team’s plate.
            </h2>
            <p className="mt-5 text-lg leading-8 text-blue-100">
              Tell us what is piling up. We’ll use the initial conversation to examine fit, identify
              the cleanest pilot, and clarify the access, ownership, and review process required.
            </p>

            <div className="mt-8 rounded-2xl border border-white/15 bg-white/[0.07] p-5">
              <p className="font-black text-white">Come prepared with:</p>
              <ul className="mt-4 grid gap-3 text-sm text-blue-100">
                {[
                  "The work type and approximate volume",
                  "Your current software and review flow",
                  "The bottleneck or deadline creating pressure",
                  "The internal owner for a potential pilot",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 stroke-[3] text-cyan-300" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <article className="rounded-[2rem] bg-white p-5 text-slate-800 shadow-2xl sm:p-8 lg:p-10">
            <div className="mb-7 border-b border-slate-200 pb-6">
              <p className="text-sm font-black text-brand-blue">Firm capacity assessment</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-primary-dark sm:text-3xl">
                Where does your workflow slow down?
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Provide one way to reach you. Use the optional details area to share services, volume,
                software, and timing—but do not attach or paste client records.
              </p>
            </div>
            <ContactForm
              initialService={leadService}
              source="cpa-ea-outsourcing-landing"
              lockService
              expandDetails
            />
          </article>
        </div>
      </section>

      <footer className="bg-[#04142e] text-blue-100">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <Image
              src="/images/logo1.png"
              alt="IntegraFin Tax and Accounting"
              width={130}
              height={36}
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="mt-3 text-sm">2039 N Mason Rd, Suite 604, Katy, TX 77449</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
            <a href="tel:+18326471819" className="hover:text-white">(832) 647-1819</a>
            <a href="mailto:contact@integrafin.tax" className="hover:text-white">contact@integrafin.tax</a>
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_25px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
        <a
          href="#capacity-assessment"
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-dark px-5 py-3 font-black text-white"
        >
          Request my capacity assessment <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </main>
  );
}
