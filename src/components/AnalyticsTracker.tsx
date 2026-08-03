"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureLeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent, type AnalyticsEventName } from "@/lib/analytics";
import { detectAiReferralSource } from "@/lib/aiReferral";

const AI_REFERRAL_SESSION_KEY = "integrafin_ai_referral_visit_v1";
let aiReferralVisitTracked = false;

function getTrackedClick(anchor: HTMLAnchorElement): AnalyticsEventName | undefined {
  const href = anchor.getAttribute("href")?.trim().toLowerCase();
  if (!href) return undefined;
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("wa.me/") || href.includes("whatsapp.com/")) return "whatsapp_click";
  if (href.includes("calendly.com/") || href.includes("/booking")) return "booking_start";
  if (href.includes("portal")) return "portal_click";

  try {
    const destination = new URL(anchor.href);
    if (destination.origin === window.location.origin && destination.pathname === "/contact") {
      return "contact_cta_click";
    }
  } catch {
    // Ignore malformed or non-navigational href values.
  }

  return undefined;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const attribution = captureLeadAttribution();
    const currentAiReferralSource = detectAiReferralSource({
      utmSource: new URLSearchParams(window.location.search).get("utm_source") || undefined,
      referrer: document.referrer,
    });
    if (!currentAiReferralSource || aiReferralVisitTracked) return;

    try {
      if (window.sessionStorage.getItem(AI_REFERRAL_SESSION_KEY)) {
        aiReferralVisitTracked = true;
        return;
      }
      window.sessionStorage.setItem(AI_REFERRAL_SESSION_KEY, "1");
    } catch {
      // In-memory deduplication still prevents repeat events in restricted browsers.
    }

    aiReferralVisitTracked = true;
    trackEvent("ai_referral_visit", {
      ...baseEventParameters(attribution),
      ai_source: currentAiReferralSource,
      traffic_channel: "ai_referral",
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (window.location.pathname.startsWith("/admin")) return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.dataset.analyticsIgnore === "true") return;

      const eventName = getTrackedClick(anchor);
      if (!eventName) return;

      trackEvent(eventName, {
        ...baseEventParameters(),
        cta_name:
          anchor.dataset.analyticsLabel ||
          (eventName === "contact_cta_click" ? "contact_link" : eventName),
      });
      if (eventName === "phone_click") {
        window.fbq?.("track", "Contact", { content_name: "Phone Call" });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    function handleCalendlyMessage(event: MessageEvent) {
      if (event.origin !== "https://calendly.com") return;
      if (!event.data || typeof event.data !== "object") return;
      if ((event.data as { event?: string }).event !== "calendly.event_scheduled") return;

      trackEvent("booking_complete", {
        ...baseEventParameters(),
        cta_name: "calendly_event_scheduled",
      });
      window.fbq?.("track", "Schedule", { content_name: "IntegraFin Consultation" });
    }

    window.addEventListener("message", handleCalendlyMessage);
    return () => window.removeEventListener("message", handleCalendlyMessage);
  }, []);

  return null;
}
