import React from 'react';
import { Metadata } from 'next';
import MobileBottomBar from '@/components/layout/MobileBottomBar';

// Mock function to simulate data fetching based on slug
async function getSolution(slug: string) {
  // In reality, this would fetch from src/data/solutions.json or a DB
  return {
    title: `Giải pháp phục hồi ${slug.replace(/-/g, ' ')}`,
    description: 'Phác đồ điều trị sinh học giúp cây xanh lá, dày cơi, phục hồi bộ rễ bền vững.',
    content: 'Nội dung chi tiết về phác đồ điều trị...',
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const solution = await getSolution(params.slug);
  return {
    title: `${solution.title} | PhanBongiTot.com`,
    description: solution.description,
  };
}

export default async function SolutionDetailPage({ params }: { params: { slug: string } }) {
  const solution = await getSolution(params.slug);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section with Problem Image */}
      <section className="bg-green-50 p-6 md:p-12">
        <h1 className="text-3xl font-bold text-green-800 mb-4">{solution.title}</h1>
        <p className="text-lg text-gray-700">{solution.description}</p>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto p-6">
        <div className="prose prose-green lg:prose-xl">
          {solution.content}
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-6 bg-brown-50 border-l-4 border-brown-500 rounded-r-lg">
          <h3 className="text-xl font-bold text-brown-900 mb-2">Nhận phác đồ chi tiết cho vườn của bạn</h3>
          <p className="mb-6">Gửi hình ảnh tình trạng cây để Kỹ sư tư vấn phác đồ phục hồi tối ưu nhất.</p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a 
              href="https://zalo.me/your-zalo-id" 
              className="flex-1 bg-green-600 text-white text-center py-4 rounded-full font-bold text-lg hover:bg-green-700 transition"
            >
              Nhắn tin Zalo ngay
            </a>
            <a 
              href="tel:0123456789" 
              className="flex-1 border-2 border-green-600 text-green-600 text-center py-4 rounded-full font-bold text-lg hover:bg-green-50 transition"
            >
              Gọi Hotline tư vấn
            </a>
          </div>
        </div>
      </main>

      <MobileBottomBar />
    </div>
  );
}
