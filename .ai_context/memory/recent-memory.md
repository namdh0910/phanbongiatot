# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **Streamlined Admin Dashboard**: Created a unified admin interface at `/admin` with two main sections: Settings and Leads. Used a mobile-first design with Tailwind CSS.
  - **Simple Admin Authentication**: Implemented a static password-based security layer using `ADMIN_PASSWORD` from environment variables. Created a custom `AdminGuard` and login API.
  - **Admin Settings Management**: Developed a form-based interface to update Hotline, Zalo, and Banner messages in real-time.
  - **Admin Lead Management**: Built a leads dashboard that displays farmer consultation requests with automated urgent case flagging (e.g., Root Rot, Nematodes).
  - **Build Failure Resolution**: Fixed global "Module not found" errors by converting all component imports to absolute paths (`@/components/...`).
  - **Dependency Management**: Installed `mongoose` to the root `package.json` to support the new API architecture.

## 🚧 Active Tasks
- **Telegram/Email Notification Integration**: Implement a utility to notify engineers when a new lead is captured.
- **Solution Content Migration**: Move existing crop solution data into `src/data/solutions.json`.
- **Mobile UI Polishing**: Ensure all moved components maintain their styling and responsive behavior.
- **Admin CMS Extension**: (Future) Add functionality to manage Blog posts and Products through the new Admin UI.

## 💡 Key Learnings / Gotchas
- **Solution > Product**: Farmers respond better to "How to fix yellow leaves" than a generic product bottle image.
- **Trust-First**: Removing e-commerce clutter significantly increases the professional expert feel of the brand.
- **Zalo is King**: Immediate chat availability is the highest-converting CTA for the Vietnamese agricultural segment.

