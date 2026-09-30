import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, FileCheck2, Phone, ShieldCheck } from "lucide-react";
import SimpleBookkeepingLeadForm from "@/components/SimpleBookkeepingLeadForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Bookkeeping Starting at $99/Month | IntegraFin",
  description: "See if your business qualifies for IntegraFin bookkeeping starting at $99 per month. Request a free eligibility review.",
  alternates: { canonical: "https://integrafin.tax/bookkeeping-99" },
  openGraph: {
    title: "Bookkeeping Starting at $99/Month",
    description: "A simple bookkeeping plan for qualifying businesses. Check your eligibility today.",
    url: "https://integrafin.tax/bookkeeping-99",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "IntegraFin Tax & Accounting" }],
  },
};

const benefits = [
  "Monthly transaction categorization",
  "Account reconciliation",
  "Clear monthly bookkeeping reports",
];

export default function Bookkeeping99Page() {
  return (
    <main className="integrafin-landing min-h-screen bg-[#f0f3f7] text-[#191c1e] selection:bg-[#2563eb] selection:text-white">
      <header className="border-b border-white/10 bg-[#0e1726]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Image src="/images/logo1.png" alt="IntegraFin" width={176} height={44} className="h-9 w-auto brightness-0 invert" priority />
          <a href={siteConfig.contact.phoneHref} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/30 px-3 text-xs font-black text-white transition hover:bg-white/10 sm:px-4 sm:text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Questions?</span> {siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </header>

      <section className="landing-grid relative overflow-hidden bg-[#0e1726] px-5 py-8 text-white sm:px-8 sm:py-12 lg:py-14">
        <div className="landing-spotlight absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div>
            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
              Simple bookkeeping for small businesses
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-black uppercase leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.85rem]">
              Stop guessing about your books.
            </h1>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-200 sm:text-lg">
              Get organized monthly books, clearer reports, and direct support from the IntegraFin team.
            </p>

            <div className="mt-6 inline-flex items-end gap-2 rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-[0_16px_36px_rgba(2,12,32,.28)]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-600">Starting at</p>
                <p className="text-6xl font-black leading-none tracking-[-0.06em] text-[#2563eb] sm:text-7xl">$99</p>
              </div>
              <span className="pb-1 text-2xl font-black text-black">/month</span>
            </div>

            <ul className="mt-7 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm font-bold text-slate-100 sm:text-base">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <a href="#eligibility-form" className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-black uppercase text-white transition hover:bg-[#1d4ed8] lg:hidden">
              Check My Eligibility <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div id="eligibility-form" className="rounded-2xl border border-slate-200 bg-white p-6 text-[#191c1e] shadow-[0_24px_64px_rgba(2,12,32,.32)] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2563eb]">Request a free review in about 60 seconds</p>
            <h2 className="mt-2 text-2xl font-black leading-tight sm:text-3xl">See if the $99 plan fits your business.</h2>
            <p className="mb-5 mt-2 text-sm leading-6 text-slate-600">Enter your contact details. Our team will review your needs and explain the next step.</p>
            <SimpleBookkeepingLeadForm />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-black bg-white px-5 py-6 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {[
            [ShieldCheck, "No payment today", "The eligibility review is free."],
            [FileCheck2, "Written price first", "Review the scope before work starts."],
            [CheckCircle2, "Direct follow-up", "A team member contacts you personally."],
          ].map(([Icon, title, text]) => (
            <div key={String(title)} className="flex items-start gap-3 rounded-xl bg-[#f4f5f7] p-4">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#2563eb]" aria-hidden="true" />
              <div>
                <h3 className="text-sm font-black">{String(title)}</h3>
                <p className="mt-1 text-xs leading-5 text-slate-600">{String(text)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-black px-5 py-8 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-xl border border-[#2563eb]/70 bg-white/[.06] px-5 py-4 text-sm font-semibold leading-6">
            <strong className="text-[#93c5fd]">Starting price: $99/month for qualifying businesses.</strong>{" "}
            Final pricing depends on transaction volume, account count, record condition, and required cleanup. Tax-return preparation is quoted separately.
          </div>
          <div className="mt-5 flex flex-col gap-3 text-xs leading-5 text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <p>Bookkeeping services are subject to eligibility, confirmed scope, capacity, and written service terms.</p>
            <div className="flex gap-4 font-bold text-white/80">
              <a href="/privacy" className="hover:text-white">Privacy</a>
              <a href="/terms" className="hover:text-white">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
