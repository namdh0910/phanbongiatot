# AUTOMATION.md — Workflow Tự Động Hóa

> Các quy trình tự động hóa đã setup và còn cần setup cho phanbongiatot.com

---

## ✅ ĐÃ CÓ (Đang hoạt động)

### 1. AI Blog Writer (Gemini)
```
Trigger: Admin nhập tiêu đề bài → bấm "AI Tự Viết"
Process: 
  title → Gemini API → full article (H2, H3, lists, tips)
Output: Điền vào rich text editor
Files: aiController.js, admin/blog/page.tsx
Status: ✅ Working
```

---

## 🔧 CẦN BUILD (Automation quan trọng)

### 2. AI Blog Enhancer — Sinh ảnh + SEO
```
Trigger: Sau khi bài được sinh xong
Process:
  a) Gọi Gemini → sinh meta description
  b) Gọi Gemini → đề xuất 5 hashtags
  c) Gọi image API → sinh ảnh đại diện (nếu có budget)
  d) Auto-save draft

Prompt template cho meta:
  "Viết meta description 150-160 ký tự cho bài: '{title}'. 
   Phải có keyword chính, lợi ích rõ ràng, kêu gọi click."

Prompt template cho hashtags:
  "Đề xuất 5 hashtag tiếng Việt không dấu cho bài về '{topic}' 
   trong lĩnh vực nông nghiệp/phân bón. Chỉ trả về hashtag, 
   mỗi cái một dòng, có dấu #"
```

### 3. Admin Site Config — Không đụng code
```
Trigger: Admin vào /admin/cai-dat
Process: Form WYSIWYG → save → frontend tự reload config

Config items cần có:
  HERO:
    - hero_title_line1: "Năng Suất Vượt"
    - hero_title_line2: "Trội Chi Phí Tối Ưu"
    - hero_subtitle: "Hàng ngàn nhà nông..."
    - hero_cta_primary: "Nhận Tư Vấn Miễn Phí"
    - hero_cta_secondary: "Xem Sản Phẩm"
  
  CONTACT:
    - phone_primary: "0773.440.966"
    - zalo_id: "0773440966"
    - business_hours: "7:00 - 21:00"
  
  ANNOUNCEMENT_BAR:
    - enabled: true/false
    - message: "🔥 Khuyến mãi tháng 4..."
    - bg_color: "#f5a623"
  
  SEO_DEFAULT:
    - site_name: "PhânBónGiáTốt"
    - og_image: "/images/og-default.jpg"
    - default_description: "..."

Implementation:
  DB: SiteConfig model (key, value, group)
  API: GET /api/config?group=hero
  Cache: revalidate every 60s + ISR
  Admin UI: Tab-based form, save per group
```

### 4. Auto Related Products trong Blog
```
Trigger: Khi render bài viết blog
Process:
  - Parse keywords từ bài (hoặc lấy từ hashtags)
  - Query products có keyword match
  - Hiển thị widget "Sản phẩm liên quan" cuối bài

Fallback: Nếu không match → show 3 products bán chạy nhất
```

### 5. SEO Auto-Generate
```
Trigger: Publish bài blog / thêm sản phẩm mới
Process:
  a) Auto tạo slug từ tiêu đề (loại bỏ dấu)
  b) Auto generate OG tags (title, description, image)
  c) Cập nhật sitemap.xml
  d) Ping Google Search Console (optional)
```

---

## 📋 AUTOMATION TEMPLATES

### Template: Gemini API call
```javascript
// lib/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export async function generateBlogContent(title, additionalContext = '') {
  const prompt = `
Bạn là chuyên gia nông nghiệp Việt Nam. Viết bài blog SEO chuẩn cho website bán phân bón.

Tiêu đề: "${title}"
${additionalContext}

Yêu cầu:
- Viết bằng tiếng Việt, giọng văn gần gũi với nông dân
- Độ dài: 800-1200 từ
- Cấu trúc: H2, H3 rõ ràng
- Cuối bài có section "Sản phẩm phù hợp" và CTA liên hệ
- Không dùng từ hoa mỹ, phải thực tế và hữu ích
- Format: HTML (dùng <h2>, <h3>, <p>, <ul>, <li>, <strong>)
  `;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateMetaDescription(title, content) {
  const prompt = `
Viết meta description 150-160 ký tự cho bài SEO sau.
Tiêu đề: "${title}"
Nội dung tóm tắt: "${content.slice(0, 500)}"

Yêu cầu: có keyword, lợi ích cụ thể, kêu gọi click.
Chỉ trả về meta description, không thêm gì khác.
  `;
  
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function generateHashtags(title) {
  const prompt = `
Tạo 5 hashtag tiếng Việt không dấu cho bài: "${title}"
Lĩnh vực: nông nghiệp, phân bón, cây trồng.
Format: mỗi hashtag một dòng, có dấu #
Chỉ trả về hashtags, không thêm gì khác.
  `;
  
  const result = await model.generateContent(prompt);
  return result.response.text().trim().split('\n').filter(Boolean);
}
```

### Template: Site Config API
```typescript
// app/api/config/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/config?group=hero
export async function GET(req: NextRequest) {
  const group = req.nextUrl.searchParams.get('group');
  
  const configs = await prisma.siteConfig.findMany({
    where: group ? { group } : undefined,
  });
  
  // Transform array → object
  const result = configs.reduce((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {} as Record<string, string>);
  
  return NextResponse.json(result, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate' }
  });
}

// POST /api/admin/config (with auth)
export async function POST(req: NextRequest) {
  const { key, value, group } = await req.json();
  
  const config = await prisma.siteConfig.upsert({
    where: { key },
    update: { value },
    create: { key, value, group: group || 'general' },
  });
  
  return NextResponse.json(config);
}
```

### Template: Admin UI Test Checklist (Tự động chạy)
```
Khi hoàn thành bất kỳ UI task nào, chạy checklist này:

MOBILE (simulate 375px):
□ Không scroll ngang
□ Text đọc được (>14px)
□ Buttons bấm được (>44px height)
□ Images load đúng

DESKTOP (1200px):
□ Layout không vỡ
□ Hover effects hoạt động
□ No overflow

FUNCTIONALITY:
□ Form submit hoạt động
□ Error states hiển thị đúng
□ Loading states có spinner
□ Empty states có message

ADMIN-SPECIFIC:
□ Save button có feedback (loading + success toast)
□ Xác nhận trước khi xóa
□ Phân quyền đúng (admin only routes)
```

---

## 🔄 TRIGGER WORDS (Khi anh nhắc → tự hiểu)

| Anh nói | Claude làm |
|---------|-----------|
| "test lại đi" | Chạy UI_TESTER checklist đầy đủ |
| "tối ưu giao diện" | Chạy UI_OPTIMIZER, đề xuất 3 thứ |
| "thêm vào admin" | Dùng ADMIN_BUILDER template |
| "ghi nhớ lại" | Update SYSTEM_MEMORY.md |
| "viết bài về X" | Dùng CONTENT_STRATEGIST + Gemini template |
| "không đụng code" | Build admin config cho feature đó |
| "review lại toàn bộ" | Chạy tất cả agents, báo cáo đầy đủ |
| "update memory" | Cập nhật SYSTEM_MEMORY.md với việc vừa làm |
