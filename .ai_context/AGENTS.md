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

---

## 🤖 AGENT 5: ORDER_MANAGER

**Kích hoạt khi:** "đặt hàng", "checkout", "thanh toán", "đơn hàng", "vận chuyển", "COD"

### Luồng xử lý đơn hàng
```
Khách → Giỏ hàng → Checkout → Chọn thanh toán → Xác nhận
                                     ↓
                         COD / VNPay / Momo / ZaloPay
                                     ↓
                         SMS/Zalo thông báo Admin
                                     ↓
                         Admin xác nhận → Tạo đơn GHN/GHTK
                                     ↓
                         Khách nhận tracking code
```

### API cần xây dựng
```
POST /api/orders              — Tạo đơn hàng mới
GET  /api/orders/:id          — Chi tiết đơn
GET  /api/orders/track/:code  — Khách tra cứu đơn
PUT  /api/orders/:id/status   — Cập nhật trạng thái (admin)
GET  /api/admin/orders        — Danh sách đơn (admin)
POST /api/payment/vnpay       — Tạo link thanh toán VNPay
POST /api/payment/momo        — Tạo link thanh toán Momo
POST /api/payment/webhook     — Nhận kết quả thanh toán
```

### Order Model
```javascript
{
  orderCode: String,        // PBG-20260424-001
  customer: {
    name, phone, address, province, district, ward
  },
  items: [{ product, qty, price }],
  totalAmount: Number,
  shippingFee: Number,
  paymentMethod: 'COD' | 'VNPay' | 'Momo',
  paymentStatus: 'pending' | 'paid' | 'failed',
  orderStatus: 'new' | 'confirmed' | 'shipping' | 'done' | 'cancelled',
  shippingCode: String,     // Mã GHN/GHTK
  note: String,
  createdAt: Date
}
```

### Checklist khi build order feature
- [ ] Form checkout đủ trường: tên, SĐT, địa chỉ đầy đủ đến xã/phường
- [ ] Validate SĐT Việt Nam (10 số, đầu 03/05/07/08/09)
- [ ] Tính phí ship tự động theo tỉnh/thành
- [ ] Xác nhận đơn qua SMS/Zalo ngay sau khi đặt
- [ ] Admin nhận thông báo Zalo khi có đơn mới
- [ ] Trang theo dõi đơn hàng cho khách (không cần đăng nhập)

---

## 🤖 AGENT 6: MULTI_CHANNEL_PUBLISHER

**Kích hoạt khi:** "đăng lên Facebook", "đăng YouTube", "tự động đăng", "lên lịch bài", "Zalo OA"

### Kênh tích hợp
| Kênh | API | Mục đích |
|---|---|---|
| Facebook Page | Graph API v18+ | Đăng bài, ảnh, video, Story |
| YouTube | Data API v3 | Upload video, Shorts |
| Zalo OA | Zalo API | Broadcast, tin nhắn cá nhân |

### Khung giờ vàng nông nghiệp
```
Sáng: 5:30 - 7:00   — Nhà vườn ra thăm vườn, đọc tin
Trưa: 11:30 - 13:00 — Nghỉ trưa, lướt Facebook
Tối: 19:00 - 21:00  — Sau cơm, xem YouTube
```

