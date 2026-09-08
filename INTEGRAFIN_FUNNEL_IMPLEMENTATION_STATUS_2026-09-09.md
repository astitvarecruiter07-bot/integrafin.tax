# IntegraFin Funnel Implementation Status

Updated: September 9, 2026

Source analysis: `IntegraFin_Website_Funnel_Lead_Pipeline_Analysis (1).md`

This file tracks repository work only. Nothing in this batch was deployed, no lead was submitted, and no advertising or provider configuration was changed.

## First implementation batch

| Backlog item | Local status | Acceptance covered |
|---|---|---|
| B03 / F01 | Implemented | Removed the three unverified testimonial placeholder cards from the roofing landing page. |
| B03 / F04 | Implemented | Changed “Free 60-second review” to “Request a free review in about 60 seconds” so the duration describes the request, not human review. |
| B04 / F05 | Implemented | The combined cleanup + monthly choice now stores `cleanup_and_monthly`, with cleanup as the primary service and monthly bookkeeping as the secondary service. It no longer becomes `Other Enquiry`. |
| B06 / F09 | Implemented | Added `recordKind`; newsletter signups are stored as subscribers and both new and legacy newsletter rows are excluded from the sales queue and sales metrics. |
| B08 / F08 | Implemented | All five generic lead forms now send a UUID submission key. The server replays the original accepted result instead of creating a second row, including concurrent duplicate-key handling. |
| B09 / F14 | Implemented for calculator custom events | Removed result category, score band, urgency, manual-review state, and price band from external calculator analytics events and from the analytics allowlist. |
| B23 | Implemented | The bookkeeping cost calculator now uses the shared contact-link helper and the accepted `Small Business Bookkeeping` service enum. |
| F18 | Partially implemented | Generic lead and newsletter failures now log an allowlisted error name rather than the full error object. Shared rate limiting is still outstanding. |

## Verification

- `npx.cmd tsc --noEmit`: passed.
- `npm.cmd run lint -- --max-warnings=0`: passed.
- `npm.cmd test`: 77 tests passed.
- `npm.cmd run build`: passed; 95 static pages generated.

## Next decision-independent engineering batch

1. Replace field-by-field attribution merging with immutable first-touch, latest non-direct, and submission snapshots with a reviewed retention ceiling.
2. Exclude admin and sensitive calculator contexts from third-party analytics initialization, not only custom result parameters.
3. Add stage-event history and split first contact attempt from first reached contact.
4. Add a durable notification outbox, retry policy, and reconciliation alerts.
5. Add an explicit subscriber lifecycle and suppression flow after the marketing provider is confirmed.

## Decisions required before implementation or launch

1. Confirm the production project, branch, and deployed commit.
2. Name the intake owner and backup; approve staffed Central hours and response targets.
3. Approve the exact $99/month and 48-hour eligibility, exclusions, records-complete trigger, capacity, and cutoff.
4. Confirm the canonical campaign and main-site phone/email routing.
5. Approve one initial segment/channel, media cap, and economic stop/continue rule.

Until those decisions are recorded, do not launch paid traffic or publish a universal delivery promise.
