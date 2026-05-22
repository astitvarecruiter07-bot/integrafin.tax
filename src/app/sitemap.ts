import { MetadataRoute } from 'next';
import { mockBlogPosts } from '@/data/blogData';
import { getAllBlogPosts as getDbBlogPosts } from '@/app/actions/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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

  const dbPosts = await getDbBlogPosts();
  const blogPosts = [...dbPosts];
  mockBlogPosts.forEach((mockPost) => {
    if (!blogPosts.find((p) => p.slug === mockPost.slug)) {
      blogPosts.push(mockPost);
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
