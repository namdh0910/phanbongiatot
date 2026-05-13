import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Analytics from '@/lib/models/Analytics';
import { sendTelegramMessage } from '@/lib/telegram';

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

    // Gửi thông báo Telegram
    let message = `<b>🔔 PHÁT HIỆN TƯƠNG TÁC MỚI</b>\n\n`;
    message += `📍 <b>Sự kiện:</b> ${type.toUpperCase()}\n`;
    message += `🔗 <b>Trang:</b> ${path}\n`;
    message += `🌐 <b>IP:</b> ${ip}\n`;

    if (metadata) {
      message += `\n📝 <b>Chi tiết:</b>\n`;
      Object.entries(metadata).forEach(([key, value]) => {
        message += `- ${key}: ${JSON.stringify(value)}\n`;
      });
    }

    // Chỉ gửi thông báo Telegram cho các sự kiện quan trọng (Conversion Events)
    const highValueEvents = ['zalo_click', 'call_click', 'lead_submit', 'QuickBuy_Click', 'ViewPopup'];
    
    if (highValueEvents.includes(type)) {
      // Cần await để đảm bảo Vercel không ngắt tiến trình trước khi gửi xong
      await sendTelegramMessage(message);
    }

    return NextResponse.json({ success: true, id: event._id });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
