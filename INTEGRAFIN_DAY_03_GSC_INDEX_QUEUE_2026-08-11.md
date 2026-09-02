# IntegraFin Day 3 — GSC Priority Indexing Queue

Date: 2026-08-11  
Owner: Prashant Chavan  
Property: `sc-domain:integrafin.tax`  
Status: Done; submitted URLs are waiting for Google recrawl/index processing

## Outcome

The Day 3 exit gate is satisfied: all eight SOP priority URLs have a current Google Search Console status, a request decision, and a next-check date. The 21 reported non-indexed URLs were also identified individually and reconciled against the clean Day 2 production crawl.

- GSC Pages report, last updated 2026-08-07: **75 indexed / 21 not indexed**.
- Current production sitemap: **80 unique, technically indexable URLs** with no duplicate entries, broken links, orphaned URLs, or breadcrumb gaps.
- Canonical sitemap in GSC: **Success**, submitted 2026-07-30, last read 2026-08-09, with 81 discovered pages. The 81 count predates the Day 2 deployment that removed the duplicate XML entry; verify that it changes to 80 after the next read.
- Manual Actions: **No issues detected**.
- Security Issues: **No issues detected**.
- Core Web Vitals, last updated 2026-08-09: **not enough 90-day Chrome UX data** for mobile or desktop.
- Live indexing tests passed and GSC accepted priority crawl requests for Katy bookkeeping, the materially changed contractor hub, and the business-tax page.

## P0 Inspection Queue

| Priority | URL | GSC status on 2026-08-11 | Last Google crawl | Canonical / fetch evidence | Request decision | Next check |
|---|---|---|---|---|---|---|
| P0 | `https://integrafin.tax/` | On Google; indexed | 2026-08-09 13:26 | Fetch successful; indexing allowed; self-canonical | No duplicate request; already indexed | 2026-08-18 |
| P0 | `https://integrafin.tax/texas/katy-tax-accountant` | On Google; indexed | 2026-07-11 00:08 | Sitemap discovered; fetch successful; indexing allowed; self-canonical | No request; already indexed | 2026-08-18 |
| P0 | `https://integrafin.tax/texas/katy-bookkeeping-services` | Not on Google: Discovered — currently not indexed | N/A | In sitemap; Google had not crawled it. Live test: URL available to Google; breadcrumb valid | **Indexing requested and accepted 2026-08-11** | 2026-08-18 |
| P0 | `https://integrafin.tax/texas/irs-notice-help-katy-tx` | On Google; indexed | 2026-08-05 04:19 | Sitemap discovered; fetch successful; indexing allowed; self-canonical | No request; already indexed | 2026-08-18 |
| P0 | `https://integrafin.tax/bookkeeping-cleanup` | On Google; indexed | 2026-07-01 10:36 | Sitemap discovered; fetch successful; indexing allowed; self-canonical | No request; already indexed | 2026-08-18 |
| P0 | `https://integrafin.tax/small-business-bookkeeping-services` | On Google; indexed | 2026-08-02 15:01 | Sitemap discovered; fetch successful; indexing allowed; self-canonical | No request; already indexed | 2026-08-18 |
| P0 | `https://integrafin.tax/contractor-bookkeeping-services` | On Google; indexed | 2026-08-02 06:14 | Fetch successful; self-canonical. 2026-08-11 live test: URL available to Google; breadcrumb valid | **Re-crawl requested and accepted 2026-08-11** because Day 2 materially changed discovery links/freshness | 2026-08-18 |
| P0 | `https://integrafin.tax/texas-tax-accounting-services` | On Google; indexed | 2026-07-09 18:24 | Sitemap discovered; fetch successful; indexing allowed; self-canonical | No request; already indexed | 2026-08-18 |

### Additional high-value exclusion handled

| Priority | URL | GSC status | Why it qualified | Action | Next check |
|---|---|---|---|---|---|
| P1 | `https://integrafin.tax/business-tax-accounting` | Not on Google: Crawled — currently not indexed; last crawl 2026-05-02 07:34 | Current page is HTTP 200, indexable and self-canonical. The page was created/updated in commit `2ea1fda` on 2026-06-30, after Google's stale crawl | Live test passed; **indexing requested and accepted 2026-08-11** | 2026-08-18 |

## The 21 Non-Indexed URLs

| GSC reason | URLs | GSC validation state |
|---|---:|---|
| Page with redirect | 5 | Failed |
| Not found (404) | 2 | Failed |
| Alternate page with proper canonical tag | 1 | Failed |
| Crawled — currently not indexed | 6 | Failed |
| Redirect error | 2 | Not Started |
| Discovered — currently not indexed | 5 | Started |

### Page with redirect — 5

