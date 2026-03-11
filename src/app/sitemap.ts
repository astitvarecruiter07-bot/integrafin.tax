import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://integrafin.tax";

    const routes = [
        "",
        "/about",
        "/services",
        "/blog",
        "/case-study",
        "/contact",
    ];

    const blogSlugs = [
        "tax-planning-strategies-2025",
        "small-business-accounting-tips",
        "irs-compliance-guide",
        "tax-resolution-options",
        "payroll-best-practices",
        "financial-planning-for-startups",
    ];

    return [
        ...routes.map((route) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: route === "/blog" ? ("weekly" as const) : ("monthly" as const),
            priority: route === "" ? 1 : 0.8,
        })),
        ...blogSlugs.map((slug) => ({
            url: `${baseUrl}/blog/${slug}`,
            lastModified: new Date(),
            changeFrequency: "yearly" as const,
            priority: 0.6,
        })),
    ];
}
