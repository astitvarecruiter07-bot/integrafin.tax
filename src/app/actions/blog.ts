'use server';

import dbConnect from '@/lib/mongodb';
import BlogPost from '@/models/BlogPost';
import { revalidatePath } from 'next/cache';

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
    await dbConnect();

    const { slug } = payload;

    // Update if exists, otherwise create
    const blogPost = await BlogPost.findOneAndUpdate(
      { slug },
      { 
        ...payload,
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

export async function getAllBlogPosts() {
  try {
    await dbConnect();
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    await dbConnect();
    const post = await BlogPost.findOne({ slug });
    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}
