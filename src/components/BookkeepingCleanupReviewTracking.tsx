"use client";

import { useEffect, useRef } from "react";
import { captureAttributionSnapshots, captureLeadAttribution } from "@/lib/attribution";
import { baseEventParameters, trackEvent } from "@/lib/analytics";
import { CLEANUP_REVIEW_FORM } from "@/lib/bookkeepingCleanupReview";

export default function BookkeepingCleanupReviewTracking() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    const attribution = captureLeadAttribution();
    captureAttributionSnapshots();
    trackEvent("view_content", {
      ...baseEventParameters(attribution),
      service: "Bookkeeping Cleanup",
      landing_page: CLEANUP_REVIEW_FORM.pagePath,
      traffic_channel: attribution.fbclid ? "facebook_ads" : undefined,
    });

    const pixel = window.fbq as unknown as
      | ((command: string, eventName: string, parameters?: Record<string, string>) => void)
      | undefined;
    pixel?.("track", "ViewContent", {
      content_name: "Bookkeeping Cleanup Scope Review",
    });
  }, []);

  return null;
}
