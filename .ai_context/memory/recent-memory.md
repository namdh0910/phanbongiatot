# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **Modular SiteConfig System**: Implemented a key-value-group based configuration system (`SiteConfig` model + `/api/config`). Replaced the static admin dashboard with a tab-based UI for managing Hero, Contact, Announcement, and SEO settings.
  - **Auto Related Products**: Integrated a smart widget in `blog/[slug]/page.tsx` that automatically matches blog content with relevant products from `products.json` based on tags/categories.
  - **SEO Automation (Auto-Slug)**: Created `slugify.ts` utility and integrated it into the Admin Blog Editor for automatic, SEO-friendly URL generation from titles.
  - **E-commerce Purge**: Finalized the removal of legacy e-commerce folders and `CartContext.tsx`.
  - **Lead System Upgrade**: Added `symptoms` and `urgency` fields to `Lead` model and updated Admin UI for clinical review.

## 🚧 Active Tasks
- **Database Seeding**: Preparing to seed `SiteConfig` with production-ready default values.
- **Pathology Data Enrichment**: Mapping new `SiteConfig` hero values to specific high-conversion solutions.

## 💡 Key Learnings / Gotchas
- **Grouped Configs**: Managing settings by logical groups (Hero, SEO, etc.) prevents the admin UI from becoming cluttered as the site grows.
- **Contextual Matching**: Substring matching between blog tags and product tags provides a reliable "fallback" for related content even with slightly different naming conventions.
- **Slug Verification**: Allowing manual override of auto-generated slugs is critical for long-tail SEO optimization.