### Template đăng bài Facebook từ Blog
```javascript
// Tự động tạo post từ bài blog
function blogToFacebookPost(blog) {
  return {
    message: `🌱 ${blog.title}\n\n${blog.excerpt}\n\n👉 Đọc chi tiết: [LINK]\n\n#PhânBónGiáTốt #${blog.tags.join(' #')}`,
    link: `https://phanbongiatot.com/blog/${blog.slug}`,
    image: blog.image
  };
}
```

### Checklist khi publish đa kênh
- [ ] Facebook: ảnh đúng tỷ lệ 1200x630px
- [ ] Zalo: message không quá 2000 ký tự
- [ ] YouTube: thumbnail bắt mắt, title có keyword
- [ ] Mỗi kênh có nội dung riêng, không copy y chang
- [ ] Có UTM tracking để biết traffic từ kênh nào

### MCP cần cấu hình
```
FACEBOOK_PAGE_ID=xxx
FACEBOOK_PAGE_ACCESS_TOKEN=xxx
YOUTUBE_API_KEY=xxx
YOUTUBE_CHANNEL_ID=UCxxx
ZALO_OA_ACCESS_TOKEN=xxx
```

---

## 🤖 AGENT 7: SALES_BOT

**Kích hoạt khi:** "tư vấn khách", "trả lời comment", "chatbot", "auto reply", "lead", "CRM"

### Phân loại Lead
```
🔴 Lead NÓNG:  Hỏi giá + có tên vùng đất cụ thể → Gọi ngay
🟡 Lead ẤM:   Hỏi kỹ thuật → Gửi bài blog + follow up 24h
🟢 Lead LẠNH: Chỉ xem/like → Remarketing sau 3 ngày
```

### Kịch bản Auto-reply
```
Khách: "giá bao nhiêu?" / "bao nhiêu tiền?"
Bot:   "Dạ [tên sản phẩm] hiện có giá [X]đ/[đơn vị].
        Anh/chị đang canh tác loại cây gì và diện tích bao nhiêu
        để em tư vấn liều lượng phù hợp nhé? 🌱"

Khách: "vàng lá" / "rụng trái" / "thối rễ" / [từ khóa bệnh]
Bot:   "Dạ triệu chứng này em có bài hướng dẫn xử lý chi tiết:
        [Link bài blog liên quan]
        Anh/chị để lại SĐT em cho kỹ sư gọi tư vấn miễn phí nhé!"

Khách: "mua" / "đặt hàng" / "order"
Bot:   "Dạ anh/chị đặt hàng tại đây: [Link sản phẩm]
        Hoặc để lại SĐT em liên hệ hỗ trợ đặt hàng ngay!"
```

### CRM Pipeline
```
Mới vào → Đã liên hệ → Đang tư vấn → Đã chốt → Đã giao → Tái mua
```

### Checklist SALES_BOT
- [ ] Không auto-reply quá 1 lần/30 phút cho cùng user
- [ ] Phàn nàn/khiếu nại → chuyển ngay người thật
- [ ] Lưu lead (tên, SĐT, loại cây) vào DB
- [ ] Báo cáo lead mới qua Zalo cho admin mỗi sáng 7h

---

## 🤖 AGENT 8: CONTENT_PRODUCER

**Kích hoạt khi:** "viết bài", "nội dung chuyên sâu", "3000 từ", "Happy Agri style", "script YouTube"

### Chuẩn bài viết 3000+ từ
```
1. HOOK — Câu chuyện/tâm sự nhà vườn (150-200 từ)
   → Trích dẫn lời thật của nông dân, có địa danh cụ thể

2. MỤC LỤC — 5-7 mục chính (TOC)
   → Giúp người đọc nắm tổng thể, tăng time on page

3. PHÂN TÍCH VẤN ĐỀ (400-500 từ)
   → Cơ chế sinh học/hóa học đằng sau
   → Dùng ẩn dụ dễ hiểu: "Pháo đài túi trứng", "Kẻ sát nhân thầm lặng"
   → Callout box: "Bí mật kỹ thuật" màu cam/vàng

4. SAI LẦM PHỔ BIẾN (300-400 từ)
   → 3-5 sai lầm bà con hay mắc
   → Giải thích TẠI SAO sai (không chỉ nói sai)

5. PHÁC ĐỒ GIẢI PHÁP (500-600 từ)
   → Đặt tên phác đồ: "Quy tắc 3-3-5", "Phương pháp WALSH"
   → Chia bước rõ ràng: Bước 1, Bước 2, Bước 3
   → Callout box xanh lá: highlight điểm quan trọng

6. SẢN PHẨM ĐỀ XUẤT (200-300 từ)
   → Lồng ghép Acti Rooti / Acti Flora / Nemano tự nhiên
   → Giải thích CƠ CHẾ tại sao sản phẩm đó phù hợp
   → Link trực tiếp đến trang sản phẩm

