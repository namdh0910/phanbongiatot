import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://phanbongiatot.com';

  let products: any[] = [];
  let blogs: any[] = [];
  try {
    const [pr, br] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/products`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/blogs`),
    ]);
    products = await pr.json();
    blogs = await br.json();
  } catch {}

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${base}/danh-muc/phan-bon`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/danh-muc/kich-re`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/danh-muc/tuyen-trung`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/danh-muc/thuoc-tru-sau`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${base}/ve-chung-toi`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/lien-he`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  const productPages = Array.isArray(products) ? products.map(p => ({
    url: `${base}/san-pham/${p.slug}`,
    lastModified: new Date(p.updatedAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  })) : [];

  const blogPages = Array.isArray(blogs) ? blogs.map(b => ({
    url: `${base}/blog/${b.slug}`,
    lastModified: new Date(b.updatedAt || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  })) : [];

  return [...staticPages, ...productPages, ...blogPages];
}
