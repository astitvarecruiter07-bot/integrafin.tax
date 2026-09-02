import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const baseUrl = new URL(args.get("--base") || "https://integrafin.tax");
const csvPath = args.get("--csv") || "INTEGRAFIN_DAY_02_CRAWL_EXPORT_2026-08-11.csv";
const jsonPath = args.get("--json") || "INTEGRAFIN_DAY_02_CRAWL_DATA_2026-08-11.json";
const maxPages = Number.parseInt(args.get("--max") || "300", 10);
const concurrency = Math.max(1, Number.parseInt(args.get("--concurrency") || "8", 10));

function decodeHtml(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return match ? match[1] ?? match[2] ?? match[3] ?? "" : null;
}

function normalizeInternalUrl(rawUrl, fromUrl = baseUrl) {
  try {
    const url = new URL(rawUrl, fromUrl);
    if (url.origin !== baseUrl.origin) return null;
    if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return null;
    if (/\.[a-z0-9]{2,6}$/i.test(url.pathname) && !url.pathname.endsWith(".html")) return null;
    url.search = "";
    url.hash = "";
    url.pathname = decodeURI(url.pathname).replace(/\/+$/, "") || "/";
    return url;
  } catch {
    return null;
  }
}

function extractPageSignals(html, pageUrl) {
  const titleMatch = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  const title = decodeHtml(titleMatch?.[1] || "");
  const h1s = Array.from(html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi), (match) => decodeHtml(match[1])).filter(Boolean);
  const linkTags = Array.from(html.matchAll(/<link\b[^>]*>/gi), (match) => match[0]);
  const canonicalTag = linkTags.find((tag) => (getAttribute(tag, "rel") || "").toLowerCase().split(/\s+/).includes("canonical"));
  const canonical = canonicalTag ? getAttribute(canonicalTag, "href") : null;
  const metaTags = Array.from(html.matchAll(/<meta\b[^>]*>/gi), (match) => match[0]);
  const robotsValues = metaTags
    .filter((tag) => ["robots", "googlebot"].includes((getAttribute(tag, "name") || "").toLowerCase()))
    .map((tag) => getAttribute(tag, "content") || "")
    .filter(Boolean);
  const links = new Set();
  for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
    const href = getAttribute(match[0], "href");
    if (!href) continue;
    const url = normalizeInternalUrl(href, pageUrl);
    if (url) links.add(url.pathname);
  }
  return { title, h1s, canonical, robotsValues, links: Array.from(links).sort() };
}

