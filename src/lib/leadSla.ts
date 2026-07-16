export function getLeadResponseSlaMinutes() {
  const configured = Number(process.env.LEAD_RESPONSE_SLA_MINUTES || 60);
  if (!Number.isFinite(configured)) return 60;
  return Math.min(Math.max(Math.round(configured), 5), 10_080);
}
