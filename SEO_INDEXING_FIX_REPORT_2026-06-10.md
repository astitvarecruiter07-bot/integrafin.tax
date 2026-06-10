# IntegraFin Google Indexing Fix Report

Date: 2026-06-10
Site: https://integrafin.tax
Repo: d:\integrafin_web

## Main Diagnosis

Google indexing is not blocked sitewide. The live site allows crawling through `robots.txt`, has a public XML sitemap, and the main state/city pages return `200`.

The main issues found were crawl quality and migration signals:

- Legacy service URLs still returned `404` on the live site.
- `/test-db` was public and indexable on the live site.
- `/og-image.jpg` returned `404` on the live site.
- The deployed XML sitemap omitted `/industries`.
- The deployed XML sitemap used identical current timestamps for static pages.
- The `/services` page needed an explicit canonical.
- New state/city pages likely need crawl-priority help through Search Console URL Inspection.

## Fixes Applied Locally

- Added permanent redirects for legacy service URLs in `next.config.ts`:
  - `/business-tax-accounting` -> `/services#business`
  - `/individual-tax-services` -> `/services#individual`
  - `/tax-resolution-services` -> `/services#tax-resolution`
  - `/additional-services` -> `/services#additional`
  - `/new-business-consultation` -> `/services#startup`
- Removed the public `/test-db` route.
- Added `/industries` to the XML sitemap and HTML sitemap.
- Replaced static sitemap `lastmod` values with stable page update dates.
- Added canonical metadata to `/services`.
- Added a real `public/og-image.jpg` at 1200x630.
- Improved blog SEO schema and ensured blog fallback posts are included with DB posts.
- Aligned internal tax-resolution links to `/services#tax-resolution`.
- Removed duplicate root title templating that was creating repeated `| IntegraFin` titles.
- Updated the tax calculator metadata and UI copy toward the current 2026 target.

## Verification

Commands passed:

```powershell
npm run lint
npm run build
```

Local production route checks confirmed:

- `/robots.txt` -> `200`
- `/sitemap.xml` -> `200`
- `/services` -> `200`
- `/industries` -> `200`
- `/texas-tax-accounting-services` -> `200`
- `/texas/houston-tax-accountant` -> `200`
- `/blog/financial-planning-for-startups` -> `200`
- `/business-tax-accounting` -> `308` to `/services#business`
- `/individual-tax-services` -> `308` to `/services#individual`
- `/tax-resolution-services` -> `308` to `/services#tax-resolution`
- `/additional-services` -> `308` to `/services#additional`
- `/new-business-consultation` -> `308` to `/services#startup`
- `/test-db` -> `404`
- `/og-image.jpg` -> `200`

## Search Console Next Actions

After deploying these fixes, submit or resubmit:

- `https://integrafin.tax/sitemap.xml`

Then inspect and request indexing for:

- `https://integrafin.tax/services`
- `https://integrafin.tax/industries`
- `https://integrafin.tax/texas-tax-accounting-services`
- `https://integrafin.tax/texas/houston-tax-accountant`
- `https://integrafin.tax/texas/dallas-tax-accountant`
- `https://integrafin.tax/new-york-tax-accounting-services`
- `https://integrafin.tax/new-york/nyc-tax-accountant`
- `https://integrafin.tax/new-york/buffalo-tax-accountant`
- `https://integrafin.tax/pennsylvania-tax-accounting-services`
- `https://integrafin.tax/pennsylvania/philadelphia-tax-accountant`
- `https://integrafin.tax/pennsylvania/pittsburgh-tax-accountant`
- `https://integrafin.tax/blog`
- `https://integrafin.tax/blog/reduce-self-employment-tax-business-owners`

Also inspect the legacy URLs after deployment and confirm Google sees redirects, not `404`.
