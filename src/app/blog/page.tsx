import type { Metadata } from "next";
import { getAllBlogPosts } from "@/data/blogData";
import BlogContent from "./BlogContent";

export const metadata = {
  title: 'Tax Tips & Accounting Insights | IntegraFin Blog',
  description: 'Stay updated with tax tips, IRS news, and accounting strategies from IntegraFin\'s tax expert team in Katy TX. Expert financial insights for businesses and individuals.',
  alternates: { canonical: 'https://integrafin.tax/blog' },
  openGraph: {
    title: 'Tax Tips & Accounting Insights | IntegraFin Blog',
    url: 'https://integrafin.tax/blog',
  },
};

export default function BlogPage() {
    const blogPosts = getAllBlogPosts();

    return (
        <>
            <BlogContent initialPosts={blogPosts} />

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
