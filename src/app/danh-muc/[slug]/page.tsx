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
  const [sortBy, setSortBy] = useState('latest');

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
  }, [slug, filters, sortBy]);

  const fetchProducts = async (pageNum: number, isNew: boolean = false) => {
    setIsLoading(true);
    try {
      let url = `${API_BASE_URL}/products?category=${encodeURIComponent(slug)}&page=${pageNum}&limit=12&sort=${sortBy}`;
      if (filters.crop && filters.crop !== 'Tất cả') url += `&crop=${encodeURIComponent(filters.crop)}`;
      
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

  const cropFilters = ["Tất cả", "Sầu riêng", "Cà phê", "Tiêu", "Lúa", "Rau màu"];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <Breadcrumbs items={[{ label: categoryName }]} />
      
      <div className="bg-white border-b border-gray-100 mb-0 pt-8 pb-4">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mb-6">
               <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase italic">{categoryName}</h1>
               <p className="text-gray-500 text-sm md:text-base mt-2 font-medium">Khám phá bộ sưu tập giải pháp chuyên dụng giúp tăng năng suất vượt trội cho nhà vườn.</p>
            </div>

            {/* Horizontal Crop Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar">
              {cropFilters.map(crop => (
                <button 
                  key={crop}
                  onClick={() => setFilters(f => ({ ...f, crop: crop === 'Tất cả' ? '' : crop }))}
                  className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap border-2 ${
                    (filters.crop === crop || (crop === 'Tất cả' && !filters.crop))
                    ? "bg-[#1a5c2a] text-white border-[#1a5c2a] shadow-lg shadow-green-100 scale-105" 
                    : "bg-white text-gray-400 border-gray-100 hover:border-gray-200"
                  }`}
                >
                  {crop}
                </button>
              ))}
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 space-y-8">
            {/* Categories */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-50 pb-4 italic">Danh mục khác</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.name}>
                    <Link 
                      href={`/danh-muc/${nameToSlug(cat.name)}`}
                      className={`flex justify-between items-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                        categoryName === cat.name 
                        ? "bg-green-50 text-[#1a5c2a]" 
                        : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${categoryName === cat.name ? "bg-[#1a5c2a] text-white" : "bg-gray-100 text-gray-400"}`}>
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
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

            {/* Promo Banner */}
            <div className="bg-[#1a5c2a] rounded-3xl p-8 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <h4 className="font-black text-xl mb-2 italic">MIỄN PHÍ SHIP</h4>
                  <p className="text-xs text-green-200 font-bold mb-4">Cho đơn hàng từ 250k trên toàn quốc.</p>
                  <button className="bg-white text-[#1a5c2a] px-4 py-2 rounded-xl text-[10px] font-black uppercase">Mua ngay ➜</button>
               </div>
               <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 rotate-12">📦</div>
            </div>
          </aside>

          {/* Product List */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Kết quả: <span className="text-gray-900">{products.length} sản phẩm</span>
               </div>
               <select 
                 value={sortBy}
                 onChange={(e) => setSortBy(e.target.value)}
                 className="text-xs font-bold text-gray-700 bg-gray-50 border-none rounded-lg focus:ring-0 cursor-pointer px-4 py-2"
               >
                  <option value="latest">Mới nhất</option>
                  <option value="price-asc">Giá thấp → cao</option>
                  <option value="price-desc">Giá cao → thấp</option>
                  <option value="bestseller">Bán chạy nhất</option>
               </select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              {isLoading && [1,2,3,4,5,6,7,8].map(i => (
                 <div key={i} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 animate-pulse">
                    <div className="aspect-square bg-gray-50 rounded-2xl mb-4"></div>
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                 </div>
              ))}
            </div>

            {products.length === 0 && !isLoading && (
              <div className="bg-white p-20 text-center rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center">
                 <div className="text-6xl mb-6 filter grayscale opacity-20">📦</div>
                 <h3 className="text-xl font-black text-gray-900 mb-2 uppercase tracking-tight italic">Hiện chưa có sản phẩm</h3>
                 <p className="text-gray-500 text-sm max-w-xs font-medium">Bà con vui lòng quay lại sau hoặc liên hệ Hotline <span className="text-[#1a5c2a] font-bold">0773.440.966</span> để được hỗ trợ nhé!</p>
                 <Link href="/" className="mt-8 bg-gray-100 text-gray-600 px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">Quay về trang chủ</Link>
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
