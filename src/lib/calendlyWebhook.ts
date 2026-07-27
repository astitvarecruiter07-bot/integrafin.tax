import { timingSafeEqual } from "node:crypto";

const CALENDLY_API_ORIGIN = "https://api.calendly.com";
const MAX_URI_LENGTH = 600;
const MAX_NAME_LENGTH = 200;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 30;

type UnknownRecord = Record<string, unknown>;

export type CalendlyWebhookEvent = {
  type: "invitee.created" | "invitee.canceled";
  occurredAt: Date;
  inviteeUri: string;
  scheduledEventUri: string;
  name?: string;
  email?: string;
  phone?: string;
  rescheduled: boolean;
  inlineScheduledEvent?: CalendlyScheduledEvent;
};

export type CalendlyScheduledEvent = {
  startTime: Date;
  name: string;
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

function isCalendlyApiUri(value: string, resource: "scheduled_events" | "invitees") {
  try {
    const uri = new URL(value);
    return (
      uri.origin === CALENDLY_API_ORIGIN &&
      uri.pathname.includes(`/${resource}/`) &&
      !uri.username &&
      !uri.password
    );
  } catch {
    return false;
  }
}

export function normalizeCalendlyEmail(value: unknown) {
  const email = cleanString(value, MAX_EMAIL_LENGTH)?.toLowerCase();
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
}

export function verifySharedSecret(provided: string | null, expected: string) {
  if (!provided || !expected) return false;
  const providedBuffer = Buffer.from(provided);
  const expectedBuffer = Buffer.from(expected);
  return (
    providedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(providedBuffer, expectedBuffer)
  );
}

export function parseCalendlyWebhook(value: unknown): CalendlyWebhookEvent | undefined {
  const body = asRecord(value);
  if (!body) return undefined;

  const type = body.event;
  if (type !== "invitee.created" && type !== "invitee.canceled") return undefined;

  const payload = asRecord(body.payload);
  if (!payload) return undefined;

  const inviteeUri = cleanString(payload.uri, MAX_URI_LENGTH);
  const scheduledEventUri = cleanString(payload.event, MAX_URI_LENGTH);
  if (
    !inviteeUri ||
    !scheduledEventUri ||
    !isCalendlyApiUri(inviteeUri, "invitees") ||
    !isCalendlyApiUri(scheduledEventUri, "scheduled_events")
  ) {
    return undefined;
  }

  const email = normalizeCalendlyEmail(payload.email);
  if (type === "invitee.created" && !email) return undefined;

  const inline = asRecord(payload.scheduled_event);
  const inlineStartTime = parseDate(inline?.start_time);
  const inlineName = cleanString(inline?.name, MAX_NAME_LENGTH);

  return {
    type,
    occurredAt: parseDate(body.created_at) || parseDate(payload.updated_at) || new Date(),
    inviteeUri,
    scheduledEventUri,
    name: cleanString(payload.name, MAX_NAME_LENGTH),
    email,
    phone: cleanString(payload.text_reminder_number, MAX_PHONE_LENGTH),
    rescheduled: payload.rescheduled === true,
    ...(inlineStartTime
      ? {
          inlineScheduledEvent: {
            startTime: inlineStartTime,
            name: inlineName || "Calendly consultation",
          },
        }
      : {}),
  };
}

export async function fetchCalendlyScheduledEvent(
  scheduledEventUri: string,
  apiToken: string,
): Promise<CalendlyScheduledEvent> {
  if (!isCalendlyApiUri(scheduledEventUri, "scheduled_events")) {
    throw new Error("Invalid Calendly scheduled-event URI.");
  }

  const response = await fetch(scheduledEventUri, {
    headers: {
      Authorization: `Bearer ${apiToken}`,
      Accept: "application/json",
    },
    cache: "no-store",
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Calendly scheduled-event request failed with status ${response.status}.`);
  }

  const body = asRecord(await response.json());
  const resource = asRecord(body?.resource);
  const startTime = parseDate(resource?.start_time);
  if (!startTime) throw new Error("Calendly scheduled event did not include a valid start time.");

  return {
    startTime,
    name: cleanString(resource?.name, MAX_NAME_LENGTH) || "Calendly consultation",
  };
}
