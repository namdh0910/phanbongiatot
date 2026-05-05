# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **Major Architectural Refactor**: Unified the project into a single Next.js App Router structure. Deleted redundant `frontend/` and `scratch/` folders. Organized `src/components` into atomic categories (`ui`, `layout`, `shared`, `solution`).
  - **API Migration (Settings & Leads)**: Migrated backend logic to Next.js API Routes (`/api/settings`, `/api/leads`). Established a TypeScript-based MongoDB connection and models for centralized management of Hotline/Zalo/Leads.
  - **Dynamic Data Binding**: Integrated the new APIs with `SettingsContext`, `MobileBottomBar`, `StickyCTA`, and `LeadForm`. All contact points now update in real-time based on database configuration.
  - **Agricultural-First Lead Capture**: Upgraded `LeadForm` to include crop types and pathology categories, ensuring technical engineers have enough context for consultations.
  - **SEO-Ready Dynamic Routing**: Created dynamic route templates for `/giai-phap/[slug]` and `/san-pham/[slug]` focusing on solution-based landing pages.
  - **System-Wide UI/UX Upgrade**: Refined the Mobile Header, added a scrollable crop-category bar, and a global Scroll Progress Indicator.
  - **Trust & Credibility Enhancement**: Integrated 'Brand Trust Marquee', 'Kỹ sư thực tế' Video section, and upgraded Social Proof.

## 🚧 Active Tasks
- **Telegram/Email Notification Integration**: Implement a utility to notify engineers when a new lead is captured.
- **Solution Content Migration**: Move existing crop solution data into `src/data/solutions.json`.
- **Mobile UI Polishing**: Ensure all moved components maintain their styling and responsive behavior.
- **Admin Dashboard (Phase 2)**: Plan a simple interface to manage Settings and view Leads.

## 💡 Key Learnings / Gotchas
- **Solution > Product**: Farmers respond better to "How to fix yellow leaves" than a generic product bottle image.
- **Trust-First**: Removing e-commerce clutter significantly increases the professional expert feel of the brand.
- **Zalo is King**: Immediate chat availability is the highest-converting CTA for the Vietnamese agricultural segment.

