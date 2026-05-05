import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      // Trong thực tế nên dùng JWT, nhưng theo yêu cầu "simple auth" ta trả về success
      return NextResponse.json({ success: true, token: 'simple_admin_token_2026' });
    }

    return NextResponse.json({ success: false, message: 'Mật khẩu không chính xác' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 });
  }
}
