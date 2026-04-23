# SKILLS.md — Component Patterns & UI Skills

> Thư viện pattern chuẩn cho phanbongiatot.com
> Dùng lại thay vì viết lại từ đầu mỗi lần.

---

## 🎨 DESIGN TOKENS

```css
/* Colors */
--green-primary: #1a5c2a;
--green-light: #2d7a3e;
--green-dark: #0f3a1a;
--yellow-accent: #f5a623;
--yellow-light: #fbb940;
--white: #ffffff;
--gray-bg: #f8f9fa;
--text-dark: #1a1a1a;
--text-muted: #666666;

/* Tailwind equivalents */
/* green-primary  → custom, dùng style trực tiếp hoặc extend config */
/* yellow-accent  → amber-500 gần đúng */

/* Typography */
--font-hero: 700 48px/1.1;      /* Hero title mobile */
--font-section: 700 28px/1.3;   /* Section heading */
--font-body: 400 16px/1.6;      /* Body text */
--font-small: 400 14px/1.5;     /* Labels, meta */

/* Spacing */
--section-py: 60px;             /* Desktop section padding */
--section-py-mobile: 40px;      /* Mobile section padding */
--container-max: 1200px;
```

---

## 🧩 COMPONENT PATTERNS

### 1. Hero Section
```tsx
// Pattern chuẩn cho hero — đã test, conversion tốt
<section className="relative bg-[#1a5c2a] text-white min-h-[500px] flex items-center">
  <div className="container mx-auto px-4 py-16">
    {/* Badge */}
    <span className="inline-block bg-[#f5a623] text-white text-sm font-bold 
                     px-4 py-1 rounded-full mb-4 uppercase tracking-wide">
      Giải pháp nông nghiệp hiệu quả cao
    </span>
    
    {/* Headline — 2 màu */}
    <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
      <span className="text-white">Năng Suất Vượt</span><br/>
      <span className="text-[#f5a623]">Trội Chi Phí Tối Ưu</span>
    </h1>
    
    {/* Subtext */}
    <p className="text-lg text-green-100 mb-8 max-w-xl">
      Hàng ngàn nhà nông đã tin dùng bộ giải pháp của chúng tôi.
    </p>
    
    {/* CTA Group */}
    <div className="flex flex-wrap gap-4">
      <button className="bg-[#f5a623] hover:bg-[#fbb940] text-white font-bold 
                         px-8 py-4 rounded-lg text-lg transition-colors">
        📞 Nhận Tư Vấn Miễn Phí
      </button>
      <button className="border-2 border-white text-white hover:bg-white/10 
                         font-bold px-8 py-4 rounded-lg text-lg transition-colors">
        Xem Sản Phẩm
      </button>
    </div>
  </div>
</section>
```

### 2. Trust Bar (4 USPs)
```tsx
<div className="bg-white shadow-sm py-6">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { icon: '🏆', title: 'Chính Hãng', sub: 'Cam kết 100%' },
        { icon: '👨‍🔬', title: 'Kỹ Sư Tận Tâm', sub: 'Tư vấn kỹ thuật' },
        { icon: '🚚', title: 'Giao Toàn Quốc', sub: 'Kiểm tra nhận hàng' },
        { icon: '💰', title: 'Giá Tốt Nhất', sub: 'Trực tiếp từ kho' },
      ].map((item) => (
        <div key={item.title} className="flex items-center gap-3">
          <span className="text-3xl">{item.icon}</span>
          <div>
            <div className="font-bold text-[#1a5c2a]">{item.title}</div>
            <div className="text-sm text-gray-500">{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
```

