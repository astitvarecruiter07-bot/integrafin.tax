"use client";

import { useEffect, useRef } from "react";
import type { LeadAttribution } from "@/lib/attribution";
import { getLeadAttribution } from "@/lib/attribution";

export type AnalyticsEventName =
  | "form_view"
  | "form_start"
  | "generate_lead"
  | "newsletter_submit"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "booking_start"
  | "booking_complete"
  | "calculator_complete"
  | "portal_click";

type SafeEventParameter = string | number | boolean | undefined;
type AnalyticsParameters = Record<string, SafeEventParameter>;

const safeParameterNames = new Set([
  "service",
  "landing_page",
  "page_type",
  "city_state_intent",
  "form_source",
  "cta_name",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "calculator_name",
  "tax_year",
]);

function isSafeAnalyticsValue(value: SafeEventParameter) {
  if (typeof value !== "string") return true;
  const normalized = value.trim();
  if (!normalized || normalized.length > 100) return false;
  if (/[\s@]+[^\s@]+@[^\s@]+\.[^\s@]+/.test(normalized)) return false;
  if (/^(?:\+?\d[\s().-]*){7,}\d$/.test(normalized)) return false;
  if (/^(?:https?:\/\/|mailto:|tel:)/i.test(normalized)) return false;
  return true;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: "event", eventName: string, parameters?: AnalyticsParameters) => void;
  }
}

function currentPath() {
  return typeof window === "undefined" ? undefined : window.location.pathname;
}

export function getPageType(path = currentPath()) {
  if (!path) return "unknown";
  if (path === "/") return "homepage";
  if (path === "/contact") return "contact";
  if (path === "/tax-calculator") return "calculator";
  if (path.startsWith("/blog/")) return "article";
  if (path === "/blog") return "blog_index";
  if (/^\/(texas|new-york|pennsylvania)\//.test(path)) return "local_landing";
  if (path.endsWith("-tax-accounting-services")) return "state_hub";
  if (path === "/services" || path.includes("tax") || path.includes("bookkeeping")) {
    return "service";
  }
  return "content";
}

export function getCityStateIntent(path = currentPath()) {
  if (!path) return "none";
  if (path.startsWith("/texas/") || path === "/texas-tax-accounting-services") return "texas";
  if (path.startsWith("/new-york/") || path === "/new-york-tax-accounting-services") return "new_york";
  if (path.startsWith("/pennsylvania/") || path === "/pennsylvania-tax-accounting-services") {
    return "pennsylvania";
  }
  return "none";
}

export function attributionEventParameters(attribution: LeadAttribution): AnalyticsParameters {
  return {
    utm_source: attribution.utmSource,
    utm_medium: attribution.utmMedium,
    utm_campaign: attribution.utmCampaign,
  };
}

export function baseEventParameters(attribution = getLeadAttribution()): AnalyticsParameters {
  const landingPage = currentPath();
  return {
    landing_page: landingPage,
    page_type: getPageType(landingPage),
    city_state_intent: getCityStateIntent(landingPage),
    ...attributionEventParameters(attribution),
  };
}

export function trackEvent(eventName: AnalyticsEventName, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;

  const safeParameters = Object.fromEntries(
    Object.entries(parameters).filter(
      ([name, value]) =>
        safeParameterNames.has(name) &&
        value !== undefined &&
        value !== "" &&
        isSafeAnalyticsValue(value),
    ),
  );

  window.gtag("event", eventName, safeParameters);
}

export function useFormAnalytics(formSource: string) {
  const started = useRef(false);

  useEffect(() => {
    trackEvent("form_view", {
      ...baseEventParameters(),
      form_source: formSource,
    });
  }, [formSource]);

  function trackFormStart() {
    if (started.current) return;
    started.current = true;
    trackEvent("form_start", {
      ...baseEventParameters(),
      form_source: formSource,
    });
  }

  return trackFormStart;
}
