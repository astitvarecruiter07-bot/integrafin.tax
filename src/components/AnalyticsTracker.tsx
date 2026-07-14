"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { captureLeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent, type AnalyticsEventName } from "@/lib/analytics";

function getTrackedClick(anchor: HTMLAnchorElement): AnalyticsEventName | undefined {
  const href = anchor.getAttribute("href")?.trim().toLowerCase();
  if (!href) return undefined;
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  if (href.includes("wa.me/") || href.includes("whatsapp.com/")) return "whatsapp_click";
  if (href.includes("calendly.com/") || href.includes("/booking")) return "booking_start";
  if (href.includes("portal")) return "portal_click";
  return undefined;
}

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureLeadAttribution();
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
        cta_name: anchor.dataset.analyticsLabel || eventName,
      });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
