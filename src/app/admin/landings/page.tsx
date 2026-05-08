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
      // Correctly extract arrays from API responses
      const productsArr = productsData.products || productsData.data || (Array.isArray(productsData) ? productsData : []);
      const solutionsArr = solutionsData.pathologies || solutionsData.data || (Array.isArray(solutionsData) ? solutionsData : []);
      
      setProducts(productsArr);
      setSolutions(solutionsArr);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredSolutions = solutions.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase italic tracking-tighter">Hệ Thống Landing Pages</h1>
          <p className="text-gray-500 font-medium text-xs">Quản lý và theo dõi hiệu suất toàn bộ các trang đích.</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Tìm nhanh trang..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-[#1a5c2a] outline-none transition-all font-bold text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* COLUMN 1: CORE LANDINGS */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
          <h2 className="text-[10px] font-black text-[#1a5c2a] uppercase tracking-[0.2em] mb-5 flex items-center gap-2 border-b border-gray-50 pb-4">
            <Layout size={14} /> Trang Cốt Lõi (Sản phẩm chủ lực)
          </h2>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[800px] pr-1">
            {[
              { title: "Trang Chủ PBGT", url: "/", type: "Main", color: "bg-gray-50 border-gray-100 text-gray-900" },
              { title: "Elite: SICOBI 20% OM", url: "/fuvico-sicobi", type: "Elite", color: "bg-[#0d2a1c] border-emerald-900/50 text-white" },
              { title: "Elite: NEMANO", url: "/nemano", type: "Elite", color: "bg-[#2a1a0d] border-orange-900/50 text-white" }
            ].map((item, i) => (
              <div key={i} className={`p-3 rounded-2xl border flex items-center justify-between group hover:scale-[1.02] transition-all ${item.color}`}>
                <div className="min-w-0">
                  <h3 className="font-black text-xs truncate leading-none mb-1">{item.title}</h3>
                  <p className="text-[8px] opacity-50 font-bold uppercase tracking-widest">{item.url}</p>
                </div>
                <Link href={item.url} target="_blank" className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors">
                  <ExternalLink size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 2: PRODUCTS */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
          <h2 className="text-[10px] font-black text-[#1a5c2a] uppercase tracking-[0.2em] mb-5 flex items-center gap-2 border-b border-gray-50 pb-4">
            📦 Sản Phẩm ({products.length})
          </h2>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[800px] pr-2 scrollbar-thin">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1,2,3,4].map(i => <div key={i} className="h-12 bg-gray-50 rounded-2xl" />)}
              </div>
            ) : filteredProducts.map((p) => (
              <div key={p._id} className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-emerald-200 transition-all">
                <div className="min-w-0 flex items-center gap-2.5">
                  <img src={p.images?.[0] || '/product-placeholder.png'} className="w-8 h-8 rounded-lg object-cover bg-white" />
                  <div className="min-w-0">
                    <h3 className="font-black text-gray-900 text-[11px] truncate leading-none mb-1">{p.name}</h3>
                    <p className="text-[8px] text-gray-400 font-bold uppercase truncate italic">/san-pham/{p.slug}</p>
                  </div>
                </div>
                <Link href={`/san-pham/${p.slug}`} target="_blank" className="flex-shrink-0 w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-300 group-hover:text-emerald-600 transition-colors">
                  <ExternalLink size={12} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* COLUMN 3: SOLUTIONS */}
        <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
          <h2 className="text-[10px] font-black text-[#1a5c2a] uppercase tracking-[0.2em] mb-5 flex items-center gap-2 border-b border-gray-50 pb-4">
            🩺 Giải Pháp ({solutions.length})
          </h2>
          <div className="space-y-3 flex-1 overflow-y-auto max-h-[800px] pr-2 scrollbar-thin">
            {loading ? (
              <div className="animate-pulse space-y-3">
                {[1,2,3,4].map(i => <div key={i} className="h-12 bg-gray-50 rounded-2xl" />)}
              </div>
            ) : filteredSolutions.map((s) => (
              <div key={s._id} className="p-2.5 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                <div className="min-w-0">
                  <h3 className="font-black text-gray-900 text-[11px] truncate leading-none mb-1">{s.title}</h3>
                  <p className="text-[8px] text-gray-400 font-bold uppercase truncate italic">/giai-phap/{s.slug}</p>
                </div>
                <Link href={`/giai-phap/${s.slug}`} target="_blank" className="flex-shrink-0 w-7 h-7 bg-white rounded-lg shadow-sm flex items-center justify-center text-gray-300 group-hover:text-blue-600 transition-colors">
                  <ExternalLink size={12} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
