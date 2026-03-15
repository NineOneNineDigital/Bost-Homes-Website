# Bost Homes Website

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 with OKLch color space
- **UI Components**: shadcn/ui with Base UI React, class-variance-authority (CVA)
- **Theming**: next-themes (dark/light mode, system default)
- **Icons**: lucide-react
- **Linting/Formatting**: Biome via ultracite (replaces ESLint + Prettier)
- **Package Manager**: npm

## Project Structure

```
app/           → Next.js App Router pages and layouts
components/    → React components
  ui/          → shadcn/ui components
hooks/         → Custom React hooks
lib/           → Utility functions (cn(), etc.)
public/        → Static assets
```

## Commands

```
npm run dev        → Start dev server (Turbopack)
npm run build      → Production build
npm run lint       → Lint with biome (biome check .)
npm run lint:fix   → Lint and auto-fix (biome check --fix .)
npm run format     → Format with biome (biome format --write .)
npm run typecheck  → Type check (tsc --noEmit)
```

## Conventions

- Path alias: `@/*` maps to project root
- Client components use `"use client"` directive
- Fonts: Archivo (sans), Geist Mono (mono) via next/font/google
- Utility: `cn()` from `@/lib/utils` for classname merging
- Config: `biome.jsonc` extends `ultracite/biome/core` and `ultracite/biome/next`
- No semicolons are NOT enforced — biome/ultracite uses semicolons
- Named imports preferred over namespace imports (`import * as`)
- kebab-case filenames enforced by biome

## Brand Colors (from 2025 Brand Guidelines)

- **Primary**: Dark Olive `bost-olive` (#1F271B), Birch Wash `bost-cream` (#FDF7EA), Brick `bost-brick` (#8C1C13)
- **Secondary**: Yellow `bost-yellow` (#FFD51C), Mint `bost-mint` (#F3FCF0), Blue `bost-blue` (#A9DFF2)
- **Greys**: `bost-black` (#171717), `bost-gray-light` (#E5E5E5), `bost-gray-lighter` (#F5F5F5), `bost-gray-lightest` (#FAFAFA)

## Typography (Brand Guide)

- **Headlines**: Archivo Bold
- **Subheads**: Archivo Medium
- **Body**: Archivo Regular/Light
- **Eyebrow labels**: Sackers Gothic Heavy (use uppercase Archivo with wide tracking as web fallback)

## CMS

- Hygraph (GraphQL) — client at `lib/hygraph.ts`, fetchers at `lib/fetchers.ts`
- Graceful fallback when `HYGRAPH_ENDPOINT` is not configured
