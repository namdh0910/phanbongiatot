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

## 🚧 Active Tasks
- **UI Testing**: Verified mobile responsiveness and conversion hooks on localhost.
- **System Sync**: Finalizing the synchronization of all directives in `COMMUNICATION_BRIDGE.md`.

## 💡 Key Learnings / Gotchas
- **Contextual Zalo Links**: Using `encodeURIComponent` with dynamic page titles significantly improves the professionalism of the first touchpoint in the sales funnel.
- **Advisory Scripts**: Providing pre-vetted scripts for admins reduces response time and ensures technical accuracy in farmer consultations.
- **Dynamic Context**: Using `useParams` in global components like `StickyCTA` allows for page-specific behavior without passing props through the entire layout tree.
