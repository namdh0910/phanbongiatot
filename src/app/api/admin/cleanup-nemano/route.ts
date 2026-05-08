import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await dbConnect();
    
    // We want to keep ONLY ONE Nemano product.
    // Based on user feedback, we will keep 'phan-bon-phong-ngua-tuyen-trung-nemano-7010'
    // and delete the others.
    
    const toKeep = 'phan-bon-phong-ngua-tuyen-trung-nemano-7010';
    
    const result = await Product.deleteMany({
      name: /Nemano/i,
      slug: { $ne: toKeep }
    });

    return NextResponse.json({ 
      message: 'Cleanup successful', 
      deletedCount: result.deletedCount,
      kept: toKeep
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