async function fetchWithRedirects(requestUrl) {
  const redirects = [];
  let currentUrl = new URL(requestUrl);
  let response;
  try {
    for (let hop = 0; hop <= 10; hop += 1) {
      response = await fetch(currentUrl, {
        redirect: "manual",
        headers: { "user-agent": "IntegraFin-Day2-Technical-Audit/1.0" },
      });
      if (![301, 302, 303, 307, 308].includes(response.status)) break;
      const location = response.headers.get("location");
      if (!location) break;
      const nextUrl = new URL(location, currentUrl);
      redirects.push({ status: response.status, from: currentUrl.href, to: nextUrl.href });
      currentUrl = nextUrl;
    }
    const contentType = response.headers.get("content-type") || "";
    const html = contentType.includes("text/html") ? await response.text() : "";
    const signals = extractPageSignals(html, currentUrl);
    return {
      requestedUrl: new URL(requestUrl).href,
      initialStatus: redirects[0]?.status ?? response.status,
      finalStatus: response.status,
      finalUrl: currentUrl.href,
      redirects,
      contentType,
      xRobotsTag: response.headers.get("x-robots-tag") || "",
      ...signals,
    };
  } catch (error) {
    return {
      requestedUrl: new URL(requestUrl).href,
      initialStatus: "ERROR",
      finalStatus: "ERROR",
      finalUrl: currentUrl.href,
      redirects,
      contentType: "",
      xRobotsTag: "",
      title: "",
      h1s: [],
      canonical: null,
      robotsValues: [],
      links: [],
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function fetchText(relativePath) {
  const response = await fetch(new URL(relativePath, baseUrl), {
    headers: { "user-agent": "IntegraFin-Day2-Technical-Audit/1.0" },
  });
  if (!response.ok) throw new Error(`${relativePath} returned HTTP ${response.status}`);
  return response.text();
}

function parseSitemap(xml) {
  return Array.from(xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi), (match) => {
    try {
      const declaredUrl = new URL(match[1]);
      return normalizeInternalUrl(`${declaredUrl.pathname}${declaredUrl.search}${declaredUrl.hash}`, baseUrl);
    } catch {
      return normalizeInternalUrl(match[1], baseUrl);
    }
  })
    .filter(Boolean)
    .map((url) => url.pathname);
}

function parseRobotsDisallows(robotsText) {
  const rules = [];
  let appliesToAll = false;
  for (const rawLine of robotsText.split(/\r?\n/)) {
    const line = rawLine.replace(/#.*$/, "").trim();
    if (!line) continue;
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const key = line.slice(0, separator).trim().toLowerCase();
    const value = line.slice(separator + 1).trim();
    if (key === "user-agent") appliesToAll = value === "*";
    if (key === "disallow" && appliesToAll && value) rules.push(value);
  }
  return rules;
}

function isRobotsBlocked(pagePath, disallows) {
  return disallows.some((rule) => pagePath === rule || pagePath.startsWith(rule.endsWith("*") ? rule.slice(0, -1) : rule));
}

async function collectSourceStaticRoutes(rootDirectory) {
  const files = await readdir(rootDirectory, { recursive: true });
  return files
    .filter((file) => file.replaceAll("\\", "/").endsWith("/page.tsx") || file === "page.tsx")
    .map((file) => {
      const normalized = file.replaceAll("\\", "/");
      return normalized === "page.tsx" ? "" : normalized.replace(/\/page\.tsx$/, "");
    })
    .filter((route) => !route.includes("[") && !route.startsWith("admin"))
    .map((route) => `/${route}`.replace(/\/$/, "") || "/")
    .sort();
}

function duplicateGroups(records, getter) {
  const groups = new Map();
  for (const record of records) {
    const value = getter(record).trim().toLowerCase();
    if (!value) continue;
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(record.path);
  }
  return Array.from(groups.entries())
    .filter(([, paths]) => paths.length > 1)
    .map(([value, paths]) => ({ value, paths: paths.sort() }))
    .sort((left, right) => left.value.localeCompare(right.value));
}

const [sitemapXml, robotsText, sourceSitemapText] = await Promise.all([
  fetchText("/sitemap.xml"),
  fetchText("/robots.txt"),
  readFile(path.join("src", "app", "sitemap.ts"), "utf8"),
]);
const sitemapPathEntries = parseSitemap(sitemapXml);
const sitemapPaths = Array.from(new Set(sitemapPathEntries)).sort();
const sitemapSet = new Set(sitemapPaths);
const disallows = parseRobotsDisallows(robotsText);
const sourceStaticRoutes = await collectSourceStaticRoutes(path.join("src", "app"));
const sourceLiteralSitemapPaths = Array.from(sourceSitemapText.matchAll(/\{\s*path:\s*['"]([^'"]*)['"]/g), (match) => match[1] || "/");

const queue = Array.from(new Set(["/", ...sitemapPaths]));
const queued = new Set(queue);
const pages = new Map();

while (queue.length > 0 && pages.size < maxPages) {
  const batch = queue.splice(0, concurrency).filter((pagePath) => !pages.has(pagePath));
  const results = await Promise.all(batch.map((pagePath) => fetchWithRedirects(new URL(pagePath, baseUrl))));
  for (let index = 0; index < batch.length; index += 1) {
    const pagePath = batch[index];
    const result = results[index];
    pages.set(pagePath, { path: pagePath, ...result });
    for (const link of result.links) {
      if (!queued.has(link) && queued.size < maxPages) {
        queued.add(link);
        queue.push(link);
      }
    }
  }
}

const records = Array.from(pages.values()).sort((left, right) => left.path.localeCompare(right.path));
for (const record of records) {
  const robotsTextCombined = [...record.robotsValues, record.xRobotsTag].join(",").toLowerCase();
  let canonicalUrl = null;
  try {
    canonicalUrl = record.canonical ? new URL(record.canonical, record.finalUrl) : null;
  } catch {
    canonicalUrl = null;
  }
  const finalUrl = normalizeInternalUrl(record.finalUrl);
  record.inSitemap = sitemapSet.has(record.path);
  record.noindex = robotsTextCombined.includes("noindex");
  record.robotsBlocked = isRobotsBlocked(record.path, disallows);
  record.canonicalPath = canonicalUrl?.pathname || record.canonical || "";
  record.canonicalConflict = Boolean(canonicalUrl && finalUrl && canonicalUrl.pathname !== finalUrl.pathname);
  record.selfCanonical = Boolean(canonicalUrl && finalUrl && canonicalUrl.pathname === finalUrl.pathname);
  record.indexable = record.finalStatus === 200 && record.contentType.includes("text/html") && !record.noindex && !record.robotsBlocked;
}

const inbound = new Map();
for (const source of records) {
  for (const destination of source.links) {
    if (destination === source.path) continue;
    if (!inbound.has(destination)) inbound.set(destination, new Set());
    inbound.get(destination).add(source.path);
  }
}

const depths = new Map([["/", 0]]);
const depthQueue = ["/"];
while (depthQueue.length > 0) {
  const current = depthQueue.shift();
  const record = pages.get(current);
  if (!record) continue;
  for (const destination of record.links) {
    if (!depths.has(destination)) {
      depths.set(destination, depths.get(current) + 1);
      depthQueue.push(destination);
    }
  }
}

const siteMapRecord = pages.get("/site-map");
const htmlSitemapPaths = new Set(siteMapRecord?.links || []);
const intentionallyNonIndexableStatic = new Set([
  "/thank-you",
  "/roofing-bookkeeping-thank-you",
  "/bookkeeping-cost-calculator",
]);
const publicSourceStaticRoutes = sourceStaticRoutes.filter((route) => !intentionallyNonIndexableStatic.has(route));
const indexableRecords = records.filter((record) => record.indexable);
const brokenInternalLinks = [];
const redirectingInternalLinks = [];
for (const source of records) {
  for (const destination of source.links) {
    const target = pages.get(destination);
    if (!target || target.finalStatus === "ERROR" || Number(target.finalStatus) >= 400) {
      brokenInternalLinks.push({ source: source.path, destination, status: target?.finalStatus ?? "NOT_CRAWLED" });
    } else if (Number(target.initialStatus) >= 300 && Number(target.initialStatus) < 400) {
      redirectingInternalLinks.push({ source: source.path, destination, status: target.initialStatus, finalUrl: target.finalUrl });
    }
  }
}

const issues = {
  duplicateXmlEntries: Array.from(
    sitemapPathEntries.reduce((counts, pagePath) => counts.set(pagePath, (counts.get(pagePath) || 0) + 1), new Map()),
  )
    .filter(([, count]) => count > 1)
    .map(([pagePath, count]) => ({ path: pagePath, count })),
  sitemapNon200: records.filter((record) => record.inSitemap && record.finalStatus !== 200).map((record) => ({ path: record.path, status: record.finalStatus })),
  sitemapRedirects: records.filter((record) => record.inSitemap && record.redirects.length > 0).map((record) => ({ path: record.path, redirects: record.redirects })),
  brokenInternalLinks,
  redirectingInternalLinks,
  redirectChains: records.filter((record) => record.redirects.length > 1).map((record) => ({ path: record.path, redirects: record.redirects })),
  missingTitles: indexableRecords.filter((record) => !record.title).map((record) => record.path),
  duplicateTitles: duplicateGroups(indexableRecords, (record) => record.title),
  missingH1s: indexableRecords.filter((record) => record.h1s.length === 0).map((record) => record.path),
  multipleH1s: indexableRecords.filter((record) => record.h1s.length > 1).map((record) => ({ path: record.path, count: record.h1s.length, h1s: record.h1s })),
  duplicateH1s: duplicateGroups(indexableRecords, (record) => record.h1s[0] || ""),
  missingCanonicals: indexableRecords.filter((record) => !record.canonical).map((record) => record.path),
  canonicalConflicts: indexableRecords.filter((record) => record.canonicalConflict).map((record) => ({ path: record.path, canonical: record.canonicalPath })),
  noindexInSitemap: records.filter((record) => record.inSitemap && record.noindex).map((record) => record.path),
  blockedInSitemap: records.filter((record) => record.inSitemap && record.robotsBlocked).map((record) => record.path),
  orphanedSitemap: sitemapPaths.filter((pagePath) => pagePath !== "/" && !depths.has(pagePath)),
  zeroInboundSitemap: sitemapPaths.filter((pagePath) => pagePath !== "/" && !(inbound.get(pagePath)?.size > 0)),
  deeperThanThreeClicks: sitemapPaths.filter((pagePath) => (depths.get(pagePath) ?? 0) > 3).map((pagePath) => ({ path: pagePath, depth: depths.get(pagePath) })),
  crawledOutsideSitemap: records.filter((record) => !record.inSitemap && record.indexable).map((record) => record.path),
  publicStaticRoutesMissingFromXml: publicSourceStaticRoutes.filter((pagePath) => !sitemapSet.has(pagePath)),
  sourceLiteralRoutesMissingFromXml: Array.from(new Set(sourceLiteralSitemapPaths)).filter((pagePath) => !sitemapSet.has(pagePath)),
  xmlRoutesMissingFromHtmlSitemap: sitemapPaths.filter((pagePath) => pagePath !== "/site-map" && !htmlSitemapPaths.has(pagePath)),
  htmlSitemapRoutesMissingFromXml: Array.from(htmlSitemapPaths).filter((pagePath) => !sitemapSet.has(pagePath)).sort(),
};

const summary = {
  generatedAt: new Date().toISOString(),
  baseUrl: baseUrl.origin,
  sitemapRoutes: sitemapPaths.length,
  crawledRoutes: records.length,
  indexableRoutes: indexableRecords.length,
  ...Object.fromEntries(Object.entries(issues).map(([key, values]) => [key, values.length])),
};

function csvCell(value) {
  const text = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

const csvHeaders = [
  "path", "in_sitemap", "initial_status", "final_status", "final_url", "redirect_count", "indexable",
  "robots_blocked", "noindex", "title", "h1_count", "h1s", "canonical", "canonical_conflict",
  "inbound_internal_pages", "click_depth", "internal_links", "error",
];
const csvRows = records.map((record) => [
  record.path,
  record.inSitemap,
  record.initialStatus,
  record.finalStatus,
  record.finalUrl,
  record.redirects.length,
  record.indexable,
  record.robotsBlocked,
  record.noindex,
  record.title,
  record.h1s.length,
  record.h1s,
  record.canonicalPath,
  record.canonicalConflict,
  inbound.get(record.path)?.size || 0,
  depths.get(record.path) ?? "",
  record.links.length,
  record.error || "",
].map(csvCell).join(","));

await Promise.all([
  writeFile(csvPath, [csvHeaders.map(csvCell).join(","), ...csvRows].join("\n"), "utf8"),
  writeFile(jsonPath, `${JSON.stringify({ summary, issues, records }, null, 2)}\n`, "utf8"),
]);

process.stdout.write(`${JSON.stringify({ csvPath, jsonPath, summary }, null, 2)}\n`);
