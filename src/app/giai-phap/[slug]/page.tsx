import Link from 'next/link';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import type { Metadata } from 'next';

async function getSolution(slug: string) {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await fetch(`${API_URL}/blogs/slug/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolution(slug);
  
  if (!solution) {
    return { title: 'Giải pháp | Phân Bón Giá Tốt' };
  }
  return {
    title: solution.seoTitle || solution.title,
    description: solution.seoDescription || solution.excerpt,
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  
  if (!solution) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
        <h1 className="text-2xl font-bold text-gray-500">Không tìm thấy bài viết</h1>
      </div>
    );
  }
  
  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <article className="max-w-3xl mx-auto px-4 pb-24 pt-6 bg-white shadow-sm min-h-screen">
        
        {/* Tiêu đề đập vào mắt */}
        <h1 className="text-2xl md:text-4xl font-extrabold text-green-900 mb-4 leading-tight">
          {solution.title}
        </h1>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pb-4 border-b">
          <span>{solution.author || 'Kỹ sư Nông nghiệp tư vấn'}</span>
          <span>•</span>
          <span>Đã kiểm duyệt chuyên môn</span>
        </div>

        {/* Nội dung bài viết */}
        <div 
          className="solution-content prose prose-green max-w-none text-gray-800"
          dangerouslySetInnerHTML={{ __html: solution.content }} 
        />

        {/* Lời kêu gọi hành động (CTA) cực mạnh */}
        <section className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6 md:p-8 text-center text-white shadow-xl mb-8">
          <h3 className="text-2xl font-black mb-3">Mỗi vườn một mức độ bệnh khác nhau!</h3>
          <p className="mb-6 text-green-50 text-base md:text-lg">Bà con đừng vội đi mua thuốc bừa bãi. Hãy chụp ảnh lá và gốc cây gửi qua Zalo, kỹ sư sẽ xem trực tiếp và tư vấn phác đồ chuẩn xác nhất.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://zalo.me/0773440966" target="_blank" rel="noopener noreferrer" className="bg-white text-green-800 font-black px-8 py-4 rounded-full text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-gray-100">
              <span className="text-2xl">💬</span> Gửi Ảnh Nhận Tư Vấn Zalo
            </a>
            <a href="tel:0773440966" className="bg-transparent border-2 border-white text-white font-black px-8 py-4 rounded-full text-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2 hover:bg-white/10">
              <span className="text-xl">📞</span> Gọi Kỹ Sư Ngay
            </a>
          </div>
        </section>

      </article>
    </div>
  );
}
