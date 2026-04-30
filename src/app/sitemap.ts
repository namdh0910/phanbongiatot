import { MetadataRoute } from 'next';
import { API_BASE_URL } from '@/utils/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://phanbongiatot.com';

  // Fetch all products
  let products: any[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/products?limit=1000`);
    if (res.ok) {
      const data = await res.json();
      products = Array.isArray(data) ? data : data.products || [];
    }
  } catch (e) {
    console.error('Sitemap fetch products error:', e);
  }

  // Fetch all blogs
  let blogs: any[] = [];
  try {
    const res = await fetch(`${API_BASE_URL}/blogs?limit=1000`);
    if (res.ok) {
      const data = await res.json();
      blogs = data.blogs || data;
    }
  } catch (e) {
    console.error('Sitemap fetch blogs error:', e);
  }

  const productUrls = products.map((p) => ({
    url: `${baseUrl}/san-pham/${p.slug}`,
    lastModified: new Date(p.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const blogUrls = blogs.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt || new Date()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const staticUrls = [
    '',
    '/blog',
    '/combo',
    '/danh-muc/phan-bon',
    '/danh-muc/kich-re',
    '/danh-muc/tuyen-trung',
    '/ve-chung-toi',
    '/lien-he',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));

  return [...staticUrls, ...productUrls, ...blogUrls];
}
