import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/lib/models/Product';
import Blog from '@/lib/models/Blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://phanbongiatot.com';

  // Fetch all products
  let products: any[] = [];
  try {
    await dbConnect();
    const productDocs = await Product.find({ status: 'approved' }).lean();
    products = JSON.parse(JSON.stringify(productDocs));
  } catch (e) {
    console.error('Sitemap fetch products error:', e);
  }

  // Fetch all blogs
  let blogs: any[] = [];
  try {
    const blogDocs = await Blog.find({ isPublished: true }).lean();
    blogs = JSON.parse(JSON.stringify(blogDocs));
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
