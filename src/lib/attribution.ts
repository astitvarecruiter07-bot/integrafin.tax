import {
  detectAiReferralSource,
  normalizeAiReferralSource,
  type AiReferralSource,
} from "@/lib/aiReferral";

export type LeadAttribution = {
  firstLandingPage?: string;
  currentSubmissionPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  fbclid?: string;
  aiReferralSource?: AiReferralSource;
  firstTouchAt?: string;
};

export type AttributionTouchSnapshot = {
  landingPage: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
  msclkid?: string;
  fbclid?: string;
  capturedAt: string;
};

export type AttributionSnapshots = {
  firstTouch: AttributionTouchSnapshot;
  lastNonDirectTouch?: AttributionTouchSnapshot;
  submissionTouch: AttributionTouchSnapshot;
};

type StoredAttribution = Omit<LeadAttribution, "currentSubmissionPage">;

const STORAGE_KEY = "integrafin_lead_attribution_v1";
const SNAPSHOT_STORAGE_KEY = "integrafin_attribution_snapshots_v1";
const SNAPSHOT_RETENTION_MS = 90 * 24 * 60 * 60 * 1000;
const MAX_PATH_LENGTH = 500;
const MAX_REFERRER_LENGTH = 500;
const MAX_CAMPAIGN_VALUE_LENGTH = 200;

const campaignParameters = [
  ["utm_source", "utmSource"],
  ["utm_medium", "utmMedium"],
  ["utm_campaign", "utmCampaign"],
  ["utm_content", "utmContent"],
  ["utm_term", "utmTerm"],
  ["gclid", "gclid"],
  ["gbraid", "gbraid"],
  ["wbraid", "wbraid"],
  ["msclkid", "msclkid"],
  ["fbclid", "fbclid"],
] as const;

let memoryAttribution: StoredAttribution | undefined;
let memorySnapshots:
  | {
      firstTouch: AttributionTouchSnapshot;
      lastNonDirectTouch?: AttributionTouchSnapshot;
      retainedUntil: string;
    }
  | undefined;

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function cleanPath(value: unknown) {
  const path = cleanString(value, MAX_PATH_LENGTH);
  return path?.startsWith("/") ? path : undefined;
}

function cleanTimestamp(value: unknown) {
  const timestamp = cleanString(value, 40);
  return timestamp && !Number.isNaN(Date.parse(timestamp)) ? timestamp : undefined;
}

function cleanReferrer(value: string) {
  if (!value) return undefined;

  try {
    const referrerUrl = new URL(value);
    const referrer =
      referrerUrl.origin === window.location.origin
        ? referrerUrl.pathname
        : `${referrerUrl.origin}${referrerUrl.pathname}`;
    return cleanString(referrer, MAX_REFERRER_LENGTH);
  } catch {
    return undefined;
  }
}

function normalizeStoredAttribution(value: unknown): StoredAttribution | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

  const candidate = value as Record<string, unknown>;
  const normalized: StoredAttribution = {
    firstLandingPage: cleanPath(candidate.firstLandingPage),
    referrer: cleanString(candidate.referrer, MAX_REFERRER_LENGTH),
    utmSource: cleanString(candidate.utmSource, MAX_CAMPAIGN_VALUE_LENGTH),
    utmMedium: cleanString(candidate.utmMedium, MAX_CAMPAIGN_VALUE_LENGTH),
    utmCampaign: cleanString(candidate.utmCampaign, MAX_CAMPAIGN_VALUE_LENGTH),
    utmContent: cleanString(candidate.utmContent, MAX_CAMPAIGN_VALUE_LENGTH),
    utmTerm: cleanString(candidate.utmTerm, MAX_CAMPAIGN_VALUE_LENGTH),
    gclid: cleanString(candidate.gclid, MAX_CAMPAIGN_VALUE_LENGTH),
    gbraid: cleanString(candidate.gbraid, MAX_CAMPAIGN_VALUE_LENGTH),
    wbraid: cleanString(candidate.wbraid, MAX_CAMPAIGN_VALUE_LENGTH),
    msclkid: cleanString(candidate.msclkid, MAX_CAMPAIGN_VALUE_LENGTH),
    fbclid: cleanString(candidate.fbclid, MAX_CAMPAIGN_VALUE_LENGTH),
    aiReferralSource: normalizeAiReferralSource(candidate.aiReferralSource),
    firstTouchAt: cleanTimestamp(candidate.firstTouchAt),
  };

  return Object.values(normalized).some(Boolean) ? normalized : undefined;
}

