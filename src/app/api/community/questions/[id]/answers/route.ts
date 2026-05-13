import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import CommunityQuestion from '@/lib/models/CommunityQuestion';
import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const { content, author } = body;

    if (!content || !author) {
      return NextResponse.json({ success: false, error: 'Thiếu nội dung hoặc tên người trả lời' }, { status: 400 });
    }

    const question = await CommunityQuestion.findById(id);
    if (!question) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy câu hỏi' }, { status: 404 });
    }

    // Thêm câu trả lời vào mảng answers
    question.answers.push({
      content,
      author,
      authorRole: 'user', // Mặc định là user, admin có thể sửa trong CMS
      createdAt: new Date()
    });

    await question.save();

    // Thông báo Telegram cho Admin
    const message = `💬 CÓ BÌNH LUẬN/TRẢ LỜI MỚI\n\n👤 Người trả lời: ${author}\n📍 Tại câu hỏi: ${question.title}\n\n📝 Nội dung: ${content}`;
    await sendTelegramMessage(message);

    return NextResponse.json({ success: true, data: question });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
