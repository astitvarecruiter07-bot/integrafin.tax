# Lead notification setup

The website stores a valid lead before attempting email delivery. Email runs after the form response, so a provider outage does not discard the lead or show the customer a false submission failure.

## Vercel environment variables

Configure these values for Production, Preview, and Development as appropriate:

- `RESEND_API_KEY`: restricted Resend API key for sending email.
- `LEAD_NOTIFICATION_FROM`: sender on a verified domain, for example `IntegraFin Leads <leads@notifications.integrafin.tax>`.
- `LEAD_NOTIFICATION_TO`: one or more comma-separated notification recipients.
- `LEAD_NOTIFICATION_TIME_ZONE`: business time zone used in the submission and response-due timestamps. Default: `America/Chicago`.
- `LEAD_RESPONSE_SLA_MINUTES`: response target in minutes. Default: `60`; accepted range: 5–10,080.

The sender domain must be verified with the email provider before production delivery will work. See the [Resend domain guide](https://resend.com/docs/dashboard/domains/introduction) and [send-email API reference](https://resend.com/docs/api-reference/emails/send-email).

## Privacy and reliability behavior

- Notifications contain the requested service, source, timestamps, lead ID, and a link to the authenticated dashboard.
- Customer email, phone, company, and message content are intentionally omitted from notification email.
- Resend receives an idempotency key based on the MongoDB lead ID to avoid duplicate delivery when a request is retried.
- A failed or unconfigured notification is logged without exposing the API key or customer message. The saved lead remains available in `/admin/leads`.
- Each lead records a non-sensitive notification status (`sent`, `not_configured`, or `delivery_failed`) and the dashboard displays when delivery was checked.

## Production verification

1. Add the environment variables in Vercel and redeploy.
2. Submit one clearly labeled internal test lead through the public contact form.
3. Confirm the thank-you redirect and one GA4 `generate_lead` event.
4. Confirm the lead appears in `/admin/leads`.
5. Confirm exactly one notification email arrives and its response-due time matches the dashboard SLA.
6. Delete or mark the internal test lead as spam after verification.
