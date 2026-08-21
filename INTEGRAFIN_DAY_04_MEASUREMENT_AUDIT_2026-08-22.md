# IntegraFin Day 4 — Analytics, Attribution, and Notification Audit

Audit date: 2026-08-22

Owner: Developer + Growth Owner
Status: **In Progress — implementation and local QA pass; live trace exit gate is not yet satisfied**

## Outcome

The Day 4 measurement path is implemented and hardened, but it must not be marked done yet. The current CRM contains attributed leads and separately contains successfully notified leads, but no existing record proves that a UTM-attributed lead also produced a successful owner notification. No new lead was submitted during this audit.

The remaining exit-gate test requires the updated code to be deployed and one approved, clearly labeled test lead to be submitted from a browser that allows Google Analytics requests. That lead must then be reconciled in GA4 DebugView, the database, the authenticated lead dashboard, and the recipient inbox.

## GA4 Read-Only Verification

- Property reviewed: `integrafin.tax` (`a394997366p537929143`).
- `generate_lead` is currently marked as a key event and has stream data for `integrafin.tax`.
- GA4 DebugView reported **0 debug devices** and **0 debug events** at the time of review.
- No GA4 settings were changed during this audit.
- The test Chrome profile loaded `https://www.googletagmanager.com/gtag/js` successfully but did not emit an observable Google Analytics collection request after form focus. This browser session therefore cannot be accepted as DebugView evidence.

## Read-Only CRM Aggregate

The repeatable audit command is:

```text
node scripts/day4-measurement-audit.mjs
```

Result on 2026-08-22, with no names, contact details, messages, or raw campaign values read or printed:

| Control | Result |
|---|---:|
| Total lead records | 37 |
| Records with an attribution object | 19 |
| Records with a UTM source | 2 |
| Records with a UTM source and `notificationStatus: sent` | 0 |
| Owner notifications marked sent | 14 |
| Owner notifications marked not configured | 3 |
| Owner notifications marked delivery failed | 1 |
| Customer confirmations marked sent | 9 |

This establishes that the CRM, attribution fields, and notification status fields exist, while also showing that the required single-record source-to-owner trace is still missing.

## Implementation Completed

1. Added immediate duplicate-submit locks to the contact-page and homepage callback forms. The roofing lead form already had the same control.
2. Added a one-time guard for Calendly `booking_complete` messages.
3. Added opt-in GA4 debug events through `?debug_mode=1`; the flag is sent only as the boolean `debug_mode` event parameter.
4. Preserved events triggered before the async Google tag is ready by queuing the already-sanitized event command in `dataLayer`.
5. Strengthened analytics value filtering so embedded email addresses and phone-number patterns are rejected, in addition to the existing event-parameter allowlist.
6. Added UTM source, medium, and campaign to the owner notification. Contact details and the customer message remain intentionally omitted.
7. Added `scripts/day4-measurement-audit.mjs`, which reports configuration presence and privacy-safe CRM aggregates without printing secrets or lead PII.

## Event Control Matrix

| Required interaction | Event | Once-only control | Sensitive-data control | Verification state |
|---|---|---|---|---|
| Form begins | `form_start` | Per-form `useRef` guard | Fixed allowlisted fields only | Source + local interaction verified; live DebugView pending |
| Lead saved | `generate_lead` | Success-only event plus submit lock | Service, page, form source, and safe attribution only | GA4 key-event state verified; controlled live lead pending |
| Phone link | `phone_click` | One delegated handler per click | Phone number is not sent as a parameter | Source verified; live DebugView pending |
| WhatsApp link | `whatsapp_click` | One delegated handler per click | Destination/contact number is not sent as a parameter | Source verified; live DebugView pending |
| Calendar opened | `booking_start` | One delegated handler per click | Static CTA label only | Source verified; live DebugView pending |
| Booking completed | `booking_complete` | One-time Calendly message guard | Static CTA label only | Source verified; real booking completion pending |

## Local QA

- ESLint: passed with zero warnings.
- TypeScript: passed with `--noEmit`.
- Next.js production build: passed; all 90 static-generation tasks completed.
- Contact form at a 390 × 844 emulated viewport: form bounds stayed within the viewport (`left 37`, `right 353`, no horizontal overflow).
- Validation error: with a name and service but no email or phone, the form remained on the page and showed `Please provide an email address or phone number.`
- The local environment has database/admin configuration, but does not contain Resend or Calendly secrets. Local notification absence is not evidence about the production deployment environment.

## Exit-Gate Test Still Required

After deployment, use this controlled entry URL in a browser without analytics blocking:

```text
https://integrafin.tax/contact?debug_mode=1&utm_source=codex-day4&utm_medium=qa&utm_campaign=analytics-verification
```

Then:

1. Confirm `form_start` appears once in DebugView and contains no contact details or message content.
2. Submit one clearly labeled test lead using an approved team-owned test contact method and no sensitive tax or financial data.
3. Confirm one `generate_lead` event, capture the returned CRM lead ID, and verify the UTM values on the same record in the database and lead dashboard.
4. Confirm the owner notification reaches the intended recipient and displays the form source plus `codex-day4 / qa` and `analytics-verification`.
5. Repeat the visible validation check in production; force a controlled server-error test only in a non-production environment.
6. Attempt a rapid double click and confirm exactly one CRM record and one `generate_lead` event.
7. Test phone, WhatsApp, calendar-open, and a real approved Calendly completion; verify each expected event once.
8. Record the event timestamps, test lead ID, notification proof, and mobile result here, then change Day 4 to `Done` in `seo-track.md`.

## Exit Gate

**Not passed.** The implementation is ready and locally verified, and `generate_lead` is a GA4 key event. The required live source → event → CRM/dashboard → notification trace has not yet been produced.
