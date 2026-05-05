import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET_STR = process.env.JWT_SECRET;
if (!JWT_SECRET_STR) {
  throw new Error('JWT_SECRET environment variable is missing');
}
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STR);

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
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
