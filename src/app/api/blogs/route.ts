import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { generateHashtags, generateSEODescription } from '@/utils/seo';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
  try {
    await dbConnect();
    // Admin should see all blogs (published and drafts)
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await request.json();
    
    // Simple validation
    if (!body.title || !body.content) {
      return NextResponse.json({ error: 'Missing required fields (Title or Content)' }, { status: 400 });
    }

    // Server-side content cleaning (Anchor removal & space normalization)
    body.content = body.content
      .replace(/\{#[\w-]+\}/g, '') // Remove {#anchor}
      .replace(/\s{2,}/g, ' ') // Normalize spaces
      .trim();

    // Auto-generate SEO metadata if not provided
    if (!body.hashtags || body.hashtags.length === 0) {
      body.hashtags = generateHashtags(body.title, body.content);
    }
    if (!body.seoDescription) {
      body.seoDescription = generateSEODescription(body.content);
    }

    const blog = await Blog.create(body);
    
    // On-demand revalidation
    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    
    return NextResponse.json({ blog }, { status: 201 });
  } catch (error: any) {
    console.error('Blog save error:', error);
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug/Title already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