function readStoredAttribution() {
  if (typeof window === "undefined") return undefined;

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value) {
      const normalized = normalizeStoredAttribution(JSON.parse(value));
      if (normalized) memoryAttribution = normalized;
    }
  } catch {
    // Local storage can be unavailable in privacy-restricted browsers.
  }

  return memoryAttribution;
}

function writeStoredAttribution(attribution: StoredAttribution) {
  memoryAttribution = attribution;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {
    // The in-memory value still supports attribution during this page view.
  }
}

export function captureLeadAttribution(): LeadAttribution {
  if (typeof window === "undefined") return {};

  const existing = readStoredAttribution();
  const searchParameters = new URLSearchParams(window.location.search);
  const currentPath = cleanPath(window.location.pathname) || "/";
  const next: StoredAttribution = {
    firstLandingPage: existing?.firstLandingPage || currentPath,
    referrer: existing?.referrer || cleanReferrer(document.referrer),
    firstTouchAt: existing?.firstTouchAt || new Date().toISOString(),
  };

  for (const [queryName, fieldName] of campaignParameters) {
    next[fieldName] =
      existing?.[fieldName] ||
      cleanString(searchParameters.get(queryName), MAX_CAMPAIGN_VALUE_LENGTH);
  }

  if (next.fbclid && !next.utmSource) next.utmSource = "facebook";
  if (next.fbclid && !next.utmMedium) next.utmMedium = "paid_social";

  next.aiReferralSource =
    existing?.aiReferralSource ||
    detectAiReferralSource({
      utmSource: next.utmSource,
      referrer: document.referrer,
    });

  writeStoredAttribution(next);

  return {
    ...next,
    currentSubmissionPage: currentPath,
  };
}

export function getLeadAttribution(): LeadAttribution {
  return captureLeadAttribution();
}

function normalizeTouchSnapshot(value: unknown): AttributionTouchSnapshot | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  const candidate = value as Record<string, unknown>;
  const landingPage = cleanPath(candidate.landingPage);
  const capturedAt = cleanTimestamp(candidate.capturedAt);
  if (!landingPage || !capturedAt) return undefined;

  return {
    landingPage,
    referrer: cleanString(candidate.referrer, MAX_REFERRER_LENGTH),
    utmSource: cleanString(candidate.utmSource, MAX_CAMPAIGN_VALUE_LENGTH),
    utmMedium: cleanString(candidate.utmMedium, MAX_CAMPAIGN_VALUE_LENGTH),
    utmCampaign: cleanString(candidate.utmCampaign, MAX_CAMPAIGN_VALUE_LENGTH),
    utmContent: cleanString(candidate.utmContent, MAX_CAMPAIGN_VALUE_LENGTH),
    utmTerm: cleanString(candidate.utmTerm, MAX_CAMPAIGN_VALUE_LENGTH),
    gclid: cleanString(candidate.gclid, MAX_CAMPAIGN_VALUE_LENGTH),
    gbraid: cleanString(candidate.gbraid, MAX_CAMPAIGN_VALUE_LENGTH),
    wbraid: cleanString(candidate.wbraid, MAX_CAMPAIGN_VALUE_LENGTH),
    msclkid: cleanString(candidate.msclkid, MAX_CAMPAIGN_VALUE_LENGTH),
    fbclid: cleanString(candidate.fbclid, MAX_CAMPAIGN_VALUE_LENGTH),
    capturedAt,
  };
}

