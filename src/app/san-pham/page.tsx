"use client";

import React, { useState } from 'react';
import SolutionProductCard from '@/components/solution/SolutionProductCard';
import products from '@/data/products.json';
import { Filter, Search, Sprout, ShieldCheck, Waves, Zap } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tất cả chế phẩm', icon: <Sprout size={18} /> },
  { id: 'Phục hồi rễ', name: 'Phục hồi rễ', icon: <Sprout size={18} /> },
  { id: 'Cải tạo đất', name: 'Cải tạo đất', icon: <Waves size={18} /> },
  { id: 'Phòng trừ nấm bệnh', name: 'Phòng trừ nấm bệnh', icon: <ShieldCheck size={18} /> },
  { id: 'Cung cấp vi lượng', name: 'Cung cấp vi lượng', icon: <Zap size={18} /> },
];

export default function ProductListingPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.useCase === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header Section */}
      <section className="bg-gray-900 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#1a5c2a_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-emerald-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
             🛡️ HỆ SINH THÁI CHẾ PHẨM
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6 leading-[0.9]">
            Hệ Sinh Thái Chế Phẩm <br />
            <span className="text-emerald-500">Hữu Cơ & Sinh Học</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Công cụ đắc lực hỗ trợ phác đồ phục hồi rễ, cải tạo đất, an toàn tuyệt đối cho vườn sầu riêng và cà phê.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide w-full md:w-auto pb-2 md:pb-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex-shrink-0
                    ${selectedCategory === cat.id 
                      ? 'bg-[#1a5c2a] text-white shadow-lg shadow-emerald-200' 
                      : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:flex-1 max-w-md ml-auto">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="text" 
                 placeholder="Tìm chế phẩm theo tên hoặc công dụng..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-[#1a5c2a] font-medium text-gray-700 transition-all"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {filteredProducts.map(product => (
                <SolutionProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-32 text-center">
               <div className="text-6xl mb-6 opacity-20">🍃</div>
               <h3 className="text-2xl font-black text-gray-300 uppercase italic">Không tìm thấy chế phẩm phù hợp</h3>
               <p className="text-gray-400 mt-2">Bà con vui lòng thử từ khóa khác hoặc liên hệ kỹ sư hỗ trợ.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="container mx-auto px-4 mt-20">
         <div className="bg-[#1a5c2a] rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]"></div>
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-6 relative z-10">
              Cần phối trộn phác đồ riêng?
            </h2>
            <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto font-medium relative z-10">
              Kỹ sư của chúng tôi sẽ dựa trên tình trạng đất và cây thực tế để kê đơn phối trộn các chế phẩm hiệu quả nhất cho vườn nhà mình.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 relative z-10">
               <a href="https://zalo.me/0773440966" className="bg-white text-[#1a5c2a] px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest shadow-2xl hover:scale-105 transition-all">
                  Chat Zalo Kỹ Thuật
               </a>
               <a href="tel:0773440966" className="border-2 border-white text-white px-10 py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-white/10 transition-all">
                  Gọi Hotline: 0773.440.966
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
