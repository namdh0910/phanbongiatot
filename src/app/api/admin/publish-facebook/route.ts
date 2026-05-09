import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/lib/models/Blog';
import connectDB from '@/lib/mongodb';

// Auth guard
async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('adminToken')?.value;
  if (!token) return false;
  try {
    const { jwtVerify } = await import('jose');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '');
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { blogId } = await req.json();
    if (!blogId) {
      return NextResponse.json({ success: false, error: 'Thiếu Blog ID' }, { status: 400 });
    }

    await connectDB();
    const blog = await Blog.findById(blogId);

    if (!blog || !blog.facebookPost) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy nội dung Facebook Post' }, { status: 404 });
    }

    const pageId = process.env.FB_PAGE_ID;
    const accessToken = process.env.FB_PAGE_ACCESS_TOKEN;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.phanbongiatot.com';

    if (!pageId || !accessToken) {
      return NextResponse.json({ success: false, error: 'Chưa cấu hình Facebook Page ID hoặc Access Token' }, { status: 500 });
    }

    // Ghép nội dung bài đăng
    const message = `${blog.facebookPost.hook}\n\n${blog.facebookPost.body}\n\n${blog.facebookPost.cta}`;
    const link = `${siteUrl}/tin-tuc/${blog.slug}`;

    // Gọi Facebook Graph API
    const fbRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: message,
        link: link,
        access_token: accessToken,
        published: true
      })
    });

    const fbData = await fbRes.json();

    if (fbData.error) {
      console.error('[FB-API-ERROR]', fbData.error);
      return NextResponse.json({ 
        success: false, 
        error: `Lỗi từ Facebook: ${fbData.error.message}` 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      postId: fbData.id,
      message: 'Đã đăng lên Fanpage thành công!' 
    });

  } catch (error) {
    console.error('[publish-facebook-error]', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Lỗi hệ thống khi đăng bài' 
    }, { status: 500 });
  }
}
