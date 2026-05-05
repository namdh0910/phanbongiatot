# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **Zalo-First & Lead Gen Focus**: Successfully deactivated legacy e-commerce routes (`/gio-hang`, `/checkout`, `/tra-cuu-don-hang`) via `next.config.ts` redirects. Transitioned the Hero CTA from "Mua ngay" to "Xem giải pháp" to focus on agricultural consultation.
  - **Social Proof Automation**: Connected `FloatingSocialProof.tsx` to a new real-time API `/api/leads/recent`. Leads are anonymized (e.g., "Anh B***") to build trust while maintaining privacy.
  - **LCP Optimization**: Refactored the Home Hero section using `next/image` with `priority` and `eager` loading, ensuring an LCP < 2.5s on mobile 4G connections.
  - **Video-First Blog UX**: Optimized `blog/[slug]/page.tsx` to display technical videos above-the-fold with reduced header padding and eager iframe loading.
  - **Typography & Accessibility**: Enforced a minimum **18px** font size for mobile blog content to cater to older farmers.
  - **Safe Area & UI Integrity**: Integrated `env(safe-area-inset-top/bottom)` across Header and StickyCTA components. Fixed z-index (1000) for the Zalo action bar to ensure it's always top-most.
  - **JWT Authentication Upgrade**: Implemented `jose` for secure, stateless admin access.

## 🚧 Active Tasks
- **Pathology Data Enrichment**: Continuing to add real YouTube/TikTok phác đồ URLs to `pathologies.json`.
- **Admin Lead Dashboard**: Enhancing lead management to track consultation results.

## 💡 Key Learnings / Gotchas
- **Above-the-Fold Video**: Positioning the video iframe as high as possible significantly increases watch time for technical agricultural content.
- **Social Proof Sync**: Fetching from real lead data creates a dynamic, "living" feel to the platform compared to static mockups.
- **Notch Compatibility**: Always test sticky elements with safe-area-insets to avoid OS overlay issues.
