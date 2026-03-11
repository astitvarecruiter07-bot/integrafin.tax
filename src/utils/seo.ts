import DOMPurify from 'isomorphic-dompurify';

export interface Author {
    name: string;
    url?: string;
}

export interface BlogPayload {
    title: string;
    description: string;
    slug: string;
    publishDate: string;
    author: Author;
    contentHtml: string;
}

/**
 * Sanitizes the given HTML string to prevent XSS attacks.
 * Uses isomorphic-dompurify to work correctly on both server and client.
 */
export function sanitizeHtml(html: string): string {
    return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'b', 'i', 'strong', 'em', 'strike',
            'a', 'ul', 'ol', 'li', 'blockquote', 'img', 'figure', 'figcaption', 'span', 'div'
        ],
        ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'src', 'alt', 'class', 'style']
    });
}

/**
 * Generates JSON-LD structured data for a Blog Posting.
 * This should be output in the <head> of the generated blog post.
 */
export function generateBlogJsonLd(payload: BlogPayload) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: payload.title,
        description: payload.description,
        datePublished: payload.publishDate,
        author: {
            '@type': 'Person',
            name: payload.author.name,
            ...(payload.author.url ? { url: payload.author.url } : {})
        },
        // In a real app, this would be the actual site URL + blog path
        url: `https://integrafin.tax/blog/${payload.slug}`,
    };
}
