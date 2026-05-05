import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/lib/models/Lead';
import { verifyAdmin } from '@/lib/auth';

export const dynamic = 'force-dynamic';

async function sendTelegramNotification(lead: any) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram configuration missing. Skipping notification.');
    return;
  }

  const message = `🚨 CÓ CA BỆNH CỨU CÂY!
- Nông dân: ${lead.name}
- SĐT: \`${lead.phone}\`
- Cây trồng: ${lead.cropType || 'Chưa rõ'}
- Triệu chứng: ${lead.symptoms || lead.pathology || 'Cần tư vấn'}
- Mức độ: ${lead.urgency?.toUpperCase() || 'TRUNG BÌNH'}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'MarkdownV2'
      }),
    });
  } catch (error) {
    console.error('Failed to send Telegram notification:', error);
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    if (!data.name || !data.phone) {
      return NextResponse.json({ error: 'Tên và số điện thoại là bắt buộc' }, { status: 400 });
    }
    
    const lead = await Lead.create({
      ...data,
      source: data.source || 'website_lead_form',
      status: 'pending'
    });
    
    // Gửi thông báo Telegram
    await sendTelegramNotification(lead);
    
    return NextResponse.json({ success: true, lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const leads = await Lead.find().sort({ createdAt: -1 });
    return NextResponse.json(leads);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