function currentTouchSnapshot(): AttributionTouchSnapshot {
  const searchParameters = new URLSearchParams(window.location.search);
  const snapshot: AttributionTouchSnapshot = {
    landingPage: cleanPath(window.location.pathname) || "/",
    referrer: cleanReferrer(document.referrer),
    capturedAt: new Date().toISOString(),
  };

  for (const [queryName, fieldName] of campaignParameters) {
    snapshot[fieldName] = cleanString(
      searchParameters.get(queryName),
      MAX_CAMPAIGN_VALUE_LENGTH,
    );
  }

  if (snapshot.fbclid && !snapshot.utmSource) snapshot.utmSource = "facebook";
  if (snapshot.fbclid && !snapshot.utmMedium) snapshot.utmMedium = "paid_social";
  return snapshot;
}

function isNonDirectTouch(snapshot: AttributionTouchSnapshot) {
  const hasCampaignData = Boolean(
    snapshot.utmSource ||
      snapshot.utmMedium ||
      snapshot.utmCampaign ||
      snapshot.utmContent ||
      snapshot.utmTerm ||
      snapshot.gclid ||
      snapshot.gbraid ||
      snapshot.wbraid ||
      snapshot.msclkid ||
      snapshot.fbclid,
  );
  if (hasCampaignData) return true;
  if (!snapshot.referrer || snapshot.referrer.startsWith("/")) return false;

  try {
    return new URL(snapshot.referrer).origin !== window.location.origin;
  } catch {
    return false;
  }
}

function readStoredSnapshots() {
  if (typeof window === "undefined") return undefined;

  try {
    const raw = window.localStorage.getItem(SNAPSHOT_STORAGE_KEY);
    if (!raw) return memorySnapshots;
    const candidate = JSON.parse(raw) as Record<string, unknown>;
    const firstTouch = normalizeTouchSnapshot(candidate.firstTouch);
    const lastNonDirectTouch = normalizeTouchSnapshot(candidate.lastNonDirectTouch);
    const retainedUntil = cleanTimestamp(candidate.retainedUntil);
    if (!firstTouch || !retainedUntil || Date.parse(retainedUntil) <= Date.now()) {
      window.localStorage.removeItem(SNAPSHOT_STORAGE_KEY);
      memorySnapshots = undefined;
      return undefined;
    }
    memorySnapshots = { firstTouch, lastNonDirectTouch, retainedUntil };
  } catch {
    // In-memory storage remains available when local storage is restricted.
  }

  return memorySnapshots;
}

function writeStoredSnapshots(value: NonNullable<typeof memorySnapshots>) {
  memorySnapshots = value;
  try {
    window.localStorage.setItem(SNAPSHOT_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // In-memory storage still preserves coherent snapshots for this page view.
  }
}

/**
 * Keeps each touch as one coherent snapshot. Individual UTM or click fields are
 * never filled from a different visit, and the first touch remains immutable
 * until the 90-day retention window expires.
 */
export function captureAttributionSnapshots(): AttributionSnapshots | undefined {
  if (typeof window === "undefined") return undefined;

  const currentTouch = currentTouchSnapshot();
  const existing = readStoredSnapshots();
  const firstTouch = existing?.firstTouch || currentTouch;
  const lastNonDirectTouch = isNonDirectTouch(currentTouch)
    ? currentTouch
    : existing?.lastNonDirectTouch;
  const retainedUntil =
    existing?.retainedUntil || new Date(Date.now() + SNAPSHOT_RETENTION_MS).toISOString();

  writeStoredSnapshots({ firstTouch, lastNonDirectTouch, retainedUntil });
  return {
    firstTouch,
    lastNonDirectTouch,
    submissionTouch: currentTouch,
  };
}
