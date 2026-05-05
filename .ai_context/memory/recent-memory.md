# Recent Memory (Last 48h)

## 🕒 Current Context
- **Date**: 2026-05-05
- **Latest Activities**: 
  - **JWT Authentication Upgrade**: Replaced the legacy simple token system with a secure JWT-based authentication using the `jose` library. Updated `/api/admin/login` to sign tokens and implemented `/api/admin/verify` for server-side validation.
  - **Admin Security**: Updated `AdminGuard.tsx` to cryptographically verify JWT tokens on each session initialization, ensuring only authorized engineers can access the management dashboard.
  - **Mobile Video Optimization**: Refactored Blog Detail and Solution pages to prioritize Video Phác Đồ. Videos are now full-width on mobile and load with high priority (eager).
  - **Typography Refinement**: Enforced a minimum 16px font-size site-wide for Blog and Product content.

## 🚧 Active Tasks
- **Middleware Integration**: (Future) Move JWT verification to a global `middleware.ts` for even tighter security across all `/api/admin/*` routes.
- **Admin Lead Dashboard**: Enhancing the `/admin/leads` interface to track consultation status.
- **Content Expansion**: Adding more crop-specific phác đồ and real video links to `pathologies.json`.

## 💡 Key Learnings / Gotchas
- **Stateless Security**: JWT allows for secure, stateless authentication which is ideal for the Next.js App Router and Edge-ready functions.
- **Video-First Trust**: Farmers trust real field footage more than polished stock photos.
- **Frictionless Conversion**: Removing the cart step eliminates buyer hesitation.
