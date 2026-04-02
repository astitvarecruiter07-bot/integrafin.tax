import type { Metadata } from "next";
import Link from "next/link";

import { mockBlogPosts, getBlogPostBySlug as getMockBlogPostBySlug } from "@/data/blogData";
import { getBlogPostBySlug as getDbBlogPostBySlug, getAllBlogPosts } from "@/app/actions/blog";

export async function generateStaticParams() {
    return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const post = (await getDbBlogPostBySlug(slug)) || getMockBlogPostBySlug(slug);
    if (!post) return { title: "Blog Post Not Found" };

    const description = post.contentHtml 
        ? post.excerpt 
        : (post.content?.[0]?.substring(0, 160) || post.excerpt);

    return {
        title: post.title,
        description: description,
        openGraph: {
            title: `${post.title} | IntegraFin Blog`,
            description: description,
            url: `https://integrafin.tax/blog/${slug}`,
            type: "article",
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = (await getDbBlogPostBySlug(slug)) || getMockBlogPostBySlug(slug);

    if (!post) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h1 className="text-4xl font-bold text-foreground mb-4">Post Not Found</h1>
                <Link href="/blog" className="text-primary hover:underline">← Back to Blog</Link>
            </div>
        );
    }

    return (
        <>
            <article className="pt-32 pb-20">
                <div className="max-w-3xl mx-auto px-4 sm:px-6">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                        <span>/</span>
                        <span className="text-foreground">{post.title}</span>
                    </div>

                    {/* Category & Date */}
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-light text-accent-dark">
                            {post.category}
                        </span>
                        <span className="text-sm text-text-secondary">{post.date}</span>
                        <span className="text-sm text-text-secondary">•</span>
                        <span className="text-sm text-text-secondary">{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
                        {post.title}
                    </h1>

                    {/* Featured Image Placeholder */}
                    <div className="w-full h-48 sm:h-64 md:h-80 rounded-2xl bg-gradient-to-br from-accent-light to-lavender mb-8 sm:mb-10 flex items-center justify-center">
                        <svg className="w-16 h-16 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none">
                        {post.contentHtml ? (
                            <div 
                                className="text-foreground/80 leading-relaxed mb-6 text-base blog-content-html"
                                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                            />
                        ) : (
                            post.content?.map((paragraph: string, i: number) => (
                                <p key={i} className="text-foreground/80 leading-relaxed mb-6 text-base">
                                    {paragraph}
                                </p>
                            ))
                        )}
                    </div>

                    {/* CTA */}
                    <div className="mt-10 sm:mt-12 p-5 sm:p-8 bg-accent-light rounded-2xl text-center">
                        <h3 className="text-xl font-bold text-foreground mb-3">
                            Need Expert Financial Advice?
                        </h3>
                        <p className="text-text-secondary mb-5">
                            IntegraFin&apos;s team of tax and financial experts is here to help.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-7 py-3 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors"
                        >
                            Schedule a Free Consultation
                        </Link>
                    </div>

                    {/* Back to Blog */}
                    <div className="mt-10">
                        <Link href="/blog" className="inline-flex items-center text-primary font-medium hover:underline">
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </article>

            {/* BlogPosting Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.title,
                        datePublished: post.date,
                        author: { "@type": "Organization", name: "IntegraFin LLC" },
                        publisher: {
                            "@type": "Organization",
                            name: "IntegraFin LLC",
                            logo: { "@type": "ImageObject", url: "https://integrafin.tax/logo.png" },
                        },
                        description: post.excerpt || (post.content?.[0]?.substring(0, 160)),
                        mainEntityOfPage: `https://integrafin.tax/blog/${slug}`,
                    }),
                }}
            />
        </>
    );
}
