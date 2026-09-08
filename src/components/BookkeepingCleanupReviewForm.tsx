"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { ArrowRight, CheckCircle2, ChevronDown, Loader2, LockKeyhole } from "lucide-react";
import {
  submitBookkeepingCleanupReview,
  type CleanupReviewSubmission,
} from "@/app/bookkeeping-cleanup-review/actions";
import {
  captureAttributionSnapshots,
  getLeadAttribution,
} from "@/lib/attribution";
import {
  CLEANUP_REVIEW_FORM,
  cleanupContactPreferenceLabels,
  cleanupMonthsBehindLabels,
  cleanupNeedLabels,
  cleanupSoftwareLabels,
} from "@/lib/bookkeepingCleanupReview";
import { baseEventParameters, trackEvent, useFormAnalytics } from "@/lib/analytics";

const fieldClass =
  "mt-1.5 min-h-12 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-base text-slate-950 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-[#087a55] focus:ring-4 focus:ring-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a55]";

export default function BookkeepingCleanupReviewForm() {
  const router = useRouter();
  const trackFormStart = useFormAnalytics(CLEANUP_REVIEW_FORM.id);
  const submittingRef = useRef(false);
  const submissionKeyRef = useRef<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    if (submittingRef.current) return;

    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    if (!email && !phone) {
      setError("Provide an email address or phone number so the team can respond.");
      return;
    }

    const review = {
      name: String(formData.get("name") || ""),
      businessName: String(formData.get("businessName") || ""),
      email,
      phone,
      primaryNeed: String(formData.get("primaryNeed") || ""),
      monthsBehind: String(formData.get("monthsBehind") || ""),
      accountingSoftware: String(formData.get("accountingSoftware") || ""),
      industry: String(formData.get("industry") || ""),
      targetDate: String(formData.get("targetDate") || ""),
      contactPreference: String(formData.get("contactPreference") || ""),
      context: String(formData.get("context") || ""),
      consentToContact: formData.get("consentToContact") === "yes",
      website: String(formData.get("website") || ""),
      idempotencyKey: (submissionKeyRef.current ??= crypto.randomUUID()),
    } as CleanupReviewSubmission["review"];

    submittingRef.current = true;
    setIsPending(true);
    setError("");

    try {
      const result = await submitBookkeepingCleanupReview({
        review,
        attributionSnapshots: captureAttributionSnapshots(),
      });
      if (!result.success) {
        setError(result.message);
        return;
      }

      if (result.created) {
        const attribution = getLeadAttribution();
        trackEvent("generate_lead", {
          ...baseEventParameters(attribution),
          service: "Bookkeeping Cleanup",
          form_source: CLEANUP_REVIEW_FORM.id,
          cta_name: "request_bookkeeping_review",
        });
        const pixel = window.fbq as unknown as
          | ((
              command: string,
              eventName: string,
              parameters?: Record<string, string>,
              options?: { eventID?: string },
            ) => void)
          | undefined;
        pixel?.(
          "track",
          "Lead",
          { content_name: "Bookkeeping Cleanup Scope Review" },
          { eventID: result.leadEventId },
        );
      }

      submissionKeyRef.current = null;
      setSubmitted(true);
      router.push(
        `/bookkeeping-cleanup-review/thank-you?request=${encodeURIComponent(result.bookingCorrelationId)}`,
      );
    } catch {
      setError("We could not save your request. Please try again or call (832) 647-1819.");
    } finally {
      submittingRef.current = false;
      setIsPending(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[32rem] flex-col items-center justify-center px-4 text-center" aria-live="polite">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </span>
        <h2 className="mt-5 text-2xl font-black tracking-tight text-[#0b213b]">Request received</h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-600">
          Opening your private confirmation page now.
        </p>
      </div>
    );
  }

  return (
    <form
      id="bookkeeping-review-form"
      action={handleSubmit}
      aria-busy={isPending}
      onInputCapture={trackFormStart}
      onChangeCapture={trackFormStart}
      className="space-y-4"
    >
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cleanup-review-website">Leave this field blank</label>
        <input id="cleanup-review-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold leading-5 text-red-800" role="alert">
          {error}
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cleanup-review-name" className="text-sm font-bold text-[#142b45]">
            Full name
          </label>
          <input
            id="cleanup-review-name"
            name="name"
            type="text"
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            className={fieldClass}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="cleanup-review-business" className="text-sm font-bold text-[#142b45]">
            Business name
          </label>
          <input
            id="cleanup-review-business"
            name="businessName"
            type="text"
            required
            minLength={2}
            maxLength={120}
            autoComplete="organization"
            className={fieldClass}
            placeholder="Your business"
          />
        </div>
      </div>

      <div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cleanup-review-email" className="text-sm font-bold text-[#142b45]">
              Email
            </label>
            <input
              id="cleanup-review-email"
              name="email"
              type="email"
              maxLength={254}
              autoComplete="email"
              inputMode="email"
              aria-describedby="cleanup-review-contact-help"
              className={fieldClass}
              placeholder="you@business.com"
            />
          </div>
          <div>
            <label htmlFor="cleanup-review-phone" className="text-sm font-bold text-[#142b45]">
              Phone
            </label>
            <input
              id="cleanup-review-phone"
              name="phone"
              type="tel"
              minLength={10}
              maxLength={30}
              autoComplete="tel"
              inputMode="tel"
              aria-describedby="cleanup-review-contact-help"
              className={fieldClass}
              placeholder="(832) 555-0123"
            />
          </div>
        </div>
        <p id="cleanup-review-contact-help" className="mt-1.5 text-xs leading-5 text-slate-500">
          Provide at least one: email or phone.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cleanup-review-need" className="text-sm font-bold text-[#142b45]">
            Primary need
          </label>
          <select id="cleanup-review-need" name="primaryNeed" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select one</option>
            {Object.entries(cleanupNeedLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cleanup-review-months" className="text-sm font-bold text-[#142b45]">
            How far behind?
          </label>
          <select id="cleanup-review-months" name="monthsBehind" required defaultValue="" className={fieldClass}>
            <option value="" disabled>Select one</option>
            {Object.entries(cleanupMonthsBehindLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      <details className="group rounded-xl border border-slate-200 bg-slate-50 open:bg-white">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-[#142b45] marker:hidden">
          Add helpful details <span className="font-medium text-slate-500">(optional)</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-[#087a55] transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <div className="space-y-4 border-t border-slate-200 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cleanup-review-software" className="text-sm font-bold text-[#142b45]">
                Accounting software
              </label>
              <select id="cleanup-review-software" name="accountingSoftware" defaultValue="" className={fieldClass}>
                <option value="">Choose if known</option>
                {Object.entries(cleanupSoftwareLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="cleanup-review-industry" className="text-sm font-bold text-[#142b45]">
                Business type or industry
              </label>
              <input id="cleanup-review-industry" name="industry" type="text" maxLength={100} autoComplete="organization-title" className={fieldClass} placeholder="e.g., contractor, retail" />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cleanup-review-date" className="text-sm font-bold text-[#142b45]">
                Important target date
              </label>
              <input id="cleanup-review-date" name="targetDate" type="date" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="cleanup-review-preference" className="text-sm font-bold text-[#142b45]">
                Preferred contact
              </label>
              <select id="cleanup-review-preference" name="contactPreference" defaultValue="" className={fieldClass}>
                <option value="">Choose if you prefer</option>
                {Object.entries(cleanupContactPreferenceLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="cleanup-review-context" className="text-sm font-bold text-[#142b45]">
              Brief, non-sensitive context
            </label>
            <textarea
              id="cleanup-review-context"
              name="context"
              rows={3}
              maxLength={800}
              className={fieldClass}
              placeholder="Share the general situation or deadline—not account details or documents."
            />
          </div>
        </div>
      </details>

      <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-200 bg-white p-3.5 text-xs leading-5 text-slate-600">
        <input
          name="consentToContact"
          value="yes"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#087a55] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087a55]"
        />
        <span>
          {CLEANUP_REVIEW_FORM.consentText} See our{" "}
          <Link href="/privacy" className="font-bold text-[#075f88] underline underline-offset-2">Privacy Policy</Link>{" "}
          and{" "}
          <Link href="/terms" className="font-bold text-[#075f88] underline underline-offset-2">Terms</Link>.
        </span>
      </label>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3 text-xs leading-5 text-amber-950">
        <p className="flex items-start gap-2">
          <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" aria-hidden="true" />
          <span>
            <strong>Keep sensitive records out of this form.</strong> Do not include Social Security numbers, EINs, bank details, tax returns, login credentials, or other sensitive documents. IntegraFin will confirm the secure records process if more information is needed.
          </span>
        </p>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#087a55] px-5 py-3.5 text-base font-black text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-[#056344] focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-65"
      >
        {isPending ? (
          <><Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Saving your request…</>
        ) : (
          <>Request My Bookkeeping Review <ArrowRight className="h-5 w-5" aria-hidden="true" /></>
        )}
      </button>
      <p className="text-center text-xs font-semibold leading-5 text-slate-500">
        No documents or payment needed. Work begins only after you approve a written scope.
      </p>
    </form>
  );
}
