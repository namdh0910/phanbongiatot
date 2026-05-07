
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';

export async function GET() {
  try {
    await dbConnect();

    const slug = "xu-ly-vang-la-cay-ca-phe-nguyen-nhan-cach-chua-va-phong-ngua-hieu-qua";
    const blog = await Blog.findOne({ slug });

    if (!blog) return NextResponse.json({ error: "Không tìm thấy bài viết" }, { status: 404 });

    // Cố gắng tìm và thay thế cụm tiêu đề lỗi bằng cấu trúc 3 cột chuẩn
    let newContent = blog.content.replace(
      /Câu hỏi quan sát Đặc điểm Nguyên nhân nghi ngờ/g,
      `</th><th style="padding: 15px 20px; text-align: left;">Đặc điểm</th><th style="padding: 15px 20px; text-align: left;">Nguyên nhân nghi ngờ`
    );

    // Xử lý trường hợp nó nằm trong thẻ td thay vì th
    if (newContent === blog.content) {
       // Manual string manipulation as a backup
       newContent = blog.content.replace("Câu hỏi quan sát Đặc điểm Nguyên nhân nghi ngờ", "Câu hỏi quan sát</td><td>Đặc điểm</td><td>Nguyên nhân nghi ngờ");
    }

    blog.content = newContent;
    await blog.save();

    return NextResponse.json({ message: "✅ Đã sửa lỗi tiêu đề bảng thành công!" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
