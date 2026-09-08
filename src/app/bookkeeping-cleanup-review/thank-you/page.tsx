import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CheckCircle2, Clock3, LockKeyhole, Phone } from "lucide-react";
import {
  CLEANUP_REVIEW_FORM,
  cleanupNeedLabels,
  getCleanupReviewResponseLabel,
  type CleanupPrimaryNeed,
} from "@/lib/bookkeepingCleanupReview";
import { getLeadResponseSlaMinutes } from "@/lib/leadSla";
import dbConnect from "@/lib/mongodb";
import { siteConfig } from "@/lib/siteConfig";
import ContactLead from "@/models/ContactLead";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bookkeeping Review Request Received | IntegraFin",
  description: "Confirmation for an IntegraFin bookkeeping cleanup review request.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

type Confirmation = {
  primaryNeed: CleanupPrimaryNeed;
  bookingCorrelationId: string;
};

async function getConfirmation(requestToken: string | undefined): Promise<Confirmation | null> {
  if (!requestToken || !/^[a-f\d]{8}(?:-[a-f\d]{4}){3}-[a-f\d]{12}$/i.test(requestToken)) {
    return null;
  }

  try {
    await dbConnect();
    const lead = await ContactLead.findOne({
      bookingCorrelationId: requestToken,
      source: CLEANUP_REVIEW_FORM.id,
      recordKind: { $ne: "subscriber" },
    })
      .select("bookingCorrelationId bookkeepingCleanupReview.primaryNeed")
      .lean();

    const primaryNeed = lead?.bookkeepingCleanupReview?.primaryNeed;
    if (!lead?.bookingCorrelationId || !primaryNeed || !(primaryNeed in cleanupNeedLabels)) {
      return null;
    }

    return {
      bookingCorrelationId: lead.bookingCorrelationId,
      primaryNeed,
    };
  } catch (error) {
    console.error("Could not load cleanup-review confirmation.", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return null;
  }
}

function bookingUrl(correlationId: string) {
  const configured =
    process.env.NEXT_PUBLIC_BOOKING_URL || "https://calendly.com/integrafintax/30min";
  try {
    const url = new URL(configured);
    url.searchParams.set("utm_source", "integrafin");
    url.searchParams.set("utm_medium", "website");
    url.searchParams.set("utm_campaign", "bookkeeping_cleanup_review");
    url.searchParams.set("utm_content", correlationId);
    return url.toString();
  } catch {
    return undefined;
  }
}

export default async function BookkeepingCleanupReviewThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ request?: string | string[] }>;
}) {
  const query = await searchParams;
  const requestToken = typeof query.request === "string" ? query.request : undefined;
  const confirmation = await getConfirmation(requestToken);
  const calendlyUrl = confirmation ? bookingUrl(confirmation.bookingCorrelationId) : undefined;
  const responseTarget = getCleanupReviewResponseLabel(getLeadResponseSlaMinutes());

  return (
    <main className="cleanup-review-landing min-h-screen bg-[#f4f7f6] text-slate-800">
      <header className="border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-18 max-w-6xl items-center justify-between gap-4 py-3">
          <Image src="/images/logo1.png" alt="IntegraFin Tax & Accounting" width={168} height={46} priority className="h-9 w-auto sm:h-10" />
          <a href={siteConfig.contact.phoneHref} data-analytics-label="cleanup_thank_you_phone" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-slate-300 px-3.5 text-sm font-black text-[#0b213b] hover:border-[#087a55] hover:text-[#087a55]">
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Call </span>{siteConfig.contact.phoneDisplay}
          </a>
        </div>
      </header>

      <section className="px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="bg-[#0b213b] px-6 py-9 text-center text-white sm:px-10 sm:py-11">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-300 text-[#0b213b]">
              <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
            </span>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.2em] text-emerald-200">
              {confirmation ? "Request received" : "Confirmation link unavailable"}
            </p>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-[-0.04em] sm:text-4xl">
              {confirmation
                ? "Your bookkeeping review is in the follow-up queue."
                : "Please contact IntegraFin to confirm your request."}
            </h1>
          </div>

          <div className="p-6 sm:p-10">
            {confirmation ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.15em] text-[#087a55]">Selected need</p>
                  <p className="mt-2 font-black text-[#142b45]">{cleanupNeedLabels[confirmation.primaryNeed]}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-[#f8faf9] p-5">
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-[#087a55]">
                    <Clock3 className="h-4 w-4" aria-hidden="true" /> Staffed response target
                  </p>
                  <p className="mt-2 font-black text-[#142b45]">{responseTarget}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">During {siteConfig.office.hours.toLowerCase()}.</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-sm leading-6 text-slate-600">
                This page does not contain a valid request reference. If you submitted the form, call the team so they can confirm it was saved.
              </p>
            )}

            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="flex items-start gap-3 text-sm leading-6 text-amber-950">
                <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
                <span><strong>Keep records secure.</strong> Do not email or message Social Security numbers, EINs, bank details, tax returns, passwords, or other sensitive documents. IntegraFin will confirm the secure records process if they are needed.</span>
              </p>
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              {calendlyUrl ? (
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-analytics-label="cleanup_thank_you_booking"
                  className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-[#087a55] px-6 py-3.5 font-black text-white transition hover:bg-[#056344] focus:outline-none focus:ring-4 focus:ring-emerald-200"
                >
                  <CalendarDays className="h-5 w-5" aria-hidden="true" /> Choose an optional call time
                </a>
              ) : null}
              <a
                href={siteConfig.contact.phoneHref}
                data-analytics-label="cleanup_thank_you_phone_cta"
                className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-[#0b213b] px-6 py-3.5 font-black text-[#0b213b] transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-200"
              >
                <Phone className="h-5 w-5" aria-hidden="true" /> Call {siteConfig.contact.phoneDisplay}
              </a>
            </div>
            {calendlyUrl ? (
              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Opening the scheduler records a booking start. A booking is complete only after Calendly confirms the appointment.
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <footer className="px-4 pb-10 text-center text-xs leading-6 text-slate-500 sm:px-6">
        <p>{siteConfig.legalName} · {siteConfig.office.street}, {siteConfig.office.cityStatePostal}</p>
        <p>
          <Link href="/privacy" className="font-semibold hover:text-[#0b213b]">Privacy Policy</Link>
          <span className="px-2">·</span>
          <Link href="/terms" className="font-semibold hover:text-[#0b213b]">Terms &amp; Conditions</Link>
        </p>
      </footer>
    </main>
  );
}

