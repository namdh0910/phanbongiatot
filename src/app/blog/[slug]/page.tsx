
import React from 'react';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Blog from '@/lib/models/Blog';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Calendar, Camera, MessageCircle, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

async function getBlogSafe(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug }).lean();
    if (!blog) return null;
    
    // Manual mapping to avoid any hidden Mongoose/Circular issues
    return {
      title: String(blog.title || ''),
      content: String(blog.content || ''),
      category: String(blog.category || 'Nông nghiệp'),
      coverImage: String(blog.coverImage || blog.image || ''),
      createdAt: blog.createdAt ? new Date(blog.createdAt).toISOString() : null,
      slug: String(blog.slug || '')
    };
  } catch (error) {
    return null;
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogSafe(slug);
  
  if (!blog) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen pt-24 md:pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-7xl mx-auto">
          <Breadcrumbs items={[
            { label: 'Kiến thức', href: '/blog' },
            { label: blog.category, href: '/blog' },
            { label: blog.title }
          ]} />
        </div>

        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {blog.category}
              </span>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold">
                <Calendar size={14} />
                {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('vi-VN') : 'Mới cập nhật'}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.05] tracking-tighter mb-10">
              {blog.title}
            </h1>

            {blog.coverImage && (
              <div className="aspect-[21/9] w-full rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 border-8 border-gray-50/50">
                <img 
                  src={blog.coverImage} 
                  alt={blog.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
          </header>

          <article 
            className="prose prose-emerald prose-lg md:prose-xl max-w-none selection:bg-emerald-100"
            style={{ 
              wordBreak: 'normal', 
              overflowWrap: 'break-word', 
              lineHeight: '1.8',
              color: '#334155'
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-20 p-12 bg-emerald-900 rounded-[3rem] text-white text-center">
             <h3 className="text-3xl font-black italic uppercase mb-6">Cần kỹ sư tư vấn ngay?</h3>
             <p className="text-emerald-100/70 mb-8 font-medium">Bà con đừng ngần ngại, hãy nhắn tin Zalo để được giải đáp miễn phí 24/7.</p>
             <a href="https://zalo.me/0773440966" className="inline-block bg-emerald-500 hover:bg-emerald-400 px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl">Nhắn Zalo Ngay</a>
          </div>
        </div>
      </div>
    </div>
  );
}
