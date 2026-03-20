# stephenadei.nl Portfolio Redesign — Design Spec

## Overview

Redesign stephenadei.nl from a basic single-page service showcase into a professional brand hub. The site serves multiple audiences (recruiters, tutoring clients, collaborators) with engineering and operational expertise leading the positioning. Creative work plays a supporting role.

**Architecture:** Hybrid — single-page overview with deep-dive subpages.
**Design language:** Evolve the existing dark/emerald aesthetic into something more sophisticated and content-rich.
**Stack:** Next.js 14, React 18, TailwindCSS 3, next-intl (EN/NL — migrating from react-i18next).

---

## Overview Page Sections

### 1. Hero

Full-viewport dark section. Professional portrait on the right (or as background with strong contrast). Left-aligned text.

- **Name:** Large, prominent
- **Headline:** Engineering/operations-first positioning. E.g. *"Engineering production data systems — backed by two Master's degrees in mathematics and education"*
- **Proof badges:** 3 pill-style badges — e.g. "15+ years STEM education" · "AWS data architecture" · "Quantum computing research"
- **CTAs:** Two buttons — "See my work" (scroll to projects) · "Get in touch" (scroll to contact)
- **Language toggle:** Top-right, keep existing FlagButton component

Key change: No more generic services tagline. Hero immediately communicates what Stephen does and why he's credible.

### 2. Services

Compact horizontal routing bar (stacked on mobile). Each card:

- Icon + title + one-line description
- Live services link to their dedicated domain (stephensprivelessen.nl, data.stephenadei.nl, etc.)
- Not-yet-live services show "Coming soon" badge
- Remove TiltCard 3D effect — too gimmicky for professional positioning

This section is a **routing strip**, not the main event. Answers "what can I hire Stephen for?" and moves on.

### 3. Projects Showcase

Grid of 5 project cards. Each card:

- Project name + one-liner
- Tech badges (Next.js, Prisma, AWS, etc.)
- Small visual (screenshot or icon)
- "Learn more →" linking to deep-dive page

**Featured projects (in order):**

1. **SA3** — School management system serving 1500 students across multiple curricula. Full AWS infrastructure (RDS, S3, SQS, Lambda, KMS, Terraform). Offline-capable with PWA + IndexedDB.
2. **Privelessen Dashboard** — Business management tool for the tutoring practice. Google Calendar sync, Stripe payments, Chatwoot CRM, calendar analytics.
3. **Aantekeningen App** — AI-powered student notes management. LangChain/OpenAI integration, Google Drive sync to S3, comprehensive test suite.
4. **Platform API + Data Lake** — REST API and medallion architecture (Bronze/Silver/Gold) on AWS S3. ETL pipelines, Glue, Athena. The operational backbone.
5. **StephenStat** — Statistical analysis and visualization tool. Demonstrates the math-meets-engineering angle.

### 4. Research & Academics

Two subsections:

**Education timeline** (vertical, compact):
- MSc Mathematics — Quantum Informatics & Dynamical Systems (UvA, 2021–2026)
- Master Leraar VHO Wiskunde (ILO, UvA, 2023–2026)
- BSc Mathematics (UvA, 2018–2021)

**Research outputs** (cards with links):
- *Entanglement-assisted zero-error communication* — Master's thesis (PDF)
- *AI to Support Statistical Research (Kunstmatige intelligentie ter ondersteuning van statistisch onderzoek)* — Teaching thesis (PDF)
- *Mathematical Epidemiology: From Data to Model* — Bachelor's thesis (PDF)
- *Stability of Enzymatic Reaction Chains* — Biomathematics project (PDF)
- Archive project on founders of CS in the Netherlands (with Prof. Gerard Albert)

**Pluk de Data — featured item:**
- Card: "Pluk de Data — Computational Thinking in Secondary Education"
- Description: SIA Raak Publiek-funded research with HvA & UvA on teaching computational thinking across disciplines (math, biology, history, Dutch, physics)
- Stephen's role: data structuring, archive design, knowledge clip creation, symposium presentation (Oct 17, 2024)
- YouTube kennisclip embed (use `youtube-nocookie.com` for GDPR): https://www.youtube.com/watch?v=NAvG24xGFHU
- Link to official HvA project page: https://www.hva.nl/onderzoeksresultaten/2025/6/computational-thinking-pluk-de-data

Section heading: *"Research foundations"* (not "Education" — the tone is "I have theoretical depth behind my engineering work").

### 5. Technical Stack

Visual grid of grouped badges by domain. No self-rating bars.

**Languages & Frameworks:** TypeScript · Python · Next.js · React · Express · Flask · LaTeX
**Data & Cloud:** AWS S3 · Glue · Athena · Lambda · Step Functions · EventBridge · Terraform
**Databases & Infrastructure:** PostgreSQL · Prisma · Redis · Docker · GitHub Actions
**AI & ML:** LangChain · OpenAI · PyTorch · Embeddings

