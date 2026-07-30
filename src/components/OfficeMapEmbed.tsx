"use client";

import { useState } from "react";

const mapSearchUrl =
  "https://www.google.com/maps/search/?api=1&query=2039+N+Mason+Rd+Suite+604+Katy+TX+77449";
const mapEmbedUrl =
  "https://www.google.com/maps?q=2039+N+Mason+Rd+Suite+604+Katy+TX+77449&output=embed";

export default function OfficeMapEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  if (isLoaded) {
    return (
      <iframe
        src={mapEmbedUrl}
        width="100%"
        height="380"
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Map to IntegraFin at 2039 N Mason Rd Suite 604 in Katy, Texas"
        className="block min-h-[320px] w-full"
      />
    );
  }

  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center bg-[radial-gradient(circle_at_top,rgba(0,146,223,0.14),transparent_55%)] p-8 text-center">
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-blue">
        IntegraFin Tax &amp; Accounting
      </p>
      <p className="mt-3 text-lg font-black text-primary-dark">
        2039 N Mason Rd, Suite 604, Katy, TX 77449
      </p>
      <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600">
        Load the interactive Google map only when you need directions. This avoids downloading
        third-party map resources during the initial page visit.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setIsLoaded(true)}
          className="rounded-xl bg-primary-dark px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Load interactive map
        </button>
        <a
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-primary-dark transition-colors hover:border-brand-blue"
        >
          Open in Google Maps
        </a>
      </div>
    </div>
  );
}
