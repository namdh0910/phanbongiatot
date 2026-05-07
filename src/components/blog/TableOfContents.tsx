
"use client";

import React, { useEffect, useState } from 'react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TOCItem[]>([]);

  useEffect(() => {
    // We parse the HTML to find headers and create IDs
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headers = Array.from(doc.querySelectorAll('h2, h3'));
    
    const items = headers.map((header, index) => {
      const text = header.textContent || "";
      // Create a clean ID for anchor linking
      const id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[đĐ]/g, 'd')
        .replace(/\s+/g, '-')
        .replace(/[^\w\d-]+/g, '') + '-' + index;
      
      return {
        id,
        text,
        level: header.tagName === 'H2' ? 2 : 3
      };
    });
    
    setToc(items);

    // After TOC is generated, we need to inject IDs into the actual DOM elements in the article
    // This is a client-side enhancement
    const article = document.getElementById('expert-content-root');
    if (article) {
      const domHeaders = Array.from(article.querySelectorAll('h2, h3'));
      domHeaders.forEach((h, i) => {
        if (items[i]) {
          h.id = items[i].id;
        }
      });
    }
  }, [content]);

  if (toc.length === 0) return null;

  return (
    <nav className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100"></div>
      <ul className="space-y-4 relative z-10">
        {toc.map((item) => (
          <li 
            key={item.id} 
            className={`transition-all duration-300 ${item.level === 3 ? 'ml-6' : 'ml-0'}`}
          >
            <a 
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById(item.id);
                if (target) {
                  const offset = 120; // Sticky header offset
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = target.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`block text-sm transition-all hover:text-emerald-600 border-l-2 -ml-[1px] pl-4 ${
                item.level === 2 
                  ? 'font-black uppercase tracking-tighter italic text-gray-900 border-transparent hover:border-emerald-500' 
                  : 'font-bold text-gray-400 border-transparent hover:border-emerald-400'
              }`}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
