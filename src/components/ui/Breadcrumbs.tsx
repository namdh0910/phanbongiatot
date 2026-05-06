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
  className?: string;
  activeColor?: string;
}

export default function Breadcrumbs({ 
  items, 
  light = false, 
  className = "", 
  activeColor = "" 
}: BreadcrumbsProps) {
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

  const defaultActiveColor = activeColor || (light ? 'text-white' : 'text-[#1a5c2a]');
  const defaultHoverColor = light ? 'hover:text-white' : 'hover:text-[#1a5c2a]';
  const defaultTextColor = light ? 'text-white/60' : 'text-gray-400';

  return (
    <nav aria-label="breadcrumb" className={`${className} ${!className && (light ? 'bg-transparent border-none py-4 px-4' : 'bg-gray-50 border-b border-gray-100 py-4 px-4')}`}>
      <div className={!className ? "container mx-auto" : ""}>
        <ol className={`flex flex-wrap items-center gap-2 text-[11px] md:text-xs font-bold uppercase tracking-wider ${defaultTextColor}`}>
          {/* We handle Home separately in the items if needed, but the original component has it hardcoded */}
          {/* To maintain backward compatibility, I'll keep the Trang chu here but check if first item is already Trang chu */}
          {items[0]?.label !== 'Trang chủ' && (
            <li className="flex items-center gap-2">
              <Link href="/" className={`transition-colors ${defaultHoverColor}`}>Trang chủ</Link>
            </li>
          )}
          
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
               {(items[0]?.label !== 'Trang chủ' || index > 0) && (
                 <span className={`${light ? 'text-white/20' : 'text-gray-300'} text-[10px]`}>/</span>
               )}
              {index === items.length - 1 ? (
                <span className={defaultActiveColor}>{item.label}</span>
              ) : (
                <Link href={item.href || '#'} className={`transition-colors ${defaultHoverColor}`}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
      <Script
        id={`breadcrumb-jsonld-${Math.random()}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
