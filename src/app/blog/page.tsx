import type { Metadata } from "next";
import { mockBlogPosts } from "@/data/blogData";
import { getAllBlogPosts } from "@/app/actions/blog";
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

export default async function BlogPage() {
    const dbPosts = await getAllBlogPosts();
    
    // Merge dbPosts with mockBlogPosts, preferring dbPosts if slugs overlap
    const allPosts = [...dbPosts];
    
    // Add mock posts that don't exist in DB
    mockBlogPosts.forEach(mockPost => {
        if (!allPosts.find(p => p.slug === mockPost.slug)) {
            allPosts.push(mockPost);
        }
    });

    return (
        <>
            <BlogContent initialPosts={allPosts} />

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
                            logo: { "@type": "ImageObject", url: "https://integrafin.tax/logo.svg" },
                        },
                        blogPost: allPosts.map((post) => ({
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
