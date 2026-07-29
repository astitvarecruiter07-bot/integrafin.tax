import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/admin/*"],
            },
            {
                userAgent: "OAI-SearchBot",
                allow: "/",
                disallow: ["/admin", "/admin/*"],
            },
            {
                userAgent: "ChatGPT-User",
                allow: "/",
                disallow: ["/admin", "/admin/*"],
            },
            {
                userAgent: "GPTBot",
                disallow: "/",
            },
        ],
        sitemap: "https://integrafin.tax/sitemap.xml",
    };
}
