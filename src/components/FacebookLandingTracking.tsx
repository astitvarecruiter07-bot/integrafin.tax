"use client";

import { useEffect } from "react";
import { captureLeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent } from "@/lib/analytics";

export default function FacebookLandingTracking() {
  useEffect(() => {
    const attribution = captureLeadAttribution();
    trackEvent("view_content", {
      ...baseEventParameters(attribution),
      service: "Bookkeeping Cleanup",
      landing_page: "/",
      traffic_channel: attribution.fbclid ? "facebook_ads" : undefined,
    });
    window.fbq?.("track", "ViewContent", { content_name: "2025 Catch-Up Bookkeeping Offer" });
  }, []);

  return null;
}
