import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { getBlogPostBySlug as getMockBlogPostBySlug, mockBlogPosts } from "@/data/blogData";
import { getBlogPostBySlug as getDbBlogPostBySlug, getAllBlogPosts } from "@/app/actions/blog";
import {
  SITE_URL,
  buildBlogPostKeywords,
  buildBreadcrumbJsonLd,
  formatBlogPostTitle,
  getBlogPostAuthor,
  getBlogPostDescription,
  getBlogPostImage,
  getBlogPostModifiedIso,
  getBlogPostPublishedIso,
  getBlogPostUrl,
  stripHtml,
  toAbsoluteUrl,
} from "@/lib/seo/blog";

const relatedResourceLinks = [
  { href: "/services", label: "Tax and accounting services" },
  { href: "/texas-tax-accounting-services", label: "Texas tax and accounting services" },
  { href: "/new-york-tax-accounting-services", label: "New York tax and accounting services" },
  { href: "/pennsylvania-tax-accounting-services", label: "Pennsylvania tax and accounting services" },
  { href: "/tax-calculator", label: "Tax estimator" },
  { href: "/contact", label: "Talk to IntegraFin" },
];

function formatDisplayDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export async function generateStaticParams() {
  const dbPosts = await getAllBlogPosts();
  const slugs = new Set([
    ...mockBlogPosts.map((post) => post.slug),
    ...dbPosts.map((post) => post.slug),
  ]);

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getDbBlogPostBySlug(slug)) || getMockBlogPostBySlug(slug);
  if (!post) return { title: "Blog Post Not Found" };

  const description = getBlogPostDescription(post);
  const canonicalUrl = getBlogPostUrl(slug);
  const ogImage = getBlogPostImage(post);
  const title = formatBlogPostTitle(post.title);

  return {
    title,
    description,
    authors: [{ name: getBlogPostAuthor(post) }],
    category: post.category,
    keywords: buildBlogPostKeywords(post),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      publishedTime: getBlogPostPublishedIso(post),
      modifiedTime: getBlogPostModifiedIso(post),
      authors: [getBlogPostAuthor(post)],
      section: post.category,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${post.title} - IntegraFin tax guide`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
        <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
      </div>
    );
  }

  const description = getBlogPostDescription(post, 220);
  const authorName = getBlogPostAuthor(post);
  const canonicalUrl = getBlogPostUrl(slug);
  const imageUrl = getBlogPostImage(post);
  const publishedIso = getBlogPostPublishedIso(post);
  const modifiedIso = getBlogPostModifiedIso(post);
  const displayModifiedDate = formatDisplayDate(modifiedIso);
  const contentText = post.contentHtml ? stripHtml(post.contentHtml) : post.content?.join(" ") || "";
  const wordCount = contentText.split(/\s+/).filter(Boolean).length || undefined;

  return (
    <>
      <article className="pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground">{post.title}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-accent-light text-accent-dark">
              {post.category || "Tax Insight"}
            </span>
            <span className="text-sm text-text-secondary">{post.date || displayModifiedDate}</span>
            <span className="text-sm text-text-secondary">&bull;</span>
            <span className="text-sm text-text-secondary">{post.readTime || "5 min read"}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6 sm:mb-8 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg text-text-secondary leading-relaxed mb-5">
            {description}
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-text-secondary mb-8">
            <span>By {authorName}</span>
            <span>&bull;</span>
            <span>Last reviewed: {displayModifiedDate}</span>
          </div>

          <div className="w-full h-48 sm:h-64 md:h-80 rounded-2xl bg-gradient-to-br from-accent-light to-lavender mb-8 sm:mb-10 flex items-center justify-center overflow-hidden relative">
            {post.image ? (
              <Image
                src={post.image}
                alt={`${post.title} - IntegraFin tax and accounting guide`}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            ) : (
              <svg className="w-16 h-16 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            )}
          </div>

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

          <section className="mt-10 sm:mt-12 p-5 sm:p-8 bg-white border border-slate-200 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground mb-3">Related Tax and Accounting Resources</h2>
            <p className="text-text-secondary mb-5">
              Use these resources to move from general guidance into service-specific next steps for your business, tax filing, or IRS issue.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedResourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-primary hover:border-primary hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-6 p-5 sm:p-8 bg-slate-50 border border-slate-200 rounded-2xl">
            <h2 className="text-xl font-bold text-foreground mb-3">Reviewed for General Guidance</h2>
            <p className="text-text-secondary">
              This article is prepared by the IntegraFin Tax & Accounting Team for general education. Tax rules can change and the right answer depends on your records, entity type, state, and filing history.
            </p>
          </section>

          <div className="mt-10 sm:mt-12 p-5 sm:p-8 bg-accent-light rounded-2xl text-center">
            <h3 className="text-xl font-bold text-foreground mb-3">Need Expert Financial Advice?</h3>
            <p className="text-text-secondary mb-5">IntegraFin&apos;s tax and accounting team can review your filing, bookkeeping, payroll, or IRS compliance question.</p>
            <Link href="/contact" className="inline-flex items-center px-7 py-3 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors">
              Schedule a Free Consultation
            </Link>
          </div>

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "@id": `${canonicalUrl}#article`,
                headline: post.title,
                description,
                image: [imageUrl],
                datePublished: publishedIso,
                dateModified: modifiedIso,
                articleSection: post.category || "Tax Insight",
                wordCount,
                author: {
                  "@type": "Organization",
                  name: authorName,
                  url: `${SITE_URL}/about`,
                },
                publisher: {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "IntegraFin",
                  logo: {
                    "@type": "ImageObject",
                    url: toAbsoluteUrl("/images/logo1.png"),
                  },
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": canonicalUrl,
                },
              },
              buildBreadcrumbJsonLd([
                { name: "Home", item: `${SITE_URL}/` },
                { name: "Blog", item: `${SITE_URL}/blog` },
                { name: post.title, item: canonicalUrl },
              ]),
            ],
          }),
        }}
      />
    </>
  );
}
