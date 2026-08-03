"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions/leads";
import { getLeadAttribution, type LeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent, useFormAnalytics } from "@/lib/analytics";
import type { LeadService } from "@/lib/leadServices";

const FORM_SOURCE = "roofing-bookkeeping-houston-landing";

const assistanceOptions = [
  "Monthly bookkeeping",
  "Catch-up or cleanup bookkeeping",
  "Payroll support",
  "Tax preparation and tax-ready records",
  "Not sure yet",
] as const;

const booksStatusOptions = [
  "Up to date",
  "1–3 months behind",
  "4–12 months behind",
  "More than 12 months behind",
  "Not sure",
] as const;

const serviceByAssistance: Record<(typeof assistanceOptions)[number], LeadService> = {
  "Monthly bookkeeping": "Contractor Bookkeeping",
  "Catch-up or cleanup bookkeeping": "Bookkeeping Cleanup",
  "Payroll support": "Payroll Tax Support",
  "Tax preparation and tax-ready records": "Business Tax and Accounting",
  "Not sure yet": "Other Enquiry",
};

declare global {
  interface Window {
    fbq?: (command: "track", eventName: string, parameters?: Record<string, string>) => void;
  }
}

function campaignFields(attribution: LeadAttribution) {
  return {
    campaign: attribution.utmCampaign || "",
    adSet: attribution.utmContent || "",
    ad: attribution.utmTerm || "",
    landingSource: attribution.utmSource || attribution.referrer || "direct",
  };
}

export default function RoofingLeadForm() {
  const router = useRouter();
  const trackFormStart = useFormAnalytics(FORM_SOURCE);
  const submittingRef = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [hiddenFields, setHiddenFields] = useState(() => campaignFields({}));

  useEffect(() => {
    setHiddenFields(campaignFields(getLeadAttribution()));
  }, []);

  async function handleSubmit(formData: FormData) {
    if (submittingRef.current) return;

    const honeypot = String(formData.get("website") || "").trim();
    if (honeypot) {
      setError("We could not submit the form. Please refresh the page and try again.");
      return;
    }

    const assistance = String(formData.get("assistance") || "") as (typeof assistanceOptions)[number];
    const booksStatus = String(formData.get("booksStatus") || "");
    const service = serviceByAssistance[assistance];

    if (!service || !booksStatusOptions.includes(booksStatus as (typeof booksStatusOptions)[number])) {
      setError("Please select the assistance you need and how current your books are.");
      return;
    }

    submittingRef.current = true;
    setIsPending(true);
    setError("");

    const attribution = getLeadAttribution();
    const data = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      service,
      message: `Requested assistance: ${assistance}\nHow current are the books: ${booksStatus}`,
      source: FORM_SOURCE,
      website: "" as const,
      attribution,
    };

    try {
      const result = await submitLead(data);
      if (!result.success) {
        setError(result.message || "Something went wrong. Please try again.");
        return;
      }

      trackEvent("generate_lead", {
        ...baseEventParameters(attribution),
        service: data.service,
        form_source: FORM_SOURCE,
        cta_name: "request_free_roofing_bookkeeping_review",
      });
      window.fbq?.("track", "Lead", { content_name: "Roofing Bookkeeping Review" });
      router.push("/roofing-bookkeeping-thank-you");
    } catch {
      setError("An unexpected error occurred. Please try again or call (832) 647-1819.");
    } finally {
      submittingRef.current = false;
      setIsPending(false);
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-950 outline-none transition focus:border-[#00a9b7] focus:ring-4 focus:ring-[#00a9b7]/15";

  return (
    <form
      id="roofing-review-form"
      action={handleSubmit}
      onFocusCapture={trackFormStart}
      className="space-y-4"
      aria-describedby="roofing-form-intro"
    >
      <input type="hidden" name="campaign" value={hiddenFields.campaign} />
      <input type="hidden" name="ad_set" value={hiddenFields.adSet} />
      <input type="hidden" name="ad" value={hiddenFields.ad} />
      <input type="hidden" name="landing_page_source" value={hiddenFields.landingSource} />

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="roofing-website">Leave this field blank</label>
        <input id="roofing-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="roofing-name" className="text-sm font-bold text-slate-800">Full name</label>
        <input id="roofing-name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} placeholder="Your full name" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="roofing-phone" className="text-sm font-bold text-slate-800">Mobile phone number</label>
          <input id="roofing-phone" name="phone" type="tel" required minLength={10} maxLength={20} autoComplete="tel" inputMode="tel" className={fieldClass} placeholder="(832) 555-0123" />
        </div>
        <div>
          <label htmlFor="roofing-email" className="text-sm font-bold text-slate-800">Work email address</label>
          <input id="roofing-email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} placeholder="you@company.com" />
        </div>
      </div>

      <div>
        <label htmlFor="roofing-company" className="text-sm font-bold text-slate-800">Roofing business name</label>
        <input id="roofing-company" name="company" type="text" required maxLength={100} autoComplete="organization" className={fieldClass} placeholder="Your roofing company" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="roofing-assistance" className="text-sm font-bold text-slate-800">What assistance do you need?</label>
          <select id="roofing-assistance" name="assistance" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select one</option>
            {assistanceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="roofing-books-status" className="text-sm font-bold text-slate-800">How current are your books?</label>
          <select id="roofing-books-status" name="booksStatus" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select one</option>
            {booksStatusOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#00a9b7] px-5 py-3.5 text-base font-black text-[#061d35] shadow-lg shadow-[#00a9b7]/20 transition hover:bg-[#32c7cf] focus:outline-none focus:ring-4 focus:ring-white/40 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending securely…</> : <>Request My Free Review <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
      </button>

      <p className="text-[11px] leading-5 text-slate-600">
        By submitting this form, you agree that IntegraFin may contact you by phone, text message or email regarding bookkeeping, payroll and tax-related services. Consent is not a condition of purchase. Message and data rates may apply. View our{" "}
        <Link href="/privacy" className="font-bold text-[#006b74] underline underline-offset-2">Privacy Policy</Link> and{" "}
        <Link href="/terms" className="font-bold text-[#006b74] underline underline-offset-2">Terms of Service</Link>.
      </p>
      <p className="flex items-start gap-2 text-[11px] font-semibold leading-5 text-slate-500">
        <span aria-hidden="true">🔒</span> Do not submit Social Security numbers, tax IDs, bank details or financial documents through this form.
      </p>
    </form>
  );
}
