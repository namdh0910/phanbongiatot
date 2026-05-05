import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/lib/models/Lead';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Validation cơ bản
    if (!data.name || !data.phone) {
      return NextResponse.json({ error: 'Tên và số điện thoại là bắt buộc' }, { status: 400 });
    }
    
    const lead = await Lead.create({
      ...data,
      source: data.source || 'website_lead_form',
      status: 'pending'
    });
    
    // TODO: Chuẩn bị gửi thông báo về Telegram/Email cho kỹ sư tại đây
    console.log(`[New Lead] ${lead.name} - ${lead.phone} - ${lead.cropType}`);
    
    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  // Chỉ dùng cho Admin kiểm tra lead (nếu cần sau này)
  try {
    await dbConnect();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
