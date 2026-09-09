import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AlarmClock,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Phone,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import FacebookLandingLeadForm from "@/components/FacebookLandingLeadForm";
import FacebookLandingTracking from "@/components/FacebookLandingTracking";
import TaxDeadlineCountdown from "@/components/TaxDeadlineCountdown";

export const metadata: Metadata = {
  title: "Behind on Your 2025 Books? Get Help Before September 15 | IntegraFin",
  description:
    "Ask about IntegraFin's $99/month bookkeeping offer and 48-hour 2025 catch-up service before the September 15 tax deadline.",
  alternates: { canonical: "https://integrafin.tax/15-sep-offer" },
  openGraph: {
    title: "Behind on Your 2025 Books? Get Help Before September 15",
    description:
      "Catch up your 2025 books and get ready for the September 15 deadline. Check your eligibility today.",
    url: "https://integrafin.tax/15-sep-offer",
    images: [
      { url: "/og-image.jpg", width: 1200, height: 630, alt: "IntegraFin Tax & Accounting" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookkeeping for $99/Month | IntegraFin",
    description: "Catch up your 2025 books and check your eligibility for the IntegraFin offer.",
    images: ["/og-image.jpg"],
  },
};

const offerItems = [
  {
    icon: ReceiptText,
    number: "01",
    title: "Transactions organized",
    text: "Business activity categorized and arranged so your records are easier to review.",
  },
  {
    icon: RefreshCw,
    number: "02",
    title: "Accounts reconciled",
    text: "Available statements checked against the books to identify gaps and inconsistencies.",
  },
  {
    icon: FileCheck2,
    number: "03",
    title: "Tax-ready reports",
    text: "Clean reports prepared for the next filing conversation with your tax professional.",
  },
];

const processSteps = [
  {
    step: "Step 1",
    title: "Submit your details",
    text: "Tell us how to reach you and whether you need 2025 catch-up, monthly bookkeeping, or both.",
  },
  {
    step: "Step 2",
    title: "We check the scope",
    text: "The team reviews the volume, record condition, access, entity type, and relevant deadline.",
  },
  {
    step: "Step 3",
    title: "Confirm and get started",
    text: "If the offer fits, you receive the service scope, required-record list, and written terms before work begins.",
  },
];

const fitChecks = [
  "Your 2025 books are incomplete or behind",
  "You need records organized before filing",
  "You want ongoing bookkeeping after cleanup",
  "You can provide complete statements and account access",
  "Your business is a partnership, S corporation, LLC, or owner-led company",
  "You want a clear answer before the deadline gets closer",
];

const faqs = [
  {
    question: "Is the bookkeeping really $99 per month?",
    answer:
      "The advertised plan is $99 per month for qualifying businesses. Eligibility, transaction volume, account count, cleanup needs, and final scope are reviewed before you enroll.",
  },
  {
    question: "What does the 48-hour catch-up service cover?",
    answer:
      "The offer applies to qualifying 2025 catch-up projects after all requested records and account access are received and the written scope is accepted. Record volume and complexity can affect eligibility.",
  },
  {
    question: "Does September 15 apply to every business?",
    answer:
      "No. September 15, 2026 is generally the extended filing deadline for calendar-year partnerships and S corporations that timely requested an extension. Your entity, tax year, extension status, and circumstances determine the actual deadline.",
  },
  {
    question: "Does bookkeeping include filing my tax return?",
    answer:
      "Bookkeeping and tax-return filing are separate scopes unless your written engagement says otherwise. IntegraFin can review what tax preparation support you may need.",
  },
  {
    question: "What information do I need to submit now?",
    answer:
      "Only your name, email, phone number, and the type of help you need. Do not submit tax IDs, bank credentials, tax returns, or other sensitive records through this form.",
  },
  {
    question: "Will this guarantee that I avoid penalties?",
    answer:
      "No service can guarantee a particular IRS or state outcome. Timely action and accurate records may reduce filing risk, but penalties depend on filing history, payment status, entity type, eligibility, and applicable rules.",
  },
];

function LeadAnchor({
  className = "",
  label = "Get My Free Bookkeeping Review",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a href="#lead-form" data-analytics-label="facebook_offer_cta" className={className}>
      {label}
      <ArrowRight className="h-5 w-5" aria-hidden="true" />
    </a>
  );
}

function CtaBar({ label = "Get My Free Bookkeeping Review" }: { label?: string }) {
  return (
    <LeadAnchor
      label={label}
      className="mx-auto flex min-h-14 w-full max-w-5xl items-center justify-center gap-2 rounded-xl bg-[#ff3038] px-5 text-center text-sm font-black uppercase tracking-[0.02em] text-white shadow-[0_16px_34px_-18px_rgba(255,48,56,.75)] transition hover:-translate-y-0.5 hover:bg-[#e61f2a] sm:text-base"
    />
  );
}

export default function Home() {
  return (
    <main className="integrafin-landing min-h-screen overflow-hidden bg-white pb-20 text-[#080808] selection:bg-[#ff3038] selection:text-white lg:pb-0">
      <FacebookLandingTracking />

      <header className="relative z-40 border-b border-black/10 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" aria-label="IntegraFin home" className="inline-flex items-center">
            <Image src="/images/logo1.png" alt="IntegraFin" width={176} height={44} className="h-8 w-auto sm:h-10" priority />
          </a>
          <div className="hidden items-center gap-7 text-sm font-bold text-[#333] lg:flex">
            <a href="#offer" className="transition hover:text-[#ff3038]">What is included</a>
            <a href="#process" className="transition hover:text-[#ff3038]">How it works</a>
            <a href="#faq" className="transition hover:text-[#ff3038]">FAQ</a>
          </div>
          <LeadAnchor label="Get my free review" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-black px-4 text-sm font-black text-white transition hover:bg-[#ff3038] sm:px-5" />
        </div>
      </header>

      <section id="top" className="landing-grid relative border-b border-black/10 px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <div className="landing-spotlight absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto text-center">
            <TaxDeadlineCountdown />
            <p className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-xs font-black uppercase tracking-[0.13em] text-white sm:text-sm">
              <AlarmClock className="h-4 w-4 text-[#ff3038]" aria-hidden="true" />
              Tax deadline specialist
            </p>
            <h1 className="mx-auto mt-7 max-w-5xl text-4xl font-black uppercase leading-[1.03] tracking-[-0.045em] text-black sm:text-5xl lg:text-[4.35rem]">
              Behind on your 2025 books?
              <span className="mt-2 block text-[#ff3038]">Get caught up before September 15.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base font-semibold leading-7 text-[#454545] sm:text-lg">
              Start with a free 60-second review. We will look at what is behind, confirm whether the offer fits, and explain the next step—before you send financial documents or pay anything.
            </p>
            <div className="mx-auto mt-7 inline-flex min-w-[min(100%,34rem)] flex-col items-center justify-center rounded-2xl border-2 border-black bg-black px-7 py-5 shadow-[9px_9px_0_#ff3038] sm:px-10 sm:py-6">
              <span className="text-sm font-black uppercase tracking-[0.18em] text-white sm:text-base">Ongoing bookkeeping from</span>
              <span className="mt-1 block text-6xl font-black leading-none tracking-[-0.07em] text-[#ff3038] drop-shadow-[0_2px_0_rgba(255,255,255,.18)] sm:text-8xl">
                $99<span className="ml-1 text-[0.52em] tracking-[-0.04em] text-white">/mo</span>
              </span>
            </div>
          </div>

          <div className="mx-auto mt-9 grid max-w-5xl overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[12px_12px_0_#080808] lg:grid-cols-[.9fr_1.1fr]">
            <div className="flex flex-col justify-center bg-black p-7 text-white sm:p-9 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff5a60]">Urgent 2025 catch-up offer</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-[1.08] tracking-[-0.035em] sm:text-4xl">
                Catch up your entire 2025 in <span className="text-[#ff3038]">48 hours</span> for qualifying projects.
              </h2>
              <div className="mt-7 rounded-xl bg-[#ff3038] p-5">
                <p className="text-xs font-black uppercase tracking-[0.15em] text-white/80">File before</p>
                <p className="mt-1 text-3xl font-black uppercase tracking-tight text-white">September 15, 2026</p>
                <p className="mt-2 text-xs font-semibold leading-5 text-white/90">For qualifying calendar-year partnerships and S corporations with a valid extension.</p>
              </div>
              <ul className="mt-7 space-y-3 text-sm font-bold text-[#e8e8e8]">
                {["No payment required to check eligibility", "Written scope before work begins", "Secure document process after enrollment"].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#ff3038]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div id="lead-form" className="bg-white p-6 sm:p-9 lg:p-10">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff3038]">Free bookkeeping review</p>
              <h2 className="mt-2 text-2xl font-black leading-tight text-black sm:text-3xl">See if the offer fits your business.</h2>
              <p className="mb-5 mt-2 text-sm leading-6 text-[#5a5a5a]">Select the help you need and add your contact details—all in one quick form.</p>
              <FacebookLandingLeadForm idPrefix="facebook-hero-form" source="facebook-tax-deadline-ad-hero" compact />
            </div>
          </div>

          <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-5 text-[#646464]">
            Offer eligibility depends on record completeness, transaction volume, account access, entity type, and confirmed scope. See important terms below.
          </p>
        </div>
      </section>

      <section className="border-b-2 border-black bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [ShieldCheck, "Secure process", "Sensitive records are not collected here"],
            [CheckCircle2, "No payment today", "The initial review is free"],
            [FileCheck2, "Written scope first", "Know the work before it begins"],
            [Phone, "Direct team follow-up", "Speak with the IntegraFin team"],
          ].map(([Icon, title, text]) => (
            <div key={String(title)} className="flex items-start gap-3 rounded-xl bg-[#f6f6f6] p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#ff3038]" aria-hidden="true" />
              <div><p className="text-sm font-black text-black">{String(title)}</p><p className="mt-1 text-xs leading-5 text-[#666]">{String(text)}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black px-5 py-14 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff5a60]">Deadline alert</p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-6">
            <CalendarDays className="h-10 w-10 text-[#ff3038]" aria-hidden="true" />
            <h2 className="text-3xl font-black uppercase tracking-[-0.035em] sm:text-5xl">September 15 is approaching.</h2>
          </div>
          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-[#c9c9c9] sm:text-base">
            For many calendar-year partnerships and S corporations that timely filed an extension, September 15, 2026 is the extended return deadline. Your filing facts determine which deadline applies.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-sm font-bold text-white">
            <Link href="/blog/september-15-2026-tax-deadline" className="underline decoration-[#ff3038] decoration-2 underline-offset-4 transition hover:text-[#ff5a60]">
              Read the complete September 15 filing and estimated-tax guide
            </Link>
          </p>
          <div className="mt-8"><CtaBar label="Get Help Before the Deadline" /></div>
        </div>
      </section>

      <section id="offer" className="border-b border-black/10 bg-[#f6f6f6] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff3038]">What the bookkeeping work prepares</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-[-0.035em] text-black sm:text-4xl">From scattered records to a clearer 2025 picture.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5a5a5a] sm:text-base">Your confirmed scope depends on the condition and volume of your books. These are the core outcomes the review is designed to address.</p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {offerItems.map(({ icon: Icon, number, title, text }) => (
              <article key={number} className="relative overflow-hidden rounded-xl border-2 border-black bg-white p-6 shadow-[6px_6px_0_#080808]">
                <span className="absolute right-4 top-4 rounded bg-[#ff3038] px-2 py-1 text-[10px] font-black text-white">{number}</span>
                <Icon className="h-8 w-8 text-[#0088c9]" aria-hidden="true" />
                <h3 className="mt-8 text-xl font-black uppercase text-black">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#555]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-2xl border-2 border-black bg-white md:grid-cols-2">
            <div className="p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff3038]">Starting $99/month plan</p>
              <h3 className="mt-2 text-2xl font-black text-black">Designed for qualifying small businesses.</h3>
              <ul className="mt-5 space-y-3 text-sm font-bold text-[#333]">
                {["Monthly transaction categorization", "Account reconciliation", "Monthly bookkeeping reports"].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />{item}</li>)}
              </ul>
            </div>
            <div className="bg-black p-6 text-white sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff5a60]">May require a separate quote</p>
              <h3 className="mt-2 text-2xl font-black">Know what is outside the starting plan.</h3>
              <ul className="mt-5 space-y-3 text-sm font-bold text-[#ddd]">
                {["Past-period cleanup or catch-up work", "Tax-return preparation and filing", "Higher volume, extra accounts, or complex records"].map((item) => <li key={item} className="flex gap-3"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#ff3038]" />{item}</li>)}
              </ul>
            </div>
          </div>
          <div className="mt-10"><CtaBar /></div>
        </div>
      </section>

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border-2 border-black lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[340px]">
            <Image
              src="/hero-accounting-workspace.jpg"
              alt="Bookkeeping professionals organizing business records"
              fill
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="object-cover"
              quality={82}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-lg bg-black/85 p-4 text-white backdrop-blur-sm">
              <p className="text-sm font-black uppercase">Deadline-focused bookkeeping support</p>
              <p className="mt-1 text-xs text-white/75">Records first. Filing conversation next.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center bg-[#ff3038] p-7 text-white sm:p-10">
            <Clock3 className="h-10 w-10" aria-hidden="true" />
            <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-white/75">48-hour catch-up service</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-[-0.035em] sm:text-4xl">Your complete records trigger the clock.</h2>
            <p className="mt-5 text-sm font-semibold leading-7 text-white/90">The team first confirms that your project qualifies. The delivery window begins after the requested records, statements, access, and written scope are complete.</p>
            <LeadAnchor label="Check if my books qualify" className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-black px-6 text-sm font-black uppercase text-white transition hover:bg-white hover:text-black" />
          </div>
        </div>
      </section>

      <section id="process" className="border-y border-black/10 bg-[#f6f6f6] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff3038]">How it works</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.035em] text-black sm:text-4xl">Three simple steps to a clear answer.</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {processSteps.map((item, index) => (
              <article key={item.step} className={`${index === 1 ? "bg-black text-white" : "bg-white text-black"} rounded-xl border-2 border-black p-6`}>
                <span className={`${index === 1 ? "bg-[#ff3038] text-white" : "bg-black text-white"} inline-flex rounded px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em]`}>{item.step}</span>
                <h3 className="mt-7 text-xl font-black uppercase">{item.title}</h3>
                <p className={`mt-3 text-sm leading-6 ${index === 1 ? "text-[#cfcfcf]" : "text-[#555]"}`}>{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10"><CtaBar /></div>
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div>
            <Building2 className="h-10 w-10 text-[#ff3038]" aria-hidden="true" />
            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#ff5a60]">Is this for your business?</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-[-0.035em] sm:text-4xl">The offer starts with a fit check.</h2>
            <p className="mt-5 text-sm leading-7 text-[#bdbdbd]">The fastest path begins with complete information. Tell us what is behind and the team will confirm what can realistically be completed.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {fitChecks.map((item) => (
              <div key={item} className="flex min-h-24 items-center gap-4 rounded-xl border border-white/15 bg-white/[.06] p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#ff3038] text-white"><Check className="h-4 w-4" aria-hidden="true" /></span>
                <p className="text-sm font-bold leading-6 text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-5xl"><CtaBar label="Find Out If My Business Qualifies" /></div>
      </section>

      <section className="border-b border-black/10 bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div className="rounded-2xl bg-[#eaf7fd] p-7 sm:p-9">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0088c9] text-white"><ShieldCheck className="h-6 w-6" aria-hidden="true" /></span>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-[#0077b0]">IntegraFin</p>
                <p className="text-xl font-black text-black">Tax deadline support</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-[#4f4f4f]">IntegraFin helps owner-led businesses organize bookkeeping, prepare tax-ready records, and understand the next compliance step.</p>
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff3038]">Why act now</p>
            <h2 className="mt-3 text-3xl font-black uppercase leading-tight tracking-[-0.035em] text-black sm:text-4xl">You cannot file confidently from books you do not trust.</h2>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {["Clear communication", "Compliance-focused review", "Secure document process", "Practical next steps"].map((item) => (
                <div key={item} className="flex items-center gap-3 border-l-4 border-[#ff3038] bg-[#f6f6f6] p-4 text-sm font-black text-black">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[#f6f6f6] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff3038]">Frequently asked questions</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.035em] text-black sm:text-4xl">Know the terms before you start.</h2>
          </div>
          <div className="mx-auto mt-10 max-w-5xl space-y-3">
            {faqs.map((faq, index) => (
              <details key={faq.question} className="group overflow-hidden rounded-lg border-2 border-black bg-white" open={index === 0}>
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-sm font-black text-black marker:content-none group-open:bg-[#ff3038] group-open:text-white sm:text-base">
                  {faq.question}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black text-base font-black text-white transition group-open:rotate-45 group-open:bg-white group-open:text-black">+</span>
                </summary>
                <p className="px-5 py-5 text-sm leading-7 text-[#555]">{faq.answer}</p>
              </details>
            ))}
          </div>
          <div className="mt-10"><CtaBar /></div>
        </div>
      </section>

      <section className="border-t border-black bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
          <div>
            <p className="inline-flex rounded-lg bg-black px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-white">September 15 deadline</p>
            <h2 className="mt-5 text-3xl font-black uppercase leading-tight tracking-[-0.035em] text-black sm:text-4xl">Do not wait to find out your books need more work.</h2>
            <p className="mt-5 text-sm leading-7 text-[#555] sm:text-base">Submit your details now. No sensitive records and no payment are required to check whether the offer fits your business.</p>
            <a href="tel:+18327741882" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-black hover:text-[#ff3038]"><Phone className="h-4 w-4" aria-hidden="true" /> Prefer to call? (832) 774-1882</a>
          </div>
          <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-[10px_10px_0_#ff3038] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ff3038]">Free bookkeeping review</p>
            <h3 className="mb-5 mt-2 text-2xl font-black text-black">Complete one quick form.</h3>
            <FacebookLandingLeadForm idPrefix="facebook-final-form" source="facebook-tax-deadline-ad-final" />
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-5 py-10 text-white sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <Image src="/images/logo1.png" alt="IntegraFin" width={150} height={38} className="h-8 w-auto brightness-0 invert" />
            <p className="mt-4 max-w-md text-sm leading-6 text-[#aaa]">Tax, accounting, bookkeeping, and business advisory support for owner-led businesses.</p>
          </div>
          <div className="text-sm leading-7 text-[#aaa] md:text-right">
            <a href="tel:+18327741882" className="block font-bold text-white hover:text-[#ff5a60]">+1 832-774-1882</a>
            <a href="mailto:hello@integrafin.tax" className="block font-bold text-white hover:text-[#ff5a60]">hello@integrafin.tax</a>
            <a href="https://www.integrafin.tax" className="block hover:text-white">www.integrafin.tax</a>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-6xl rounded-xl border border-[#ff3038]/60 bg-white/[.06] px-5 py-4 text-sm font-bold leading-6 text-white">
          <strong className="text-[#ff5a60]">Starting price: $99/month for qualifying businesses.</strong>{" "}
          Final pricing depends on transaction volume, account count, record condition, and required cleanup. Tax-return preparation is quoted separately.
        </div>
        <div className="mx-auto mt-5 max-w-6xl border-t border-white/15 pt-5 text-xs leading-5 text-[#8a8a8a]">
          The 48-hour catch-up service is subject to eligibility, complete records, account access, confirmed scope, capacity, and written service terms. The 48-hour window begins only after all requested information is received. Bookkeeping completion does not guarantee return acceptance or penalty avoidance. Tax deadlines vary by entity, tax year, extension status, and applicable relief. Information is general and is not legal or tax advice.
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-black bg-white p-3 shadow-[0_-12px_35px_-20px_rgba(0,0,0,.7)] lg:hidden">
        <LeadAnchor label="Get My Free Bookkeeping Review" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#ff3038] px-4 text-center text-sm font-black uppercase text-white" />
      </div>
    </main>
  );
}
