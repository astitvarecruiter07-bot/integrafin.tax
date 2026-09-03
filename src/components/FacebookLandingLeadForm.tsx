"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import { submitLead } from "@/app/actions/leads";
import { getLeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent, useFormAnalytics } from "@/lib/analytics";
import { normalizeLeadService, type LeadService } from "@/lib/leadServices";

const serviceOptions: Array<{ value: LeadService; label: string }> = [
  { value: "Bookkeeping Cleanup", label: "Catch up my 2025 bookkeeping" },
  { value: "Small Business Bookkeeping", label: "Start $99/month bookkeeping" },
  { value: "Business Tax and Accounting", label: "Get ready for the September 15 deadline" },
  { value: "Other Enquiry", label: "I need catch-up and monthly bookkeeping" },
];

declare global {
  interface Window {
    fbq?: (command: "track", eventName: string, parameters?: Record<string, string>) => void;
  }
}

export default function FacebookLandingLeadForm({
  idPrefix,
  source,
  compact = false,
}: {
  idPrefix: string;
  source: string;
  compact?: boolean;
}) {
  const router = useRouter();
  const trackFormStart = useFormAnalytics(source);
  const submittingRef = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedService, setSelectedService] = useState<LeadService | "">("");

  async function handleSubmit(formData: FormData) {
    if (submittingRef.current) return;

    if (String(formData.get("website") || "").trim()) {
      setError("We could not submit the form. Please refresh the page and try again.");
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = normalizeLeadService(formData.get("service"));

    if (!name || !email || !phone || !service) {
      setError("Please enter your name, email, phone number, and the help you need.");
      return;
    }

    submittingRef.current = true;
    setIsPending(true);
    setError("");

    const attribution = getLeadAttribution();
    const data = {
      name,
      email,
      phone,
      service,
      message: `Facebook tax deadline campaign lead. Requested help with: ${service}.`,
      source,
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
        form_source: source,
        cta_name: "facebook_free_review_form",
      });
      window.fbq?.("track", "Lead", { content_name: "2025 Catch-Up Bookkeeping Offer" });
      setSubmitted(true);
      router.push("/thank-you");
    } catch {
      setError("We could not submit your request. Please try again or call (832) 774-1882.");
    } finally {
      submittingRef.current = false;
      setIsPending(false);
    }
  }

  const fieldClass =
    "mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#ff9f1c] focus:ring-4 focus:ring-[#ff9f1c]/20";

  if (submitted) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center text-center" aria-live="polite">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 text-2xl font-black text-slate-950">Your request is in.</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">We are taking you to the confirmation page now.</p>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div onFocusCapture={trackFormStart}>
        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff3038]">Step 1 of 2</p>
          <p className="text-xs font-bold text-slate-500">About 60 seconds</p>
        </div>
        <div className="mb-6 grid grid-cols-2 gap-2" aria-hidden="true">
          <span className="h-1.5 rounded-full bg-[#ff3038]" />
          <span className="h-1.5 rounded-full bg-slate-200" />
        </div>
        <fieldset>
          <legend className="text-lg font-black leading-snug text-slate-950">What would you like help with first?</legend>
          <p className="mt-1.5 text-sm leading-6 text-slate-600">Choose one to continue. You can explain the details when we contact you.</p>
          <div className="mt-5 grid gap-3">
            {serviceOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  trackFormStart();
                  setSelectedService(option.value);
                  setStep(2);
                }}
                className="group flex min-h-14 w-full items-center justify-between gap-4 rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-left text-sm font-bold text-slate-900 transition hover:-translate-y-0.5 hover:border-[#ff3038] hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-[#ff3038]/20"
              >
                <span>{option.label}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition group-hover:bg-[#ff3038] group-hover:text-white">
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </fieldset>
        <p className="mt-5 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
          <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" /> No payment or financial documents required
        </p>
      </div>
    );
  }

  const selectedServiceLabel = serviceOptions.find((option) => option.value === selectedService)?.label;

  return (
    <form id={idPrefix} action={handleSubmit} onFocusCapture={trackFormStart} className={compact ? "space-y-3.5" : "space-y-4"}>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${idPrefix}-website`}>Leave this field blank</label>
        <input id={`${idPrefix}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">
          {error}
        </div>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff3038]">Step 2 of 2</p>
        <button type="button" onClick={() => setStep(1)} className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 underline underline-offset-2 hover:text-black">
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Change selection
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2" aria-hidden="true">
        <span className="h-1.5 rounded-full bg-[#ff3038]" />
        <span className="h-1.5 rounded-full bg-[#ff3038]" />
      </div>
      <input name="service" type="hidden" value={selectedService} />
      <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold leading-5 text-emerald-900">
        <Check className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {selectedServiceLabel}
      </div>

      <div>
        <label htmlFor={`${idPrefix}-name`} className="text-sm font-bold text-slate-800">Full name</label>
        <input id={`${idPrefix}-name`} name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} placeholder="Your full name" />
      </div>

      <div className={compact ? "grid gap-3.5 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="text-sm font-bold text-slate-800">Email address</label>
          <input id={`${idPrefix}-email`} name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" className={fieldClass} placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="text-sm font-bold text-slate-800">Phone number</label>
          <input id={`${idPrefix}-phone`} name="phone" type="tel" required minLength={10} maxLength={20} autoComplete="tel" inputMode="tel" className={fieldClass} placeholder="(832) 555-0123" />
        </div>
      </div>

      <button type="submit" disabled={isPending} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#ffab19] px-5 text-base font-black text-[#07102c] shadow-lg shadow-[#ffab19]/20 transition hover:bg-[#ffc34f] focus:outline-none focus:ring-4 focus:ring-[#ffab19]/30 disabled:cursor-not-allowed disabled:opacity-70">
        {isPending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending securely...</> : <>Get My Free Bookkeeping Review <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
      </button>

      <p className="text-center text-xs font-bold text-slate-600">No payment required • Direct team follow-up • Written scope first</p>

      <p className="text-[11px] leading-5 text-slate-600">
        By submitting, you agree that IntegraFin may contact you by phone, text, or email about tax and accounting services. Consent is not a condition of purchase. Message and data rates may apply. See our{" "}
        <Link href="/privacy" className="font-bold text-[#075f88] underline underline-offset-2">Privacy Policy</Link> and{" "}
        <Link href="/terms" className="font-bold text-[#075f88] underline underline-offset-2">Terms</Link>.
      </p>
      <p className="flex items-start gap-2 text-[11px] font-semibold leading-5 text-slate-500">
        <LockKeyhole className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Do not submit Social Security numbers, tax IDs, bank details, or financial documents here.
      </p>
    </form>
  );
}
