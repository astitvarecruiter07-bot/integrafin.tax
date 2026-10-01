import { revalidatePath } from "next/cache";
import { after, NextRequest, NextResponse } from "next/server";
import { runCalendlyPollingSync } from "@/lib/calendlyPolling";
import { verifySharedSecret } from "@/lib/calendlyWebhook";
import { syncStoredLeadToZoho } from "@/lib/zohoLeadSync";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function getBearerToken(request: NextRequest) {
  const authorization = request.headers.get("authorization")?.trim();
  if (!authorization?.toLowerCase().startsWith("bearer ")) return null;
  return authorization.slice(7).trim();
}

export async function POST(request: NextRequest) {
  const expectedSecret = process.env.CALENDLY_SYNC_SECRET?.trim() || "";
  if (expectedSecret.length < 32) {
    console.error("Calendly polling sync secret is not configured.");
    return NextResponse.json({ synced: false }, { status: 503 });
  }

  if (!verifySharedSecret(getBearerToken(request), expectedSecret)) {
    return NextResponse.json({ synced: false }, { status: 401 });
  }

  const apiToken = process.env.CALENDLY_API_TOKEN?.trim();
  if (!apiToken) {
    console.error("Calendly API token is not configured.");
    return NextResponse.json({ synced: false }, { status: 503 });
  }

  try {
    const createdLeadIds: string[] = [];
    const summary = await runCalendlyPollingSync(apiToken, new Date(), (leadId) => {
      createdLeadIds.push(leadId);
    });
    if (createdLeadIds.length > 0) {
      after(async () => {
        await Promise.all(createdLeadIds.map(syncStoredLeadToZoho));
      });
    }
    revalidatePath("/admin/leads");
    console.info("Calendly polling sync completed.", summary);
    return NextResponse.json({ synced: true, summary });
  } catch (error) {
    console.error("Calendly polling sync failed.", {
      error: error instanceof Error ? error.message : "UnknownError",
    });
    return NextResponse.json({ synced: false }, { status: 503 });
  }
}

export function GET() {
  return NextResponse.json({ synced: false }, { status: 405 });
}