| GSC example | Current live result | Decision |
|---|---|---|
| `https://www.integrafin.tax/index` | 308 to canonical non-`www` host | Expected historical host variant; no indexing request |
| `http://www.integrafin.tax/` | 308 toward HTTPS canonical host | Expected protocol/host normalization; no indexing request |
| `https://www.integrafin.tax/` | 308 to `https://integrafin.tax/` | Correct canonical-host redirect; no indexing request |
| `http://www.integrafin.tax/index` | 308 toward HTTPS canonical host | Expected historical protocol/host variant; no indexing request |
| `http://integrafin.tax/` | 308 to `https://integrafin.tax/` | Correct HTTPS redirect; no indexing request |

### Not found (404) — 2

| GSC example | Current live result | Decision |
|---|---|---|
| `https://integrafin.tax/toc` | 404 | Not in the current sitemap or internal crawl. Keep 404 unless backlink/history evidence identifies a relevant replacement |
| `https://integrafin.tax/_next/static/media/83afe278b6a6bb3c-s.p.3a6ba036.woff2` | 404 | Obsolete build asset; let Google drop it |

### Alternate page with proper canonical tag — 1

| GSC example | Current live result | Decision |
|---|---|---|
| `https://integrafin.tax/index` | 200 with homepage canonical | Expected duplicate/canonicalized route; do not request indexing |

### Crawled — currently not indexed — 6

| GSC example | Current live result | Decision |
|---|---|---|
| `https://integrafin.tax/favicon.ico?favicon.0x3dzn~oxb6tn.ico` | 200 asset | Utility asset; no indexing action |
| `https://integrafin.tax/_next/static/media/83afe278b6a6bb3c-s.p.0q-301v4kxxnr.woff2` | 404 | Obsolete build asset; let Google drop it |
| `https://www.integrafin.tax/tax-resolution-services` | 308 to canonical host; legacy path subsequently redirects to `/tax-resolution` | Historical variant; no indexing request |
| `https://integrafin.tax/business-tax-accounting` | 200, current sitemap, indexable, self-canonical | Live test passed and indexing was requested 2026-08-11 |
| `https://integrafin.tax/privacy-policy` | 404 | Add a direct permanent redirect to `/privacy` only after confirming it is the intended successor; no indexing request |
| `https://integrafin.tax/additional-services` | 308 to `/services#additional` | Intentional legacy redirect; no indexing request |

### Redirect error — 2

| GSC example | Current live result | Decision |
|---|---|---|
| `https://integrafin.tax/pricing/` | 308 to `/pricing` | Live redirect is now correct; wait for Google recrawl |
| `http://integrafin.tax/texas/sugar-land-small-business-accountant` | 308 to the HTTPS URL | Live redirect is now correct; wait for Google recrawl |

### Discovered — currently not indexed — 5

| GSC example | Current live result | Priority decision |
|---|---|---|
| `https://integrafin.tax/contact` | 200, current sitemap, indexable, self-canonical | P2 support/lead page; monitor, no Day 3 request |
| `https://integrafin.tax/industries` | 200, current sitemap, indexable, self-canonical | P2 hub; monitor and review content differentiation if still excluded |
| `https://integrafin.tax/services` | 200, current sitemap, indexable, self-canonical | P1 service hub; inspect/content-review next if still excluded on 2026-08-18 |
| `https://integrafin.tax/terms` | 200, current sitemap, indexable, self-canonical | Low-search-value legal page; no request |
| `https://integrafin.tax/texas/katy-bookkeeping-services` | 200, current sitemap, indexable, self-canonical | P0; live test passed and indexing was requested 2026-08-11 |

## Reconciliation and Fix Decisions

The GSC total covers historical protocol/host variants, redirecting legacy routes and old static assets as well as current pages. It therefore does not need to equal the 80 current sitemap URLs. The Day 2 crawl shows that every current sitemap URL is technically indexable; the remaining useful exclusions are primarily crawl-priority/index-selection issues rather than a blocking robots, canonical or HTTP defect.

Actions:

1. Recheck the three accepted requests on **2026-08-18**; do not resubmit before then.
2. Recheck the Page Indexing reason counts and canonical sitemap discovered count after Google rereads the sitemap. Expect the live 80-URL sitemap to replace the stale GSC count of 81.
3. If `/services`, `/industries`, or `/contact` remain never-crawled, inspect their GSC status and strengthen contextual links/content in that order. Do not spend crawl requests on `/terms`.
4. Add `/privacy-policy` → `/privacy` as a technical follow-up only after confirming the replacement intent. Keep `/toc` as 404 unless historical traffic/backlinks justify a relevant redirect.
5. Do not request indexing for redirecting, canonicalized, asset or 404 URLs.

## Exit Gate

**Passed.** Every SOP P0 URL has a current GSC status and next action; the eligible changed URLs passed live tests before their requests; all 21 exclusions have a documented classification and decision.
