import { syncCalendlyLead, type CalendlyLeadSyncResult } from "@/lib/calendlyLeadSync";
import type {
  CalendlyScheduledEvent,
  CalendlyWebhookEvent,
} from "@/lib/calendlyWebhook";

const CALENDLY_API_ORIGIN = "https://api.calendly.com";
const MAX_PAGES = 5;
const MAX_EVENTS_PER_SYNC = 100;
const LOOKBACK_DAYS = 7;
const LOOKAHEAD_DAYS = 180;

type UnknownRecord = Record<string, unknown>;

type CalendlyCollectionResponse = {
  collection: UnknownRecord[];
  pagination?: {
    nextPage?: string;
  };
};

export type CalendlyPollingSummary = {
  eventsChecked: number;
  inviteesChecked: number;
  matched: number;
  created: number;
  canceled: number;
  reschedulePending: number;
  ignored: number;
  duplicate: number;
};

function asRecord(value: unknown): UnknownRecord | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;
  return value as UnknownRecord;
}

function cleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return undefined;
  const cleaned = value.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  return cleaned ? cleaned.slice(0, maxLength) : undefined;
}

function parseDate(value: unknown) {
  const text = cleanString(value, 50);
  if (!text) return undefined;
  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function calendlyApiUrl(value: string) {
  const url = new URL(value);
  if (url.origin !== CALENDLY_API_ORIGIN || url.username || url.password) {
    throw new Error("Calendly API returned an invalid resource URL.");
  }
  return url;
}

async function fetchCalendlyJson(url: URL | string, apiToken: string) {
  const safeUrl = calendlyApiUrl(String(url));
  const response = await fetch(safeUrl, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });

  if (!response.ok) {
    throw new Error(`Calendly API request failed with status ${response.status}.`);
  }

  return response.json() as Promise<unknown>;
}

async function fetchCalendlyCollection(
  initialUrl: URL | string,
  apiToken: string,
): Promise<CalendlyCollectionResponse> {
  const collection: UnknownRecord[] = [];
  let nextUrl: URL | undefined = calendlyApiUrl(String(initialUrl));
  let pageCount = 0;

  while (nextUrl && pageCount < MAX_PAGES) {
    const body = asRecord(await fetchCalendlyJson(nextUrl, apiToken));
    if (!body || !Array.isArray(body.collection)) {
      throw new Error("Calendly API returned an invalid collection.");
    }

    collection.push(
      ...body.collection
        .map((item) => asRecord(item))
        .filter((item): item is UnknownRecord => Boolean(item)),
    );

    const pagination = asRecord(body.pagination);
    const nextPage = cleanString(pagination?.next_page, 1000);
    nextUrl = nextPage ? calendlyApiUrl(nextPage) : undefined;
    pageCount += 1;
  }

  return {
    collection,
    pagination: { nextPage: nextUrl?.toString() },
  };
}

function normalizeEmail(value: unknown) {
  const email = cleanString(value, 254)?.toLowerCase();
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
}

function toPollingEvent(
  scheduledEvent: UnknownRecord,
  invitee: UnknownRecord,
): {
  event: CalendlyWebhookEvent;
  scheduledEvent?: CalendlyScheduledEvent;
} | undefined {
  const scheduledEventUri = cleanString(scheduledEvent.uri, 600);
  const inviteeUri = cleanString(invitee.uri, 600);
  if (!scheduledEventUri || !inviteeUri) return undefined;

  try {
    const eventUrl = calendlyApiUrl(scheduledEventUri);
    const inviteeUrl = calendlyApiUrl(inviteeUri);
    if (
      !eventUrl.pathname.includes("/scheduled_events/") ||
      !inviteeUrl.pathname.includes("/invitees/")
    ) {
      return undefined;
    }
  } catch {
    return undefined;
  }

  const scheduledStatus = cleanString(scheduledEvent.status, 30);
  const inviteeStatus = cleanString(invitee.status, 30);
  const isActive = scheduledStatus === "active" && inviteeStatus === "active";
  const startTime = parseDate(scheduledEvent.start_time);
  const eventName = cleanString(scheduledEvent.name, 200) || "Calendly consultation";
  const email = normalizeEmail(invitee.email);

  if (isActive && (!startTime || !email)) return undefined;

  return {
    event: {
      type: isActive ? "invitee.created" : "invitee.canceled",
      occurredAt:
        parseDate(invitee.updated_at) ||
        parseDate(scheduledEvent.updated_at) ||
        parseDate(invitee.created_at) ||
        new Date(),
      inviteeUri,
      scheduledEventUri,
      name: cleanString(invitee.name, 200),
      email,
      phone: cleanString(invitee.text_reminder_number, 30),
      rescheduled: invitee.rescheduled === true,
    },
    ...(isActive && startTime
      ? {
          scheduledEvent: {
            startTime,
            name: eventName,
          },
        }
      : {}),
  };
}

