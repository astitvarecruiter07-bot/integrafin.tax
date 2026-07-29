export const AI_REFERRAL_SOURCES = [
  "chatgpt",
  "perplexity",
  "gemini",
  "copilot",
  "claude",
  "meta_ai",
  "you",
  "phind",
] as const;

export type AiReferralSource = (typeof AI_REFERRAL_SOURCES)[number];

const sourceMatchers: Array<{
  source: AiReferralSource;
  utmValues: string[];
  hosts: string[];
}> = [
  {
    source: "chatgpt",
    utmValues: ["chatgpt", "chatgpt.com", "chat.openai.com"],
    hosts: ["chatgpt.com", "chat.openai.com"],
  },
  {
    source: "perplexity",
    utmValues: ["perplexity", "perplexity.ai"],
    hosts: ["perplexity.ai"],
  },
  {
    source: "gemini",
    utmValues: ["gemini", "google_gemini"],
    hosts: ["gemini.google.com"],
  },
  {
    source: "copilot",
    utmValues: ["copilot", "microsoft_copilot", "bing_chat"],
    hosts: ["copilot.microsoft.com"],
  },
  {
    source: "claude",
    utmValues: ["claude", "claude.ai"],
    hosts: ["claude.ai"],
  },
  {
    source: "meta_ai",
    utmValues: ["meta_ai", "meta ai"],
    hosts: ["meta.ai"],
  },
  {
    source: "you",
    utmValues: ["you", "you.com"],
    hosts: ["you.com"],
  },
  {
    source: "phind",
    utmValues: ["phind", "phind.com"],
    hosts: ["phind.com"],
  },
];

function normalizeHost(hostname: string) {
  return hostname.toLowerCase().replace(/^www\./, "");
}

export function normalizeAiReferralSource(value: unknown): AiReferralSource | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  return AI_REFERRAL_SOURCES.find((source) => source === normalized);
}

export function detectAiReferralSource({
  utmSource,
  referrer,
}: {
  utmSource?: string;
  referrer?: string;
}): AiReferralSource | undefined {
  const normalizedUtm = utmSource?.trim().toLowerCase();
  if (normalizedUtm) {
    const utmMatch = sourceMatchers.find(({ utmValues }) => utmValues.includes(normalizedUtm));
    if (utmMatch) return utmMatch.source;
  }

  if (!referrer) return undefined;

  try {
    const referrerUrl = new URL(referrer);
    const hostname = normalizeHost(referrerUrl.hostname);
    const path = referrerUrl.pathname.toLowerCase();

    if (
      (hostname === "bing.com" || hostname.endsWith(".bing.com")) &&
      (path.startsWith("/chat") || path.startsWith("/copilot"))
    ) {
      return "copilot";
    }

    return sourceMatchers.find(({ hosts }) =>
      hosts.some((host) => hostname === host || hostname.endsWith(`.${host}`)),
    )?.source;
  } catch {
    return undefined;
  }
}
