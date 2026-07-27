import dbConnect from "@/lib/mongodb";
import type { CalendlyScheduledEvent, CalendlyWebhookEvent } from "@/lib/calendlyWebhook";
import ContactLead from "@/models/ContactLead";

const statusesBeforeAppointment = new Set([
  "new",
  "contact_attempted",
  "contacted",
  "qualified",
  "unqualified",
]);

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function findLeadForBooking(event: CalendlyWebhookEvent) {
  const linkedLead = await ContactLead.findOne({ calendlyInviteeUri: event.inviteeUri });
  if (linkedLead) return linkedLead;
  if (!event.email) return null;

  const emailQuery = { $regex: `^${escapeRegex(event.email)}$`, $options: "i" };
  const preferredLead = await ContactLead.findOne({
    email: emailQuery,
    service: { $ne: "Newsletter Signup" },
    status: { $nin: ["spam", "duplicate"] },
  }).sort({ createdAt: -1 });

  return preferredLead || ContactLead.findOne({ email: emailQuery }).sort({ createdAt: -1 });
}

export type CalendlyLeadSyncResult = {
  outcome: "matched" | "created" | "canceled" | "reschedule_pending" | "ignored" | "duplicate";
  leadId?: string;
};

export async function syncCalendlyLead(
  event: CalendlyWebhookEvent,
  scheduledEvent?: CalendlyScheduledEvent,
): Promise<CalendlyLeadSyncResult> {
  await dbConnect();

  if (event.type === "invitee.canceled") {
    const lead = await ContactLead.findOne({ calendlyInviteeUri: event.inviteeUri });
    if (!lead) return { outcome: "ignored" };

    lead.calendlyLastWebhookAt = event.occurredAt;

    if (event.rescheduled) {
      await lead.save();
      return { outcome: "reschedule_pending", leadId: lead._id.toString() };
    }

    if (lead.appointmentStatus === "canceled" && !lead.appointmentAt) {
      await lead.save();
      return { outcome: "duplicate", leadId: lead._id.toString() };
    }

    lead.appointmentStatus = "canceled";
    lead.appointmentCanceledAt = event.occurredAt;
    lead.appointmentAt = undefined;
    if (lead.status === "appointment_booked") {
      lead.status = "qualified";
      lead.statusUpdatedAt = event.occurredAt;
    }
    await lead.save();
    return { outcome: "canceled", leadId: lead._id.toString() };
  }

  if (!scheduledEvent || !event.email) {
    throw new Error("Scheduled event details are required for an invitee.created webhook.");
  }

  const lead = await findLeadForBooking(event);
  if (lead) {
    const isDuplicate =
      lead.calendlyInviteeUri === event.inviteeUri &&
      lead.appointmentStatus === "scheduled" &&
      lead.appointmentAt?.getTime() === scheduledEvent.startTime.getTime();

    lead.appointmentAt = scheduledEvent.startTime;
    lead.appointmentStatus = "scheduled";
    lead.appointmentSource = "calendly";
    lead.appointmentCanceledAt = undefined;
    lead.calendlyInviteeUri = event.inviteeUri;
    lead.calendlyEventUri = event.scheduledEventUri;
    lead.calendlyEventName = scheduledEvent.name;
    lead.calendlyLastWebhookAt = event.occurredAt;

    if (statusesBeforeAppointment.has(lead.status)) {
      lead.status = "appointment_booked";
      lead.statusUpdatedAt = event.occurredAt;
    }

    await lead.save();
    return {
      outcome: isDuplicate ? "duplicate" : "matched",
      leadId: lead._id.toString(),
    };
  }

  try {
    const createdLead = await ContactLead.create({
      name: event.name || event.email.split("@")[0] || "Calendly invitee",
      email: event.email,
      phone: event.phone || "",
      service: scheduledEvent.name,
      message: "Appointment booked directly through Calendly.",
      source: "calendly-booking",
      status: "appointment_booked",
      appointmentAt: scheduledEvent.startTime,
      appointmentStatus: "scheduled",
      appointmentSource: "calendly",
      calendlyInviteeUri: event.inviteeUri,
      calendlyEventUri: event.scheduledEventUri,
      calendlyEventName: scheduledEvent.name,
      calendlyLastWebhookAt: event.occurredAt,
      statusUpdatedAt: event.occurredAt,
      notificationStatus: "not_configured",
      confirmationEmailStatus: "not_applicable",
      createdAt: event.occurredAt,
    });

    return { outcome: "created", leadId: createdLead._id.toString() };
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      const existingLead = await ContactLead.findOne({
        calendlyInviteeUri: event.inviteeUri,
      }).lean();
      if (existingLead) {
        return { outcome: "duplicate", leadId: existingLead._id.toString() };
      }
    }
    throw error;
  }
}
