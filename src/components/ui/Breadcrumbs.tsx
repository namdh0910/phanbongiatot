"use client";
import React from 'react';
import Link from 'next/link';
import Script from 'next/script';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  light?: boolean;
}

export default function Breadcrumbs({ items, light = false }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://phanbongiatot.com${item.href}` : undefined
    }))
  };

  return (
    <nav aria-label="breadcrumb" className={`py-4 px-4 ${light ? 'bg-transparent border-none' : 'bg-gray-50 border-b border-gray-100'}`}>
      <div className="container mx-auto">
        <ol className={`flex flex-wrap items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-wider ${light ? 'text-white/60' : 'text-gray-400'}`}>
          <li className="flex items-center gap-2">
            <Link href="/" className={`transition-colors ${light ? 'hover:text-white' : 'hover:text-[#1a5c2a]'}`}>Trang chủ</Link>
          </li>
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
               <span className={`${light ? 'text-white/20' : 'text-gray-300'} text-[10px]`}>/</span>
              {index === items.length - 1 ? (
                <span className={light ? 'text-white' : 'text-[#1a5c2a]'}>{item.label}</span>
              ) : (
                <Link href={item.href || '#'} className={`transition-colors ${light ? 'hover:text-white' : 'hover:text-[#1a5c2a]'}`}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
