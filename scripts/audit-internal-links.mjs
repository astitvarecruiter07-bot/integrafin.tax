import { writeFile } from "node:fs/promises";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const baseUrl = new URL(args.get("--base") || "http://127.0.0.1:3000");
const outputPath = args.get("--output") || "INTERNAL_LINK_AUDIT_2026-07-30.md";
const maxPages = Number.parseInt(args.get("--max") || "250", 10);

function normalizePath(rawHref, fromPath = "/") {
  try {
    const url = new URL(rawHref, new URL(fromPath, baseUrl));
    if (url.origin !== baseUrl.origin) {
      return null;
    }

    if (
      url.pathname.startsWith("/_next/") ||
      url.pathname.startsWith("/api/") ||
      url.pathname.startsWith("/admin")
    ) {
      return null;
    }

    const path = decodeURI(url.pathname).replace(/\/+$/, "") || "/";
    if (/\.[a-z0-9]{2,5}$/i.test(path) && !path.endsWith(".html")) {
      return null;
    }

    return path;
  } catch {
    return null;
  }
}

function extractLinks(html, fromPath) {
  const links = new Set();
  const pattern = /<a\b[^>]*\bhref=(?:"([^"]+)"|'([^']+)')[^>]*>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    const href = match[1] || match[2];
    const path = normalizePath(href, fromPath);
    if (path) {
      links.add(path);
    }
  }

  return links;
}

function extractAnchors(html, fromPath) {
  const anchors = [];
  const pattern = /<a\b[^>]*\bhref=(?:"([^"]+)"|'([^']+)')[^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = pattern.exec(html))) {
    const href = normalizePath(match[1] || match[2], fromPath);
    if (!href) {
      continue;
    }

    const text = match[3]
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
    anchors.push({ href, text });
  }

  return anchors;
}

