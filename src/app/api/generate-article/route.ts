// Main API Route: orchestrates Claude + Pexels + Cloudinary
// POST /api/generate-article

import { NextRequest, NextResponse } from 'next/server';
import { generateArticleContent, injectImagesIntoContent } from '@/lib/contentGenerator';
import { fetchAndUploadImages } from '@/lib/imageService';
import { GenerateArticleRequest, GenerateArticleResponse } from '@/lib/types';

// Auth guard — chỉ admin mới được generate
async function isAuthorized(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get('adminToken')?.value;
  if (!token) return false;
  try {
    const { jwtVerify } = await import('jose');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? '');
    await jwtVerify(token, secret);
    return true;
  } catch (error) {
    console.error('[auth] Auth check failed:', error);
    return false;
  }
}

export async function POST(req: NextRequest): Promise<NextResponse<GenerateArticleResponse>> {
  // ── 1. Auth ──
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  // ── 2. Parse body ──
  let body: GenerateArticleRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  if (!body.topic || !body.keyword) {
    return NextResponse.json(
      { success: false, error: 'Thiếu topic hoặc keyword' },
      { status: 400 },
    );
  }

  try {
    console.log(`[generate-article] Starting: "${body.topic}"`);

    // ── 3. Generate content từ Claude (có image placeholders) ──
    console.log('[generate-article] Step 1: Calling Claude...');
    const generated = await generateArticleContent(body);
    console.log(`[generate-article] Claude done. Word count estimate OK.`);

    // ── 4. Fetch ảnh: hero + inline ──
    console.log('[generate-article] Step 2: Fetching images from Pexels...');
    const allQueries = [generated.heroImageQuery, ...generated.inlineImageQueries];

    // Fetch images for each query (1 image per query)
    const imageResults = await Promise.allSettled(
      allQueries.map(query => fetchAndUploadImages(query, 1)),
    );

    const images = imageResults
      .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof fetchAndUploadImages>>> =>
        r.status === 'fulfilled' && r.value.length > 0,
      )
      .map((r, i) => ({
        ...r.value[0],
        position: (i === 0 ? 'hero' : 'inline') as 'hero' | 'inline',
      }));

    console.log(`[generate-article] Got ${images.length} images uploaded to Cloudinary.`);

    if (images.length === 0) {
      throw new Error('Không lấy được ảnh nào từ Pexels');
    }

    // ── 5. Inject images into HTML ──
    const finalContent = injectImagesIntoContent(generated.content, images);

    // ── 6. Count words ──
    const wordCount = finalContent
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .split(' ').length;

    console.log(`[generate-article] Done. ${wordCount} words, ${images.length} images.`);

    return NextResponse.json({
      success: true,
      article: {
        title: generated.title,
        metaDescription: generated.metaDescription,
        slug: generated.slug,
        heroImage: images[0],
        content: finalContent,
        images,
        wordCount,
        tags: generated.tags,
      },
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : 'Đã có lỗi xảy ra trong quá trình xử lý.';
    console.error('[generate-article] Error Detail:', err);
    
    // Phân loại lỗi để báo về frontend thân thiện hơn
    let friendlyMessage = message;
    if (message.includes('404') || message.includes('not found')) {
      friendlyMessage = "Mẫu AI hiện tại không khả dụng (404). Đang kiểm tra cấu hình...";
    } else if (message.includes('403') || message.includes('identity')) {
      friendlyMessage = "Lỗi xác thực API Key. Vui lòng kiểm tra GEMINI_API_KEY trên Vercel.";
    } else if (message.includes('Pexels')) {
      friendlyMessage = "Lỗi khi lấy ảnh minh họa. Vui lòng thử lại sau.";
    }

    return NextResponse.json({ 
      success: false, 
      error: friendlyMessage,
      technicalDetail: message 
    }, { status: 500 });
  }
}
