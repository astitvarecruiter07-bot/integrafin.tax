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

const ALLOWED_TAGS = new Set([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'b', 'i', 'strong', 'em', 'strike',
    'a', 'ul', 'ol', 'li', 'blockquote', 'img', 'figure', 'figcaption', 'span', 'div',
]);

const ALLOWED_ATTRS = new Set(['href', 'title', 'src', 'alt', 'class']);
const ALLOWED_URI = /^(?:(?:https?|mailto|tel):|\/|#)/i;
const safeNewTabLinks = new WeakMap<Node, string>();

DOMPurify.addHook('beforeSanitizeAttributes', (node) => {
    if (node.nodeType !== 1) return;
    const element = node as Element;

    if (element.tagName.toLowerCase() !== 'a' || element.getAttribute('target') !== '_blank') {
        return;
    }

    const safeRel = (element.getAttribute('rel') || '')
        .split(/\s+/)
        .filter((value) => ['nofollow', 'sponsored', 'ugc'].includes(value.toLowerCase()))
        .map((value) => value.toLowerCase());

    safeNewTabLinks.set(
        node,
        Array.from(new Set([...safeRel, 'noopener', 'noreferrer'])).join(' '),
    );
});

DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if (node.nodeType !== 1) return;
    const element = node as Element;
    const rel = safeNewTabLinks.get(node);
    safeNewTabLinks.delete(node);

    if (element.tagName.toLowerCase() === 'a' && rel) {
        element.setAttribute('target', '_blank');
        element.setAttribute('rel', rel);
    }
});

/**
 * Sanitizes the given HTML string to prevent XSS attacks.
 * Uses a real HTML parser so malformed markup and mutation-XSS payloads cannot
 * bypass the tag and attribute allowlists.
 */
export function sanitizeHtml(html: string): string {
    const clean = String(DOMPurify.sanitize(html, {
        ALLOWED_TAGS: Array.from(ALLOWED_TAGS),
        ALLOWED_ATTR: Array.from(ALLOWED_ATTRS),
        ALLOWED_URI_REGEXP: ALLOWED_URI,
        ALLOW_DATA_ATTR: false,
        ALLOW_ARIA_ATTR: false,
        FORBID_TAGS: ['svg', 'math', 'template'],
    }));

    return clean;
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