async function fetchPage(path) {
  try {
    const response = await fetch(new URL(path, baseUrl), {
      redirect: "follow",
      headers: { "user-agent": "IntegraFin-Internal-Link-Audit/1.0" },
    });
    const contentType = response.headers.get("content-type") || "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    return { status: response.status, html };
  } catch (error) {
    return {
      status: "ERROR",
      html: "",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function getSitemapPaths() {
  const response = await fetch(new URL("/sitemap.xml", baseUrl));
  if (!response.ok) {
    throw new Error(`Sitemap request failed with HTTP ${response.status}`);
  }

  const xml = await response.text();
  return Array.from(xml.matchAll(/<loc>(.*?)<\/loc>/g))
    .map((match) => {
      try {
        return normalizePath(new URL(match[1]).pathname);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

const sitemapPaths = Array.from(new Set(await getSitemapPaths()));
const queue = Array.from(new Set(["/", ...sitemapPaths]));
const queued = new Set(queue);
const pages = new Map();
const graph = new Map();

while (queue.length > 0 && pages.size < maxPages) {
  const path = queue.shift();
  const result = await fetchPage(path);
  pages.set(path, result);

  const links = extractLinks(result.html, path);
  graph.set(path, links);

  for (const link of links) {
    if (!queued.has(link) && queued.size < maxPages) {
      queued.add(link);
      queue.push(link);
    }
  }
}

const depths = new Map([["/", 0]]);
const depthQueue = ["/"];
while (depthQueue.length > 0) {
  const path = depthQueue.shift();
  const nextDepth = depths.get(path) + 1;

  for (const link of graph.get(path) || []) {
    if (!depths.has(link)) {
      depths.set(link, nextDepth);
      depthQueue.push(link);
    }
  }
}

const inboundCounts = new Map();
for (const links of graph.values()) {
  for (const link of links) {
    inboundCounts.set(link, (inboundCounts.get(link) || 0) + 1);
  }
}

const sitemapSet = new Set(sitemapPaths);
const orphaned = sitemapPaths
  .filter((path) => path !== "/" && !depths.has(path))
  .sort();
const deepPages = sitemapPaths
  .filter((path) => (depths.get(path) ?? 0) > 3)
  .sort((left, right) => depths.get(right) - depths.get(left) || left.localeCompare(right));
const brokenPages = Array.from(pages.entries())
  .filter(([, result]) => result.status === "ERROR" || result.status >= 400)
  .sort(([left], [right]) => left.localeCompare(right));
const noInbound = sitemapPaths
  .filter((path) => path !== "/" && (inboundCounts.get(path) || 0) === 0)
  .sort();
const nonSitemapPages = Array.from(pages.keys())
  .filter((path) => !sitemapSet.has(path))
  .sort();
const ownerServicePaths = new Set([
  "/",
  "/texas/katy-tax-accountant",
  "/texas/katy-bookkeeping-services",
  "/business-tax-accounting",
  "/individual-tax-preparation",
  "/texas/irs-notice-help-katy-tx",
  "/tax-resolution",
  "/quickbooks-bookkeeping-services",
  "/bookkeeping-cleanup",
  "/llc-formation-tax-setup",
  "/payroll-tax-support",
  "/tax-calculator",
]);
const priorityOwnerPaths = Array.from(ownerServicePaths);
const blogPaths = sitemapPaths.filter((path) => path.startsWith("/blog/"));
const blogWithoutOwnerServiceLinks = blogPaths.filter((path) => {
  const links = graph.get(path) || new Set();
  return !Array.from(links).some((link) => ownerServicePaths.has(link));
});
const priorityServiceGuideDeficits = priorityOwnerPaths
  .map((path) => ({
    path,
    guideCount: Array.from(graph.get(path) || []).filter((link) => link.startsWith("/blog/")).length,
  }))
  .filter(({ guideCount }) => guideCount < 2);
const genericAnchorLabels = new Set(["read more", "learn more", "click here", "more", "view details"]);
const genericAnchors = Array.from(pages.entries()).flatMap(([path, result]) =>
  extractAnchors(result.html, path)
    .filter(({ text }) => genericAnchorLabels.has(text.toLowerCase()))
    .map(({ href, text }) => ({ path, href, text })),
);
const duplicatePriorityArticleLinks = priorityOwnerPaths.flatMap((path) => {
  const articleLinkCounts = new Map();
  for (const anchor of extractAnchors(pages.get(path)?.html || "", path)) {
    if (anchor.href.startsWith("/blog/")) {
      articleLinkCounts.set(anchor.href, (articleLinkCounts.get(anchor.href) || 0) + 1);
    }
  }

  return Array.from(articleLinkCounts.entries())
    .filter(([, count]) => count > 1)
    .map(([href, count]) => ({ path, href, count }));
});
const breadcrumbUtilityExclusions = new Set(["/", "/privacy", "/terms", "/thank-you", "/site-map"]);
const breadcrumbTargets = sitemapPaths.filter((path) => !breadcrumbUtilityExclusions.has(path));
const missingBreadcrumbs = breadcrumbTargets.filter(
  (path) => !pages.get(path)?.html.includes("BreadcrumbList"),
);

const lines = [
  "# IntegraFin Internal-Link Audit",
  "",
  `Generated: ${new Date().toISOString()}`,
  `Audit target: ${baseUrl.origin}`,
  `Sitemap routes: ${sitemapPaths.length}`,
  `HTML routes crawled: ${pages.size}`,
  "",
  "## Summary",
  "",
  `- Broken internal destinations: ${brokenPages.length}`,
  `- Sitemap routes unreachable from the homepage: ${orphaned.length}`,
  `- Sitemap routes with zero crawled inbound links: ${noInbound.length}`,
  `- Sitemap routes deeper than three clicks: ${deepPages.length}`,
  `- Crawled internal routes not present in the sitemap: ${nonSitemapPages.length}`,
  `- Blog articles without a priority owner-service link: ${blogWithoutOwnerServiceLinks.length}`,
  `- Priority owner pages with fewer than two article links: ${priorityServiceGuideDeficits.length}`,
  `- Generic internal anchor labels: ${genericAnchors.length}`,
  `- Duplicate article links on priority owner pages: ${duplicatePriorityArticleLinks.length}`,
  `- Commercial/content routes without BreadcrumbList markup: ${missingBreadcrumbs.length}`,
  "",
  "## Broken Internal Destinations",
  "",
  ...(brokenPages.length
    ? brokenPages.map(([path, result]) => `- \`${path}\` — ${result.status}${result.error ? ` (${result.error})` : ""}`)
    : ["- None."]),
  "",
  "## Orphaned Sitemap Routes",
  "",
  ...(orphaned.length ? orphaned.map((path) => `- \`${path}\``) : ["- None."]),
  "",
  "## Sitemap Routes With Zero Inbound Links",
  "",
  ...(noInbound.length ? noInbound.map((path) => `- \`${path}\``) : ["- None."]),
  "",
  "## Routes Deeper Than Three Clicks",
  "",
  ...(deepPages.length ? deepPages.map((path) => `- Depth ${depths.get(path)}: \`${path}\``) : ["- None."]),
  "",
  "## Crawled Routes Outside The Sitemap",
  "",
  ...(nonSitemapPages.length ? nonSitemapPages.map((path) => `- \`${path}\``) : ["- None."]),
  "",
  "## Intent-Link Coverage",
  "",
  "### Blog Articles Without A Priority Owner-Service Link",
  "",
  ...(blogWithoutOwnerServiceLinks.length
    ? blogWithoutOwnerServiceLinks.map((path) => `- \`${path}\``)
    : ["- None."]),
  "",
  "### Priority Owner Pages With Fewer Than Two Article Links",
  "",
  ...(priorityServiceGuideDeficits.length
    ? priorityServiceGuideDeficits.map(({ path, guideCount }) => `- \`${path}\` — ${guideCount} article link(s)`)
    : ["- None."]),
  "",
  "## Generic Internal Anchor Labels",
  "",
  ...(genericAnchors.length
    ? genericAnchors.map(({ path, href, text }) => `- \`${path}\` → \`${href}\` — “${text}”`)
    : ["- None."]),
  "",
  "## Duplicate Priority-Page Article Links",
  "",
  ...(duplicatePriorityArticleLinks.length
    ? duplicatePriorityArticleLinks.map(({ path, href, count }) => `- \`${path}\` → \`${href}\` — ${count} occurrences`)
    : ["- None."]),
  "",
  "## Breadcrumb Coverage Gaps",
  "",
  ...(missingBreadcrumbs.length ? missingBreadcrumbs.map((path) => `- \`${path}\``) : ["- None."]),
  "",
  "## Method",
  "",
  "- Loaded every URL in the generated XML sitemap and every internal HTML link discovered during the crawl.",
  "- Built a directed link graph from rendered anchor elements.",
  "- Calculated shortest click depth from the homepage.",
  "- Excluded admin, API, Next.js asset, telephone, email, fragment-only, and external destinations.",
  "- Treats a sitemap URL as orphaned when no rendered link path connects it to the homepage.",
  "- Checks every sitemap blog article for at least one link to a canonical priority service owner.",
  "- Checks all 12 priority owner pages for at least two links to supporting articles.",
  "- Checks priority owner pages for duplicate article destinations.",
  "- Checks rendered internal anchors for generic labels and audits BreadcrumbList markup on commercial/content routes.",
  "",
];

await writeFile(outputPath, lines.join("\n"), "utf8");
process.stdout.write(`${JSON.stringify({
  outputPath,
  sitemapRoutes: sitemapPaths.length,
  crawledRoutes: pages.size,
  broken: brokenPages.length,
  orphaned: orphaned.length,
  noInbound: noInbound.length,
  deep: deepPages.length,
  outsideSitemap: nonSitemapPages.length,
  blogWithoutOwnerServiceLinks: blogWithoutOwnerServiceLinks.length,
  priorityServiceGuideDeficits: priorityServiceGuideDeficits.length,
  genericAnchors: genericAnchors.length,
  duplicatePriorityArticleLinks: duplicatePriorityArticleLinks.length,
  missingBreadcrumbs: missingBreadcrumbs.length,
}, null, 2)}\n`);
