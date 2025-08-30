
# Hoang Le — Portfolio (Next.js + TypeScript + Tailwind + shadcn/ui + Framer Motion)

A bold, immersive, and professional portfolio built with the App Router. It features an animated hero,
interactive project cards, a skills dashboard, a career timeline, an about section, and a glassmorphism
contact form with a server action.

## ✨ Features
- Immersive loading feel (particles + gradients) and staggered motion
- Projects grid with 3D tilt, glow, and modal quick look
- Skills & tools with progress meters and witty micro‑interactions
- Timeline page with measurable outcomes
- Light/Dark theme via `next-themes`
- Resume embed (PDF included)
- SEO (metadata+OG), robots & sitemap

## 🧱 Stack
Next.js (App Router) • React • TypeScript • Tailwind • shadcn/ui‑style primitives • Framer Motion • next-themes

## 🚀 Getting Started
```bash
pnpm install
pnpm dev
# or
npm install
npm run dev
```
Open http://localhost:3000

## 🧩 Customize
- Edit site metadata in `lib/seo.ts`
- Add/edit projects in `lib/projects.ts`
- Update sections in `app/page.tsx` and pages under `app/*`

## 🛠️ Lint & Format
```bash
npm run lint
```
Configure Prettier via `.prettierrc`

## 📦 Deploy
- One‑click deploy to Vercel (recommended)
- Ensure `next.config.ts` is present. OG image (`/public/og.jpg`) can be customized.

## 🔒 Notes
- The contact API route is a stub. Replace it with an email service (Resend/AWS SES/etc.).
- Honor `prefers-reduced-motion` where applicable if you add heavier animations.
