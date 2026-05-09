import { NextRequest, NextResponse } from 'next/server';
import { generateFacebookPostFromContent } from '@/lib/contentGenerator';

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
    const { content } = await req.json();
    if (!content) {
      return NextResponse.json({ success: false, error: 'Nội dung bài viết không được để trống' }, { status: 400 });
    }

    const facebookPost = await generateFacebookPostFromContent(content);
    return NextResponse.json({ success: true, facebookPost });
  } catch (error) {
    console.error('[api-generate-fb-post] Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Lỗi hệ thống khi tạo FB Post' 
    }, { status: 500 });
  }
}
