import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import { verifyAdmin } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await dbConnect();
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const body = await request.json();
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    
    // On-demand revalidation
    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    
    // On-demand revalidation
    revalidatePath('/blog');
    revalidatePath(`/blog/${blog.slug}`);
    
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
