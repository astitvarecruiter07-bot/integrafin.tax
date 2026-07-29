# IntegraFin Internal-Link Audit

Generated: 2026-07-29T21:26:42.956Z
Audit target: http://127.0.0.1:3400
Sitemap routes: 62
HTML routes crawled: 62

## Summary

- Broken internal destinations: 0
- Sitemap routes unreachable from the homepage: 0
- Sitemap routes with zero crawled inbound links: 0
- Sitemap routes deeper than three clicks: 0
- Crawled internal routes not present in the sitemap: 0
- Blog articles without a priority owner-service link: 0
- Priority owner pages with fewer than two article links: 0
- Generic internal anchor labels: 0
- Duplicate article links on priority owner pages: 0
- Commercial/content routes without BreadcrumbList markup: 0

## Broken Internal Destinations

- None.

## Orphaned Sitemap Routes

- None.

## Sitemap Routes With Zero Inbound Links

- None.

## Routes Deeper Than Three Clicks

- None.

## Crawled Routes Outside The Sitemap

- None.

## Intent-Link Coverage

### Blog Articles Without A Priority Owner-Service Link

- None.

### Priority Owner Pages With Fewer Than Two Article Links

- None.

## Generic Internal Anchor Labels

- None.

## Duplicate Priority-Page Article Links

- None.

## Breadcrumb Coverage Gaps

- None.

## Method

- Loaded every URL in the generated XML sitemap and every internal HTML link discovered during the crawl.
- Built a directed link graph from rendered anchor elements.
- Calculated shortest click depth from the homepage.
- Excluded admin, API, Next.js asset, telephone, email, fragment-only, and external destinations.
- Treats a sitemap URL as orphaned when no rendered link path connects it to the homepage.
- Checks every sitemap blog article for at least one link to a canonical priority service owner.
- Checks all 12 priority owner pages for at least two links to supporting articles.
- Checks priority owner pages for duplicate article destinations.
- Checks rendered internal anchors for generic labels and audits BreadcrumbList markup on commercial/content routes.
