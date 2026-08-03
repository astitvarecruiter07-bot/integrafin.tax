import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, CheckCircle2, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Roofing Bookkeeping Review Request Received | IntegraFin",
  description: "IntegraFin received your roofing bookkeeping review request.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function RoofingBookkeepingThankYouPage() {
  return (
    <main className="roofing-landing flex min-h-screen flex-col bg-[#f1f7f8]">
      <header className="bg-[#071c32] px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" aria-label="IntegraFin home">
            <Image src="/images/logo1.png" alt="IntegraFin" width={154} height={42} className="h-9 w-auto brightness-0 invert" priority />
          </Link>
          <a href="tel:+18326471819" className="inline-flex items-center gap-2 text-sm font-bold text-white">
            <Phone className="h-4 w-4 text-[#66dde2]" aria-hidden="true" /> <span className="hidden sm:inline">(832) 647-1819</span>
          </a>
        </div>
      </header>

      <section className="flex flex-1 items-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
          <div className="h-2 bg-[#00a9b7]" />
          <div className="p-7 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff7f8]">
              <CheckCircle2 className="h-9 w-9 text-[#007e88]" aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#008a96]">Request received</p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] text-[#09233f] sm:text-4xl">
              Thank You—Your Review Request Has Been Received
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              An IntegraFin team member will contact you within one business day to discuss your roofing company&apos;s bookkeeping needs.
            </p>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl bg-[#f1f7f8] p-5 text-left sm:p-6">
              <h2 className="font-black text-[#09233f]">What to do next</h2>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                {[
                  "Watch for a call or text from IntegraFin.",
                  "Be prepared to explain how current your books are.",
                  "Have the name of your bookkeeping software available.",
                ].map((step) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#00a9b7] text-[#061d35]"><Check className="h-3 w-3" aria-hidden="true" /></span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <Link href="/" className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#09233f] px-6 py-3.5 font-black text-white transition hover:bg-[#123b60]">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Return to IntegraFin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
