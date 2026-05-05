import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';

export async function GET(
  request: Request,
  context: any
) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params.id;
    
    // Check if it's a slug or ID
    const product = id.match(/^[0-9a-fA-F]{24}$/) 
      ? await Product.findById(id)
      : await Product.findOne({ slug: id });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  context: any
) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params.id;
    const body = await request.json();
    
    const product = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: any
) {
  try {
    await dbConnect();
    const params = await context.params;
    const id = params.id;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
