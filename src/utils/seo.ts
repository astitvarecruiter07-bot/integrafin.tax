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

const ALLOWED_ATTRS = new Set(['href', 'title', 'target', 'rel', 'src', 'alt', 'class']);
const URI_ATTRS = new Set(['href', 'src']);
const ALLOWED_URI = /^(?:(?:https?|mailto|tel):|\/|#)/i;

function escapeAttribute(value: string) {
    return value
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function sanitizeAttributes(rawAttributes: string) {
    const attributes: string[] = [];
    const attrPattern = /([a-zA-Z0-9:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let match: RegExpExecArray | null;

    while ((match = attrPattern.exec(rawAttributes)) !== null) {
        const name = match[1].toLowerCase();
        const value = match[2] ?? match[3] ?? match[4] ?? '';

        if (!ALLOWED_ATTRS.has(name) || name.startsWith('on')) {
            continue;
        }

        if (URI_ATTRS.has(name) && value && !ALLOWED_URI.test(value.trim())) {
            continue;
        }

        if (name === 'target' && value !== '_blank') {
            continue;
        }

        attributes.push(`${name}="${escapeAttribute(value)}"`);
    }

    return attributes.length ? ` ${attributes.join(' ')}` : '';
}

/**
 * Sanitizes the given HTML string to prevent XSS attacks.
 * Keeps a strict tag and attribute whitelist without loading browser-only DOM libraries.
 */
export function sanitizeHtml(html: string): string {
    return html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/<(script|style|iframe|object|embed|form|input|button|textarea|select|option|meta|link|base)[^>]*>[\s\S]*?<\/\1>/gi, '')
        .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (tag, tagName: string, rawAttributes: string) => {
            const normalizedTag = tagName.toLowerCase();

            if (!ALLOWED_TAGS.has(normalizedTag)) {
                return '';
            }

            if (tag.startsWith('</')) {
                return `</${normalizedTag}>`;
            }

            const isSelfClosing = tag.endsWith('/>') || normalizedTag === 'br' || normalizedTag === 'img';
            const attributes = sanitizeAttributes(rawAttributes);
            return `<${normalizedTag}${attributes}${isSelfClosing ? ' />' : '>'}`;
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
