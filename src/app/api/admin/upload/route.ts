import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy file' }, { status: 400 });
    }

    // Credentials from backend/.env as fallback
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dztidbkhv';
    const apiKey = process.env.CLOUDINARY_API_KEY || '952569712631332';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'fZgf8zJmaKkZHwuZfgEn4cZjgPA';

    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = 'phanbongiatot';
    
    // Create signature
    // Format: folder=<folder>&timestamp=<timestamp><api_secret>
    const signatureStr = `folder=${folder}&timestamp=${timestamp}${apiSecret}`;
    const signature = crypto.createHash('sha1').update(signatureStr).digest('hex');

    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('api_key', apiKey);
    uploadFormData.append('timestamp', timestamp.toString());
    uploadFormData.append('signature', signature);
    uploadFormData.append('folder', folder);

    const response = await fetch(cloudinaryUrl, {
      method: 'POST',
      body: uploadFormData,
    });

    const data = await response.json();

    if (data.secure_url) {
      return NextResponse.json({ url: data.secure_url });
    } else {
      console.error('Cloudinary error:', data);
      return NextResponse.json({ error: data.error?.message || 'Lỗi upload ảnh' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: error.message || 'Lỗi hệ thống khi upload' }, { status: 500 });
  }
}
