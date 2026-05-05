# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **Zalo-First & E-commerce Purge**: Completely removed legacy e-commerce folders (`/tra-cuu-don-hang`, `/don-hang`, `/checkout`, etc.) and `CartContext.tsx`. All CTAs now trigger Zalo/Phone consultations.
  - **Data Infrastructure (Lead.ts)**: Upgraded `Lead` model with `city`, `symptoms`, and `urgency` fields. Updated Telegram notifications and Admin Lead dashboard to utilize these clinical data points.
  - **Video-First Blog UX**: Optimized `blog/[slug]/page.tsx` with auto-playing technical videos (muted) and a high-conversion "Zalo Hook" button pre-filled with context-aware messages.
  - **Mobile UI Polish**: Integrated `animate-heartbeat` for the Zalo bottom bar and ensured minimum 18px typography across the site.
  - **Safe Area & UI Integrity**: Verified `env(safe-area-inset-top/bottom)` integration across all sticky components.

## 🚧 Active Tasks
- **Pathology Data Enrichment**: Adding real-world symptom data to `pathologies.json` to leverage new Lead model fields.
- **AI Bot Integration Prep**: Ensuring API structure is ready for future Zalo AI Bot automated responses.

## 💡 Key Learnings / Gotchas
- **Context-Aware CTA**: Adding the blog title to the Zalo pre-filled message significantly lowers the friction for farmers seeking advice.
- **Muted Autoplay**: Using `autoplay=1&mute=1` in YouTube iframes increases engagement without being intrusive on mobile data.
- **Memory Sync**: Maintaining a strict documentation loop ensures architecture consistency across multiple agent sessions.

