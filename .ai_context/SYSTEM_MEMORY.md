# SYSTEM_MEMORY.md — Bộ Nhớ Hệ Thống

> File này là "nhật ký sống" — cập nhật sau mỗi session làm việc quan trọng.
> Claude Code đọc file này để không hỏi lại những gì đã làm.

---

## 📊 TRẠNG THÁI DỰ ÁN

**Cập nhật lần cuối:** 05/05/2026 — Pivot to Solution-Based Landing Page
**Phase hiện tại:** Phase 4 — Content Expansion & CRM Integration
**Health:** ✅ Healthy — New high-conversion landing page active

### Trang đã hoàn thiện
- [x] Homepage (Hero dynamic từ Settings, Trust Bar, Products)
- [x] Admin Blog (AI Tự Viết 2-step với Gemini)
- [x] Admin layout/sidebar (WordPress-style)
- [x] Admin Settings (Cài đặt + Tùy biến giao diện không đụng code)
- [x] Admin Analytics/Dashboard
- [x] Admin Orders (bộ lọc trạng thái)
- [x] SettingsContext — hotline/zalo/shopee động toàn site
- [x] Pop-up khuyến mãi
- [ ] AI tự điền ảnh minh họa trong bài (đang fix — 2-step approach đã làm)
- [ ] AI tự điền ảnh đại diện, hashtags, SEO excerpt (đang test)
- [x] Product listing page
- [x] Cart & Checkout (với Upsell & Free Ship hint)
- [x] SEO optimization (Autocomplete + Blog suggestions)
- [x] Mobile Sticky CTA
- [x] Security (Order access control fixed)

---

## 🧠 QUYẾT ĐỊNH ĐÃ CHỐT

### Stack thực tế (QUAN TRỌNG — khác với template CLAUDE.md)
```
Stack thực tế:
  Frontend: Next.js 14 App Router + TypeScript + Tailwind CSS
  Backend:  Express.js (Node.js) — PORT 5000
  Database: MongoDB Atlas (KHÔNG phải PostgreSQL/Prisma)
  Auth:     Custom JWT (bcrypt + jsonwebtoken)
  Storage:  Cloudinary (ảnh sản phẩm, blog)
  AI:       Google Gemini (gemini-2.5-flash-lite)

KHÁC với CLAUDE.md template:
  - Không dùng Prisma, không dùng PostgreSQL
  - Backend là Express riêng, không phải Next.js API routes
  - Auth là custom JWT, không phải NextAuth
```

### AI Integration — 2-step approach (chốt 23/04/2026)
```
Vấn đề: JSON.parse fail khi HTML content có dấu nháy đặc biệt
Giải pháp: Tách 2 lần gọi AI riêng biệt
  Bước 1: callAI(contentPrompt) → HTML thuần (không JSON)
  Bước 2: callAI(metaPrompt)   → JSON: { excerpt, tags[], image }
File: backend/controllers/aiController.js
Status: ✅ Implemented, cần verify UI nhận đủ 4 fields
```

### API Key Gemini (QUAN TRỌNG)
```
Key AIzaSyAQ-... → DEAD (quota = 0)
Key AIzaSyAw-... → DEAD (quota = 0)
Key AIzaSyA5PP-... → ✅ ACTIVE
Model: gemini-2.5-flash-lite
Model list: gemini-2.5-flash, gemini-2.5-pro, gemini-2.0-flash, gemini-2.5-flash-lite
```

### Admin Auth
```
Type: Custom JWT
Login: POST /api/admin/login
Token: localStorage.getItem("adminToken")
Guard: AdminGuard component (check token, redirect /admin/login)
Status: ✅ Working
```

### Settings (Dynamic Site Config)
```
Model: Settings.js (MongoDB)
Fields: siteName, hotline, zalo, shopee, address, email, facebook,
        heroTitle, heroSubtitle, heroBanner, primaryColor, showBlogOnHome
Context: SettingsContext.tsx (bọc toàn bộ layout)
Admin UI: /admin/settings — 2 tab: "Cài đặt chung" + "Tùy biến Giao diện"
Status: ✅ Working
```

---

## 📝 SESSION LOG

### Session 05/05/2026 — Major Pivot: Solution-First Landing Page (DEPLOYED)
```
Vấn đề: Cần chuyển đổi hoàn toàn từ mô hình e-commerce sang tư vấn kỹ thuật chuyên sâu để xây dựng niềm tin với nông dân.
Đã làm:
- Thiết kế và triển khai Landing Page mới tại `/` (thay thế trang chủ cũ).
- Loại bỏ hoàn toàn các thành phần e-commerce (giỏ hàng, giá cả, thanh toán).
- Tập trung vào các thẻ "Giải pháp Chuyên sâu" (Sầu riêng, Cà phê).
- Tích hợp dữ liệu thực từ API cho Blog và Settings (Hotline, Zalo dynamic).
- Thêm Sticky Action Bar trên mobile để tối ưu chuyển đổi tư vấn.
- Tối ưu hóa SEO và trải nghiệm đọc cho nông dân.
```