7. LỊCH TRÌNH THỰC HIỆN (200 từ)
   → Bảng biểu: Tháng/Giai đoạn → Việc cần làm → Sản phẩm dùng

8. FAQ — 5 câu hỏi thực tế (300-400 từ)
   → Câu hỏi bà con thực sự hay hỏi (từ comment Facebook)
   → Trả lời ngắn gọn, thực tiễn

9. KẾT + CTA (100-150 từ)
   → Tóm tắt 3 điểm chính
   → Kêu gọi: "Gọi ngay 0773.440.966 để tư vấn miễn phí"

TỔNG: 3000-4000 từ
```

### Quy trình tạo nội dung KHÔNG lỗi token
```
Bước 1: Tạo file HTML riêng trong backend/content/
         → Mỗi bài 1 file, không nhúng vào script
Bước 2: Chạy upload-content.js để đọc file và POST lên API
         → Không viết content trực tiếp trong script
Bước 3: Verify: kiểm tra word count sau khi upload
         → Đạt 3000+ từ mới đánh dấu DONE
```

### File naming convention
```
backend/content/
  rep-sap-diet-tan-goc.html        ← slug bài viết
  ca-phe-nuoi-trai-3-giai-doan.html
  sau-rieng-vang-la-thoi-re.html
  phan-bon-la-dung-cach.html
```

---

## 🤖 AGENT 9: ANALYTICS_REPORTER

**Kích hoạt khi:** "báo cáo", "doanh số", "thống kê", "hiệu quả", "traffic", "conversion"

### Dashboard Admin cần có
```
Hàng ngày:
- Đơn hàng mới hôm nay
- Doanh thu hôm nay
- Lead mới (từ form liên hệ + Messenger + Zalo)
- Bài viết có lượt xem cao nhất

Hàng tuần:
- Top 5 sản phẩm bán chạy
- Nguồn traffic: Facebook / YouTube / Google / Direct
- Conversion rate: Xem bài → Click SP → Đặt hàng
- So sánh với tuần trước

Hàng tháng:
- Tổng doanh thu
- Chi phí / Doanh thu ratio
- Kênh nào hiệu quả nhất
- Đề xuất tối ưu tháng sau
```

### Báo cáo tự động qua Zalo (mỗi sáng 7h)
```
📊 BÁO CÁO NGÀY [DATE]
━━━━━━━━━━━━━━━━━
🛒 Đơn mới: [X] đơn
💰 Doanh thu: [X]đ
👥 Lead mới: [X] người
📱 Facebook reach: [X]
🌐 Website visits: [X]
━━━━━━━━━━━━━━━━━
🔥 Top SP: [tên sản phẩm]
📝 Bài hot: [tiêu đề bài]
```

### Checklist ANALYTICS_REPORTER
- [ ] Google Analytics 4 đã cài tracking code
- [ ] Facebook Pixel đã gắn vào website
- [ ] Events tracking: view_product, add_to_cart, purchase
- [ ] UTM parameters cho mọi link share lên mạng xã hội

---

## 🔄 WORKFLOW LIÊN KẾT (CẬP NHẬT)

```
Nhận task mới
     ↓
Phân loại task
     ↓
┌─────────────────────────────────────┐
│ UI/Bug      → UI_TESTER             │
│ Giao diện   → UI_OPTIMIZER          │
│ Admin feat  → ADMIN_BUILDER         │
│ Đơn hàng    → ORDER_MANAGER         │
│ Đăng bài    → MULTI_CHANNEL_PUB     │
│ Tư vấn KH   → SALES_BOT            │
│ Viết content→ CONTENT_PRODUCER      │
│ Báo cáo     → ANALYTICS_REPORTER    │
└─────────────────────────────────────┘
     ↓
Thực hiện theo checklist agent
     ↓
UI_TESTER review nếu có UI change
     ↓
Cập nhật SYSTEM_MEMORY.md
     ↓
Báo cáo kết quả
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

### Hàng ngày (tự động):
1. ANALYTICS_REPORTER gửi báo cáo sáng 7h qua Zalo
2. SALES_BOT check lead mới, phân loại
3. MULTI_CHANNEL_PUBLISHER đăng bài theo lịch
