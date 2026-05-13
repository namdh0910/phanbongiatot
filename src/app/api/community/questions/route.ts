import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CommunityQuestion from '@/lib/models/CommunityQuestion';
import { sendTelegramMessage } from '@/lib/telegram';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    
    const query = { status: 'approved' } as any;
    if (category && category !== 'Tất cả') query.category = category;

    const questions = await CommunityQuestion.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({ success: true, data: questions });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { title, content, author, authorPhone, category } = body;

    if (!title || !content || !author) {
      return NextResponse.json({ success: false, error: 'Thiếu thông tin bắt buộc' }, { status: 400 });
    }

    const question = await CommunityQuestion.create({
      title,
      content,
      author,
      authorPhone,
      category: category || 'Chung',
      status: 'pending', // Yêu cầu kiểm duyệt trước khi hiện
    });

    // Thông báo Telegram cho Admin biết có câu hỏi mới
    const message = `❓ CÂU HỎI CỘNG ĐỒNG MỚI\n\n👤 Tác giả: ${author}\n📱 SĐT: ${authorPhone || 'N/A'}\n📌 Chủ đề: ${category || 'Chung'}\n\n📝 Tiêu đề: ${title}\n💬 Nội dung: ${content}\n\n⚠️ Câu hỏi đang chờ kiểm duyệt tại Admin Panel.`;
    await sendTelegramMessage(message);

    return NextResponse.json({ success: true, data: question });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
