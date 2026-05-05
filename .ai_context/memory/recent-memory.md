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

## 🚧 Active Tasks
- **UI Testing**: Verified mobile responsiveness and conversion hooks on localhost.
- **System Sync**: Finalizing the synchronization of all directives in `COMMUNICATION_BRIDGE.md`.

## 💡 Key Learnings / Gotchas
- **Contextual Zalo Links**: Using `encodeURIComponent` with dynamic page titles significantly improves the professionalism of the first touchpoint in the sales funnel.
- **Advisory Scripts**: Providing pre-vetted scripts for admins reduces response time and ensures technical accuracy in farmer consultations.
- **Dynamic Context**: Using `useParams` in global components like `StickyCTA` allows for page-specific behavior without passing props through the entire layout tree.
