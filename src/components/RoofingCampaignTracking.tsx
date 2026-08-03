"use client";

import { useEffect } from "react";
import { baseEventParameters, trackEvent } from "@/lib/analytics";

export default function RoofingCampaignTracking() {
  useEffect(() => {
    trackEvent("view_content", {
      ...baseEventParameters(),
      service: "Contractor Bookkeeping",
      landing_page: "/bookkeeping-for-roofing-contractors-houston",
    });
    window.fbq?.("track", "ViewContent", { content_name: "Roofing Bookkeeping Review" });
  }, []);

  return null;
}
