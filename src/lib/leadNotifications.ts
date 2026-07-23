import { getLeadResponseSlaMinutes } from '@/lib/leadSla';

type NewLeadNotification = {
  leadId: string;
  service: string;
  source: string;
  submittedAt: Date;
};

type LeadConfirmation = {
  leadId: string;
  name: string;
  email: string;
  service: string;
  submittedAt: Date;
};

type NotificationResult =
  | { sent: true }
  | { sent: false; reason: 'not_configured' | 'delivery_failed' };

export type LeadConfirmationResult =
  | NotificationResult
  | { sent: false; reason: 'not_applicable' };

let warnedAboutMissingConfiguration = false;
let warnedAboutMissingConfirmationConfiguration = false;

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

export async function sendLeadConfirmation(
  confirmation: LeadConfirmation,
): Promise<LeadConfirmationResult> {
  if (!confirmation.email) {
    return { sent: false, reason: 'not_applicable' };
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_NOTIFICATION_FROM?.trim();

  if (!apiKey || !from) {
    if (!warnedAboutMissingConfirmationConfiguration) {
      console.warn(
        'Customer confirmation emails are disabled. Configure RESEND_API_KEY and LEAD_NOTIFICATION_FROM.',
      );
      warnedAboutMissingConfirmationConfiguration = true;
    }
    return { sent: false, reason: 'not_configured' };
  }

  const contactUrl = 'https://integrafin.tax/contact';
  const phoneDisplay = '(832) 647-1819';
  const phoneUrl = 'tel:+18326471819';
  const contactEmail = 'contact@integrafin.tax';
  const subject = 'We received your request | IntegraFin';
  const text = [
    `Hello ${confirmation.name},`,
    '',
    `We received your request for ${confirmation.service}.`,
    `Submitted: ${formatBusinessTime(confirmation.submittedAt)}`,
    `Reference ID: ${confirmation.leadId}`,
    '',
    'An IntegraFin team member will review your request and follow up using the contact information you provided.',
    '',
    'For your security, do not reply with Social Security numbers, tax documents, banking information, or account credentials. The team will provide secure document instructions when needed.',
    '',
    `Contact IntegraFin: ${contactEmail}`,
    `Phone: ${phoneDisplay}`,
    `Website: ${contactUrl}`,
    '',
    'IntegraFin Tax & Accounting',
  ].join('\n');
  const html = `
    <div style="margin:0 auto;max-width:620px;font-family:Arial,sans-serif;color:#1e293b;line-height:1.6">
      <div style="border-radius:12px 12px 0 0;background:#003580;padding:24px;color:#fff">
        <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">IntegraFin Tax &amp; Accounting</p>
        <h1 style="margin:8px 0 0;font-size:24px">We received your request</h1>
      </div>
      <div style="border:1px solid #dbe4ee;border-top:0;border-radius:0 0 12px 12px;padding:24px">
        <p>Hello ${escapeHtml(confirmation.name)},</p>
        <p>We received your request for <strong>${escapeHtml(confirmation.service)}</strong>. An IntegraFin team member will review it and follow up using the contact information you provided.</p>
        <table style="margin:20px 0;border-collapse:collapse">
          <tr><th style="padding:5px 12px 5px 0;text-align:left">Submitted</th><td>${escapeHtml(formatBusinessTime(confirmation.submittedAt))}</td></tr>
          <tr><th style="padding:5px 12px 5px 0;text-align:left">Reference ID</th><td>${escapeHtml(confirmation.leadId)}</td></tr>
        </table>
        <p style="border-radius:8px;background:#f1f5f9;padding:14px;font-size:13px;color:#475569"><strong>Protect your information:</strong> Do not reply with Social Security numbers, tax documents, banking information, or account credentials. The team will provide secure document instructions when needed.</p>
        <p>
          <a href="${contactUrl}" style="display:inline-block;border-radius:8px;background:#0092df;color:#fff;padding:11px 16px;text-decoration:none;font-weight:700">Contact IntegraFin</a>
        </p>
        <p style="font-size:14px;color:#475569">Email <a href="mailto:${contactEmail}">${contactEmail}</a> or call <a href="${phoneUrl}">${phoneDisplay}</a>.</p>
      </div>
    </div>
  `.trim();

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `integrafin-lead-confirmation-${confirmation.leadId}`,
      },
      body: JSON.stringify({
        from,
        to: [confirmation.email],
        reply_to: contactEmail,
        subject,
        text,
        html,
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error('Customer confirmation email failed.', {
        leadId: confirmation.leadId,
        providerStatus: response.status,
      });
      return { sent: false, reason: 'delivery_failed' };
    }

    return { sent: true };
  } catch (error) {
    console.error('Customer confirmation email failed.', {
      leadId: confirmation.leadId,
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    return { sent: false, reason: 'delivery_failed' };
  } finally {
    clearTimeout(timeout);
  }
}
