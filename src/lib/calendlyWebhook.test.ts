import { describe, expect, it } from "vitest";
import { parseCalendlyWebhook } from "./calendlyWebhook";

function webhookPayload(utmContent: string) {
  return {
    event: "invitee.created",
    created_at: "2026-09-09T12:00:00Z",
    payload: {
      uri: "https://api.calendly.com/scheduled_events/event-1/invitees/invitee-1",
      event: "https://api.calendly.com/scheduled_events/event-1",
      name: "Local Test",
      email: "local-test@example.com",
      tracking: { utm_content: utmContent },
      scheduled_event: {
        start_time: "2026-09-10T15:00:00Z",
        name: "Bookkeeping review",
      },
    },
  };
}

describe("parseCalendlyWebhook booking correlation", () => {
  it("accepts an opaque UUID from Calendly tracking", () => {
    const correlationId = "a4f75752-c272-4a1f-a817-f6a8fb4fbb26";
    expect(parseCalendlyWebhook(webhookPayload(correlationId))?.bookingCorrelationId).toBe(
      correlationId,
    );
  });

  it("does not accept arbitrary tracking content as a lead reference", () => {
    expect(parseCalendlyWebhook(webhookPayload("customer@example.com"))?.bookingCorrelationId).toBeUndefined();
  });
});

