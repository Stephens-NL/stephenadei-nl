# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Personal portfolio/brand hub for Stephen Adei at [stephenadei.nl](https://stephenadei.nl). A hybrid Next.js site with an overview page showcasing engineering, research, education, and creative work, plus deep-dive subpages for projects, research, and creative content. Bilingual (EN/NL) with server-side rendering.

## Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (standalone output)
npm run lint         # ESLint
```

## Architecture

**Next.js 14** with App Router using locale-based routing (`app/[locale]/`).

### i18n — next-intl

Uses `next-intl` (NOT react-i18next or next-i18next). Translation files at `messages/{en,nl}.json`.

```typescript
// Server components
import { getTranslations } from 'next-intl/server';
const t = await getTranslations('Namespace');

// Client components
import { useTranslations } from 'next-intl';
const t = useTranslations('Namespace');

// Navigation (locale-aware)
import { Link, usePathname, useRouter } from '@/i18n/navigation';
```

Key files: `i18n/routing.ts` (locale config), `i18n/request.ts` (server config), `i18n/navigation.ts` (nav helpers), `middleware.ts` (locale detection).

### Routing

```
app/[locale]/
  page.tsx              # Overview page (all sections composed)
  layout.tsx            # Root layout, NextIntlClientProvider, Chatwoot
  projects/[slug]/
    page.tsx             # MDX project deep-dive (generateStaticParams)
  research/
    page.tsx             # Research with YouTube embed
  creative/
    page.tsx             # Creative portfolio
middleware.ts            # next-intl locale routing
```

### Component Architecture

**Server components** (default — SSR + SEO): Hero, ServicesStrip, ProjectsShowcase, ResearchSection, TechStack, CreativeStack, AboutSection, ProjectPage, SectionHeading, TechBadge

**Client components** (`'use client'`): Header, FlagButton, ContactSection, Modal, BackLink, YouTubeEmbed

### Local Packages (`packages/`)

```
packages/
  business-config/    # Local copy of @stephen/business-config (file: dependency)
                      # Provides contact info, rates, pricing config
                      # Used in ContactSection for email/phone/socials
```

### Data Layer

Content defined as typed arrays in `data/` (services, projects, research, techStack) with i18n keys referencing `messages/{en,nl}.json`. Deep-dive project content uses MDX files in `content/projects/*.mdx` rendered via `next-mdx-remote`.

### Service Cards

Services defined in `data/services.ts`. Each has an `isLive` boolean — when `false`, shows "Coming Soon" instead of a link. Cards route to external domains (stephensprivelessen.nl, data.stephenadei.nl, etc.).

## Deployment

Dockerized with standalone Next.js output. Runs on port **4303** via `docker-compose.yml`. Multi-stage Dockerfile (node:22-alpine).

```bash
docker compose up -d --build
```

### External Integrations

- **Chatwoot** chat widget loaded via `<Script>` in layout.tsx (base URL: `crm.stephenadei.nl`)
- Path alias `@/*` maps to project root (tsconfig.json)

## Stack

Next.js 14, React 18, TypeScript, TailwindCSS 3, @tailwindcss/typography, next-intl 4, next-mdx-remote 6, lucide-react, @stephen/business-config (local file: dependency)
