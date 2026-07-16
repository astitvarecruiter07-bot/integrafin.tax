import { getLeadResponseSlaMinutes } from '@/lib/leadSla';

type NewLeadNotification = {
  leadId: string;
  service: string;
  source: string;
  submittedAt: Date;
};

type NotificationResult =
  | { sent: true }
  | { sent: false; reason: 'not_configured' | 'delivery_failed' };

let warnedAboutMissingConfiguration = false;

function configuredRecipients() {
  return (process.env.LEAD_NOTIFICATION_TO || '')
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function formatBusinessTime(value: Date) {
  const timeZone = process.env.LEAD_NOTIFICATION_TIME_ZONE || 'America/Chicago';

  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short',
    }).format(value);
  } catch {
    return value.toISOString();
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };
    return entities[character];
  });
}

export async function sendNewLeadNotification(
  notification: NewLeadNotification,
): Promise<NotificationResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_NOTIFICATION_FROM?.trim();
  const to = configuredRecipients();

  if (!apiKey || !from || to.length === 0) {
    if (!warnedAboutMissingConfiguration) {
      console.warn(
        'Lead email notifications are disabled. Configure RESEND_API_KEY, LEAD_NOTIFICATION_FROM, and LEAD_NOTIFICATION_TO.',
      );
      warnedAboutMissingConfiguration = true;
    }
    return { sent: false, reason: 'not_configured' };
  }

  const responseDueAt = new Date(
    notification.submittedAt.getTime() + getLeadResponseSlaMinutes() * 60_000,
  );
  const dashboardUrl = 'https://integrafin.tax/admin/leads';
  const subject = `New website lead: ${notification.service}`;
  const text = [
    'A new lead was saved to the IntegraFin lead dashboard.',
    '',
    `Service: ${notification.service}`,
    `Source: ${notification.source}`,
    `Submitted: ${formatBusinessTime(notification.submittedAt)}`,
    `Response due: ${formatBusinessTime(responseDueAt)}`,
    `Lead ID: ${notification.leadId}`,
    '',
    `Open the authenticated dashboard: ${dashboardUrl}`,
    '',
    'Contact details and the customer message are intentionally omitted from this email.',
  ].join('\n');
  const html = `
    <h1 style="font-size:20px;margin:0 0 16px;color:#003580">New website lead</h1>
    <p>A new lead was saved to the IntegraFin lead dashboard.</p>
    <table style="border-collapse:collapse;margin:16px 0">
      <tr><th style="padding:6px 12px 6px 0;text-align:left">Service</th><td>${escapeHtml(notification.service)}</td></tr>
      <tr><th style="padding:6px 12px 6px 0;text-align:left">Source</th><td>${escapeHtml(notification.source)}</td></tr>
      <tr><th style="padding:6px 12px 6px 0;text-align:left">Submitted</th><td>${escapeHtml(formatBusinessTime(notification.submittedAt))}</td></tr>
      <tr><th style="padding:6px 12px 6px 0;text-align:left">Response due</th><td><strong>${escapeHtml(formatBusinessTime(responseDueAt))}</strong></td></tr>
      <tr><th style="padding:6px 12px 6px 0;text-align:left">Lead ID</th><td>${escapeHtml(notification.leadId)}</td></tr>
    </table>
    <p><a href="${dashboardUrl}" style="display:inline-block;border-radius:8px;background:#003580;color:#fff;padding:12px 18px;text-decoration:none;font-weight:700">Open lead dashboard</a></p>
    <p style="font-size:12px;color:#64748b">Contact details and the customer message are intentionally omitted from this email.</p>
  `.trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `integrafin-lead-${notification.leadId}`,
      },
      body: JSON.stringify({ from, to, subject, text, html }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('Lead email notification failed.', {
        leadId: notification.leadId,
        providerStatus: response.status,
      });
      return { sent: false, reason: 'delivery_failed' };
    }

    return { sent: true };
  } catch (error) {
    console.error('Lead email notification failed.', {
      leadId: notification.leadId,
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    return { sent: false, reason: 'delivery_failed' };
  } finally {
    clearTimeout(timeout);
  }
}
