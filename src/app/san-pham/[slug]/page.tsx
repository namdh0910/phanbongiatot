import React from 'react';
import { Metadata } from 'next';
import MobileBottomBar from '@/components/layout/MobileBottomBar';
import ProductGallery from '@/components/ui/ProductGallery';

async function getProduct(slug: string) {
  return {
    name: `Sản phẩm ${slug.replace(/-/g, ' ')}`,
    price: 'Liên hệ tư vấn',
    features: ['Hữu cơ vi sinh', 'An toàn cho đất', 'Phục hồi rễ cực mạnh'],
    description: 'Sản phẩm hỗ trợ phục hồi cây trồng theo tiêu chuẩn nông nghiệp bền vững.',
  };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  return {
    title: `${product.name} | PhanBongiTot.com`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);

  return (
    <div className="min-h-screen bg-white pb-24">
      <main className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Gallery */}
          <div>
            <ProductGallery />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="text-2xl font-bold text-green-700">{product.price}</div>
            
            <ul className="space-y-2">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="text-green-500">✓</span> {feature}
                </li>
              ))}
            </ul>

            <div className="prose text-gray-600">
              {product.description}
            </div>

            {/* No Cart - Just CTA */}
            <div className="mt-4 space-y-3">
              <a 
                href="https://zalo.me/your-zalo-id" 
                className="block w-full bg-green-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-green-700"
              >
                Nhận tư vấn kỹ thuật qua Zalo
              </a>
              <a 
                href="tel:0123456789" 
                className="block w-full border-2 border-green-600 text-green-600 text-center py-4 rounded-xl font-bold text-lg hover:bg-green-50"
              >
                Gọi Hotline hỗ trợ ngay
              </a>
            </div>
          </div>
        </div>
      </main>

      <MobileBottomBar />
    </div>
  );
}
