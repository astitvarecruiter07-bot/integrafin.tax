export const SITE_URL = "https://integrafin.tax";
export const DEFAULT_BLOG_IMAGE = "/og-image.jpg";

export type BlogSeoPost = {
  slug: string;
  title: string;
  excerpt?: string;
  category?: string;
  date?: string;
  readTime?: string;
  content?: string[];
  contentHtml?: string;
  featured?: boolean;
  image?: string;
  author?: {
    name?: string;
    image?: string;
  };
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

export function toAbsoluteUrl(path = DEFAULT_BLOG_IMAGE) {
  try {
    return new URL(path, SITE_URL).toString();
  } catch {
    return new URL(DEFAULT_BLOG_IMAGE, SITE_URL).toString();
  }
}

export function getBlogPostUrl(slug: string) {
  return `${SITE_URL}/blog/${slug}`;
}

export function getBlogPostImage(post: BlogSeoPost) {
  return toAbsoluteUrl(post.image || DEFAULT_BLOG_IMAGE);
}

export function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncateForMeta(value: string, maxLength = 158) {
  const cleanValue = value.replace(/\s+/g, " ").trim();

  if (cleanValue.length <= maxLength) {
    return cleanValue;
  }

  return `${cleanValue.slice(0, maxLength - 3).replace(/[\s,.;:-]+$/g, "")}...`;
}

export function getBlogPostDescription(post: BlogSeoPost, maxLength = 158) {
  return truncateForMeta(
    post.excerpt || post.content?.[0] || stripHtml(post.contentHtml) || "Practical tax and accounting guidance from IntegraFin.",
    maxLength,
  );
}

export function toIsoDate(value?: string | Date) {
  if (!value) {
    return new Date().toISOString();
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString();
  }

  return date.toISOString();
}

export function getBlogPostPublishedIso(post: BlogSeoPost) {
  return toIsoDate(post.date || post.createdAt);
}

export function getBlogPostModifiedIso(post: BlogSeoPost) {
  return toIsoDate(post.updatedAt || post.date || post.createdAt);
}

export function getBlogPostAuthor(post: BlogSeoPost) {
  return post.author?.name || "IntegraFin Tax & Accounting Team";
}

export function formatBlogPostTitle(title: string) {
  const suffix = " | IntegraFin";
  const titled = `${title}${suffix}`;

  if (titled.length <= 60) {
    return titled;
  }

  return truncateForMeta(title, 60);
}

export function buildBlogPostKeywords(post: BlogSeoPost) {
  const keywords = [
    post.category,
    "tax planning",
    "tax preparation",
    "IRS compliance",
    "bookkeeping",
    "small business accounting",
    "IntegraFin",
  ];

  return Array.from(new Set(keywords.filter(Boolean))) as string[];
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; item: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}