### Session 04/05/2026 — Sprint 2: Analytics & Conversion (DEPLOYED)
```
Đã làm:
- Admin Dashboard: Kết nối dữ liệu thực (doanh thu tháng/tuần, tăng trưởng %, hàng tồn, biểu đồ 30 ngày).
- Checkout CRO: Thêm Upsell section (Best sellers), Free shipping hint, và validate SĐT real-time.
- Mobile UX: Thêm Sticky CTA (Mua ngay) cho trang chi tiết sản phẩm.
- Search: Tối ưu autocomplete dùng /api/search (nhanh hơn), thêm gợi ý bài viết Blog.
- Security: Fix Audit #12 — Chặn truy cập trái phép đơn hàng giữa các seller và khách vãng lai.
- Performance: Fix Layout Shift bằng Skeletons trên trang tìm kiếm.
- Deployment: Push code lên origin main (đã build test OK).

### Session 04/05/2026 (Tối) — Fix Product Detail UX & Tabs (DEPLOYED)
```
Vấn đề: Layout phần Kỹ thuật và Mô tả bị lộn xộn, không highlight tab khi cuộn, anchor jump bị lệch.
Đã làm:
- Tạo ProductTabs (Client Component) hỗ trợ highlight active tab & smooth scroll.
- Reorder: Đưa Chi tiết sản phẩm (Mô tả) lên trước Phác đồ kỹ thuật.
- Nâng cấp UI phần Phác đồ kỹ thuật: rounded-3xl, shadow, icon custom premium.
- Fix sticky header offset (top-[64px]).
- Build test OK và push code lên origin main.
```

### Session 04/05/2026 (Chiều) — Fix Product Detail Crash (DEPLOYED)
```
Vấn đề: Nhấp vào chi tiết sản phẩm bị lỗi "This page couldn't load" do dữ liệu hình ảnh từ API không đồng nhất (object vs string) gây crash Server Component.
Đã làm:
- Tạo src/utils/image.ts để xử lý hình ảnh an toàn.
- Fix ProductDetail, ProductCard, ProductGallery, ProductStickyCTA để dùng helper mới.
- Thêm safety checks cho Promise.all fetches và Date parsing.
- Build test OK và push lên origin main.
```
```

### Session 23/04/2026 — UI Audit & AI Enhancements
```
Đã làm:
- Fix cleanGeminiOutput() triệt để markdown (bullets, bold) lồng trong HTML.
- Update AI Prompt: Cấu trúc H2/H3 rõ ràng, danh sách bắt buộc dùng <ul><li>.
- Homepage: Giảm padding Trust bar, section spacing hợp lý.
- Product Card: Thêm placeholder đẹp (gradient + emoji) cho sản phẩm thiếu ảnh.
- Category Page: Giảm hero height, tối ưu không gian hiển thị sản phẩm.
- Admin: Thêm cảnh báo ⚠️ cho sản phẩm thiếu ảnh trong danh sách.
- Admin Settings: Bổ sung fields SĐT hiển thị, Zalo ID, CTA Text, Announcement, Footer.
```

### Session trước (23/04/2026 sáng) — AI Integration + System Files

### Session trước (22/04/2026) — Admin + Settings
```
Đã làm:
- WordPress-style admin (sidebar, bảng, form)
- AdminGuard + Login page riêng
- SettingsContext — hotline/zalo/shopee động toàn site
- Analytics Dashboard
- Orders management với filter
- Blog AI Writer (version 1 — single call)
```

---

## 🔑 ENV VARIABLES (thực tế)

```
# AI
GEMINI_API_KEY=AIzaSyA5PP95...  ✅ Active

# Database
MONGO_URI=mongodb+srv://...     ✅ Active (MongoDB Atlas)

# Auth
JWT_SECRET=...                  ✅ Active

# Storage
CLOUDINARY_CLOUD_NAME=dztidbkhv ✅ Active
CLOUDINARY_API_KEY=...          ✅ Active
CLOUDINARY_API_SECRET=...       ✅ Active

# (Không dùng)
NEXTAUTH_SECRET=                ❌ Không dùng
DATABASE_URL=                   ❌ Không dùng (MongoDB, không phải SQL)
```

---

## 🐛 BUG LOG

### Đang mở
- [ ] AI ảnh minh họa trong bài: loremflickr URL đôi khi không render trong ReactQuill
- [ ] AI excerpt/tags/image: chưa confirm hiển thị đúng trên UI (cần test)
- [ ] Admin Settings tab Tùy biến: cần verify save + homepage nhận đúng

### Đã fix
- [x] AI model 404: gemini-1.5-flash không hỗ trợ → đổi sang gemini-2.5-flash-lite
- [x] AI quota 0: key cũ hết quota → dùng key mới AIzaSyA5PP...
- [x] JSON.parse fail: HTML có dấu nháy → tách 2-step approach
- [x] Markdown wrapper: AI trả ```html → stripMarkdown()
- [x] Excerpt undefined: AI trả `description` → map về `excerpt`
- [x] Port 5000 EADDRINUSE: nodemon crash khi save → kill port, restart

---

## 💡 BACKLOG

### Priority 1 — Must have
- [ ] Verify AI tự điền đủ 4 fields (excerpt, tags, image, content)
- [ ] Thay loremflickr bằng ảnh Cloudinary hoặc Unsplash API ổn định hơn
- [ ] SEO meta tags per page

### Priority 2 — Should have
- [ ] Related products widget trong blog
- [ ] Sticky Zalo/Phone button trên mobile
- [ ] Auto sitemap.xml

### Priority 3 — Nice to have
- [ ] A/B test hero text
- [ ] Social sharing OG tags
- [ ] Notification bar (announcement bar)

---

## 📞 CONTACT & DEPLOYMENT

```
Domain: phanbongiatot.com
Hotline: 0773.440.966
Zalo: 0773440966
Shopee: phanbongiatot
Dev Frontend: localhost:3000
Dev Backend:  localhost:5000
Production: https://phanbongiatot.com (Đã push code mới 04/05/2026)
Admin URL: /admin/login
```
