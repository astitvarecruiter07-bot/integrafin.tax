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
  { href: "/texas/irs-notice-help-katy-tx", label: "IRS notice help in Katy TX" },
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
  const displayPublishedDate = formatDisplayDate(publishedIso);
  const displayModifiedDate = formatDisplayDate(modifiedIso);
  const contentText = post.contentHtml ? stripHtml(post.contentHtml) : post.content?.join(" ") || "";
  const wordCount = contentText.split(/\s+/).filter(Boolean).length || undefined;
  const faqJsonLd = post.faq?.length
    ? {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <article className="bg-slate-50">
        <section className="relative overflow-hidden bg-[#003580] pt-28 pb-12 sm:pt-36 sm:pb-16">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#0092df 0.5px, transparent 0.5px)", backgroundSize: "30px 30px" }} />
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-300">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white">{post.category || "Tax Insight"}</span>
            </div>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] lg:items-center">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[#0092df]/40 bg-[#0092df]/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#7ddcff]">
                    {post.category || "Tax Insight"}
                  </span>
                  <span className="text-sm font-semibold text-slate-300">{post.date || displayPublishedDate}</span>
                  <span className="text-sm text-slate-400">&bull;</span>
                  <span className="text-sm font-semibold text-slate-300">{post.readTime || "5 min read"}</span>
                </div>

                <h1 className="mb-6 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
                  {post.title}
                </h1>

                <p className="max-w-3xl text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
                  {description}
                </p>

                <div className="mt-7 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span>By {authorName}</span>
                  <span>&bull;</span>
                  <span>Last reviewed: {displayModifiedDate}</span>
                </div>
              </div>

              <div className="relative min-h-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl shadow-slate-950/20 sm:min-h-[340px]">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={`${post.title} - IntegraFin tax and accounting guide`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 420px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[240px] items-center justify-center bg-white/10">
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">IntegraFin Guide</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 sm:py-16">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 lg:items-start">
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-10">
              <div className="prose prose-lg max-w-none">
                {post.contentHtml ? (
                  <div
                    className="text-foreground/80 leading-relaxed text-base blog-content-html"
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
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-[#003580]">Article Details</h2>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="font-bold text-slate-900">Reviewed by</dt>
                    <dd className="mt-1 text-slate-600">{authorName}</dd>
                  </div>
                  <div>
                    <dt className="font-bold text-slate-900">Last reviewed</dt>
                    <dd className="mt-1 text-slate-600">{displayModifiedDate}</dd>
                  </div>
                  {wordCount && (
                    <div>
                      <dt className="font-bold text-slate-900">Depth</dt>
                      <dd className="mt-1 text-slate-600">{wordCount.toLocaleString()} words</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="rounded-2xl bg-[#003580] p-6 text-white shadow-xl shadow-[#003580]/20">
                <h2 className="mb-3 text-xl font-black tracking-tight">Need a tax structure review?</h2>
                <p className="mb-5 text-sm font-medium leading-relaxed text-slate-200">
                  IntegraFin can review entity structure, bookkeeping readiness, payroll setup, and IRS compliance risk.
                </p>
                <Link href="/contact" className="inline-flex w-full items-center justify-center rounded-xl bg-[#0092df] px-5 py-3 text-xs font-black uppercase tracking-widest text-white transition-colors hover:bg-[#007bc0]">
                  Schedule Consultation
                </Link>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-bold text-foreground">Related Resources</h2>
                <p className="mb-5 text-sm leading-relaxed text-text-secondary">
                  Move from general guidance into service-specific next steps.
                </p>
                <div className="grid gap-3">
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
              </div>

              <Link href="/blog" className="inline-flex items-center text-primary font-medium hover:underline">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to Blog
              </Link>
            </aside>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white py-10 sm:py-14">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
                <h2 className="text-xl font-bold text-foreground mb-3">Reviewed for General Guidance</h2>
                <p className="text-text-secondary">
                  This article is prepared by the IntegraFin Tax & Accounting Team for general education. Tax rules can change and the right answer depends on your records, entity type, state, and filing history.
                </p>
              </div>
              <div className="rounded-2xl bg-accent-light p-5 text-center sm:p-7">
                <h2 className="text-xl font-bold text-foreground mb-3">Need Expert Financial Advice?</h2>
                <p className="text-text-secondary mb-5">IntegraFin&apos;s tax and accounting team can review your filing, bookkeeping, payroll, or IRS compliance question.</p>
                <Link href="/contact" className="inline-flex items-center px-7 py-3 bg-accent-dark text-white font-semibold rounded-full hover:bg-primary transition-colors">
                  Schedule a Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
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
              ...(faqJsonLd ? [faqJsonLd] : []),
            ],
          }),
        }}
      />
    </>
  );
}
