# IntegraFin Day 2 Technical Crawl and Indexability Audit

**Audit date:** August 11, 2026  
**Target:** `https://integrafin.tax`  
**Owner:** Prashant Chavan (Developer + SEO Owner)  
**Status:** Done - exit gate passed; remediation implemented locally and awaiting deployment verification

## 1. Evidence files

- `INTEGRAFIN_DAY_02_CRAWL_EXPORT_2026-08-11.csv` - page-level crawl export.
- `INTEGRAFIN_DAY_02_CRAWL_DATA_2026-08-11.json` - complete machine-readable crawl, comparison, and issue data.
- `INTEGRAFIN_DAY_02_INTERNAL_LINK_CRAWL_2026-08-11.md` - internal-link graph and breadcrumb audit.
- `INTEGRAFIN_DAY_02_LOCAL_FIX_CRAWL_2026-08-11.csv` and `.json` - post-fix local crawl evidence.
- `INTEGRAFIN_DAY_02_LOCAL_FIX_INTERNAL_LINK_AUDIT_2026-08-11.md` - post-fix internal-link and breadcrumb evidence.
- `scripts/day2-technical-crawl.mjs` - repeatable Day 2/Day 28 crawler.

The audit used read-only production requests and a live Chrome verification. It did not submit forms, change production data, or request indexing.

## 2. Executive result

| Check | Result | Status |
|---|---:|---|
| XML sitemap URLs | 81 entries / 80 unique URLs | Duplicate source entry fixed locally |
| URLs crawled | 80 | Verified |
| Technically indexable URLs | 80 | Verified |
| Sitemap URLs returning non-200 | 0 | Pass |
| Sitemap URLs redirecting | 0 | Pass |
| Broken internal destinations | 0 | Pass |
| Internal links pointing through redirects | 0 | Pass |
| Redirect chains | 0 | Pass |
| Missing or duplicate titles | 0 | Pass |
| Missing, multiple, or duplicate H1s | 0 | Pass |
| Missing canonicals | 0 | Pass |
| Canonical conflicts | 0 | Pass |
| `noindex` URLs in XML sitemap | 0 | Pass |
| Robots-blocked URLs in XML sitemap | 0 | Pass |
| Indexable crawled URLs outside XML sitemap | 0 | Pass |
| Sitemap URLs deeper than three clicks | 0 | Pass |
| Orphaned/zero-inbound sitemap URLs | 1 | P1 action assigned |

"Technically indexable" means the page returned HTML with HTTP 200, was not blocked or marked `noindex`, and exposed a valid canonical. It does not mean Google has indexed the URL. Day 1 GSC evidence still reports 75 indexed and 21 non-indexed URLs across Google's broader known-URL set; Day 3 will classify those exclusions.

## 3. Actionable issue

### P1 - isolated roofing-contractor landing page

**URL:** `https://integrafin.tax/bookkeeping-for-roofing-contractors-houston`

Verified state:

- HTTP 200, indexable, unique title, one H1, and self-referencing canonical.
- Present in the XML sitemap with priority `0.9`.
- Zero internal inbound links from another crawled page and no path from the homepage.
- Missing from the HTML sitemap.
- No `BreadcrumbList` markup.
- Live Chrome rendering passed and produced no console warnings or errors.

The page behaved like a standalone campaign landing page while the XML sitemap and canonical configuration presented it as an organic-search page. The recommended organic strategy was selected on August 11, 2026: keep the page indexable, connect it to the contractor hub and HTML sitemap, and add visible plus structured breadcrumbs.

| Priority | Owner | Target date | Completion evidence |
|---|---|---|---|
| P1 | Prashant Chavan (Developer + SEO Owner) | 2026-08-12 | Implemented locally on 2026-08-11; local recrawl shows zero orphaned/zero-inbound URLs and zero breadcrumb gaps. Production deployment and recrawl remain. |

## 4. Route and sitemap comparison

- Every public static route found under `src/app` is represented in the live XML sitemap.
- Every literal route declared in `src/app/sitemap.ts` is present in the live XML sitemap.
- The HTML sitemap contains no route absent from the XML sitemap.
- Eight XML URLs are absent from the HTML sitemap: the isolated roofing page and seven blog posts.
- The seven blog differences are accepted for Day 2 because the HTML sitemap deliberately labels its list **Featured Blog Posts**, and those posts remain discoverable from the main blog/archive or contextual links.
- `/thank-you` and `/roofing-bookkeeping-thank-you` are deliberate conversion utility pages: they are marked `noindex` and excluded from the XML sitemap.
- `/admin` routes are deliberately blocked/noindexed and excluded from the crawl inventory.
- The canonical-host redirect and four legacy redirects in `next.config.ts` are deliberate; no crawled internal link or sitemap entry points through them.

The isolated roofing page is the only comparison difference treated as a defect because it is simultaneously indexable, included in XML, absent from the HTML sitemap, and unreachable through the internal link graph.

## 5. Severity and exit gate

| Severity | Count | Result |
|---|---:|---|
| P0 | 0 | No crawl/indexability emergency found |
| P1 | 1 | Organic discovery and breadcrumb fix implemented locally; deployment verification pending |
| P2 | 1 | Duplicate contractor-hub XML sitemap entry removed locally |
| Accepted/intentional differences | 7 blog HTML-sitemap omissions plus utility/legacy routes | Documented |

**Day 2 exit gate:** Passed. No P0 defects were found, and the P1 remediation has been implemented locally with a production verification step assigned.

## 6. Remediation completed locally - August 11, 2026

- Added one contextual link from `/contractor-bookkeeping-services` to the roofing page.
- Added the roofing page to the HTML sitemap.
- Added a visible breadcrumb trail and matching `BreadcrumbList` JSON-LD.
- Updated the modified dates for the changed organic pages.
- Removed the duplicate `/contractor-bookkeeping-services` XML sitemap declaration. Production currently exposes 81 entries but only 80 unique URLs; the local fixed sitemap exposes 80 entries and 80 unique URLs.
- Enhanced `scripts/day2-technical-crawl.mjs` to detect duplicate XML entries and to support production-domain sitemap/canonical URLs during localhost verification.
- Passed targeted ESLint, TypeScript, and the Next.js production build.
- Local post-fix crawl: 80 sitemap URLs, 80 indexable, zero duplicates, zero broken links, zero orphaned URLs, zero zero-inbound sitemap URLs, zero canonical conflicts, and zero sitemap/route defects.
- Local internal-link audit: zero orphaned routes and zero missing `BreadcrumbList` markup.
- Browser verification confirmed the breadcrumb is visible, exactly one `BreadcrumbList` is rendered, each discovery page has one link to the roofing page, and no console warning/error was recorded.

## 7. Next action

Deploy the source changes, repeat the production crawl, and confirm the roofing URL is no longer orphaned and the XML sitemap contains 80 unique entries with no duplicate. Then proceed to Day 3: create the Google Search Console priority indexing queue and reconcile the 21 GSC non-indexed URLs against the crawl.