function incrementOutcome(
  summary: CalendlyPollingSummary,
  outcome: CalendlyLeadSyncResult["outcome"],
) {
  if (outcome === "reschedule_pending") {
    summary.reschedulePending += 1;
    return;
  }
  summary[outcome] += 1;
}

export async function runCalendlyPollingSync(
  apiToken: string,
  referenceTime = new Date(),
): Promise<CalendlyPollingSummary> {
  const userBody = asRecord(
    await fetchCalendlyJson(`${CALENDLY_API_ORIGIN}/users/me`, apiToken),
  );
  const userResource = asRecord(userBody?.resource);
  const userUri = cleanString(userResource?.uri, 600);
  if (!userUri) throw new Error("Calendly did not return the current user URI.");
  calendlyApiUrl(userUri);

  const minStartTime = new Date(
    referenceTime.getTime() - LOOKBACK_DAYS * 24 * 60 * 60 * 1000,
  );
  const maxStartTime = new Date(
    referenceTime.getTime() + LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000,
  );

  const eventsUrl = new URL(`${CALENDLY_API_ORIGIN}/scheduled_events`);
  eventsUrl.searchParams.set("user", userUri);
  eventsUrl.searchParams.set("min_start_time", minStartTime.toISOString());
  eventsUrl.searchParams.set("max_start_time", maxStartTime.toISOString());
  eventsUrl.searchParams.set("count", "100");
  eventsUrl.searchParams.set("sort", "start_time:asc");

  const eventsResponse = await fetchCalendlyCollection(eventsUrl, apiToken);
  const scheduledEvents = eventsResponse.collection.slice(0, MAX_EVENTS_PER_SYNC);

  const inviteeGroups: Array<{
    scheduledEvent: UnknownRecord;
    invitees: UnknownRecord[];
  }> = [];

  for (let index = 0; index < scheduledEvents.length; index += 5) {
    const eventBatch = scheduledEvents.slice(index, index + 5);
    const batchResults = await Promise.all(
      eventBatch.map(async (scheduledEvent) => {
        const eventUri = cleanString(scheduledEvent.uri, 600);
        if (!eventUri) return { scheduledEvent, invitees: [] };
        const inviteesUrl = calendlyApiUrl(`${eventUri}/invitees`);
        inviteesUrl.searchParams.set("count", "100");
        const inviteesResponse = await fetchCalendlyCollection(inviteesUrl, apiToken);
        return { scheduledEvent, invitees: inviteesResponse.collection };
      }),
    );
    inviteeGroups.push(...batchResults);
  }

  const pollingEvents = inviteeGroups.flatMap(({ scheduledEvent, invitees }) =>
    invitees
      .map((invitee) => toPollingEvent(scheduledEvent, invitee))
      .filter(
        (
          event,
        ): event is {
          event: CalendlyWebhookEvent;
          scheduledEvent?: CalendlyScheduledEvent;
        } => Boolean(event),
      ),
  );

  // Process active bookings first. A later cancellation for an old rescheduled
  // invitee cannot clear the newly linked invitee URI.
  pollingEvents.sort((left, right) => {
    if (left.event.type === right.event.type) return 0;
    return left.event.type === "invitee.created" ? -1 : 1;
  });

  const summary: CalendlyPollingSummary = {
    eventsChecked: scheduledEvents.length,
    inviteesChecked: pollingEvents.length,
    matched: 0,
    created: 0,
    canceled: 0,
    reschedulePending: 0,
    ignored: 0,
    duplicate: 0,
  };

  for (const pollingEvent of pollingEvents) {
    const result = await syncCalendlyLead(
      pollingEvent.event,
      pollingEvent.scheduledEvent,
    );
    incrementOutcome(summary, result.outcome);
  }

  return summary;
}
