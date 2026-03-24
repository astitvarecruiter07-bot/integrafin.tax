import { MetadataRoute } from 'next';
import { getAllBlogPosts } from '@/data/blogData';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://integrafin.tax';

  const routes = [
    '',
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/case-study',
    '/tax-calculator',
    '/privacy',
    '/terms',
  ];

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogPosts = getAllBlogPosts();
  const blogEntries = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
