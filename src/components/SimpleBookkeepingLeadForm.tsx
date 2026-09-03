"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, Loader2, LockKeyhole } from "lucide-react";
import { submitLead } from "@/app/actions/leads";
import { captureLeadAttribution, getLeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent, useFormAnalytics } from "@/lib/analytics";

const source = "facebook-bookkeeping-99-simple";

export default function SimpleBookkeepingLeadForm() {
  const router = useRouter();
  const trackFormStart = useFormAnalytics(source);
  const submittingRef = useRef(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const attribution = captureLeadAttribution();
    trackEvent("view_content", {
      ...baseEventParameters(attribution),
      service: "Small Business Bookkeeping",
      landing_page: "/bookkeeping-99",
      traffic_channel: attribution.fbclid ? "facebook_ads" : undefined,
    });
    window.fbq?.("track", "ViewContent", { content_name: "$99 Bookkeeping Eligibility Offer" });
  }, []);

  async function handleSubmit(formData: FormData) {
    if (submittingRef.current) return;

    if (String(formData.get("website") || "").trim()) {
      setError("We could not submit the form. Please refresh the page and try again.");
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();

    if (!name || !email || !phone) {
      setError("Please enter your name, email address, and phone number.");
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
      service: "Small Business Bookkeeping" as const,
      message: "Requested an eligibility review from the simple $99/month bookkeeping landing page.",
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
        cta_name: "check_99_bookkeeping_eligibility",
      });
      window.fbq?.("track", "Lead", { content_name: "$99 Bookkeeping Eligibility Offer" });
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
    "mt-1.5 min-h-12 w-full rounded-xl border-2 border-slate-200 bg-white px-4 text-base text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-[#ff3038] focus:ring-4 focus:ring-[#ff3038]/10";

  if (submitted) {
    return (
      <div className="flex min-h-80 flex-col items-center justify-center text-center" aria-live="polite">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-black text-black">Your request is in.</h2>
        <p className="mt-2 text-sm text-slate-600">Taking you to the confirmation page now.</p>
      </div>
    );
  }

  return (
    <form action={handleSubmit} onFocusCapture={trackFormStart} className="space-y-4">
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="simple-bookkeeping-website">Leave this field blank</label>
        <input id="simple-bookkeeping-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-800" role="alert">
          {error}
        </div>
      ) : null}

      <div>
        <label htmlFor="simple-bookkeeping-name" className="text-sm font-bold text-slate-900">Full name</label>
        <input id="simple-bookkeeping-name" name="name" type="text" required minLength={2} maxLength={100} autoComplete="name" className={fieldClass} placeholder="Your full name" />
      </div>

      <div>
        <label htmlFor="simple-bookkeeping-email" className="text-sm font-bold text-slate-900">Email address</label>
        <input id="simple-bookkeeping-email" name="email" type="email" required maxLength={254} autoComplete="email" inputMode="email" className={fieldClass} placeholder="you@email.com" />
      </div>

      <div>
        <label htmlFor="simple-bookkeeping-phone" className="text-sm font-bold text-slate-900">Phone number</label>
        <input id="simple-bookkeeping-phone" name="phone" type="tel" required minLength={10} maxLength={20} autoComplete="tel" inputMode="tel" className={fieldClass} placeholder="(832) 555-0123" />
      </div>

      <button type="submit" disabled={isPending} className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#ff3038] px-5 text-base font-black text-white shadow-[0_12px_25px_-12px_rgba(255,48,56,.8)] transition hover:-translate-y-0.5 hover:bg-[#df1d27] focus:outline-none focus:ring-4 focus:ring-[#ff3038]/25 disabled:cursor-not-allowed disabled:opacity-60">
        {isPending ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending...</> : <>Check My Eligibility <ArrowRight className="h-5 w-5" aria-hidden="true" /></>}
      </button>

      <p className="text-center text-xs font-bold text-slate-600">Free review. No payment required.</p>
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
