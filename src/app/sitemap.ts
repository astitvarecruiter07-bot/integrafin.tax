import { MetadataRoute } from 'next';
import { mockBlogPosts } from '@/data/blogData';
import { getAllBlogPosts as getDbBlogPosts } from '@/app/actions/blog';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://integrafin.tax';

  const routes = [
    { path: '', lastModified: '2026-06-05', priority: 1.0 },
    { path: '/about', lastModified: '2026-06-05', priority: 0.8 },
    { path: '/services', lastModified: '2026-06-05', priority: 0.8 },
    { path: '/industries', lastModified: '2026-06-05', priority: 0.8 },
    { path: '/texas-tax-accounting-services', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/texas/houston-tax-accountant', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/texas/dallas-tax-accountant', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/new-york-tax-accounting-services', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/new-york/nyc-tax-accountant', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/new-york/buffalo-tax-accountant', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/pennsylvania-tax-accounting-services', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/pennsylvania/philadelphia-tax-accountant', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/pennsylvania/pittsburgh-tax-accountant', lastModified: '2026-05-23', priority: 0.8 },
    { path: '/contact', lastModified: '2026-06-05', priority: 0.8 },
    { path: '/blog', lastModified: '2026-06-05', priority: 0.8 },
    { path: '/case-study', lastModified: '2026-06-05', priority: 0.8 },
    { path: '/tax-calculator', lastModified: '2026-06-05', priority: 0.8 },
    { path: '/privacy', lastModified: '2026-03-24', priority: 0.5 },
    { path: '/terms', lastModified: '2026-03-24', priority: 0.5 },
    { path: '/site-map', lastModified: '2026-06-05', priority: 0.5 },
  ];

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: 'monthly' as const,
    priority: route.priority,
  }));

  const blogPosts = [...mockBlogPosts];

  const dbPosts = await getDbBlogPosts();
  dbPosts.forEach((dbPost) => {
    if (!blogPosts.find((p) => p.slug === dbPost.slug)) {
      blogPosts.push(dbPost);
    }
  });

  const blogEntries = blogPosts.map((post) => {
    const updatedAt =
      'updatedAt' in post && typeof post.updatedAt === 'string'
        ? post.updatedAt
        : undefined;

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: updatedAt ? new Date(updatedAt) : new Date(post.date || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });

  return [...staticEntries, ...blogEntries];
}
