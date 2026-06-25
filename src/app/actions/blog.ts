'use server';

import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { revalidatePath } from 'next/cache';
import { sanitizeHtml } from '@/utils/seo';
import { requireAdminAuth } from '@/lib/adminAuth';

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
    await dbConnect();

    const { slug } = payload;
    const sanitizedPayload = {
      ...payload,
      contentHtml: sanitizeHtml(payload.contentHtml),
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
    console.error('Error saving blog post:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to save blog post' };
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
    await dbConnect();
    const post = await BlogPost.findOne({ slug });
    return post ? (JSON.parse(JSON.stringify(post)) as DbBlogPost) : null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}
