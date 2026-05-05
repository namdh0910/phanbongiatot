import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'phanbongiatot_secret_2026');

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    await jwtVerify(token, JWT_SECRET);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
}
