
import React from 'react';

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  return (
    <div className="bg-white min-h-screen pt-40 pb-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-2xl font-black uppercase italic tracking-tighter text-gray-900">
          ĐANG KIỂM TRA HỆ THỐNG...
        </h1>
        <p className="text-gray-500 mt-4 font-medium">
          Slug bài viết: <span className="text-emerald-600">{slug}</span>
        </p>
        <div className="mt-8 p-8 bg-gray-50 rounded-3xl border border-dashed border-gray-200 max-w-xl mx-auto">
          <p className="text-xs text-gray-400">
            Nếu anh nhìn thấy dòng chữ này, có nghĩa là lỗi nằm ở tầng truy vấn dữ liệu (Database). 
            Em đang cô lập để tìm nguyên nhân chính xác.
          </p>
        </div>
      </div>
    </div>
  );
}
