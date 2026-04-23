# PROMPT_FIXES.md — Danh Sách Fix Theo Thứ Tự Ưu Tiên

> Đây là "lệnh tác chiến" — khi anh nói "fix P1" hoặc "làm theo PROMPT_FIXES",
> Antigravity đọc file này và thực hiện từng mục một, tự test sau mỗi bước.

---

## 🔴 P1 — FIX NGAY (ảnh hưởng trực tiếp tới UX)

### P1.1 — Blog AI output ra markdown thô thay vì HTML đẹp
**Status:** ✅ FIXED 23/04/2026

### P1.2 — Upload ảnh đại diện cho bài viết
**Status:** ✅ VERIFIED — dùng Cloudinary upload route /api/upload

### P1.3 — Auto-fill SEO meta description và hashtags
**Status:** ✅ FIXED 23/04/2026 — 2-step AI approach

---

## 🟡 P2 — LÀM TRONG THÁNG NÀY (tăng conversion)

### P2.1 — Trang sản phẩm: Hero section quá cao
**Status:** ⏳ PENDING

### P2.2 — Filter sidebar: Sticky khi scroll
**Status:** ⏳ PENDING

### P2.3 — Product card: Thêm badge "Bán chạy" và rating hiển thị
**Status:** ⏳ PENDING

### P2.4 — Empty state khi filter không có kết quả
**Status:** ⏳ PENDING

### P2.5 — Mobile: Nút lọc floating thay vì sidebar
**Status:** ⏳ PENDING

---

## 🟢 P3 — THÁNG SAU (polish & admin power)

### P3.1 — Admin blog: Live preview bài viết
**Status:** ⏳ PENDING

### P3.2 — Blog: Related products widget cuối bài
**Status:** ⏳ PENDING

---

## ⚙️ P4 — KHÔNG ĐỤNG CODE (Admin config)

### P4.1 — Tạo trang /admin/cai-dat với các config
**Status:** ✅ PARTIAL — đã có /admin/settings với tab Tùy biến Giao diện (hero title, subtitle, banner, primaryColor)
**Còn thiếu:** Announcement bar tab, SEO default tab

---

## 🤖 HƯỚNG DẪN SỬ DỤNG FILE NÀY

| Anh nói | Antigravity làm |
|---------|-----------------|
| "Fix toàn bộ P1" | Fix P1.1 → P1.2 → P1.3, test sau mỗi bước |
| "Fix P1.1" | Chỉ làm mục đó |
| "Review PROMPT_FIXES" | Check code, báo status từng mục |
| "Fix P2" | Fix toàn bộ P2 items |

Sau khi fix xong: "Cập nhật SYSTEM_MEMORY.md"
