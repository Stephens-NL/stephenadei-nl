# stephenadei.nl Portfolio Redesign — Design Spec

## Overview

Redesign stephenadei.nl from a basic single-page service showcase into a professional brand hub. The site serves multiple audiences (recruiters, tutoring clients, collaborators) with engineering and operational expertise leading the positioning. Creative work plays a supporting role.

**Architecture:** Hybrid — single-page overview with deep-dive subpages.
**Design language:** Evolve the existing dark/emerald aesthetic into something more sophisticated and content-rich.
**Stack:** Next.js 14, React 18, TailwindCSS 3, react-i18next (EN/NL). No stack changes.

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
- YouTube kennisclip embed/thumbnail: https://www.youtube.com/watch?v=NAvG24xGFHU
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
- Phone: +31 6 14 18 90 13
- LinkedIn + GitHub links
- Chatwoot widget stays for live chat

---

## Deep-Dive Pages

### `/projects/[slug]`

Dynamic route. Individual project page for each featured project:

- Full description and problem statement
- Tech stack with context (why these choices)
- Architecture overview
- Screenshots or diagrams where available
- Link to live deployment if public

Slugs: `sa3`, `privelessen-dashboard`, `aantekeningen-app`, `platform-api`, `stephenstat`

### `/research`

Single page expanding the research section:

- Full academic timeline with details
- Each thesis/paper with abstract, methodology, key findings, PDF download
- Pluk de Data: embedded YouTube kennisclip, full project description, link to HvA page
- Teaching internship context (OSB Amsterdam, Berlage Lyceum)

### `/creative`

Portfolio-style page:

- Photography gallery (use existing assets from public/images/photography/)
- Music production — tools, workflow, any published work
- Video/content creation
- Design tools and approach

---

## Technical Decisions

### Routing

Currently the app uses App Router (`app/`) with a single `page.tsx`. Add new routes:

```
app/
  page.tsx              # overview (rewrite)
  layout.tsx            # keep, update metadata
  projects/
    [slug]/
      page.tsx          # dynamic project pages
  research/
    page.tsx            # research deep-dive
  creative/
    page.tsx            # creative deep-dive
```

### i18n

Keep react-i18next. Expand `public/locales/{en,nl}/common.json` with new translation keys for all new sections. The existing i18n setup with client-side initialization in `i18n.ts` stays unchanged.

### Components

Refactor the monolithic `app/page.tsx` (currently 280 lines doing everything) into section components:

```
components/
  Hero.tsx
  ServicesStrip.tsx       # replaces current service cards
  ProjectsShowcase.tsx
  ResearchSection.tsx
  TechStack.tsx
  CreativeStack.tsx
  AboutSection.tsx
  ContactSection.tsx      # evolve existing EnhancedContactSection
```

Keep: `Modal.tsx`, `FlagButton.tsx`
Remove: `TiltCard` (inline in page.tsx), `Accordion.tsx` and `ExpertiseSection.tsx` (if unused after redesign)
Evolve: `BentoGrid.tsx` → may be repurposed or removed depending on new layout

### Shared Components for Deep-Dive Pages

```
components/
  ProjectPage.tsx         # reusable project detail layout
  SectionHeading.tsx      # consistent heading style
  TechBadge.tsx           # reusable tech stack pill
  YouTubeEmbed.tsx        # for Pluk de Data kennisclip
```

### Data

Project and research content should be defined as typed data arrays (similar to current `serviceCards` pattern) rather than hardcoded in JSX. This keeps content maintainable and translation-friendly.

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

### Styling

- Keep TailwindCSS 3
- Evolve the emerald palette — keep dark backgrounds, emerald accents, but add more contrast and typographic hierarchy
- Use `backdrop-blur` and subtle gradients for depth (already in use, refine)
- Ensure responsive: mobile-first, works well on all breakpoints

### Existing Integrations

- **Chatwoot** widget in layout.tsx — keep as-is
- **Docker deployment** on port 4303 — no changes needed
- **Standalone output** mode — keep

### SEO & Metadata

Update `layout.tsx` metadata to reflect the new positioning:
- Title: "Stephen Adei — Data Engineering, Mathematics, Education"
- Description: Updated to reflect engineering-first positioning
- OpenGraph image: Keep existing banner or create new one
- Add metadata for deep-dive pages

---

## Out of Scope

- No backend changes (no database, no API)
- No new dependencies beyond what's needed for layout (e.g. maybe a scroll animation library if desired, but not required)
- No changes to Docker/deployment setup
- Photography and music content creation (placeholders are fine for now on `/creative`)
- Mobile app or PWA features