Projects section already proves competence — this is a scannable keyword reference.

### 6. Creative Stack

Lighter treatment than technical stack. Single row or compact grouping:

**Photography** · **Music Production** · **Video/Content** · **Design**

Each with a subtle icon. Links to `/creative` deep-dive page. Signals multidimensionality without dominating the page.

### 7. About

Portrait photo (outdoor shot). Personal narrative:

- Amsterdam-based
- Started tutoring at 15, charged €10/hour, built it into a premium practice
- Pursuing two Master's degrees simultaneously
- Languages: English (native), Dutch (native), Twi (proficient)
- Photography and music as personal creative outlets

Tone: Human and warm after all the impressive content above.

### 8. Contact

Clean and simple:

- Email: info@stephenadei.nl
- Phone (click-to-reveal to reduce spam/scraping)
- LinkedIn + GitHub links
- Chatwoot widget stays for live chat

---

## Navigation

The current site has no nav — just a floating language toggle. Subpages require a persistent header.

**Header component:**
- Sticky header, transparent over hero, gains background on scroll
- Left: Name/logo linking to `/`
- Center/right: nav links — "Projects" · "Research" · "Creative" · "Contact"
- Far right: language toggle (FlagButton)
- Mobile: hamburger menu with same links
- Present on all pages including deep-dive routes

**Subpage navigation:**
- Header provides "back to home" via the name/logo link
- Each deep-dive page gets a breadcrumb or back arrow below the header

---

## Deep-Dive Pages

### `/projects/[slug]`

Dynamic route with static generation. Individual project page for each featured project:

- Full description and problem statement
- Tech stack with context (why these choices)
- Architecture overview
- Screenshots or diagrams where available
- Link to live deployment if public

Use `generateStaticParams()` to statically generate all 5 known slugs at build time:
`sa3`, `privelessen-dashboard`, `aantekeningen-app`, `platform-api`, `stephenstat`

### `/research`

Single page expanding the research section:

- Full academic timeline with details
- Each thesis/paper with abstract, methodology, key findings, PDF download
- Pluk de Data: embedded YouTube kennisclip (via `youtube-nocookie.com`, lazy-loaded), full project description, link to HvA page
- Teaching internship context (OSB Amsterdam, Berlage Lyceum)

### `/creative`

Portfolio-style page:

- Photography gallery (use existing assets from public/images/photography/)
- Music production — tools, workflow, any published work
- Video/content creation
- Design tools and approach

---

## Technical Decisions

### i18n Migration: react-i18next → next-intl

The workspace standard mandates `next-intl` for all Next.js projects. The current `react-i18next` setup forces the entire page to be `'use client'`, blocking SSR and SEO. This redesign migrates to `next-intl`.

**Changes:**
- Remove: `i18next`, `react-i18next`, `next-i18next` dependencies
- Add: `next-intl`
- Remove the `i18n` key from `next.config.mjs` (Pages Router only — incompatible with App Router)
- Delete `i18n.ts` (client-side i18next init) and `next-i18next.config.js`
- Delete `pages/_app.tsx` (only exists for `appWithTranslation` wrapper)
- Move translations from `public/locales/{en,nl}/common.json` to `messages/{en,nl}.json` (next-intl convention)
- Add `i18n/request.ts` for next-intl server config
- Use `useTranslations` (client) and `getTranslations` (server) from `next-intl`

**Routing for locales:**
Use next-intl's middleware-based approach with `[locale]` segment:

```
app/
  [locale]/
    page.tsx
    layout.tsx
    projects/
      [slug]/
        page.tsx
    research/
      page.tsx
    creative/
      page.tsx
middleware.ts          # next-intl locale detection + redirect
```

### SSR / Component Architecture

The current `page.tsx` is entirely `'use client'`. The redesign splits into server components with client islands:

**Server components** (default — SSR + SEO):
- `page.tsx` (overview layout)
- `Hero.tsx` (static content)
- `ServicesStrip.tsx`
- `ProjectsShowcase.tsx`
- `ResearchSection.tsx`
- `TechStack.tsx`
- `CreativeStack.tsx`
- `AboutSection.tsx`

**Client components** (`'use client'` — interactive):
- `FlagButton.tsx` (language toggle)
- `Header.tsx` (scroll-aware sticky behavior)
- `ContactSection.tsx` (form state)
- `Modal.tsx` (open/close state)
- `YouTubeEmbed.tsx` (lazy-load iframe)

### Routing

```
app/
  [locale]/
    page.tsx              # overview (rewrite)
    layout.tsx            # root layout, metadata, Chatwoot
    projects/
      [slug]/
        page.tsx          # static project pages
    research/
      page.tsx            # research deep-dive
    creative/
      page.tsx            # creative deep-dive
middleware.ts             # next-intl locale routing
i18n/
  request.ts              # next-intl server config
messages/
  en.json                 # English translations (migrated from public/locales/)
  nl.json                 # Dutch translations
```

