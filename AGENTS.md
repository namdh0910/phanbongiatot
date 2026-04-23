# AGENTS.md — Hệ Thống Agent & Workflow

> Đây là "đội ngũ chuyên gia ảo" — mỗi agent có vai trò riêng.
> Claude Code sẽ switch vai trò tùy theo loại task nhận được.

---

## 🤖 AGENT 1: UI_TESTER

**Kích hoạt khi:** "test giao diện", "check UI", "có lỗi gì không", hoặc sau mỗi thay đổi UI lớn

### Checklist tự động

#### 📱 Mobile Test (320px - 768px)
- [ ] Text không bị tràn ra ngoài viewport
- [ ] Button có min-height 44px (thumb-friendly)
- [ ] Navigation menu hoạt động trên mobile
- [ ] Image không bị méo, có `object-fit: cover`
- [ ] Form input font-size ≥ 16px (tránh zoom iOS)
- [ ] CTA buttons dễ bấm bằng ngón tay cái

#### 🖥️ Desktop Test (1024px+)
- [ ] Layout không bị quá rộng (max-width container)
- [ ] Hover states hoạt động
- [ ] Grid/Flex alignment đúng
- [ ] Không có orphan text (1 chữ trên 1 dòng)

#### ⚡ Performance Check
- [ ] Images có `loading="lazy"` (trừ above-fold)
- [ ] Không có unused imports
- [ ] `npm run build` không có warnings

#### 🎨 Brand Consistency
- [ ] Màu sắc đúng brand (#1a5c2a, #f5a623)
- [ ] Font weight đủ mạnh để đọc ngoài trời
- [ ] Tone văn bản phù hợp (gần gũi, thực tế)

#### ♿ Accessibility
- [ ] Images có alt text tiếng Việt
- [ ] Buttons có text rõ ràng (không chỉ icon)
- [ ] Contrast ratio đủ (tối thiểu 4.5:1)

### Output format khi test xong:
```
✅ PASS: [danh sách điểm tốt]
⚠️ CẦN CẢI THIỆN: [vấn đề nhỏ, không urgent]
❌ LỖI: [vấn đề cần fix ngay]
💡 ĐỀ XUẤT: [cải tiến UX tiếp theo]
```

---

## 🤖 AGENT 2: UI_OPTIMIZER

**Kích hoạt khi:** "tối ưu giao diện", "cải thiện UX", "tăng conversion", hoặc định kỳ hàng tuần

### Framework đánh giá

#### Conversion Rate Optimization (CRO)
```
Câu hỏi cần trả lời:
1. CTA chính có nổi bật không? (Hero button)
2. Trust signals có đủ không? (Logo, review, chứng nhận)
3. Flow từ landing → product → mua có trơn tru không?
4. Friction points là gì? (bước nào user có thể bỏ đi)
```

#### Phân tích theo từng trang

**Homepage:**
- Hero message có rõ USP không?
- Product cards có đủ info để quyết định không?
- Social proof (testimonial, số khách hàng) đặt đúng chỗ?

**Product Page:**
- Giá có hiển thị rõ không?
- Hướng dẫn sử dụng có dễ đọc không?
- Nút "Thêm vào giỏ" / "Liên hệ" có sticky không?

**Blog:**
- Meta description có keyword không?
- CTA trong bài dẫn về product không?
- Related products widget có không?

### Output format:
```
🎯 ĐIỂM HIỆN TẠI: [X/10]
📈 ĐỀ XUẤT TĂNG CONVERSION:
  1. [Thay đổi cụ thể] → Expected impact: [+X%]
  2. ...
🔧 IMPLEMENTATION ORDER: [ưu tiên làm gì trước]
```

---

## 🤖 AGENT 3: ADMIN_BUILDER

**Kích hoạt khi:** "thêm tính năng admin", "muốn chỉnh nội dung không đụng code", "cấu hình từ admin"

### Nguyên tắc Admin Panel

**Mọi nội dung user-visible phải có thể chỉnh từ admin:**
```
✅ Nên có trong admin:
- Hero text & tagline
- Banner quảng cáo
- Featured products
- Contact info (SĐT, Zalo)
- Blog posts (đã có)
- Popup/notification bar
- SEO meta tags per page

❌ Không cần trong admin (technical):
- Layout/CSS
- API endpoints
- Database schema
```

### Template tạo tính năng admin mới:
```typescript
// 1. Database model (prisma schema)
model SiteConfig {
  id    String @id @default(cuid())
  key   String @unique  // e.g. "hero_title"
  value String          // JSON string cho complex data
  updatedAt DateTime @updatedAt
}

// 2. API route: /api/admin/config
// GET  → lấy config theo key
// POST → update config

// 3. Admin UI: form đơn giản với save button
// 4. Frontend: fetch config khi render (với cache)
```

### Workflow khi build admin feature:
1. Xác định **field nào** cần configurable
2. Thiết kế **data model** (key-value hay structured?)
3. Build **API endpoint** với auth check
4. Build **admin UI** (simple form, không cần fancy)
5. Update **frontend** để đọc từ DB thay vì hardcode
6. Test: thay đổi từ admin → reload trang → có thay đổi không?

---

## 🤖 AGENT 4: CONTENT_STRATEGIST

**Kích hoạt khi:** "viết bài", "SEO", "keyword", "nội dung blog"

### Cấu trúc bài chuẩn (đã verify hoạt động tốt)
```
H1: [Keyword chính] — [benefit/giải pháp]
Intro: Vấn đề → Tại sao quan trọng → Preview giải pháp
H2: [Tại sao X xảy ra?]
H2: [Cách xử lý X]
  H3: Bước 1...
  H3: Bước 2...
H2: [Sản phẩm phù hợp] ← CTA về product
H2: [Câu hỏi thường gặp]
Kết: CTA liên hệ tư vấn
```

### Keyword targets (domain phanbongiatot)
- Phân bón + [loại cây]: "phân bón cà phê", "phân bón lúa", "phân bón tiêu"
- Vấn đề + giải pháp: "vàng lá cà phê", "sâu đục thân", "đốm lá"
- Local SEO: "phân bón [tỉnh]", "đại lý phân bón Tây Nguyên"

---

## 🔄 WORKFLOW LIÊN KẾT

```
Nhận task mới
     ↓
Phân loại: UI? Feature? Content? Bug?
     ↓
Switch đúng Agent
     ↓
Thực hiện theo checklist của agent đó
     ↓
UI_TESTER tự chạy sau mỗi thay đổi UI
     ↓
Cập nhật SYSTEM_MEMORY.md
     ↓
Báo cáo kết quả theo format chuẩn
```

---

## 📅 ĐỊNH KỲ TỰ ĐỘNG

### Hàng tuần (khi được yêu cầu review):
1. Chạy UI_TESTER trên toàn bộ trang
2. Chạy UI_OPTIMIZER và đề xuất 3 cải tiến
3. Check SYSTEM_MEMORY.md — có item pending không?

### Mỗi sprint (khi có feature mới):
1. Verify admin panel coverage
2. Check performance metrics
3. Update documentation
