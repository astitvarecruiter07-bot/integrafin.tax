import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Phone } from "lucide-react";

const calendlyUrl = "https://calendly.com/integrafintax/30min";

export const metadata: Metadata = {
  title: "Request Received | IntegraFin Tax & Accounting",
  description: "Your request has been received by IntegraFin Tax & Accounting.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 pb-16 pt-32 sm:px-6 sm:pt-36">
      <section className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/50 sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-9 w-9 text-emerald-600" aria-hidden="true" />
        </div>
        <p className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-[#0092df]">
          Request received
        </p>
        <h1 className="mt-3 text-3xl font-black tracking-tight text-[#003580] sm:text-4xl">
          Thank you for contacting IntegraFin.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
          Your request has been submitted for team follow-up. Response timing depends on the
          request details, business hours, and current capacity.
        </p>

        <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="font-bold text-[#003580]">What happens next</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              The team will review the service requested and the information provided, then follow
              up using the contact details from your form.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5">
            <h2 className="font-bold text-[#003580]">Prepare safely</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Please do not send Social Security numbers, tax returns, bank details, or other
              sensitive documents through ordinary email unless the document method is confirmed.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-analytics-label="thank_you_book_30_min"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#003580] px-6 py-3.5 font-bold text-white transition-colors hover:bg-[#002050]"
          >
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            Book a 30-minute consultation
          </a>
          <a
            href="tel:+18326471819"
            data-analytics-label="thank_you_phone_call"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#003580] px-6 py-3.5 font-bold text-[#003580] transition-colors hover:bg-slate-50"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call (832) 647-1819
          </a>
        </div>

        <Link
          href="/services"
          className="mt-6 inline-block text-sm font-semibold text-[#0092df] hover:underline"
        >
          Review services while you wait
        </Link>
      </section>
    </main>
  );
}
