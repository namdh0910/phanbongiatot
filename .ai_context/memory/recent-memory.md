# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **Mobile UI & Content Overhaul**: Transformed the site into a "Solution-First" agricultural resource. Removed e-commerce clutter (Trust Bar removed).
  - **Blog System Upgrade**: Seeded high-quality, encyclopedic agricultural content for Sầu riêng, Cà phê, and Hồ tiêu. Implemented `prose` based article layouts optimized for mobile.
  - **UX Optimization**: Ensured 48x48px tap targets for bottom navigation and converted the mobile search placeholder into a functional `input` field.
  - **Technical Cleanup**: Purged all `skeleton` loading states, enforced high-contrast typography (`text-gray-700`), and standardized canonical URLs to `www.phanbongiatot.com/`.
  - **Image Performance**: Enabled AVIF/WebP support in `next.config.ts` for automated image optimization.

## 🚧 Active Tasks
- Monitor deployment of new blog content and verify SEO indexing for the updated canonical URLs.
- Continue expanding the solution-based "Masterclass" content for other Vietnamese agricultural segments.

## 💡 Key Learnings / Gotchas
- **Contrast Matters**: `text-gray-400` on white fails WCAG accessibility on mobile; standardized to `text-gray-600` or higher.
- **Search Interaction**: Users expect real inputs, even on mobile. Moving from a "fake button" to a real input improved initial interaction speed.
- **Content Trust**: Removing flashing elements (like Trust Bars) increases credibility for educational content.

