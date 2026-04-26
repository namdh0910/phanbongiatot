"use client";
import { useState, useEffect } from "react";
import { API_BASE_URL } from '@/utils/api';
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

// Map slugs to display names. If not in map, we'll try to unslugify.
const slugToName: Record<string, string> = {
  "phan-bon": "Phân bón",
  "thuoc-tru-sau": "Thuốc trừ sâu",
  "kich-re": "Kích rễ",
  "tuyen-trung": "Tuyến trùng",
  "combo-tiet-kiem": "Combo tiết kiệm"
};

const nameToSlug = (name: string) => {
    for (const [s, n] of Object.entries(slugToName)) {
        if (n === name) return s;
    }
    return name.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-");
};

export default function CategoryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    crop: '',
    priceRange: ''
  });

  const categoryName = slugToName[slug] || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // Fetch all categories for sidebar
  useEffect(() => {
    fetch(`${API_BASE_URL}/categories`)
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {});
  }, []);

  // Fetch products with filters and pagination
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchProducts(1, true);
  }, [slug, filters]);

  const fetchProducts = async (pageNum: number, isNew: boolean = false) => {
    setIsLoading(true);
    try {
      let url = `${API_BASE_URL}/products?category=${encodeURIComponent(categoryName)}&page=${pageNum}&limit=12`;
      if (filters.crop) url += `&crop=${encodeURIComponent(filters.crop)}`;
      
      if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-');
        url += `&min_price=${min}&max_price=${max}`;
      }
      
      const res = await fetch(url);
      const data = await res.json();
      
      const newProducts = data.products || [];
      if (isNew) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }
      
      setHasMore(pageNum < data.pages);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching category products:", err);
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(nextPage);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <Breadcrumbs items={[{ label: categoryName }]} />
      
      <div className="bg-white border-b border-gray-100 mb-8 pt-8 pb-8">
        <div className="container mx-auto px-4">
           <div className="max-w-4xl">
              <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase italic">{categoryName}</h1>
              <p className="text-gray-500 text-sm md:text-base mt-2 font-medium">Khám phá bộ sưu tập giải pháp chuyên dụng giúp tăng năng suất vượt trội.</p>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-8">
            {/* Categories */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-4 italic">Chuyên mục</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link 
                      href={`/danh-muc/${nameToSlug(cat.name)}`}
                      className={`flex justify-between items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        categoryName === cat.name 
                        ? "bg-[#1a5c2a] text-white shadow-lg shadow-green-100" 
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${categoryName === cat.name ? "bg-white/20" : "bg-gray-100 text-gray-400"}`}>
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-4 italic">Bộ lọc cây trồng</h3>
              <div className="flex flex-wrap gap-2">
                {["Sầu riêng", "Cà phê", "Hồ tiêu", "Lúa", "Cây ăn trái"].map(crop => (
                  <button 
                    key={crop}
                    onClick={() => setFilters(f => ({ ...f, crop: f.crop === crop ? '' : crop }))}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${
                      filters.crop === crop 
                      ? "bg-[#ee4d2d] text-white border-[#ee4d2d]" 
                      : "bg-white text-gray-500 border-gray-200 hover:border-[#ee4d2d]"
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-4 italic">Khoảng giá</h3>
              <div className="space-y-3">
                {[
                  { label: "Tất cả giá", value: "" },
                  { label: "Dưới 100k", value: "0-100000" },
                  { label: "100k - 500k", value: "100000-500000" },
                  { label: "Trên 500k", value: "500000-9999999" }
                ].map(range => (
                  <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="priceRange" 
                      checked={filters.priceRange === range.value}
                      className="w-4 h-4 text-[#1a5c2a] focus:ring-[#1a5c2a]" 
                      onChange={() => setFilters(f => ({ ...f, priceRange: range.value }))}
                    />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-[#1a5c2a] transition-colors">{range.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Hiển thị: <span className="text-gray-900">{products.length} sản phẩm</span>
               </div>
               <select className="text-xs font-bold text-gray-700 bg-gray-50 border-none rounded-lg focus:ring-0 cursor-pointer">
                  <option>Mới nhất</option>
                  <option>Giá thấp đến cao</option>
                  <option>Giá cao đến thấp</option>
                  <option>Bán chạy nhất</option>
               </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              {isLoading && [1,2,3,4].map(i => (
                 <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse">
                    <div className="aspect-square bg-gray-100 rounded-2xl mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                 </div>
              ))}
            </div>

            {products.length === 0 && !isLoading && (
              <div className="bg-white p-20 text-center rounded-[3rem] border border-dashed border-gray-200">
                 <div className="text-6xl mb-6">🏜️</div>
                 <h3 className="text-xl font-black text-gray-900 mb-2">Chưa tìm thấy sản phẩm phù hợp</h3>
                 <p className="text-gray-500">Bà con vui lòng quay lại sau hoặc thử đổi bộ lọc nhé!</p>
              </div>
            )}

            {hasMore && !isLoading && (
              <div className="text-center mt-12">
                <button 
                  onClick={handleLoadMore}
                  className="bg-white text-[#1a5c2a] border-2 border-[#1a5c2a] px-12 py-3 rounded-2xl font-black text-sm hover:bg-green-50 transition-all shadow-xl shadow-green-100"
                >
                  XEM THÊM SẢN PHẨM ➜
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
