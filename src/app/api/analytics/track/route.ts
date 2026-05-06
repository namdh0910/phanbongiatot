import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Analytics from '@/lib/models/Analytics';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const body = await request.json();
    const { type, path, metadata } = body;

    // Lấy IP cơ bản (tùy chọn)
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    const event = await Analytics.create({
      type,
      path,
      metadata,
      ip
    });

    return NextResponse.json({ success: true, id: event._id });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