### 3. Product Card
```tsx
interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  unit: string;
  badge?: string; // "Bán chạy", "Mới", "Khuyến mãi"
  slug: string;
}

function ProductCard({ name, image, price, unit, badge, slug }: ProductCardProps) {
  return (
    <Link href={`/san-pham/${slug}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow 
                      border border-gray-100 overflow-hidden group">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img src={image} alt={name} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
               loading="lazy" />
          {badge && (
            <span className="absolute top-2 left-2 bg-[#f5a623] text-white text-xs 
                             font-bold px-2 py-1 rounded">
              {badge}
            </span>
          )}
        </div>
        
        {/* Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2">{name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[#1a5c2a] font-bold text-lg">
                {price.toLocaleString('vi-VN')}đ
              </span>
              <span className="text-gray-400 text-sm">/{unit}</span>
            </div>
            <button className="bg-[#1a5c2a] text-white text-sm px-3 py-1.5 rounded-lg
                               hover:bg-[#2d7a3e] transition-colors">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
```

### 4. Section Header
```tsx
// Dùng cho mọi section có title
<div className="text-center mb-10">
  <h2 className="text-3xl md:text-4xl font-black text-[#1a5c2a] mb-3">
    {title}
  </h2>
  <p className="text-gray-500 max-w-xl mx-auto">{subtitle}</p>
  {/* Decorative line */}
  <div className="w-16 h-1 bg-[#f5a623] mx-auto mt-4 rounded-full" />
</div>
```

### 5. Admin Form Field (chuẩn cho admin panel)
```tsx
// Pattern cho mọi field trong admin
<div className="mb-4">
  <label className="block text-sm font-semibold text-gray-700 mb-1">
    {label}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
  <input
    type="text"
    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm
               focus:ring-2 focus:ring-[#1a5c2a] focus:border-transparent outline-none"
    {...props}
  />
  {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
</div>
```

### 6. Status Badge
```tsx
// Dùng trong admin tables
const statusConfig = {
  active: { label: 'Công khai', color: 'bg-green-100 text-green-700' },
  draft: { label: 'Nháp', color: 'bg-gray-100 text-gray-600' },
  featured: { label: 'Nổi bật', color: 'bg-yellow-100 text-yellow-700' },
};

<span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusConfig[status].color}`}>
  {statusConfig[status].label}
</span>
```

### 7. Empty State
```tsx
<div className="text-center py-16 text-gray-400">
  <div className="text-5xl mb-4">📦</div>
  <p className="text-lg font-medium">Chưa có {itemName}</p>
  <p className="text-sm mt-1">Thêm {itemName} mới để bắt đầu</p>
  {onAdd && (
    <button onClick={onAdd} className="mt-4 bg-[#1a5c2a] text-white px-6 py-2 
                                       rounded-lg text-sm hover:bg-[#2d7a3e]">
      + Thêm mới
    </button>
  )}
</div>
```

### 8. Loading Skeleton
```tsx
// Dùng khi đang fetch data
<div className="animate-pulse">
  <div className="bg-gray-200 rounded-lg h-48 mb-3" />
  <div className="bg-gray-200 rounded h-4 w-3/4 mb-2" />
  <div className="bg-gray-200 rounded h-4 w-1/2" />
</div>
```

---

## 📱 RESPONSIVE PATTERNS

### Container chuẩn
```tsx
<div className="container mx-auto px-4 max-w-[1200px]">
```

### Grid responsive
```tsx
// 1 col mobile → 2 col tablet → 3-4 col desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
```

### Text responsive
```tsx
// Hero
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black"
// Section heading
className="text-2xl md:text-3xl lg:text-4xl font-bold"
// Body
className="text-base md:text-lg"
```

---

## 🔧 UTILITY FUNCTIONS

```typescript
// Format giá tiền VN
export const formatPrice = (price: number): string => 
  price.toLocaleString('vi-VN') + 'đ';

// Truncate text
export const truncate = (text: string, length: number): string =>
  text.length > length ? text.slice(0, length) + '...' : text;

// Slug từ tiếng Việt
export const toSlug = (text: string): string =>
  text.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .trim();

// Format date tiếng Việt
export const formatDate = (date: Date): string =>
  new Intl.DateTimeFormat('vi-VN', { 
    day: '2-digit', month: '2-digit', year: 'numeric' 
  }).format(date);
```

---

## 🚀 API PATTERNS

### Fetch với error handling chuẩn
```typescript
async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } catch (error) {
    console.error(`Fetch error [${url}]:`, error);
    return null;
  }
}
```

### API Route chuẩn (Next.js App Router)
```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // logic
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
```
