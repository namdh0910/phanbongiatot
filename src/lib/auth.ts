import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET_STR = process.env.JWT_SECRET;
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STR || 'placeholder_for_missing_secret');

export async function verifyAdmin() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('adminToken')?.value;
    
    if (!token) return false;

    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload && payload.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function getAdminToken() {
  const cookieStore = await cookies();
  return cookieStore.get('adminToken')?.value;
}
