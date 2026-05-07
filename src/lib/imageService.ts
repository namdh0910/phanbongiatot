// Fetches agriculture images from Pexels → uploads to Cloudinary
// Returns CDN URLs ready to inject into article HTML

import { PexelsPhoto, ArticleImage, CloudinaryUploadResult } from './types';

// ── Pexels ────────────────────────────────────────────────────────────────────
const PEXELS_API = 'https://api.pexels.com/v1';

// Map Vietnamese crop topics → English Pexels search terms
// (Pexels search works best in English)
const TOPIC_MAP: Record<string, string[]> = {
  'sầu riêng':       ['durian fruit farm', 'durian tree tropical', 'durian plantation'],
  'cà phê':          ['coffee plantation vietnam', 'coffee farm', 'coffee tree harvest'],
  'hồ tiêu':         ['black pepper farm', 'pepper vine plantation', 'pepper harvest'],
  'tuyến trùng':     ['plant root disease', 'sick tree farm', 'root rot plant'],
  'vàng lá':         ['yellow leaves plant disease', 'plant disease farm', 'sick tree leaves'],
  'thối rễ':         ['root rot plant', 'diseased plant roots', 'tree disease treatment'],
  'phân bón':        ['fertilizer farm', 'agriculture soil', 'organic farming'],
  'vi sinh':         ['soil microbes agriculture', 'organic farming soil', 'biological farming'],
  'phục hồi':        ['healthy plant growth', 'plant recovery', 'tree growth tropical'],
  'default':         ['tropical farm vietnam', 'agriculture farm', 'farming tropical'],
};

function getSearchTerms(topic: string): string[] {
  const lower = topic.toLowerCase();
  for (const [key, terms] of Object.entries(TOPIC_MAP)) {
    if (lower.includes(key)) return terms;
  }
  return TOPIC_MAP['default'];
}

async function fetchPexelsPhotos(
  query: string,
  count: number = 4,
): Promise<PexelsPhoto[]> {
  const params = new URLSearchParams({
    query,
    per_page: String(count + 3), // fetch extra, filter best
    orientation: 'landscape',
    size: 'large',
  });

  const res = await fetch(`${PEXELS_API}/search?${params}`, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY ?? '',
    },
    next: { revalidate: 3600 }, // cache 1hr
  });

  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return (data.photos ?? []).slice(0, count) as PexelsPhoto[];
}

// ── Cloudinary ────────────────────────────────────────────────────────────────
async function uploadToCloudinary(
  imageUrl: string,
  folder: string = 'phanbongiatot/articles',
): Promise<CloudinaryUploadResult> {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary env vars missing');
  }

  // Generate timestamp + signature
  const timestamp = Math.round(Date.now() / 1000);
  const paramsToSign = `folder=${folder}&timestamp=${timestamp}&transformation=c_fill,w_1200,h_630,q_auto,f_auto`;

  // Sign with crypto (Node built-in)
  const crypto = await import('crypto');
  const signature = crypto
    .createHash('sha1')
    .update(`${paramsToSign}${apiSecret}`)
    .digest('hex');

  const formData = new FormData();
  formData.append('file', imageUrl);           // Cloudinary accepts URL directly
  formData.append('api_key', apiKey);
  formData.append('timestamp', String(timestamp));
  formData.append('signature', signature);
  formData.append('folder', folder);
  formData.append('transformation', 'c_fill,w_1200,h_630,q_auto,f_auto');

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: 'POST', body: formData },
  );

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    throw new Error(`Cloudinary upload failed: ${err}`);
  }

  return uploadRes.json() as Promise<CloudinaryUploadResult>;
}

// ── Main export ───────────────────────────────────────────────────────────────
export async function fetchAndUploadImages(
  topic: string,
  count: number = 4,
): Promise<ArticleImage[]> {
  // Ưu tiên dùng chính "topic" (query từ AI) để search vì nó cụ thể hơn
  const searchTerms = [topic, ...getSearchTerms(topic)];

  // Fetch from Pexels
  let photos: PexelsPhoto[] = [];
  for (const term of searchTerms) {
    try {
      // Bỏ qua các term quá ngắn hoặc không có nghĩa
      if (!term || term.length < 3) continue;

      photos = await fetchPexelsPhotos(term, count);
      if (photos.length >= count) break;
    } catch {
      // try next search term
    }
  }

  if (photos.length === 0) {
    throw new Error(`No photos found for topic: ${topic}`);
  }

  // Upload all to Cloudinary concurrently
  const uploadPromises = photos.map(async (photo, i): Promise<ArticleImage> => {
    const cloudResult = await uploadToCloudinary(photo.src.large2x);
    return {
      cloudinaryUrl: cloudResult.secure_url,
      alt: photo.alt || `${topic} - hình ${i + 1}`,
      caption: `Ảnh minh họa: ${topic}`,
      photographer: photo.photographer,
      position: i === 0 ? 'hero' : 'inline',
    };
  });

  const images = await Promise.allSettled(uploadPromises);

  // Return only successful uploads
  return images
    .filter((r): r is PromiseFulfilledResult<ArticleImage> => r.status === 'fulfilled')
    .map(r => r.value);
}
