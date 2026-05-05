"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, Beaker, ShieldCheck, Zap, Leaf } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  useCase: string;
  tags: string[];
  description: string;
  icon: string;
}

const SolutionProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative">
      {/* Decorative Icon Background */}
      <div className="absolute -top-4 -right-4 text-8xl opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12">
        {product.icon}
      </div>

      <div className="relative z-10">
        {/* Use Case Badge */}
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#1a5c2a] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 bg-[#1a5c2a] rounded-full animate-pulse"></span>
          {product.useCase}
        </div>

        {/* Product Name */}
        <h3 className="text-xl md:text-2xl font-black text-gray-900 mb-3 leading-tight group-hover:text-[#1a5c2a] transition-colors">
          {product.name}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.tags.map(tag => (
            <span key={tag} className="text-[9px] bg-gray-50 text-gray-400 border border-gray-100 px-2 py-0.5 rounded-md font-bold uppercase">
              #{tag}
            </span>
          ))}
        </div>

        {/* Short Description */}
        <p className="text-gray-500 text-sm mb-8 line-clamp-2 font-medium leading-relaxed">
          {product.description}
        </p>

        {/* Pricing/Contact placeholder */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-50">
           <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter italic">Giá: Liên hệ kỹ sư</span>
           <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(s => <span key={s} className="text-[10px] text-amber-400">★</span>)}
           </div>
        </div>

        {/* CTA Button */}
        <Link 
          href={`/san-pham/${product.slug}`}
          className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-[#1a5c2a] shadow-lg shadow-gray-200 transition-all"
        >
          Tư vấn cách phối trộn <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default SolutionProductCard;
