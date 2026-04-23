# SYSTEM_MEMORY.md — Bộ Nhớ Hệ Thống

> File này là "nhật ký sống" — cập nhật sau mỗi session làm việc quan trọng.
> Claude Code đọc file này để không hỏi lại những gì đã làm.

---

## 📊 TRẠNG THÁI DỰ ÁN

**Cập nhật lần cuối:** 23/04/2026 — Session tích hợp AI + Admin Customizer
**Phase hiện tại:** Phase 2 — Feature completion
**Health:** 🟡 Stable — AI working, một số UI field chưa tự điền

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
- [ ] Product listing page (cần review)
- [ ] Cart & Checkout
- [ ] SEO optimization

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
Production: [chưa deploy — cần Render/Vercel]
Admin URL: /admin/login
```
