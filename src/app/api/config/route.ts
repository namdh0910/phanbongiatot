import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SiteConfig from '@/lib/models/SiteConfig';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const group = searchParams.get('group');
    
    const query = group ? { group } : {};
    const configs = await SiteConfig.find(query);
    
    return NextResponse.json({ configs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    
    if (Array.isArray(data)) {
      // Bulk update/upsert
      const operations = data.map(config => ({
        updateOne: {
          filter: { key: config.key },
          update: { $set: config },
          upsert: true
        }
      }));
      await SiteConfig.bulkWrite(operations);
      return NextResponse.json({ success: true });
    }
    
    const config = await SiteConfig.findOneAndUpdate(
      { key: data.key },
      { $set: data },
      { upsert: true, new: true }
    );
    
    return NextResponse.json({ success: true, config });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
