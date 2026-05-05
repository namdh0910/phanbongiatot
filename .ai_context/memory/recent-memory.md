# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **Build Failure Resolution**: Fixed global "Module not found" errors by converting all component imports to absolute paths (`@/components/...`).
  - **Dependency Management**: Installed `mongoose` to the root `package.json` to support the new API architecture.
  - **TypeScript & Build Optimization**: Resolved type errors in `ProductGallery` and configured API routes as `force-dynamic` to ensure successful Vercel deployment. Verified with a 100% successful local build.
  - **Major Architectural Refactor**: Unified the project into a single Next.js App Router structure. Deleted redundant `frontend/` and `scratch/` folders. Organized `src/components` into atomic categories (`ui`, `layout`, `shared`, `solution`).
  - **API Migration (Settings & Leads)**: Migrated backend logic to Next.js API Routes (`/api/settings`, `/api/leads`). Established a TypeScript-based MongoDB connection and models for centralized management of Hotline/Zalo/Leads.

## 🚧 Active Tasks
- **Telegram/Email Notification Integration**: Implement a utility to notify engineers when a new lead is captured.
- **Solution Content Migration**: Move existing crop solution data into `src/data/solutions.json`.
- **Mobile UI Polishing**: Ensure all moved components maintain their styling and responsive behavior.
- **Admin Dashboard (Phase 2)**: Plan a simple interface to manage Settings and view Leads.

## 💡 Key Learnings / Gotchas
- **Solution > Product**: Farmers respond better to "How to fix yellow leaves" than a generic product bottle image.
- **Trust-First**: Removing e-commerce clutter significantly increases the professional expert feel of the brand.
- **Zalo is King**: Immediate chat availability is the highest-converting CTA for the Vietnamese agricultural segment.

