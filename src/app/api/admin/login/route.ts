import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'phanbongiatot_secret_2026');

export async function POST(request: Request) {
  try {
    // Brute-force mitigation: 1.5s artificial delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);

      // XSS mitigation: Set HttpOnly cookie
      cookies().set({
        name: 'adminToken',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: 'Mật khẩu không chính xác' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Lỗi hệ thống' }, { status: 500 });
  }
}
