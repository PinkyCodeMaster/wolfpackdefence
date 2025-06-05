# WolfpackDefence Dev Setup Checklist

## 1. Initialize Project
- [x] `npx create-next-app@latest --typescript`
- [x] `cd <your-app>`

## 2. Core Frontend & TypeScript
- [x] Next.js (should be installed by create-next-app)
- [x] TypeScript (should be installed by create-next-app)
- [x] Install Tailwind CSS
  - [x] `pnpm install -D tailwindcss postcss autoprefixer`
  - [x] `npx tailwindcss init -p`
  - [x] Add Tailwind to `globals.css` and config
- [x] Install ShadCN UI
  - [x] `npx shadcn-ui@latest init`
- [x] (Optional) Install Radix UI primitives as needed

## 3. Schema Validation
- [ ] `pnpm install zod`

## 4. Database & ORM
- [x] `pnpm install drizzle-orm drizzle-kit sqlite3`
- [x] Set up Drizzle config and a local SQLite db

## 5. Authentication
- [x] `pnpm install betterauth` (or correct package)
- [ ] Set up Next.js middleware for route protection

## 6. File Uploads
- [x] `pnpm install uploadthing`

## 7. Payments
- [x] `pnpm install stripe`
- [x] (Optional) `pnpm install @stripe/stripe-js` (frontend)

## 8. Observability & Analytics
- [x] `pnpm install @sentry/nextjs`
- [x] `pnpm install posthog-js`
- [ ] `pnpm install @vercel/analytics`
- [ ] Add Google Analytics (via script tag or `next/script`)
- [ ] `pnpm install betterstack` (if package exists)

## 9. Env & Types
- [x|-] Create `env.ts` and `types.ts` for centralized config/type safety

## 10. Hosting
- [ ] Deploy to Vercel (connect repo, push, follow prompts)

---

**Planned Additions (Skip for now):**
- React Native/Expo
- PostgreSQL migration
- Push notifications
- Public API / Webhooks 