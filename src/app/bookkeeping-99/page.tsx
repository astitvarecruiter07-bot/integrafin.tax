import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Check, CheckCircle2, FileCheck2, Phone, ShieldCheck } from "lucide-react";
import SimpleBookkeepingLeadForm from "@/components/SimpleBookkeepingLeadForm";

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
    <main className="integrafin-landing min-h-screen bg-[#f7f8fa] text-black selection:bg-[#ff3038] selection:text-white">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Image src="/images/logo1.png" alt="IntegraFin" width={176} height={44} className="h-9 w-auto" priority />
          <a href="tel:+18327741882" className="inline-flex min-h-10 items-center gap-2 rounded-lg border-2 border-black px-3 text-xs font-black text-black transition hover:bg-black hover:text-white sm:px-4 sm:text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" /> <span className="hidden sm:inline">Questions?</span> (832) 774-1882
          </a>
        </div>
      </header>

      <section className="landing-grid relative overflow-hidden px-5 py-8 sm:px-8 sm:py-12 lg:py-14">
        <div className="landing-spotlight absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
          <div>
            <p className="inline-flex rounded-full bg-black px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white">
              Simple bookkeeping for small businesses
            </p>
            <h1 className="mt-5 max-w-2xl text-4xl font-black uppercase leading-[1.02] tracking-[-0.045em] sm:text-5xl lg:text-[3.85rem]">
              Stop guessing about your books.
            </h1>
            <p className="mt-4 max-w-xl text-base font-semibold leading-7 text-slate-600 sm:text-lg">
              Get organized monthly books, clearer reports, and direct support from the IntegraFin team.
            </p>

            <div className="mt-6 inline-flex items-end gap-2 rounded-2xl border-2 border-black bg-white px-6 py-4 shadow-[8px_8px_0_#ff3038]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.15em] text-slate-600">Starting at</p>
                <p className="text-6xl font-black leading-none tracking-[-0.06em] text-[#ff3038] sm:text-7xl">$99</p>
              </div>
              <span className="pb-1 text-2xl font-black text-black">/month</span>
            </div>

            <ul className="mt-7 space-y-3">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-sm font-bold text-slate-800 sm:text-base">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>

            <a href="#eligibility-form" className="mt-7 inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-black px-6 text-sm font-black uppercase text-white transition hover:bg-[#ff3038] lg:hidden">
              Check My Eligibility <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </div>

          <div id="eligibility-form" className="rounded-2xl border-2 border-black bg-white p-6 shadow-[10px_10px_0_#080808] sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff3038]">Free 60-second review</p>
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
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#ff3038]" aria-hidden="true" />
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
          <div className="rounded-xl border border-[#ff3038]/70 bg-white/[.06] px-5 py-4 text-sm font-semibold leading-6">
            <strong className="text-[#ff6268]">Starting price: $99/month for qualifying businesses.</strong>{" "}
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
