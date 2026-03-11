import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/data/blogData";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Read the latest tax tips, financial insights, and accounting best practices from IntegraFin's expert team of CPAs and financial advisors.",
    openGraph: {
        title: "Blog | IntegraFin",
        description: "Tax tips, financial insights, and accounting best practices from IntegraFin.",
        url: "https://integrafin.tax/blog",
    },
};

const blogPosts = getAllBlogPosts();

const categoryColors: Record<string, string> = {
    "Tax Planning": "bg-blue-100 text-blue-700",
    Accounting: "bg-green-100 text-green-700",
    Compliance: "bg-purple-100 text-purple-700",
    "Tax Resolution": "bg-orange-100 text-orange-700",
    Payroll: "bg-pink-100 text-pink-700",
    "Business Advisory": "bg-teal-100 text-teal-700",
};

export default function BlogPage() {
    return (
        <>
            <PageHeader
                title="Our Latest Blog"
                breadcrumb="Blog"
                description="Stay informed with the latest tax tips, financial insights, and industry updates from our expert team."
            />

            {/* ========== BLOG GRID ========== */}
            <section className="section-padding">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post) => (
                            <article
                                key={post.slug}
                                className="bg-white border border-gray-100 rounded-2xl overflow-hidden card-hover shadow-sm group"
                            >
                                {/* Image placeholder */}
                                <div className="h-48 bg-gradient-to-br from-accent-light to-lavender relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="w-12 h-12 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                    <div className="absolute top-4 left-4">
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || "bg-gray-100 text-gray-700"}`}>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h2 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                                        {post.title}
                                    </h2>
                                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                        {post.excerpt}
                                    </p>
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="inline-flex items-center text-sm font-semibold text-accent-dark hover:text-primary transition-colors"
                                    >
                                        Learn more
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Blog",
                        name: "IntegraFin Blog",
                        description: "Tax tips, financial insights, and accounting best practices from IntegraFin.",
                        url: "https://integrafin.tax/blog",
                        publisher: {
                            "@type": "Organization",
                            name: "IntegraFin LLC",
                            logo: { "@type": "ImageObject", url: "https://integrafin.tax/logo.png" },
                        },
                        blogPost: blogPosts.map((post) => ({
                            "@type": "BlogPosting",
                            headline: post.title,
                            description: post.excerpt,
                            datePublished: post.date,
                            author: { "@type": "Organization", name: "IntegraFin LLC" },
                            publisher: { "@type": "Organization", name: "IntegraFin LLC" },
                        })),
                    }),
                }}
            />
        </>
    );
}
