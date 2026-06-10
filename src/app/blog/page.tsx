import type { Metadata } from "next";

import { mockBlogPosts } from "@/data/blogData";
import { getAllBlogPosts } from "@/app/actions/blog";
import {
    SITE_URL,
    type BlogSeoPost,
    buildBreadcrumbJsonLd,
    getBlogPostDescription,
    getBlogPostImage,
    getBlogPostModifiedIso,
    getBlogPostPublishedIso,
    getBlogPostUrl,
    toAbsoluteUrl,
} from "@/lib/seo/blog";
import BlogContent from "./BlogContent";

const blogDescription =
    "Read practical U.S. tax planning, IRS compliance, payroll, bookkeeping, and small business accounting guides from IntegraFin's tax team.";

export const metadata: Metadata = {
  title: 'Tax & Accounting Blog | IRS Tips | IntegraFin',
  description: blogDescription,
  alternates: { canonical: 'https://integrafin.tax/blog' },
  keywords: [
    'tax and accounting blog',
    'IRS compliance tips',
    'small business bookkeeping',
    'tax planning',
    'payroll compliance',
  ],
  authors: [{ name: 'IntegraFin Tax & Accounting Team' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    title: 'Tax & Accounting Blog | IRS Tips | IntegraFin',
    description: blogDescription,
    url: 'https://integrafin.tax/blog',
    siteName: 'IntegraFin',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'IntegraFin tax and accounting blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tax & Accounting Blog | IntegraFin',
    description: blogDescription,
    images: ['/og-image.jpg'],
  },
};

export default async function BlogPage() {
    const dbPosts = await getAllBlogPosts();
    
    // Merge dbPosts with mockBlogPosts, preferring dbPosts if slugs overlap
    const allPosts: BlogSeoPost[] = [...dbPosts];
    
    // Add mock posts that don't exist in DB
    mockBlogPosts.forEach(mockPost => {
        if (!allPosts.find(p => p.slug === mockPost.slug)) {
            allPosts.push(mockPost);
        }
    });

    return (
        <>
            <BlogContent initialPosts={allPosts} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "CollectionPage",
                                "@id": `${SITE_URL}/blog#webpage`,
                                url: `${SITE_URL}/blog`,
                                name: "Tax and Accounting Blog",
                                description: blogDescription,
                                isPartOf: { "@id": `${SITE_URL}/#website` },
                                about: [
                                    "Tax planning",
                                    "IRS compliance",
                                    "Bookkeeping",
                                    "Payroll",
                                    "Small business accounting",
                                ],
                            },
                            {
                                "@type": "Blog",
                                "@id": `${SITE_URL}/blog#blog`,
                                name: "IntegraFin Tax and Accounting Blog",
                                description: blogDescription,
                                url: `${SITE_URL}/blog`,
                                publisher: {
                                    "@type": "Organization",
                                    "@id": `${SITE_URL}/#organization`,
                                    name: "IntegraFin",
                                    logo: {
                                        "@type": "ImageObject",
                                        url: toAbsoluteUrl("/images/logo1.png"),
                                    },
                                },
                                blogPost: allPosts.map((post) => ({
                                    "@type": "BlogPosting",
                                    "@id": `${getBlogPostUrl(post.slug)}#article`,
                                    headline: post.title,
                                    description: getBlogPostDescription(post),
                                    image: [getBlogPostImage(post)],
                                    datePublished: getBlogPostPublishedIso(post),
                                    dateModified: getBlogPostModifiedIso(post),
                                    author: {
                                        "@type": "Organization",
                                        name: "IntegraFin Tax & Accounting Team",
                                    },
                                    mainEntityOfPage: getBlogPostUrl(post.slug),
                                })),
                            },
                            {
                                "@type": "ItemList",
                                "@id": `${SITE_URL}/blog#itemlist`,
                                name: "IntegraFin Tax Resources",
                                itemListElement: allPosts.map((post, index) => ({
                                    "@type": "ListItem",
                                    position: index + 1,
                                    url: getBlogPostUrl(post.slug),
                                    name: post.title,
                                })),
                            },
                            buildBreadcrumbJsonLd([
                                { name: "Home", item: `${SITE_URL}/` },
                                { name: "Blog", item: `${SITE_URL}/blog` },
                            ]),
                        ],
                    }),
                }}
            />
        </>
    );
}
