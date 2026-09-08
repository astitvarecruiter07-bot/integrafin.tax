"use client";

import { useEffect, useRef } from "react";
import type { LeadAttribution } from "@/lib/attribution";
import { getLeadAttribution } from "@/lib/attribution";

export type AnalyticsEventName =
  | "form_view"
  | "form_start"
  | "view_content"
  | "generate_lead"
  | "newsletter_submit"
  | "contact_cta_click"
  | "phone_click"
  | "whatsapp_click"
  | "email_click"
  | "booking_start"
  | "booking_complete"
  | "calculator_complete"
  | "portal_click"
  | "ai_referral_visit"
  | "cleanup_calculator_view"
  | "cleanup_calculator_start"
  | "cleanup_calculator_step"
  | "cleanup_calculator_complete"
  | "cleanup_result_view"
  | "cleanup_lead_form_start"
  | "cleanup_lead_submit"
  | "cleanup_consultation_click"
  | "bookkeeping_cost_view"
  | "bookkeeping_cost_start"
  | "bookkeeping_cost_step"
  | "bookkeeping_cost_result"
  | "bookkeeping_cost_adjust"
  | "bookkeeping_quote_form_start"
  | "bookkeeping_quote_submit"
  | "bookkeeping_quote_cta";

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
  "ai_source",
  "traffic_channel",
  "debug_mode",
  "calculator_version",
  "step_number",
  "estimate_mode",
  "pricing_config_version",
]);

function isSafeAnalyticsValue(value: SafeEventParameter) {
  if (typeof value !== "string") return true;
  const normalized = value.trim();
  if (!normalized || normalized.length > 100) return false;
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(normalized)) return false;
  if (/(?:\+?\d[\s().-]*){7,}\d/.test(normalized)) return false;
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
  if (
    [
      "/tax-calculator",
      "/quarterly-estimated-tax-calculator",
      "/self-employment-tax-calculator",
      "/1099-tax-calculator",
      "/capital-gains-tax-calculator",
      "/bookkeeping-cleanup-calculator",
      "/bookkeeping-cost-calculator",
    ].includes(path)
  ) {
    return "calculator";
  }
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
    ai_source: attribution.aiReferralSource,
    traffic_channel: attribution.aiReferralSource ? "ai_referral" : undefined,
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
  if (typeof window === "undefined") return;

  const debugMode = new URLSearchParams(window.location.search).get("debug_mode");
  const eventParameters: AnalyticsParameters = {
    ...parameters,
    ...(debugMode === "1" || debugMode === "true" ? { debug_mode: true } : {}),
  };

  const safeParameters = Object.fromEntries(
    Object.entries(eventParameters).filter(
      ([name, value]) =>
        safeParameterNames.has(name) &&
        value !== undefined &&
        value !== "" &&
        isSafeAnalyticsValue(value),
    ),
  );

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, safeParameters);
    return;
  }

  // Preserve early interactions until the async Google tag has initialized.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, safeParameters]);
}

export function useFormAnalytics(formSource: string) {
  const viewed = useRef(false);
  const started = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
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
