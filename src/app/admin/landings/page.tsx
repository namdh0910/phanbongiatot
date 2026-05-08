"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExternalLink, Layout, Search, Filter } from 'lucide-react';
import { API_BASE_URL } from '@/utils/api';

export default function LandingPagesList() {
  const [products, setProducts] = useState<any[]>([]);
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/products`).then(res => res.json()),
      fetch(`${API_BASE_URL}/pathologies`).then(res => res.json())
    ]).then(([productsData, solutionsData]) => {
      setProducts(productsData.data || productsData || []);
      setSolutions(solutionsData.data || solutionsData || []);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSolutions = solutions.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 uppercase italic tracking-tighter">Hệ Thống Landing Pages</h1>
          <p className="text-gray-500 font-medium">Danh sách toàn bộ các trang đích đang hoạt động trên hệ thống.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Tìm kiếm trang..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a5c2a] outline-none transition-all font-bold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Core Landings */}
      <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-sm font-black text-[#1a5c2a] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Layout size={16} /> Trang Đích Cốt Lõi (Tĩnh)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-[#1a5c2a] transition-all">
            <div>
              <h3 className="font-black text-gray-900 leading-none mb-1">Trang Chủ Toàn Diện</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">URL: /</p>
            </div>
            <Link href="/" target="_blank" className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#1a5c2a] transition-colors">
              <ExternalLink size={18} />
            </Link>
          </div>
          <div className="p-4 bg-[#0d2a1c] rounded-2xl border border-emerald-900/50 flex items-center justify-between group hover:border-emerald-400 transition-all">
            <div>
              <h3 className="font-black text-white leading-none mb-1 uppercase tracking-tight italic">Elite Landing: SICOBI 20% OM</h3>
              <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">URL: /fuvico-sicobi</p>
            </div>
            <Link href="/fuvico-sicobi" target="_blank" className="w-10 h-10 bg-white/10 rounded-xl shadow-sm flex items-center justify-center text-emerald-400 group-hover:bg-emerald-400 group-hover:text-white transition-all">
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Dynamic Landings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Solutions */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-black text-[#1a5c2a] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            🩺 Landing Page Giải Pháp ({solutions.length})
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-14 bg-gray-100 rounded-2xl" />)}
              </div>
            ) : filteredSolutions.map((s) => (
              <div key={s._id} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group">
                <div className="min-w-0">
                  <h3 className="font-black text-gray-900 text-xs truncate leading-none mb-1">{s.title}</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase truncate">/giai-phap/{s.slug}</p>
                </div>
                <Link href={`/giai-phap/${s.slug}`} target="_blank" className="flex-shrink-0 w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-300 group-hover:text-[#1a5c2a] transition-colors">
                  <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Products */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-sm font-black text-[#1a5c2a] uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            📦 Landing Page Sản Phẩm ({products.length})
          </h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1,2,3].map(i => <div key={i} className="h-14 bg-gray-100 rounded-2xl" />)}
              </div>
            ) : filteredProducts.map((p) => (
              <div key={p._id} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group">
                <div className="min-w-0 flex items-center gap-3">
                  <img src={p.images?.[0] || '/product-placeholder.png'} className="w-8 h-8 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <h3 className="font-black text-gray-900 text-xs truncate leading-none mb-1">{p.name}</h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase truncate">/san-pham/{p.slug}</p>
                  </div>
                </div>
                <Link href={`/san-pham/${p.slug}`} target="_blank" className="flex-shrink-0 w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-300 group-hover:text-[#1a5c2a] transition-colors">
                  <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
