# Calendly lead integration

## Free-plan hourly polling

Calendly Free supports API reads but not webhook subscriptions. The repository
includes an hourly GitHub Actions workflow that calls:

`POST https://integrafin.tax/api/jobs/calendly-sync`

The endpoint retrieves the current Calendly user's active and canceled scheduled
events, retrieves their invitees, and applies the same idempotent lead updates as
the webhook integration.

### Required free-plan configuration

1. Create a Calendly personal access token with `users:read` and
   `scheduled_events:read`. Calendly may show invitee access under the scheduled
   events permission.
2. Add the token to the Vercel production environment as
   `CALENDLY_API_TOKEN`.
3. Generate a separate random value containing at least 32 characters.
4. Add that value to the Vercel production environment as
   `CALENDLY_SYNC_SECRET`, then redeploy.
5. In the GitHub repository, open **Settings → Secrets and variables → Actions**.
6. Create a repository secret named `CALENDLY_SYNC_SECRET` with exactly the same
   value used in Vercel.
7. Open **Actions → Hourly Calendly sync → Run workflow** for the first test.
8. Confirm that the workflow reports the number of events and invitees checked.

The scheduled workflow runs at minute 23 of every hour. GitHub schedules may be
delayed during periods of high demand, so this is an hourly synchronization, not
a real-time webhook.

The endpoint response and GitHub workflow logs contain counts only. They do not
include invitee names, emails, phone numbers, or booking answers.

## Paid-plan webhook option

The production webhook endpoint is:

`https://integrafin.tax/api/webhooks/calendly?token=YOUR_WEBHOOK_SECRET`

The endpoint processes `invitee.created` and `invitee.canceled` events. It matches
bookings to the newest non-newsletter lead with the same email address. A direct
Calendly booking creates a lead when no matching lead exists.

## Required secrets

Add these values to the Vercel production environment. Do not add real values to
GitHub or `.env.local` files that may be shared.

- `CALENDLY_API_TOKEN`: a Calendly personal access token with the minimum required
  scheduled-event, invitee, and webhook scopes.
- `CALENDLY_WEBHOOK_SECRET`: a separate random value containing at least 32
  characters. This value is included only in the webhook subscription URL.

Redeploy the application after adding or changing either value.

## Calendly subscription

1. Create a Calendly personal access token for the IntegraFin internal integration.
2. Use `GET https://api.calendly.com/users/me` to obtain the user and organization
   URIs.
3. Create one webhook subscription for `invitee.created` and `invitee.canceled`.
4. Use `user` scope for the IntegraFin booking owner, or `organization` scope when
   the token belongs to an owner/admin and all team bookings should be included.
5. Set the webhook URL to the production endpoint above with the same
   `CALENDLY_WEBHOOK_SECRET` value.
6. Book a test appointment using an email address that belongs to a test lead.
7. Confirm the lead shows `Appointment booked`, the correct appointment time,
   `Calendly` as the source, and the Calendly event name.
8. Cancel the test appointment and confirm the appointment is marked canceled.

Calendly does not send historical bookings to a new webhook subscription. Test
with a booking created after the subscription is active.

## Behavior and safeguards

- Duplicate webhook deliveries do not create duplicate Calendly leads.
- Reschedules do not clear the current appointment when Calendly sends the
  cancellation event for the old invitee.
- A cancellation only changes the lead currently linked to that invitee URI.
- Webhook responses and logs do not include the invitee's name, email, phone, or
  booking answers.
- The integration stores only the invitee identity needed for lead matching and
  basic appointment metadata. It does not copy Calendly question-and-answer data.
