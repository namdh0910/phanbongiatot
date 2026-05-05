import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import productsData from '@/data/products.json';

export async function GET() {
  try {
    await dbConnect();

    for (const productData of productsData) {
      await Product.findOneAndUpdate(
        { slug: productData.slug },
        productData,
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ message: `Successfully seeded ${productsData.length} products` });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
