import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Không tìm thấy file' }, { status: 400 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'phanbongiatot';
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET || 'ml_default';

    // Using unsigned upload for simplicity in this environment
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('upload_preset', uploadPreset);
    uploadFormData.append('folder', 'phanbongiatot');

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
  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Lỗi hệ thống khi upload' }, { status: 500 });
  }
}
