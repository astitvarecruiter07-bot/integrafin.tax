# IntegraFin Full Website SEO Audit

Audit date: 2026-06-05  
Site: https://integrafin.tax  
Repo: d:\integrafin_web

## Google Guidance Used

- Latest confirmed Google Search ranking update checked: May 2026 core update on Google Search Status Dashboard.
- Google's current SEO direction: crawlable/indexable pages, helpful people-first content, reliable page experience, accurate canonical/sitemap signals, concise page titles, and valid structured data.
- Google says sitemap URLs should be canonical/absolute, and `lastmod` should reflect a significant page update if used.

## Validation Performed

- `npm run lint` passed.
- `npm run build` passed.
- Local production server check passed for homepage, sitemap, robots, and blog detail pages.
- Live domain HTTP checks performed for homepage, services, industries, test-db, robots, sitemap, OG image, logo assets, and major internal links.
- Live internal-link crawl found 26 internal URLs from public pages.
- PageSpeed Insights API could not be checked from this environment due to `429 Too Many Requests`.

## P0 Fixes

### 1. Live blog article URLs return 500

Evidence:

- `https://integrafin.tax/blog/financial-planning-for-startups` -> 500
- `https://integrafin.tax/blog/irs-compliance-guide` -> 500
- `https://integrafin.tax/blog/payroll-best-practices` -> 500
- `https://integrafin.tax/blog/small-business-accounting-tips` -> 500
- `https://integrafin.tax/blog/tax-planning-strategies-2025` -> 500
- `https://integrafin.tax/blog/tax-resolution-options` -> 500

Why this matters:

These posts are linked from the homepage, blog page, HTML sitemap, and XML sitemap. A 500 response prevents normal crawling/indexing and wastes internal link equity.

Likely source:

- `src/app/blog/[slug]/page.tsx` uses DB posts for `generateStaticParams`, but homepage/sitemap links include mock fallback posts.
- Current local production build serves these blog URLs correctly, so this may also require redeploying the current working build and checking Vercel function logs.

Recommended fix:

- Update `generateStaticParams` to merge DB posts with `mockBlogPosts` so all visible/sitemap-linked fallback posts are prerendered.
- Redeploy and verify each blog URL returns 200.
- If live still returns 500, inspect Vercel runtime logs for `/blog/[slug]`.

### 2. `/test-db` is public and indexable

Evidence:

- Live: `https://integrafin.tax/test-db` -> 200
- Rendered robots meta: `index, follow`
- Page title inherits homepage title.
- Source imports `testDbConnection` and displays `MongoDB Atlas Connection Test`.

Why this matters:

This is a utility/debug route, not public marketing content. It weakens site quality and exposes infrastructure behavior.

Recommended fix:

- Remove the route from production, or move it behind admin auth.
- If it must remain temporarily, add `robots: { index: false, follow: false }` and keep it out of sitemap/navigation.
- Prefer removal or auth over only `robots.txt`, because Google must crawl a page to see `noindex`.

### 3. `/industries` is missing from XML and HTML sitemaps

Evidence:

- Live `/industries` returns 200 and has canonical metadata.
- Live sitemap has 25 URLs and does not include `https://integrafin.tax/industries`.
- `src/app/sitemap.ts` route list omits `/industries`.
- `src/app/site-map/page.tsx` also omits `/industries`.

Why this matters:

Google can still discover `/industries` through navigation/footer links, but sitemap omission weakens discovery consistency for an important service page.

Recommended fix:

- Add `/industries` to `src/app/sitemap.ts`.
- Add `/industries` to `src/app/site-map/page.tsx`.

### 4. Broken image assets in metadata and structured data

Evidence:

- `https://integrafin.tax/og-image.jpg` -> 404
- `https://integrafin.tax/logo.png` -> 404
- Existing assets include `/logo.svg` and `/images/logo1.png`.
- Root metadata references `/og-image.jpg`.
- Blog JSON-LD publisher logo references `https://integrafin.tax/logo.png`.

Why this matters:

Broken metadata images affect search/social appearance and reduce structured-data quality.

Recommended fix:

- Add a real `public/og-image.jpg`, 1200x630.
- Change blog JSON-LD logo to `https://integrafin.tax/images/logo1.png` or add `public/logo.png`.

## P1 Fixes

### 5. Many page titles duplicate the brand

Evidence examples from live rendered titles:

