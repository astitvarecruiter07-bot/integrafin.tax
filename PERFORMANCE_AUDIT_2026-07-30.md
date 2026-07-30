# IntegraFin Source Performance Audit

Audit date: July 30, 2026  
Task: T-102  
Status: Source audit complete; production field monitoring remains recurring work

## Scope

The audit reviewed:

- Homepage
- Contact page
- Tax calculator
- Blog index and article template
- Texas city template
- Priority service template and services hub
- Below-the-fold media
- Third-party scripts and embeds
- Analytics loading
- Image dimensions and responsive sizing
- Map behavior
- Major client-side bundles

## Source Findings and Actions

| Area | Finding | Action or disposition |
| --- | --- | --- |
| Shared navigation | The fixed navigation subscribed to every scroll event and could schedule repeated work during fast scrolling. | Added a passive scroll listener, one `requestAnimationFrame` update per frame, initial-state synchronization, and cleanup. |
| Footer newsletter | Newsletter state, analytics helpers, and server-action client code were included in the shared initial client graph even though the form is below the fold. | Added `DeferredNewsletterSignup`. The real form is imported when its footer container is within 600 px of the viewport, with a fixed-height placeholder to avoid layout shift. |
| Contact map | Chrome requested the Google Maps iframe during the initial contact-page visit despite native `loading="lazy"`. | Replaced the eager iframe markup with `OfficeMapEmbed`. Initial HTML contains the address, a normal Google Maps link, and a `Load interactive map` button. The iframe and third-party request are created only after the button is clicked. |
| Homepage media | The LCP hero uses `next/image` with `priority`, `fill`, and `sizes="100vw"`. Other homepage images use responsive `sizes` and retain the framework's default lazy loading. | No additional source change required. |
| Contact media | The hero image uses `next/image` with `priority`, `fill`, and `sizes="100vw"`. | No additional source change required. |
| Blog media | Featured, author, grid, and article images use `next/image` with explicit `fill` or dimensions and responsive `sizes`. Below-the-fold images retain default lazy loading. | No additional source change required. |
| City and service media | The reviewed city template is server-rendered with no route-specific client bundle. The priority service hero uses a dimensioned `next/image` with responsive `sizes`. | No additional source change required. |
| Analytics | Google Analytics uses `next/script` and therefore loads after hydration rather than blocking document parsing. Vercel Analytics and Speed Insights use their Next.js integrations. | Kept current loading to preserve early attribution and conversion measurement. Production delivery remains a field check. |
| Other third parties | Calendly is linked rather than embedded. No chat widget, autoplay video, YouTube embed, or general-purpose tag-manager container was found in the audited public templates. | No additional source change required. |
| Calculator bundle | The calculator has the largest audited route-specific client bundle because all four interactive estimators and their tax tables are shipped together. It remains isolated to `/tax-calculator`. | Record as a measured optimization candidate. Split estimator tabs only if production INP or long-task data shows a user-visible problem; avoid a high-risk calculation refactor based only on source size. |
| Services hub bundle | The services hub has a route-specific interactive bundle for tabs and accordions. Individual priority service pages remain server-rendered without a route-specific client bundle. | Keep isolated interaction code; monitor field INP. |

## Production-Build Client JavaScript

Values below are minified, uncompressed files referenced by each route's generated client-reference manifest. They are useful for source comparison but are not equivalent to compressed browser transfer size.

| Representative route | Initial JS | Route-specific amount above shared client graph |
| --- | ---: | ---: |
| Shared client graph / server-rendered article, city, or service page | 100.9 KB | 0 KB |
| Homepage | 109.1 KB | 8.2 KB |
| Contact | 113.0 KB | 12.2 KB |
| Tax calculator | 176.1 KB | 75.2 KB |
| Blog index | 123.5 KB | 22.6 KB |
| Services hub | 133.3 KB | 32.5 KB |

The shared initial client graph decreased from 103.8 KB to 100.9 KB after deferring the footer newsletter, a reduction of 2.9 KB uncompressed across public routes. The newsletter code is now requested near the footer instead of during every initial page load.

The compiled global stylesheet is 96.3 KB minified and uncompressed. No extra route stylesheet was added by these changes.

## Runtime Verification

The optimized production build was served locally with `next start` and exercised in headless Chrome.

| Check | Result |
| --- | --- |
| `/`, `/contact`, `/tax-calculator`, `/blog`, `/texas/katy-tax-accountant`, and `/business-tax-accounting` | HTTP 200 |
| H1 count on representative routes | Exactly one |
| Browser page errors | 0 |
| Hydration errors or warnings | 0 |
| Unexpected internal request failures | 0 |
| 390 px mobile layout on all six representative routes | No horizontal overflow |
| Footer newsletter before scrolling | Not imported/rendered |
| Footer newsletter near viewport | Imported and interactive |
| Contact map on initial load | 0 iframes and 0 Google Maps resource requests |
| Contact map after explicit load click | 1 iframe created |
| Calculator tabs | Federal, self-employment, capital-gains, and comparison content switched correctly |
| Blog search | Filtering updated the visible featured article correctly |

Local `next start` does not provide Vercel's `/_vercel/insights` endpoints, and the audit environment blocks Google Tag Manager network access. Those expected environment failures were excluded from application-error results; neither condition represents a source or hydration failure.

## Verification Commands

- ESLint: passed with zero errors
- Next.js production build: passed
- TypeScript checking within the Next.js build: passed
- Static generation: 71 pages generated successfully
- Headless Chrome route and interaction checks: passed

## Field-Only and Recurring Checks

These items cannot be completed honestly from a source build:

1. Review Vercel Speed Insights and Google Search Console Core Web Vitals for homepage, contact, calculator, blog, city, and service templates.
2. Compare mobile LCP, INP, and CLS at 14, 30, 60, and 90 days after deployment.
3. Confirm production GA and Vercel telemetry delivery without duplicate events.
4. Review calculator long tasks and INP before approving a multi-file estimator-tab split.
5. Monitor the contact-page map load rate and confirm that the normal Google Maps link covers visitors who do not load the embed.
6. Open a specific remediation task only when field data identifies a template, element, or interaction that is regressing.

## Files Changed

- `src/components/DeferredNewsletterSignup.tsx`
- `src/components/Footer.tsx`
- `src/components/Navbar.tsx`
- `src/components/OfficeMapEmbed.tsx`
- `src/app/contact/page.tsx`
