import { API_BASE_URL, getAuthHeaders } from '@/utils/api';
import Link from "next/link";

async function getBlog(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/blogs/slug/${slug}`, { next: { revalidate: 0 } });
    if (!res.ok) throw new Error('API failed');
    return await res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) return { title: "Bài viết không tồn tại" };
  
  return {
    title: `${blog.title} | Kiến thức nông nghiệp`,
    description: blog.excerpt || blog.title,
    openGraph: {
      images: blog.image && (blog.image.startsWith("http") || blog.image.startsWith("/")) ? [blog.image] : [],
    }
  };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="text-primary font-bold hover:underline mb-8 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <span>&larr;</span> Quay lại danh sách bài viết
        </Link>
        
        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-lg border border-gray-100">
          <div className="text-center mb-12 border-b border-gray-100 pb-12">
            <div className="text-8xl mb-8 drop-shadow-md">{blog.image || "📚"}</div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-dark mb-6 leading-tight">{blog.title}</h1>
            <div className="flex items-center justify-center gap-4 text-gray-500 font-medium">
              <span className="flex items-center gap-2"><span>👤</span> Biên tập viên</span>
              <span>•</span>
              <span className="flex items-center gap-2"><span>📅</span> {new Date(blog.createdAt).toLocaleDateString('vi-VN')}</span>
            </div>
          </div>
          
          <div 
            className="prose prose-lg md:prose-xl max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          
          <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center">
            <span className="font-bold text-gray-800">Chia sẻ bài viết này:</span>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-md hover:-translate-y-1 transition-transform">f</button>
              <button className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold shadow-md hover:-translate-y-1 transition-transform">t</button>
              <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold shadow-md hover:-translate-y-1 transition-transform">z</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
