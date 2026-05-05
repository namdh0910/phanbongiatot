import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const query = searchParams.get('q');
    
    let filter: any = {};
    if (category) {
      filter.category = category;
    }
    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ];
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
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
    
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Name and Slug are required' }, { status: 400 });
    }

    if (!body.id) {
      body.id = `PROD-${Date.now()}`;
    }
    
    const product = await Product.create(body);
    
    // On-demand revalidation
    revalidatePath('/danh-muc/[slug]', 'page');
    revalidatePath(`/san-pham/${product.slug}`);
    revalidatePath('/');
    
    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'Slug/ID already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
