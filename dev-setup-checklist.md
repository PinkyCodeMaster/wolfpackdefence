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

## 3. Linting & Formatting
- [ ] `pnpm install -D eslint prettier eslint-config-next`
- [ ] `npx eslint --init`
- [ ] (Optional) Add recommended VSCode extensions

## 4. Pre-commit Hooks
- [ ] `pnpm install -D husky lint-staged`
- [ ] `npx husky install`
- [ ] Add `"prepare": "husky install"` to `package.json` scripts
- [ ] Configure `lint-staged` in `package.json`

## 5. Schema Validation
- [ ] `pnpm install zod`

## 6. Database & ORM
- [ ] `pnpm install drizzle-orm drizzle-kit sqlite3`
- [ ] (Optional) `pnpm install @libsql/client` (for Turso)
- [ ] Set up Drizzle config and a local SQLite db

## 7. Authentication
- [ ] `pnpm install betterauth` (or correct package)
- [ ] Set up Next.js middleware for route protection

## 8. File Uploads
- [ ] `pnpm install uploadthing`

## 9. Payments
- [ ] `pnpm install stripe`
- [ ] (Optional) `pnpm install @stripe/stripe-js` (frontend)

## 10. Observability & Analytics
- [ ] `pnpm install @sentry/nextjs`
- [ ] `pnpm install posthog-js`
- [ ] `pnpm install @vercel/analytics`
- [ ] Add Google Analytics (via script tag or `next/script`)
- [ ] `pnpm install betterstack` (if package exists)

## 11. Env & Types
- [ ] Create `env.ts` and `types.ts` for centralized config/type safety

## 12. Hosting
- [ ] Deploy to Vercel (connect repo, push, follow prompts)

---

**Planned Additions (Skip for now):**
- React Native/Expo
- PostgreSQL migration
- Push notifications
- Public API / Webhooks 