'use server';

import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { revalidatePath } from 'next/cache';
import { sanitizeHtml } from '@/utils/seo';
import { requireAdminAuth } from '@/lib/adminAuth';

const SafeImageUrlSchema = z.string().trim().max(2000).refine((value) => {
  if (!value) return true;
  if (value.startsWith('/') && !value.startsWith('//')) return true;

  try {
    const url = new URL(value);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}, 'Use an HTTPS image URL or a site-relative image path.');

const BlogPostPayloadSchema = z.object({
  title: z.string().trim().min(1).max(180),
  slug: z.string().trim().min(1).max(120).regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    'The slug may contain lowercase letters, numbers, and single hyphens only.',
  ),
  excerpt: z.string().trim().min(1).max(500),
  category: z.string().trim().min(1).max(80).optional(),
  contentHtml: z.string().min(1).max(500_000),
  image: SafeImageUrlSchema.optional(),
  featured: z.boolean().optional(),
  author: z.object({
    name: z.string().trim().min(1).max(120),
    image: SafeImageUrlSchema.optional(),
  }).strict().optional(),
}).strict();

const BlogSlugSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120);

export type DbBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content?: string[];
  contentHtml?: string;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  author?: { name: string; image?: string };
  createdAt?: string;
  updatedAt?: string;
  keywords?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
};

export async function saveBlogPost(payload: {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  contentHtml: string;
  image?: string;
  featured?: boolean;
  author?: { name: string; image?: string };
}) {
  try {
    await requireAdminAuth();
    const validatedPayload = BlogPostPayloadSchema.parse(payload);
    await dbConnect();

    const { slug } = validatedPayload;
    const sanitizedPayload = {
      ...validatedPayload,
      contentHtml: sanitizeHtml(validatedPayload.contentHtml),
    };

    // Update if exists, otherwise create
    const blogPost = await BlogPost.findOneAndUpdate(
      { slug },
      { 
        ...sanitizedPayload,
        updatedAt: new Date()
      },
      { new: true, upsert: true }
    );

    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);

    return { success: true, data: JSON.parse(JSON.stringify(blogPost)) };
  } catch (error) {
    console.error('Error saving blog post:', {
      error: error instanceof Error ? error.name : 'UnknownError',
    });
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Invalid blog post.' };
    }
    return { success: false, error: 'Failed to save blog post.' };
  }
}

export async function getAllBlogPosts(): Promise<DbBlogPost[]> {
  try {
    await dbConnect();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(posts)) as DbBlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string): Promise<DbBlogPost | null> {
  try {
    const safeSlug = BlogSlugSchema.safeParse(slug);
    if (!safeSlug.success) return null;

    await dbConnect();
    const post = await BlogPost.findOne({ slug: safeSlug.data });
    return post ? (JSON.parse(JSON.stringify(post)) as DbBlogPost) : null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}