- `/services`: `Tax & Accounting Services in Katy, TX | IntegraFin | IntegraFin`
- `/case-study`: `Client Success Stories & Tax Case Studies | IntegraFin | IntegraFin`
- `/tax-calculator`: `Free 2024 Tax Refund Calculator | IntegraFin | IntegraFin`
- State/city pages also render with duplicate `| IntegraFin`.

Why this matters:

Google recommends concise, distinct titles and warns against repeated boilerplate. Repeated brand text can be rewritten in search results and reduces useful title space.

Recommended fix:

- Either remove `| IntegraFin` from page-level titles and keep the root template, or remove the root template suffix and manage full titles per page.
- For city/state pages, keep the location + service intent first.

### 6. `/services` has no canonical tag

Evidence:

- Live `/services` returns 200 but has no rendered canonical tag.
- `src/app/services/page.tsx` defines title/description/openGraph but not `alternates.canonical`.

Recommended fix:

- Add `alternates: { canonical: "https://integrafin.tax/services" }`.

### 7. Static sitemap `lastmod` values are not meaningful

Evidence:

- `src/app/sitemap.ts` uses `lastModified: new Date()` for every static route.
- Live sitemap shows identical static `lastmod` timestamps.

Why this matters:

Google says it uses `lastmod` only when consistently and verifiably accurate. If every page appears updated together without meaningful changes, the signal loses value.

Recommended fix:

- Use a route metadata map with stable last-reviewed/last-updated dates.
- Keep blog `lastModified` based on post date or `updatedAt`.
- Remove `changeFrequency` and `priority` if desired; Google ignores them.

### 8. Legacy service URLs still return 404

Evidence:

- `/business-tax-accounting` -> 404
- `/individual-tax-services` -> 404
- `/tax-resolution-services` -> 404
- `/additional-services` -> 404
- `/new-business-consultation` -> 404

Why this matters:

If these URLs had backlinks, bookmarks, or Google history, the 404s can slow migration recovery.

Recommended fix:

- Add 301 redirects in `next.config.ts`:
  - `/business-tax-accounting` -> `/services#business`
  - `/individual-tax-services` -> `/services#individual`
  - `/tax-resolution-services` -> `/services#resolution`
  - `/additional-services` -> `/services#additional`
  - `/new-business-consultation` -> `/services#startup`

### 9. Tax calculator is outdated for 2026 search intent

Evidence:

- Tax calculator title, schema, UI copy, data constants, due dates, and disclaimer all say 2024.

Why this matters:

As of 2026-06-05, a page targeting "free tax calculator" should either support the latest relevant tax year or clearly position itself as an archive.

Recommended fix:

- Update the calculator for the latest tax-year data you want to target, likely 2025 filing / 2026 planning depending on business strategy.
- Update metadata, structured data, UI labels, Social Security cap, brackets, standard deductions, and due-date copy together.

## P2 Fixes

### 10. Blog content needs freshness updates

Evidence:

- Mock blog posts are dated February-March 2025.
- The featured post says "upcoming 2025 tax season."

Recommended fix:

- After the 500s are fixed, update high-value posts for current 2026 relevance.
- Add new support articles around state/city service clusters and current tax deadlines.

### 11. Remove meta keywords

Evidence:

- Root, service, state, city, case-study, and tax-calculator metadata include `keywords`.

Why this matters:

Google does not use the meta keywords tag. This is low risk but unnecessary.

Recommended fix:

- Remove `keywords` fields, or keep only if needed for non-Google tooling.

## What Looks Good

- Apex host is healthy: `https://integrafin.tax/` returns 200.
- `https://www.integrafin.tax/` redirects to apex with 308.
- `robots.txt` allows public pages and points to sitemap.
- Admin routes are blocked in robots and most admin pages are noindexed.
- State and city pages have strong structure: unique URLs, canonicals, FAQ/Service/Breadcrumb JSON-LD, internal links from state hubs to city pages, and last-reviewed copy.
- Footer and homepage link to important service/state/location pages.
- Local production build is healthy.

## Recommended Fix Order

1. Fix/redeploy live blog article 500s.
2. Remove/protect `/test-db`.
3. Add `/industries` to XML sitemap and HTML sitemap.
4. Add/fix OG image and JSON-LD logo assets.
5. Fix duplicate page-title branding and `/services` canonical.
6. Replace static sitemap `new Date()` with accurate last-modified dates.
7. Add legacy service 301 redirects.
8. Refresh tax calculator for the current tax-year target.
9. Refresh 2025 blog content and expand content clusters.
10. Re-run Search Console URL Inspection for fixed blog URLs, `/industries`, `/services`, state hubs, and city pages.
