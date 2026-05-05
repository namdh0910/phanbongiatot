import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Settings from '@/lib/models/Settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    let settings = await Settings.findOne();
    
    // Nếu chưa có settings, tạo bản ghi mặc định
    if (!settings) {
      settings = await Settings.create({});
    }
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const settings = await Settings.findOneAndUpdate({}, data, { 
      upsert: true, 
      new: true,
      setDefaultsOnInsert: true 
    });
    
    // revalidate all paths since settings affect global layout
    const { revalidatePath } = require('next/cache');
    revalidatePath('/', 'layout');
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
