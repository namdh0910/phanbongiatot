"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { API_BASE_URL } from "@/utils/api";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams?.get('q') || '';
  const [results, setResults] = useState<{ products: any[], blogs: any[] }>({ products: [], blogs: [] });
  const [loading, setLoading] = useState(true);

  const trendingTags = [
    { label: "Sầu riêng", href: "/tim-kiem?q=sau+rieng" },
    { label: "Cà phê", href: "/tim-kiem?q=ca+phe" },
    { label: "Kích rễ", href: "/tim-kiem?q=kich+re" },
    { label: "Tuyến trùng", href: "/tim-kiem?q=tuyen+trung" }
  ];

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = await res.json();
          setResults({
            products: data.products || [],
            blogs: data.blogs || []
          });
        }
      } catch (error) {
        console.error("Lỗi tìm kiếm:", error);
      } finally {
        setLoading(false);
      }
    };

    if (q) {
      fetchResults();
    } else {
      setResults({ products: [], blogs: [] });
      setLoading(false);
    }
  }, [q]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 gap-4">
        <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-bold animate-pulse">Đang tìm kiếm giải pháp cho bà con...</p>
      </div>
    );
  }

  const hasResults = results.products.length > 0 || results.blogs.length > 0;

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      {/* Search Header */}
      <div className="bg-white border-b border-gray-100 py-12 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-2">
            Kết quả tìm kiếm cho: <span className="text-[#1a5c2a]">"{q}"</span>
          </h1>
          <p className="text-gray-500 font-medium">
            Tìm thấy {results.products.length} sản phẩm & {results.blogs.length} bài viết kỹ thuật.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        {!hasResults ? (
          <div className="text-center bg-white rounded-3xl py-20 border border-gray-100 shadow-sm max-w-4xl mx-auto">
            <div className="text-7xl mb-6">🏜️</div>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Không tìm thấy kết quả nào cho "{q}"</h2>
            <p className="text-gray-500 mb-10 max-w-md mx-auto">
              Rất tiếc, chúng tôi không tìm thấy nội dung phù hợp. Bà con có thể thử tìm kiếm với các từ khóa phổ biến sau:
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {trendingTags.map((tag, i) => (
                <Link 
                  key={i} 
                  href={tag.href}
                  className="px-6 py-2 bg-green-50 text-[#1a5c2a] rounded-full font-bold hover:bg-[#1a5c2a] hover:text-white transition-all border border-green-100"
                >
                  {tag.label}
                </Link>
              ))}
            </div>
            <Link href="/" className="inline-block bg-[#1a5c2a] text-white px-10 py-4 rounded-xl font-black hover:bg-green-700 transition-all shadow-xl shadow-green-100">
              QUAY LẠI TRANG CHỦ
            </Link>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Products Section */}
            {results.products.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-8 bg-[#1a5c2a] rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Sản Phẩm Đề Xuất</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                  {results.products.map((product) => (
                    <div key={product._id} className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group relative">
                      <Link href={`/san-pham/${product.slug}`} className="block relative aspect-square bg-gray-50 rounded-xl overflow-hidden mb-4">
                        <img 
                          src={product.images[0] || "https://placehold.co/400x400/e2e8f0/64748b?text=SP"} 
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 mb-1 uppercase tracking-widest">{product.category}</p>
                        <Link href={`/san-pham/${product.slug}`} className="block">
                          <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-2 hover:text-[#1a5c2a] transition-colors h-10">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-[#ee4d2d] font-black text-lg">
                            {product.price.toLocaleString('vi-VN')}đ
                          </p>
                          <Link href={`/san-pham/${product.slug}`} className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-600 text-xl font-black group-hover:bg-[#1a5c2a] group-hover:text-white transition-all shadow-sm">
                            +
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Blogs Section */}
            {results.blogs.length > 0 && (
              <section>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-1.5 h-8 bg-[#f5a623] rounded-full"></div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Kiến Thức & Kỹ Thuật</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.blogs.map((blog) => (
                    <Link 
                      key={blog._id} 
                      href={`/blog/${blog.slug}`}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={blog.image || "https://placehold.co/800x450/e2e8f0/64748b?text=Blog"} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black text-[#1a5c2a] uppercase">
                          {blog.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#1a5c2a] transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                          {blog.excerpt}
                        </p>
                        <div className="flex items-center text-xs font-bold text-[#1a5c2a] uppercase tracking-wider">
                          ĐỌC CHI TIẾT <span className="ml-2">➜</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <SearchResults />
    </Suspense>
  );
}
