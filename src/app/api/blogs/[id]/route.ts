import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const blog = await Blog.findById(params.id);
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const body = await request.json();
    const blog = await Blog.findByIdAndUpdate(params.id, body, { new: true });
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    return NextResponse.json({ blog });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(params.id);
    if (!blog) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
