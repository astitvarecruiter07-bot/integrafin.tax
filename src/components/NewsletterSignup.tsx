"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { submitNewsletterSignup } from "@/app/actions/leads";
import { getLeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent, useFormAnalytics } from "@/lib/analytics";

type NewsletterSignupProps = {
  source: string;
  placeholder?: string;
  buttonLabel?: string;
  variant?: "light" | "dark";
};

export default function NewsletterSignup({
  source,
  placeholder = "Email",
  buttonLabel = "Subscribe",
  variant = "dark",
}: NewsletterSignupProps) {
  const trackFormStart = useFormAnalytics(source);
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage(null);

    try {
      const attribution = getLeadAttribution();
      const result = await submitNewsletterSignup({ email, source, attribution });
      setMessage({ type: result.success ? "success" : "error", text: result.message });
      if (result.success) {
        trackEvent("newsletter_submit", {
          ...baseEventParameters(attribution),
          form_source: source,
          cta_name: "newsletter_subscribe",
        });
        setEmail("");
      }
    } catch {
      setMessage({
        type: "error",
        text: "We could not complete the signup. Please email contact@integrafin.tax.",
      });
    } finally {
      setIsPending(false);
    }
  }

  const isDark = variant === "dark";

  return (
    <div className="space-y-2">
      <form
        className="flex flex-col sm:flex-row gap-2"
        onSubmit={handleSubmit}
        onFocusCapture={trackFormStart}
      >
        <input
          suppressHydrationWarning
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          aria-label="Email for newsletter"
          required
          className={
            isDark
              ? "flex-1 px-4 py-2.5 bg-white/10 rounded-full text-sm text-white placeholder:text-gray-500 border border-white/10 focus:border-primary focus:outline-none transition-colors"
              : "flex-grow bg-slate-50 border border-slate-200 rounded-xl px-6 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0092df] focus:border-[#0092df] transition-all placeholder:text-slate-400"
          }
        />
        <button
          suppressHydrationWarning
          type="submit"
          disabled={isPending}
          className={
            isDark
              ? "px-5 py-2.5 bg-accent text-accent-dark font-semibold text-sm rounded-full hover:bg-primary hover:text-white transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              : "bg-[#003580] hover:bg-[#002050] text-white px-10 py-4 rounded-xl font-black tracking-widest uppercase text-xs transition-all duration-300 shadow-lg shadow-[#003580]/20 hover:-translate-y-0.5 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          }
        >
          {isPending ? (
            <>
              Sending
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            buttonLabel
          )}
        </button>
      </form>
      {message && (
        <p className={`text-xs ${message.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}