### Components

Refactor the monolithic `app/page.tsx` into section components:

```
components/
  Header.tsx              # sticky nav bar (client component)
  Hero.tsx
  ServicesStrip.tsx        # replaces current service cards
  ProjectsShowcase.tsx
  ResearchSection.tsx
  TechStack.tsx
  CreativeStack.tsx
  AboutSection.tsx
  ContactSection.tsx       # evolve existing EnhancedContactSection
```

**Shared components for deep-dive pages:**

```
components/
  ProjectPage.tsx          # reusable project detail layout
  SectionHeading.tsx       # consistent heading style
  TechBadge.tsx            # reusable tech stack pill
  YouTubeEmbed.tsx         # GDPR-compliant lazy YouTube embed
  BackLink.tsx             # breadcrumb/back navigation
```

Keep: `Modal.tsx`, `FlagButton.tsx`
Remove: `TiltCard` (inline in page.tsx), `Accordion.tsx` and `ExpertiseSection.tsx` (if unused after redesign), `BentoGrid.tsx` (replaced by new sections)

### Data & Content Strategy

**Overview page content:** Defined as typed data arrays in `data/` directory, with i18n keys referencing `messages/{en,nl}.json`.

```typescript
// data/projects.ts
interface Project {
  slug: string;
  titleKey: string;        // i18n key
  descriptionKey: string;  // i18n key
  techStack: string[];
  url?: string;            // live deployment
  image?: string;          // screenshot path
}
```

**Deep-dive page content:** MDX files per project/topic, stored in `content/`:

```
content/
  projects/
    sa3.mdx
    privelessen-dashboard.mdx
    aantekeningen-app.mdx
    platform-api.mdx
    stephenstat.mdx
  research/
    research.mdx           # or split per thesis
```

MDX allows rich content (code blocks, images, components) while keeping content separate from layout. Use `@next/mdx` or `next-mdx-remote` for rendering. Each MDX file has frontmatter with metadata (title, tech stack, image) and the body contains the full write-up.

For the `/creative` page, use a simpler approach — content directly in the page component with i18n keys, since it's lighter and may change frequently.

### Responsive Behavior

- **Hero:** Portrait on right desktop, becomes subtle background on mobile. Text stacks full-width.
- **Services strip:** Horizontal row on desktop, vertical stack on mobile.
- **Projects grid:** 3-column on desktop, 2-column on tablet, single-column on mobile.
- **Research timeline:** Vertical timeline on all breakpoints, cards expand full-width on mobile.
- **Tech/creative stacks:** Badge groups wrap naturally.
- **Header:** Full nav links on desktop, hamburger menu on mobile.

### Styling

- Keep TailwindCSS 3
- Evolve the emerald palette — keep dark backgrounds, emerald accents, but add more contrast and typographic hierarchy
- Use `backdrop-blur` and subtle gradients for depth (already in use, refine)
- Add `data/` to `tailwind.config.ts` content paths if needed

### Image Assets Mapping

| Section | Image | Source |
|---------|-------|--------|
| Hero | Professional portrait | `public/images/portraits/professional.jpg` or `professional2.jpeg` |
| About | Outdoor portrait | `public/images/portraits/outdoor.jpg` |
| Projects | Screenshots | Need to be created/sourced for each project |
| Creative | Photography samples | `public/images/photography/photo1-4.jpg` |
| OG/social | Banner | `public/images/jpg/banner3.jpg` (existing) |

### Existing Integrations

- **Chatwoot** widget in layout.tsx — keep as-is
- **Docker deployment** on port 4303 — no changes needed
- **Standalone output** mode — keep

### Dependency Cleanup

Remove unused PDF-related packages after redesign (research section uses download links, not inline viewers):
- `@react-pdf-viewer/core`
- `@react-pdf-viewer/default-layout`
- `@react-pdf/renderer`
- `react-pdf`
- `pdfjs-dist`

Remove old i18n packages:
- `i18next`
- `react-i18next`
- `next-i18next`

Add:
- `next-intl`
- `@next/mdx` or `next-mdx-remote` (for project deep-dive content)

### SEO & Metadata

Update `layout.tsx` metadata to reflect the new positioning:
- Title: "Stephen Adei — Data Engineering, Mathematics, Education"
- Description: Updated to reflect engineering-first positioning
- OpenGraph image: Keep existing banner or create new one
- Add per-page metadata for deep-dive pages using `generateMetadata()`

Server-rendered content (via next-intl migration) ensures all section text is crawlable.

---

## Out of Scope

- No backend changes (no database, no API)
- No changes to Docker/deployment setup
- Photography and music content creation (placeholders are fine for now on `/creative`)
- Mobile app or PWA features
- Scroll animations (can be added later with framer-motion if desired)
