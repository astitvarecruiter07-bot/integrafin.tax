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
  firstTouchAt?: string;
};

type StoredAttribution = Omit<LeadAttribution, "currentSubmissionPage">;

const STORAGE_KEY = "integrafin_lead_attribution_v1";
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
] as const;

let memoryAttribution: StoredAttribution | undefined;

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

  writeStoredAttribution(next);

  return {
    ...next,
    currentSubmissionPage: currentPath,
  };
}

export function getLeadAttribution(): LeadAttribution {
  return captureLeadAttribution();
}
