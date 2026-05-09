# Project Memory: State & Strategy

## 🏗️ Current State
- **Frontend**: Next.js (mobile-optimized, solution pages, product details, sticky CTA).
- **Backend/Admin**: Configurable content, product management, order tracking.
- **UI Design**: Brand colors (#1a5c2a, #f5a623), clean, high contrast.

## 🚀 Strategy
- **Traffic**: Drive traffic via TikTok/YouTube videos and SEO-optimized solution articles.
- **Engagement**: Educate the farmer on the specific problem they are facing. Use "Callout boxes" and clear steps.
- **Conversion**: Funnel users to Zalo/Phone consultations using Sticky CTAs and contextual prompts.

## 📂 Architecture
- `/src/app`: Next.js App Router.
- `/src/components`: Reusable UI elements (ProductTabs, CTAs).
- `/src/app/admin`: Admin dashboard for content and product management.
- `/src/app/api/admin/publish-facebook`: Automated posting bridge to FB Graph API.

## 📣 Marketing Automation
- **Facebook Integration**:
  - **Page ID**: `61574432962859` (Phân Bón Giá Tốt).
  - **Format**: High-impact **Photo Posts** (using article cover image).
  - **Content Structure**: Hook -> 3-5 Bullet Points (Body) -> CTA + Blog Link.
  - **Auth**: Bearer Token Authorization (Stored in `.env` and API fallbacks).
- **AI Content Engine**:
  - **Articles**: 1500+ words, SEO-optimized, technical authority tone.
  - **Social Posts**: Automated via Gemini AI with strict bullet-point formatting rules for readability.
  - **Auto-linking**: System automatically cross-links premium products (Nemano, Fuvico) based on agricultural keywords.
