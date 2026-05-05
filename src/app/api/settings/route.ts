import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Settings from '@/lib/models/Settings';

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
    
    let settings = await Settings.findOne();
    if (settings) {
      settings = await Settings.findOneAndUpdate({}, data, { new: true });
    } else {
      settings = await Settings.create(data);
    }
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
