import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  fetchCalendlyScheduledEvent,
  parseCalendlyWebhook,
  verifyCalendlyWebhookSecret,
} from "@/lib/calendlyWebhook";
import { syncCalendlyLead } from "@/lib/calendlyLeadSync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_WEBHOOK_BYTES = 256 * 1024;

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.CALENDLY_WEBHOOK_SECRET?.trim() || "";
  if (expectedSecret.length < 32) {
    console.error("Calendly webhook is not configured.");
    return NextResponse.json({ received: false }, { status: 503 });
  }

  const providedSecret =
    request.nextUrl.searchParams.get("token") ||
    request.headers.get("x-integrafin-webhook-secret");

  if (!verifyCalendlyWebhookSecret(providedSecret, expectedSecret)) {
    return NextResponse.json({ received: false }, { status: 401 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_WEBHOOK_BYTES) {
    return NextResponse.json({ received: false }, { status: 413 });
  }

  let rawBody: string;
  let payload: unknown;
  try {
    rawBody = await request.text();
    if (Buffer.byteLength(rawBody, "utf8") > MAX_WEBHOOK_BYTES) {
      return NextResponse.json({ received: false }, { status: 413 });
    }
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  const event = parseCalendlyWebhook(payload);
  if (!event) {
    return NextResponse.json({ received: false }, { status: 400 });
  }

  try {
    let scheduledEvent = event.inlineScheduledEvent;
    if (event.type === "invitee.created" && !scheduledEvent) {
      const apiToken = process.env.CALENDLY_API_TOKEN?.trim();
      if (!apiToken) {
        console.error("Calendly API token is not configured.");
        return NextResponse.json({ received: false }, { status: 503 });
      }
      scheduledEvent = await fetchCalendlyScheduledEvent(event.scheduledEventUri, apiToken);
    }

    const result = await syncCalendlyLead(event, scheduledEvent);
    revalidatePath("/admin/leads");

    console.info("Calendly webhook processed.", {
      type: event.type,
      outcome: result.outcome,
      hasLead: Boolean(result.leadId),
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Calendly webhook processing failed.", {
      type: event.type,
      error: error instanceof Error ? error.message : "UnknownError",
    });
    return NextResponse.json({ received: false }, { status: 503 });
  }
}

export function GET() {
  return NextResponse.json({ received: false }, { status: 405 });
}
