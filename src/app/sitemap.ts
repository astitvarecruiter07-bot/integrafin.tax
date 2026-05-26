import { MetadataRoute } from 'next';
import { mockBlogPosts } from '@/data/blogData';
import { getAllBlogPosts as getDbBlogPosts } from '@/app/actions/blog';

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://integrafin.tax';

  const routes = [
    '',
    '/about',
    '/services',
    '/texas-tax-accounting-services',
    '/texas/houston-tax-accountant',
    '/texas/dallas-tax-accountant',
    '/new-york-tax-accounting-services',
    '/new-york/nyc-tax-accountant',
    '/new-york/buffalo-tax-accountant',
    '/pennsylvania-tax-accounting-services',
    '/pennsylvania/philadelphia-tax-accountant',
    '/pennsylvania/pittsburgh-tax-accountant',
    '/contact',
    '/blog',
    '/case-study',
    '/tax-calculator',
    '/privacy',
    '/terms',
    '/site-map',
  ];

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogPosts = [...mockBlogPosts];

  const dbPosts = await getDbBlogPosts();
  dbPosts.forEach((dbPost) => {
    if (!blogPosts.find((p) => p.slug === dbPost.slug)) {
      blogPosts.push(dbPost);
    }
  });

  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
