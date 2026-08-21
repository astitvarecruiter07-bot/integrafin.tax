import nextEnv from "@next/env";
import mongoose from "mongoose";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const requiredEventNames = [
  "form_start",
  "generate_lead",
  "phone_click",
  "whatsapp_click",
  "booking_start",
  "booking_complete",
];

const configuration = {
  gaMeasurementIdEffective: /^G-[A-Z0-9]+$/.test(
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-GRMDY21D72",
  ),
  gaMeasurementIdEnvOverride: Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  mongoDb: Boolean(process.env.MONGODB_URI),
  leadNotificationApi: Boolean(process.env.RESEND_API_KEY),
  leadNotificationFrom: Boolean(process.env.LEAD_NOTIFICATION_FROM),
  leadNotificationTo: Boolean(process.env.LEAD_NOTIFICATION_TO),
  calendlyApi: Boolean(process.env.CALENDLY_API_TOKEN),
  calendlyWebhook: Boolean(process.env.CALENDLY_WEBHOOK_SECRET),
};

const result = {
  auditedAt: new Date().toISOString(),
  requiredEventNames,
  configuration,
  crm: {
    available: false,
  },
};

if (!process.env.MONGODB_URI) {
  console.log(JSON.stringify(result, null, 2));
  process.exit(0);
}

try {
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 8_000,
  });

  const leads = mongoose.connection.collection("contactleads");
  const [
    total,
    withAttribution,
    withUtmAttribution,
    withUtmAndNotificationSent,
    sourceCounts,
    notificationCounts,
    confirmationCounts,
  ] = await Promise.all([
    leads.countDocuments({}),
    leads.countDocuments({ attribution: { $exists: true } }),
    leads.countDocuments({ "attribution.utmSource": { $exists: true, $nin: [null, ""] } }),
    leads.countDocuments({
      "attribution.utmSource": { $exists: true, $nin: [null, ""] },
      notificationStatus: "sent",
    }),
    leads.aggregate([
      { $group: { _id: { $ifNull: ["$source", "unavailable"] }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]).toArray(),
    leads.aggregate([
      { $group: { _id: { $ifNull: ["$notificationStatus", "unavailable"] }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]).toArray(),
    leads.aggregate([
      { $group: { _id: { $ifNull: ["$confirmationEmailStatus", "unavailable"] }, count: { $sum: 1 } } },
      { $sort: { count: -1, _id: 1 } },
    ]).toArray(),
  ]);

  result.crm = {
    available: true,
    total,
    withAttribution,
    withUtmAttribution,
    withUtmAndNotificationSent,
    sourceCounts: Object.fromEntries(sourceCounts.map(({ _id, count }) => [_id, count])),
    notificationCounts: Object.fromEntries(
      notificationCounts.map(({ _id, count }) => [_id, count]),
    ),
    confirmationCounts: Object.fromEntries(
      confirmationCounts.map(({ _id, count }) => [_id, count]),
    ),
  };

  console.log(JSON.stringify(result, null, 2));
} catch (error) {
  result.crm = {
    available: false,
    error: error instanceof Error ? error.name : "UnknownError",
  };
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
