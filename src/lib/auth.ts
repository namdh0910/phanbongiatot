import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function verifyAdmin() {
  try {
    const JWT_SECRET_STR = process.env.JWT_SECRET;
    if (!JWT_SECRET_STR) return false;
    const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_STR);

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
