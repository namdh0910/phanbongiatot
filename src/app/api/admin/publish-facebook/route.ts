import { NextRequest, NextResponse } from 'next/server';
import Blog from '@/lib/models/Blog';
import dbConnect from '@/lib/db';

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
    const { blogId, facebookPost: clientFBPost } = await req.json();
    if (!blogId) {
      return NextResponse.json({ success: false, error: 'Thiếu Blog ID' }, { status: 400 });
    }

    await dbConnect();
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return NextResponse.json({ success: false, error: 'Không tìm thấy bài viết' }, { status: 404 });
    }

    // Ưu tiên dùng nội dung từ client (mới nhất), nếu không có mới dùng trong DB
    const fbPost = clientFBPost || blog.facebookPost;

    if (!fbPost || (!fbPost.hook && !fbPost.body && !fbPost.cta)) {
      return NextResponse.json({ success: false, error: 'Nội dung Facebook Post đang trống. Vui lòng soạn thảo trước khi đăng.' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.phanbongiatot.com';
    
    // Fallback nếu chưa cấu hình trên Vercel
    const pageId = (process.env.FB_PAGE_ID || '61574432962859').trim();
    const accessToken = (process.env.FB_PAGE_ACCESS_TOKEN || 'EAAefrMGtbRoBRXdDUAheAx6HmfMeR50R2TKfJSSuJ25YLZA0fpzFoGZCs8JNnoJCVLRXDbZCKCid1cZA5BwDMupReiMNjN6SgeIBHOqZBgZBGddEYOagaBTcOIN2Q8T5qR4QCNQdzYewKWE4vzjMaRThpAt7SfDLWL8ZCQxYoOZBeAFu63QysZBXZBaMPZCvDRXTX2y6NXeq84cQscsESZASrZBLfjtJAK5xxH0qjd9GJt9KAVsX3rk7nlY3uIOJc3qGH9CTNWzWFu5ZCFH1uQteJMl5iRxXTy39V7mhoLOQZDZD').trim();
    
    // Làm sạch token khỏi các ký tự ẩn hoặc khoảng trắng không mong muốn
    const cleanToken = accessToken.replace(/[^\x21-\x7E]/g, '');

    if (!pageId || !cleanToken) {
      return NextResponse.json({ success: false, error: 'Chưa cấu hình Facebook Page ID hoặc Access Token' }, { status: 500 });
    }

    // Ghép nội dung bài đăng với xuống dòng rõ ràng
    const hook = fbPost.hook ? `${fbPost.hook}\n\n` : '';
    const bodyText = fbPost.body ? `${fbPost.body}\n\n` : '';
    const cta = fbPost.cta ? `${fbPost.cta}\n\n` : '';
    const link = `${siteUrl}/tin-tuc/${blog.slug}`;
    const message = `${hook}${bodyText}${cta}👉 Xem chi tiết tại: ${link}`.trim();

    // Nếu có ảnh bìa, đăng dưới dạng Photo Post để hiện ảnh to đẹp
    if (blog.coverImage) {
      // Đảm bảo URL ảnh là tuyệt đối (Facebook không chấp nhận đường dẫn tương đối)
      const imageUrl = blog.coverImage.startsWith('http') 
        ? blog.coverImage 
        : `${siteUrl}${blog.coverImage}`;

      const fbRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}/photos?access_token=${cleanToken}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          url: imageUrl,
          caption: message,
          published: true
        })
      });

      const fbData = await fbRes.json();
      if (fbData.error) throw new Error(fbData.error.message);

      return NextResponse.json({ success: true, postId: fbData.id, message: 'Đã đăng ảnh và bài viết lên Fanpage thành công!' });
    }

    // Nếu không có ảnh, đăng bài viết text kèm link như cũ
    const fbRes = await fetch(`https://graph.facebook.com/v19.0/${pageId}/feed?access_token=${cleanToken}`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: message,
        link: link,
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
