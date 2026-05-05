# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities (Directive 03, 04, 05 DONE)**:
  - **Zalo Dynamic Hook (Directive 05)**: Implemented context-aware Zalo message templates in `StickyCTA` and blog pages. Tin nhắn sẽ tự động điền theo bệnh lý/bài viết khách đang xem.
  - **Admin Quick-Response Scripts**: Built a library of advisory scripts in `src/utils/scripts.ts` and integrated a copy-paste feature into the Admin Lead Dashboard.
  - **Frontend SiteConfig Integration**: The homepage now dynamically consumes configurations from the SiteConfig API (Hero, Hotline, Zalo).
  - **AI SEO Automation**: Blogs now automatically generate SEO Meta Descriptions and Hashtags upon creation via the API.
  - **Solution Page Widget**: Linked pathologies to specific products using a new "Sản phẩm khuyên dùng" widget in `/giai-phap/[slug]`.
  - **Frontend UI/UX Optimization**: Fixed Mobile Footer overlap (`pb-[100px]`) and optimized `StickyCTA` Zalo hook to use zero-latency `document.title` extraction instead of client-side `fetch`. Replaced aggressive `animate-pulse` with subtle `animate-bounce` on the Zalo icon.
  - **Admin Security Hardening**: Migrated admin authentication from insecure `localStorage` to HttpOnly cookies (`/api/admin/login` & `/api/admin/verify`) to prevent XSS attacks. Added a 1.5s artificial delay to mitigate brute-force password guessing.
  - **Hotfix**: Resolved Vercel build type error (`Property 'set' does not exist on type 'Promise<ReadonlyRequestCookies>'`) by properly awaiting `cookies()` in Next.js 16 APIs.
  - **Layout Unification**: Removed hardcoded duplicate `<header>` and `<footer>` sections from the landing page (`src/app/page.tsx`) to enforce a single source of truth via the global `LayoutWrapper`.
  - **Footer Design Sync**: Restored the preferred dark-blue landing page footer design globally by replacing the generic `Footer.tsx` content with it, while maintaining the `pb-[100px]` mobile overlap fix.
  - **Navigation Strictness (Anti-Ecommerce)**: Removed e-commerce related pages (`/san-pham`, `/combo`, `/chinh-sach-*`) from the navigation and footer to strictly enforce the pure lead-generation and consultation model. Footer links now only point to `/blog`, `/ve-chung-toi`, and direct Zalo consultation.
  - **SEO Canonical Fix**: Resolved an issue where all pages inherited the homepage's canonical URL. Implemented `metadataBase` in `layout.tsx` and explicit self-referencing `alternates.canonical` across dynamic routes (`/giai-phap/[slug]`, `/blog/[slug]`) and layout (`/blog/layout.tsx`) to ensure Google indexes all pages correctly.
  - **Video Cleanup (Rickroll Removal)**: Replaced all placeholder "Rickroll" videos (`dQw4w9WgXcQ`) with real technical agricultural videos from the official @phanbongiatot YouTube channel. Integrated dynamic video mapping for specific pathologies (e.g., Vàng lá thối rễ) and updated fallback data in Blog/Solutions.
  - **Structured Data (Schema Markup)**: Implemented JSON-LD Schema markup across the site. Added `FAQPage` and `HowTo` schemas for all solution pages to improve Google Rich Results (accordions and steps). Integrated `Article` schema for all blog posts with automated metadata. Created a reusable `SchemaMarkup` component.
  - **SEO Content Strategy**: Developed 5 comprehensive, storytelling-based SEO blog articles (800-1200 words each) covering key agricultural pain points (Sầu riêng vàng lá, Tuyến trùng, Cà phê mùa khô, Tiêu chết nhanh/chậm, Kích rễ). Each article includes Meta tags and FAQ Schema.
  - **Technical Fixes (Directive 06)**: 
    - **Video Placeholder UI**: Implemented a professional "Video đang cập nhật" UI with a direct call-to-engineer CTA for pages using placeholder YouTube IDs (`WQGLo4yJjI0`, `dQw4w9WgXcQ`).
    - **Canonical URL Standardization**: Fixed `/blog` canonical tag to use the absolute `www.phanbongiatot.com` domain to ensure correct Google indexing.
    - **Broken Link & 301 Redirect**: Corrected the "Vàng lá thối rễ" menu link from a 404 path to the active `/giai-phap/vang-la-thoi-re` and implemented a server-side 301 redirect in `next.config.ts`.
    - **Duplicate Footer Removal**: Scrubbed redundant manual `<Footer />` calls (e.g., in `tai-khoan/page.tsx`), enforcing the global `LayoutWrapper` as the single source of truth.
  - **SEO Metadata Optimization (Directive 07)**:
    - **Homepage & Blog**: Rewritten Title and Meta tags to target keywords "Phân bón Đắk Lắk", "Kỹ sư nông nghiệp Tây Nguyên" with farmer-friendly tone.
    - **Solution Pages**: Injected optimized SEO strings into `pathologies.json` for "Vàng lá thối rễ", "Tuyến trùng", and "Hồ tiêu chết nhanh" to drive high-conversion search traffic.
  - **Agricultural Content Creation (Directive 08)**: 
    - Authored a 1500+ word technical blog post: "Sầu Riêng Vàng Lá Thối Rễ: Kỹ Sư Chỉ Đúng Cách Cứu Vườn Trong 7 Ngày".
    - Content features: Storytelling (Anh Hùng - Cư M'gar), practical symptoms, 3-phase biological recovery protocol (Days 1-7), and detailed dosage for farmers.
    - Optimized for SEO keywords: "sầu riêng vàng lá thối rễ", "kỹ sư nông nghiệp Tây Nguyên".
  - **Dynamic Content Architecture (Directive 09)**:
    - **Eliminated Front-end Fallbacks**: Removed all hardcoded demo data from Blog and Solution pages. The site now strictly relies on API responses.
    - **Product & Pathology Migration**: Created Mongoose models and CRUD APIs for Products and Pathologies. Transitioned frontend components to fetch from these APIs.
    - **Admin Synchronization**: Linked Admin Dashboards to the new DB-backed APIs, enabling real-time content management.
    - **Seed Automation**: Built migration scripts to move legacy JSON data into MongoDB.


## 🚧 Active Tasks
- **UI Testing**: Verified mobile responsiveness and conversion hooks on localhost.
- **System Sync**: Finalizing the synchronization of all directives in `COMMUNICATION_BRIDGE.md`.

## 💡 Key Learnings / Gotchas
- **Contextual Zalo Links**: Using `encodeURIComponent` with dynamic page titles significantly improves the professionalism of the first touchpoint in the sales funnel.
- **Advisory Scripts**: Providing pre-vetted scripts for admins reduces response time and ensures technical accuracy in farmer consultations.
- **Dynamic Context**: Using `useParams` in global components like `StickyCTA` allows for page-specific behavior without passing props through the entire layout tree.
