# stephenadei.nl Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign stephenadei.nl from a basic single-page service showcase into a professional brand hub with engineering-first positioning, project showcases, research section, and deep-dive subpages.

**Architecture:** Hybrid single-page overview with deep-dive routes (`/projects/[slug]`, `/research`, `/creative`). Migrating from react-i18next to next-intl for SSR. Server components by default with client islands for interactivity.

**Tech Stack:** Next.js 14, React 18, TailwindCSS 3, next-intl, next-mdx-remote, lucide-react

**Spec:** `docs/superpowers/specs/2026-03-20-portfolio-redesign-design.md`

---

## Task 1: Dependency cleanup and next-intl installation

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Remove old i18n and unused PDF packages**

```bash
npm uninstall i18next react-i18next next-i18next @react-pdf-viewer/core @react-pdf-viewer/default-layout @react-pdf/renderer react-pdf pdfjs-dist focus-trap-react react-transition-group
```

- [ ] **Step 2: Install next-intl and MDX support**

```bash
npm install next-intl next-mdx-remote gray-matter
```

- [ ] **Step 3: Verify install succeeded**

```bash
npm ls next-intl
```

Expected: `next-intl@<version>` with no errors

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: swap i18n stack and remove unused PDF deps"
```

---

## Task 2: Set up next-intl routing, middleware, and config

**Files:**
- Create: `i18n/routing.ts`
- Create: `i18n/request.ts`
- Create: `i18n/navigation.ts`
- Create: `middleware.ts`
- Modify: `next.config.mjs`

- [ ] **Step 1: Create `i18n/routing.ts`**

```typescript
// i18n/routing.ts
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'nl'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
});
```

- [ ] **Step 2: Create `i18n/request.ts`**

```typescript
// i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as 'en' | 'nl')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 3: Create `i18n/navigation.ts`**

```typescript
// i18n/navigation.ts
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

- [ ] **Step 4: Create `middleware.ts`**

```typescript
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
```

- [ ] **Step 5: Update `next.config.mjs`**

Remove the `i18n` key (Pages Router only) and add the next-intl plugin:

```javascript
// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config = {
  output: 'standalone',
  reactStrictMode: true,
};

export default withNextIntl(config);
```

- [ ] **Step 6: Commit**

```bash
git add i18n/ middleware.ts next.config.mjs
git commit -m "feat: set up next-intl routing, middleware, and config"
```

---

## Task 3: Migrate translation files

**Files:**
- Create: `messages/en.json`
- Create: `messages/nl.json`
- Delete: `public/locales/en/common.json`
- Delete: `public/locales/nl/common.json`
- Delete: `i18n.ts`
- Delete: `next-i18next.config.js`
- Delete: `pages/_app.tsx`
- Delete: `types/i18n.d.ts`
- Delete: `react-pdf.d.ts`

- [ ] **Step 1: Create `messages/en.json`**

Restructure from the old flat `common` namespace into next-intl namespaces. Reorganize content to match new sections. Keep existing translations and add new keys for all new sections (hero, projects, research, techStack, creativeStack, nav, etc.):

```json
{
  "Nav": {
    "projects": "Projects",
    "research": "Research",
    "creative": "Creative",
    "contact": "Contact"
  },
  "Hero": {
    "name": "STEPHEN ADEI",
    "headline": "Engineering production data systems — backed by two Master's degrees in mathematics and education",
    "badge1": "15+ years STEM education",
    "badge2": "AWS data architecture",
    "badge3": "Quantum computing research",
    "ctaWork": "See my work",
    "ctaContact": "Get in touch"
  },
  "Services": {
    "title": "SERVICES",
    "privateTutoring": {
      "title": "Private Tutoring",
      "description": "Exclusive one-on-one learning experiences tailored to your needs.",
      "cta": "Start Learning"
    },
    "dataConsultancy": {
      "title": "Data Consultancy",
      "description": "Unlock the power of your data with our expert consultancy services.",
      "cta": "Explore Services"
    },
    "photography": {
      "title": "Photography",
      "description": "Capture your special moments with our professional photography services.",
      "cta": "View Portfolio"
    },
    "music": {
      "title": "Music",
      "description": "Discover my musical creations and services.",
      "cta": "Listen Now"
    },
    "comingSoon": "Coming Soon",
    "visitSite": "Visit Site"
  },
  "Projects": {
    "title": "Projects",
    "learnMore": "Learn more →",
    "sa3": {
      "title": "SA3",
      "description": "School management system serving 1500 students across multiple curricula with full AWS infrastructure."
    },
    "privelessenDashboard": {
      "title": "Privelessen Dashboard",
      "description": "Business management tool for the tutoring practice with Calendar sync, Stripe, and CRM."
    },
    "aantekeningenApp": {
      "title": "Aantekeningen App",
      "description": "AI-powered student notes management with LangChain/OpenAI and Google Drive sync."
    },
    "platformApi": {
      "title": "Platform API + Data Lake",
      "description": "REST API and medallion architecture (Bronze/Silver/Gold) on AWS S3 with ETL pipelines."
    },
    "stephenstat": {
      "title": "StephenStat",
      "description": "Statistical analysis and visualization tool bridging mathematics and engineering."
    }
  },
  "Research": {
    "title": "Research Foundations",
    "education": {
      "title": "Education",
      "msc": {
        "title": "MSc Mathematics — Quantum Informatics & Dynamical Systems",
        "institution": "University of Amsterdam",
        "years": "2021–2026"
      },
      "ilo": {
        "title": "Master Leraar VHO Wiskunde",
        "institution": "ILO, University of Amsterdam",
        "years": "2023–2026"
      },
      "bsc": {
        "title": "BSc Mathematics",
        "institution": "University of Amsterdam",
        "years": "2018–2021"
      }
    },
    "outputs": {
      "title": "Research Outputs",
      "theses": {
        "masters": {
          "title": "Entanglement-assisted zero-error communication",
          "type": "Master's Thesis",
          "description": "Investigation of zero-error communication capacity of noisy classical channels using shared entanglement."
        },
        "teaching": {
          "title": "Kunstmatige intelligentie ter ondersteuning van statistisch onderzoek",
          "type": "Teaching Thesis",
          "description": "AI-based scaffolds using ChatGPT to help students frame statistical research questions."
        },
        "bachelors": {
          "title": "Mathematical Epidemiology: From Data to Model",
          "type": "Bachelor's Thesis",
          "description": "An exploration of simple epidemic models and their application to real-world data."
        },
        "biomath": {
          "title": "Stability of Enzymatic Reaction Chains",
          "type": "Biomathematics Project",
          "description": "Analysis of the stability of enzymatic reaction chains using mathematical modeling."
        }
      }
    },
    "plukDeData": {
      "title": "Pluk de Data — Computational Thinking in Secondary Education",
      "description": "SIA Raak Publiek-funded research with HvA & UvA on teaching computational thinking across disciplines.",
      "role": "Data structuring, archive design, knowledge clip creation, symposium presentation (Oct 2024)",
      "watchVideo": "Watch kennisclip",
      "visitProject": "Visit project page"
    },
    "archive": {
      "title": "Archive: Founders of CS in the Netherlands",
      "description": "Collaborative research project with Professor Gerard Albert documenting the founders of computer science in the Netherlands."
    },
    "downloadPdf": "Download PDF"
  },
  "TechStack": {
    "title": "Technical Stack",
    "languages": "Languages & Frameworks",
    "dataCloud": "Data & Cloud",
    "databases": "Databases & Infrastructure",
    "aiMl": "AI & ML"
  },
  "CreativeStack": {
    "title": "Creative Stack",
    "photography": "Photography",
    "musicProduction": "Music Production",
    "videoContent": "Video/Content",
    "design": "Design",
    "explore": "Explore creative work →"
  },
  "About": {
    "title": "About Me",
    "content": "Amsterdam-based mathematician, engineer, and educator. I started tutoring at 15, charging €10/hour when others charged €5 — because I went from a 4 to a 10 in mathematics. That journey ignited a passion for teaching that's now spanned 15+ years. Today I'm pursuing two Master's degrees simultaneously while building production data systems.",
    "languages": "English (Native) · Dutch (Native) · Twi (Proficient)",
    "languagesLabel": "Languages"
  },
  "Contact": {
    "title": "Contact",
    "subtitle": "Stephen Adei, BSc",
    "role": "Data Engineer · Mathematician · Educator",
    "email": "Email",
    "whatsapp": "WhatsApp",
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "showPhone": "Show phone number",
    "available": "Available for projects, tutoring, and collaboration."
  },
  "Common": {
    "backToHome": "← Back to home"
  }
}
```

- [ ] **Step 2: Create `messages/nl.json`**

Same structure as `en.json` but with Dutch translations. Migrate existing translations from `public/locales/nl/common.json` and translate new keys:

```json
{
  "Nav": {
    "projects": "Projecten",
    "research": "Onderzoek",
    "creative": "Creatief",
    "contact": "Contact"
  },
  "Hero": {
    "name": "STEPHEN ADEI",
    "headline": "Productie-datasystemen bouwen — ondersteund door twee masteropleidingen in wiskunde en onderwijs",
    "badge1": "15+ jaar STEM onderwijs",
    "badge2": "AWS data-architectuur",
    "badge3": "Quantum computing onderzoek",
    "ctaWork": "Bekijk mijn werk",
    "ctaContact": "Neem contact op"
  },
  "Services": {
    "title": "DIENSTEN",
    "privateTutoring": {
      "title": "Privé Bijles",
      "description": "Exclusieve één-op-één leerervaringen afgestemd op jouw behoeften.",
      "cta": "Begin met leren"
    },
    "dataConsultancy": {
      "title": "Dataconsultancy",
      "description": "Ontgrendel de kracht van uw gegevens met onze deskundige adviesdiensten.",
      "cta": "Ontdek diensten"
    },
    "photography": {
      "title": "Fotografie",
      "description": "Leg uw speciale momenten vast met onze professionele fotografiediensten.",
      "cta": "Bekijk portfolio"
    },
    "music": {
      "title": "Muziek",
      "description": "Ontdek mijn muzikale creaties en diensten.",
      "cta": "Luister nu"
    },
    "comingSoon": "Binnenkort beschikbaar",
    "visitSite": "Bezoek site"
  },
  "Projects": {
    "title": "Projecten",
    "learnMore": "Meer informatie →",
    "sa3": {
      "title": "SA3",
      "description": "Schoolbeheersysteem voor 1500 leerlingen met meerdere curricula en volledige AWS-infrastructuur."
    },
    "privelessenDashboard": {
      "title": "Privelessen Dashboard",
      "description": "Bedrijfsmanagementtool voor de bijlespraktijk met Calendar-sync, Stripe en CRM."
    },
    "aantekeningenApp": {
      "title": "Aantekeningen App",
      "description": "AI-aangedreven studentenaantekeningenbeheer met LangChain/OpenAI en Google Drive-sync."
    },
    "platformApi": {
      "title": "Platform API + Data Lake",
      "description": "REST API en medaillonarchitectuur (Brons/Zilver/Goud) op AWS S3 met ETL-pipelines."
    },
    "stephenstat": {
      "title": "StephenStat",
      "description": "Statistisch analyse- en visualisatietool die wiskunde en engineering verbindt."
    }
  },
  "Research": {
    "title": "Onderzoeksfundamenten",
    "education": {
      "title": "Opleiding",
      "msc": {
        "title": "MSc Wiskunde — Quantum Informatica & Dynamische Systemen",
        "institution": "Universiteit van Amsterdam",
        "years": "2021–2026"
      },
      "ilo": {
        "title": "Master Leraar VHO Wiskunde",
        "institution": "ILO, Universiteit van Amsterdam",
        "years": "2023–2026"
      },
      "bsc": {
        "title": "BSc Wiskunde",
        "institution": "Universiteit van Amsterdam",
        "years": "2018–2021"
      }
    },
    "outputs": {
      "title": "Onderzoeksresultaten",
      "theses": {
        "masters": {
          "title": "Entanglement-assisted zero-error communication",
          "type": "Masterscriptie",
          "description": "Onderzoek naar de zero-error communicatiecapaciteit van ruisende klassieke kanalen met behulp van gedeelde verstrengeling."
        },
        "teaching": {
          "title": "Kunstmatige intelligentie ter ondersteuning van statistisch onderzoek",
          "type": "Onderwijsscriptie",
          "description": "AI-gebaseerde scaffolds met ChatGPT om studenten te helpen statistische onderzoeksvragen te formuleren."
        },
        "bachelors": {
          "title": "Mathematische Epidemiologie: Van Data naar Model",
          "type": "Bachelorscriptie",
          "description": "Een verkenning van eenvoudige epidemische modellen en hun toepassing op real-world data."
        },
        "biomath": {
          "title": "Stabiliteit van Enzymatische Reactieketens",
          "type": "Biomathematica Project",
          "description": "Analyse van de stabiliteit van enzymatische reactieketens met behulp van wiskundige modellering."
        }
      }
    },
    "plukDeData": {
      "title": "Pluk de Data — Computational Thinking in het Voortgezet Onderwijs",
      "description": "SIA Raak Publiek-gefinancierd onderzoek met HvA & UvA over het onderwijzen van computational thinking in verschillende vakken.",
      "role": "Datastructurering, archiefontwerp, kennisclip-creatie, symposiumpresentatie (okt 2024)",
      "watchVideo": "Bekijk kennisclip",
      "visitProject": "Bezoek projectpagina"
    },
    "archive": {
      "title": "Archief: Grondleggers van Informatica in Nederland",
      "description": "Samenwerkingsonderzoek met Professor Gerard Albert over de documentatie van de grondleggers van informatica in Nederland."
    },
    "downloadPdf": "Download PDF"
  },
  "TechStack": {
    "title": "Technische Stack",
    "languages": "Talen & Frameworks",
    "dataCloud": "Data & Cloud",
    "databases": "Databases & Infrastructuur",
    "aiMl": "AI & ML"
  },
  "CreativeStack": {
    "title": "Creatieve Stack",
    "photography": "Fotografie",
    "musicProduction": "Muziekproductie",
    "videoContent": "Video/Content",
    "design": "Design",
    "explore": "Ontdek creatief werk →"
  },
  "About": {
    "title": "Over Mij",
    "content": "Wiskundige, engineer en docent uit Amsterdam. Ik begon met bijles geven op mijn 15e voor €10/uur terwijl anderen €5 vroegen — want ik ging van een 4 naar een 10 voor wiskunde. Die reis ontketende een passie voor lesgeven die nu al meer dan 15 jaar beslaat. Vandaag volg ik twee masteropleidingen tegelijk terwijl ik productie-datasystemen bouw.",
    "languages": "Engels (Moedertaal) · Nederlands (Moedertaal) · Twi (Gevorderd)",
    "languagesLabel": "Talen"
  },
  "Contact": {
    "title": "Contact",
    "subtitle": "Stephen Adei, BSc",
    "role": "Data Engineer · Wiskundige · Docent",
    "email": "E-mail",
    "whatsapp": "WhatsApp",
    "linkedin": "LinkedIn",
    "github": "GitHub",
    "showPhone": "Toon telefoonnummer",
    "available": "Beschikbaar voor projecten, bijles en samenwerking."
  },
  "Common": {
    "backToHome": "← Terug naar home"
  }
}
```

- [ ] **Step 3: Delete old i18n files**

```bash
rm -f i18n.ts pages/_app.tsx types/i18n.d.ts react-pdf.d.ts
rm -rf public/locales
rmdir pages 2>/dev/null || true
rmdir types 2>/dev/null || true
```

- [ ] **Step 4: Verify build is not broken yet**

```bash
npm run lint
```

Note: Build will not pass yet — we still need to move `app/` to `app/[locale]/`. That's the next task.

- [ ] **Step 5: Commit**

```bash
git add messages/ && git rm -r public/locales i18n.ts pages/_app.tsx types/i18n.d.ts react-pdf.d.ts
git commit -m "feat: migrate translation files to next-intl messages format"
```

---

## Task 4: Restructure app directory for locale routing

**Files:**
- Move: `app/page.tsx` → `app/[locale]/page.tsx`
- Move: `app/layout.tsx` → `app/[locale]/layout.tsx`
- Move: `app/global-error.tsx` → `app/[locale]/global-error.tsx`
- Move: `app/globals.css` stays at `app/globals.css` (referenced from layout)
- Create: `app/[locale]/projects/[slug]/page.tsx` (placeholder)
- Create: `app/[locale]/research/page.tsx` (placeholder)
- Create: `app/[locale]/creative/page.tsx` (placeholder)

- [ ] **Step 1: Create locale directory and move files**

```bash
mkdir -p app/\[locale\]/projects/\[slug\] app/\[locale\]/research app/\[locale\]/creative
mv app/page.tsx app/\[locale\]/page.tsx
mv app/layout.tsx app/\[locale\]/layout.tsx
mv app/global-error.tsx app/\[locale\]/global-error.tsx
```

- [ ] **Step 2: Update layout.tsx for next-intl**

Replace the entire `app/[locale]/layout.tsx` with:

```tsx
// app/[locale]/layout.tsx
import { Metadata } from 'next';
import Script from 'next/script';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stephen Adei — Data Engineering, Mathematics, Education',
  description:
    'Engineering production data systems — backed by two Master\'s degrees in mathematics and education. 15+ years STEM tutoring, AWS data architecture, quantum computing research.',
  keywords:
    'Stephen Adei, data engineering, mathematics, private tutor, AWS, quantum computing, Amsterdam, TypeScript, Python',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  openGraph: {
    title: 'Stephen Adei — Data Engineering, Mathematics, Education',
    description:
      'Engineering production data systems — backed by two Master\'s degrees in mathematics and education.',
    url: 'https://stephenadei.nl',
    siteName: 'Stephen Adei',
    images: [
      {
        url: 'https://stephenadei.nl/images/jpg/banner3.jpg',
        width: 1200,
        height: 630,
        alt: 'Stephen Adei — Data Engineering, Mathematics, Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stephen Adei — Data Engineering, Mathematics, Education',
    description:
      'Engineering production data systems — backed by two Master\'s degrees in mathematics and education.',
    images: ['https://stephenadei.nl/images/jpg/banner3.jpg'],
    creator: '@stephenadei',
  },
  other: {
    'msapplication-TileColor': '#2b5797',
    'theme-color': '#ffffff',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'nl')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Script id="chatwoot-sdk">
          {`
            (function(d,t) {
              var BASE_URL="https://crm.stephenadei.nl";
              var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
              g.src=BASE_URL+"/packs/js/sdk.js";
              g.defer = true;
              g.async = true;
              s.parentNode.insertBefore(g,s);
              g.onload=function(){
                window.chatwootSDK.run({
                  websiteToken: 'p4kWNZbQeTEVvMXd6LqnjftF',
                  baseUrl: BASE_URL
                })
              }
            })(document,"script");
          `}
        </Script>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Create placeholder subpages**

`app/[locale]/projects/[slug]/page.tsx`:
```tsx
import { getTranslations } from 'next-intl/server';

const validSlugs = ['sa3', 'privelessen-dashboard', 'aantekeningen-app', 'platform-api', 'stephenstat'];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = await getTranslations('Projects');
  return (
    <div className="min-h-screen bg-emerald-900 text-white p-8">
      <h1 className="text-4xl font-bold">{slug}</h1>
      <p className="mt-4 text-emerald-200">Project detail page — coming soon</p>
    </div>
  );
}
```

`app/[locale]/research/page.tsx`:
```tsx
import { getTranslations } from 'next-intl/server';

export default async function ResearchPage() {
  const t = await getTranslations('Research');
  return (
    <div className="min-h-screen bg-emerald-900 text-white p-8">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-emerald-200">Research deep-dive page — coming soon</p>
    </div>
  );
}
```

`app/[locale]/creative/page.tsx`:
```tsx
import { getTranslations } from 'next-intl/server';

export default async function CreativePage() {
  const t = await getTranslations('CreativeStack');
  return (
    <div className="min-h-screen bg-emerald-900 text-white p-8">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      <p className="mt-4 text-emerald-200">Creative portfolio page — coming soon</p>
    </div>
  );
}
```

- [ ] **Step 4: Stub out `app/[locale]/page.tsx` temporarily**

Replace contents with a minimal server component to verify routing works:

```tsx
import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Hero');
  return (
    <div className="min-h-screen bg-emerald-900 text-white flex items-center justify-center">
      <h1 className="text-6xl font-bold">{t('name')}</h1>
    </div>
  );
}
```

- [ ] **Step 5: Verify the build passes**

```bash
npm run build
```

Expected: Build succeeds. Visiting `/` shows "STEPHEN ADEI" in emerald. Visiting `/nl` shows the same (locale switch works).

- [ ] **Step 6: Commit**

```bash
git add app/ middleware.ts
git commit -m "feat: restructure app directory for locale-based routing with next-intl"
```

---

## Task 5: Create data layer and shared components

**Files:**
- Create: `data/projects.ts`
- Create: `data/services.ts`
- Create: `data/research.ts`
- Create: `data/techStack.ts`
- Create: `components/SectionHeading.tsx`
- Create: `components/TechBadge.tsx`
- Create: `components/BackLink.tsx`
- Create: `components/YouTubeEmbed.tsx`

- [ ] **Step 1: Create `data/services.ts`**

```typescript
// data/services.ts
import { GraduationCap, Database, Camera, Music } from 'lucide-react';

export interface ServiceCard {
  key: string;
  iconName: 'GraduationCap' | 'Database' | 'Camera' | 'Music';
  url: string;
  isLive: boolean;
}

export const serviceCards: ServiceCard[] = [
  {
    key: 'privateTutoring',
    iconName: 'GraduationCap',
    url: 'https://stephensprivelessen.nl',
    isLive: true,
  },
  {
    key: 'dataConsultancy',
    iconName: 'Database',
    url: 'https://data.stephenadei.nl',
    isLive: true,
  },
  {
    key: 'photography',
    iconName: 'Camera',
    url: 'https://photography.stephenadei.nl',
    isLive: false,
  },
  {
    key: 'music',
    iconName: 'Music',
    url: 'https://music.stephenadei.nl',
    isLive: false,
  },
];
```

- [ ] **Step 2: Create `data/projects.ts`**

```typescript
// data/projects.ts
export interface Project {
  slug: string;
  titleKey: string;
  descriptionKey: string;
  techStack: string[];
  url?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    slug: 'sa3',
    titleKey: 'sa3.title',
    descriptionKey: 'sa3.description',
    techStack: ['Next.js', 'React', 'Prisma', 'AWS', 'Terraform', 'Docker'],
    url: 'https://sa3.stephensprive.app',
  },
  {
    slug: 'privelessen-dashboard',
    titleKey: 'privelessenDashboard.title',
    descriptionKey: 'privelessenDashboard.description',
    techStack: ['Next.js', 'Prisma', 'Stripe', 'Google Calendar', 'Chatwoot'],
    url: 'https://dash.stephensprivelessen.nl',
  },
  {
    slug: 'aantekeningen-app',
    titleKey: 'aantekeningenApp.title',
    descriptionKey: 'aantekeningenApp.description',
    techStack: ['Next.js', 'LangChain', 'OpenAI', 'AWS S3', 'Prisma'],
  },
  {
    slug: 'platform-api',
    titleKey: 'platformApi.title',
    descriptionKey: 'platformApi.description',
    techStack: ['Express', 'TypeScript', 'AWS S3', 'Prisma', 'Glue', 'Athena'],
    url: 'https://upload.stephensprive.app',
  },
  {
    slug: 'stephenstat',
    titleKey: 'stephenstat.title',
    descriptionKey: 'stephenstat.description',
    techStack: ['Next.js', 'Recharts', 'jstat', 'TypeScript'],
    url: 'https://stephenstat.stephensprive.app',
  },
];
```

- [ ] **Step 3: Create `data/research.ts`**

```typescript
// data/research.ts
export interface Thesis {
  key: string;
  file?: string;
}

export const theses: Thesis[] = [
  { key: 'masters', file: 'entanglement-assisted-communication.pdf' },
  { key: 'teaching' },
  { key: 'bachelors', file: 'mathematical-epidemiology.pdf' },
  { key: 'biomath', file: 'stability-enzymatic-reaction-chains.pdf' },
];

export interface Education {
  key: string;
}

export const education: Education[] = [
  { key: 'msc' },
  { key: 'ilo' },
  { key: 'bsc' },
];
```

- [ ] **Step 4: Create `data/techStack.ts`**

```typescript
// data/techStack.ts
export interface StackGroup {
  labelKey: string;
  items: string[];
}

export const techStackGroups: StackGroup[] = [
  {
    labelKey: 'languages',
    items: ['TypeScript', 'Python', 'Next.js', 'React', 'Express', 'Flask', 'LaTeX'],
  },
  {
    labelKey: 'dataCloud',
    items: ['AWS S3', 'Glue', 'Athena', 'Lambda', 'Step Functions', 'EventBridge', 'Terraform'],
  },
  {
    labelKey: 'databases',
    items: ['PostgreSQL', 'Prisma', 'Redis', 'Docker', 'GitHub Actions'],
  },
  {
    labelKey: 'aiMl',
    items: ['LangChain', 'OpenAI', 'PyTorch', 'Embeddings'],
  },
];
```

- [ ] **Step 5: Create `components/SectionHeading.tsx`**

```tsx
// components/SectionHeading.tsx
interface SectionHeadingProps {
  title: string;
  id?: string;
}

export default function SectionHeading({ title, id }: SectionHeadingProps) {
  return (
    <h2
      id={id}
      className="text-4xl font-bold mb-8 text-emerald-100 scroll-mt-20"
    >
      {title}
    </h2>
  );
}
```

- [ ] **Step 6: Create `components/TechBadge.tsx`**

```tsx
// components/TechBadge.tsx
interface TechBadgeProps {
  label: string;
}

export default function TechBadge({ label }: TechBadgeProps) {
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-emerald-800/50 text-emerald-200 border border-emerald-700/50">
      {label}
    </span>
  );
}
```

- [ ] **Step 7: Create `components/BackLink.tsx`**

```tsx
// components/BackLink.tsx
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function BackLink() {
  const t = useTranslations('Common');
  return (
    <Link
      href="/"
      className="inline-block mb-8 text-emerald-300 hover:text-emerald-100 transition-colors"
    >
      {t('backToHome')}
    </Link>
  );
}
```

- [ ] **Step 8: Create `components/YouTubeEmbed.tsx`**

```tsx
// components/YouTubeEmbed.tsx
'use client';

import { useState } from 'react';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!loaded) {
    return (
      <button
        onClick={() => setLoaded(true)}
        className="relative w-full aspect-video rounded-lg overflow-hidden group cursor-pointer"
        aria-label={`Play: ${title}`}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
        loading="lazy"
      />
    </div>
  );
}
```

- [ ] **Step 9: Commit**

```bash
git add data/ components/SectionHeading.tsx components/TechBadge.tsx components/BackLink.tsx components/YouTubeEmbed.tsx
git commit -m "feat: add data layer and shared components"
```

---

## Task 6: Build the Header component

**Files:**
- Create: `components/Header.tsx`
- Modify: `components/FlagButton.tsx`

- [ ] **Step 1: Create `components/Header.tsx`**

```tsx
// components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import FlagButton from './FlagButton';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: isHome ? '#projects' : '/#projects', label: t('projects') },
    { href: isHome ? '#research' : '/#research', label: t('research') },
    { href: '/creative', label: t('creative') },
    { href: isHome ? '#contact' : '/#contact', label: t('contact') },
  ];

  const switchLocale = (locale: 'en' | 'nl') => {
    router.replace(pathname, { locale });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-emerald-950/90 backdrop-blur-md border-b border-emerald-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-100 hover:text-white transition-colors">
          Stephen Adei
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-emerald-200 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <FlagButton onSwitch={switchLocale} />
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <FlagButton onSwitch={switchLocale} />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-emerald-200 hover:text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/50">
          <div className="px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-emerald-200 hover:text-white transition-colors py-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Update `components/FlagButton.tsx`**

Update to work with next-intl locale switching instead of i18next:

```tsx
// components/FlagButton.tsx
'use client';

import React from 'react';
import { useLocale } from 'next-intl';

interface FlagButtonProps {
  onSwitch: (locale: 'en' | 'nl') => void;
}

const FlagButton: React.FC<FlagButtonProps> = ({ onSwitch }) => {
  const locale = useLocale();
  const targetLocale = locale === 'en' ? 'nl' : 'en';

  return (
    <button
      onClick={() => onSwitch(targetLocale)}
      className="w-10 h-7 rounded overflow-hidden relative transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-300"
      aria-label={locale === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}
    >
      {locale === 'nl' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full">
          <clipPath id="s"><rect width="30" height="15" /></clipPath>
          <rect width="60" height="30" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#s)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-full h-full">
          <rect width="3" height="0.6667" y="0" fill="#AE1C28" />
          <rect width="3" height="0.6667" y="0.6667" fill="#FFFFFF" />
          <rect width="3" height="0.6667" y="1.3334" fill="#21468B" />
        </svg>
      )}
    </button>
  );
};

export default FlagButton;
```

Note: Changed from US flag to UK flag since `en` represents English generally. Shows the flag you'd switch TO (Dutch flag when on English, UK flag when on Dutch).

- [ ] **Step 3: Add Header to layout**

In `app/[locale]/layout.tsx`, add Header inside the `NextIntlClientProvider`:

```tsx
import Header from '@/components/Header';

// Inside the return, before {children}:
<NextIntlClientProvider messages={messages}>
  <Header />
  {children}
</NextIntlClientProvider>
```

- [ ] **Step 4: Verify header renders**

```bash
npm run build
```

Expected: Build succeeds. Header appears on all pages, transparent over hero, gains background on scroll.

- [ ] **Step 5: Commit**

```bash
git add components/Header.tsx components/FlagButton.tsx app/\[locale\]/layout.tsx
git commit -m "feat: add sticky header with nav and locale switching"
```

---

## Task 7: Build Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
// components/Hero.tsx
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/portraits/professional.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-950/80 to-emerald-950" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-500 mb-6">
            {t('name')}
          </h1>
          <p className="text-xl sm:text-2xl text-emerald-100 leading-relaxed mb-8 max-w-2xl">
            {t('headline')}
          </p>

          {/* Proof badges */}
          <div className="flex flex-wrap gap-3 mb-10">
            {['badge1', 'badge2', 'badge3'].map((key) => (
              <span
                key={key}
                className="px-4 py-1.5 text-sm font-medium rounded-full bg-emerald-800/50 text-emerald-200 border border-emerald-700/50"
              >
                {t(key)}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition-colors"
            >
              {t('ctaWork')}
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-emerald-500 text-emerald-200 font-semibold rounded-lg hover:bg-emerald-500/10 transition-colors"
            >
              {t('ctaContact')}
            </a>
          </div>
        </div>

        {/* Portrait (desktop) */}
        <div className="hidden lg:block relative h-[500px] rounded-2xl overflow-hidden">
          <Image
            src="/images/portraits/professional2.jpeg"
            alt="Stephen Adei"
            fill
            className="object-cover rounded-2xl"
            quality={90}
            priority
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add Hero section component"
```

---

## Task 8: Build ServicesStrip section

**Files:**
- Create: `components/ServicesStrip.tsx`

- [ ] **Step 1: Create `components/ServicesStrip.tsx`**

```tsx
// components/ServicesStrip.tsx
import { getTranslations } from 'next-intl/server';
import { GraduationCap, Database, Camera, Music } from 'lucide-react';
import { serviceCards } from '@/data/services';
import SectionHeading from './SectionHeading';

const iconMap = {
  GraduationCap,
  Database,
  Camera,
  Music,
} as const;

export default async function ServicesStrip() {
  const t = await getTranslations('Services');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceCards.map((card) => {
          const Icon = iconMap[card.iconName];
          return (
            <div
              key={card.key}
              className="relative rounded-lg p-5 bg-emerald-800/40 backdrop-blur-sm border border-emerald-700/30 hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-700/50">
                  <Icon className="w-5 h-5 text-emerald-300" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-100">
                  {t(`${card.key}.title`)}
                </h3>
              </div>
              <p className="text-sm text-emerald-200/80 mb-4">
                {t(`${card.key}.description`)}
              </p>
              {card.isLive ? (
                <a
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-medium text-emerald-300 hover:text-white transition-colors"
                >
                  {t('visitSite')} →
                </a>
              ) : (
                <span className="inline-block text-sm text-emerald-500/60">
                  {t('comingSoon')}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ServicesStrip.tsx
git commit -m "feat: add ServicesStrip section component"
```

---

## Task 9: Build ProjectsShowcase section

**Files:**
- Create: `components/ProjectsShowcase.tsx`

- [ ] **Step 1: Create `components/ProjectsShowcase.tsx`**

```tsx
// components/ProjectsShowcase.tsx
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { projects } from '@/data/projects';
import SectionHeading from './SectionHeading';
import TechBadge from './TechBadge';

export default async function ProjectsShowcase() {
  const t = await getTranslations('Projects');

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="group rounded-xl p-6 bg-emerald-800/30 backdrop-blur-sm border border-emerald-700/30 hover:border-emerald-500/50 hover:bg-emerald-800/50 transition-all"
          >
            <h3 className="text-xl font-bold text-emerald-100 mb-2 group-hover:text-white transition-colors">
              {t(project.titleKey)}
            </h3>
            <p className="text-sm text-emerald-200/80 mb-4 leading-relaxed">
              {t(project.descriptionKey)}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <TechBadge key={tech} label={tech} />
              ))}
              {project.techStack.length > 4 && (
                <span className="text-xs text-emerald-400 self-center">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-emerald-300 group-hover:text-emerald-200 transition-colors">
              {t('learnMore')}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ProjectsShowcase.tsx
git commit -m "feat: add ProjectsShowcase section component"
```

---

## Task 10: Build ResearchSection

**Files:**
- Create: `components/ResearchSection.tsx`

- [ ] **Step 1: Create `components/ResearchSection.tsx`**

```tsx
// components/ResearchSection.tsx
import { getTranslations } from 'next-intl/server';
import { Download, ExternalLink } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { theses, education } from '@/data/research';
import SectionHeading from './SectionHeading';

export default async function ResearchSection() {
  const t = await getTranslations('Research');

  return (
    <section id="research" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <SectionHeading title={t('title')} />

      {/* Education Timeline */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-emerald-100 mb-6">{t('education.title')}</h3>
        <div className="border-l-2 border-emerald-700/50 pl-6 space-y-6">
          {education.map((edu) => (
            <div key={edu.key} className="relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-950" />
              <h4 className="text-lg font-semibold text-emerald-100">
                {t(`education.${edu.key}.title`)}
              </h4>
              <p className="text-sm text-emerald-300">
                {t(`education.${edu.key}.institution`)} · {t(`education.${edu.key}.years`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Research Outputs */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-emerald-100 mb-6">{t('outputs.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {theses.map((thesis) => (
            <div
              key={thesis.key}
              className="rounded-lg p-5 bg-emerald-800/30 border border-emerald-700/30"
            >
              <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-1">
                {t(`outputs.theses.${thesis.key}.type`)}
              </p>
              <h4 className="text-lg font-semibold text-emerald-100 mb-2">
                {t(`outputs.theses.${thesis.key}.title`)}
              </h4>
              <p className="text-sm text-emerald-200/80 mb-3">
                {t(`outputs.theses.${thesis.key}.description`)}
              </p>
              {thesis.file && (
                <a
                  href={`/academic-works/${thesis.file}`}
                  download
                  className="inline-flex items-center gap-1.5 text-sm text-emerald-300 hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {t('downloadPdf')}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Pluk de Data */}
      <div className="rounded-xl p-6 bg-gradient-to-br from-emerald-800/40 to-emerald-900/40 border border-emerald-600/30 mb-8">
        <h3 className="text-2xl font-bold text-emerald-100 mb-3">
          {t('plukDeData.title')}
        </h3>
        <p className="text-emerald-200/80 mb-2">{t('plukDeData.description')}</p>
        <p className="text-sm text-emerald-300 mb-4">{t('plukDeData.role')}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://www.youtube.com/watch?v=NAvG24xGFHU"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600/80 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            {t('plukDeData.watchVideo')}
          </a>
          <a
            href="https://www.hva.nl/onderzoeksresultaten/2025/6/computational-thinking-pluk-de-data"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-emerald-500 text-emerald-200 rounded-lg hover:bg-emerald-500/10 transition-colors text-sm font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            {t('plukDeData.visitProject')}
          </a>
        </div>
      </div>

      {/* Archive project */}
      <div className="rounded-lg p-5 bg-emerald-800/30 border border-emerald-700/30">
        <h4 className="text-lg font-semibold text-emerald-100 mb-2">{t('archive.title')}</h4>
        <p className="text-sm text-emerald-200/80">{t('archive.description')}</p>
      </div>

      {/* Link to full research page */}
      <div className="mt-8 text-center">
        <Link
          href="/research"
          className="text-emerald-300 hover:text-white transition-colors font-medium"
        >
          View full research page →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ResearchSection.tsx
git commit -m "feat: add ResearchSection component with timeline and Pluk de Data"
```

---

## Task 11: Build TechStack and CreativeStack sections

**Files:**
- Create: `components/TechStack.tsx`
- Create: `components/CreativeStack.tsx`

- [ ] **Step 1: Create `components/TechStack.tsx`**

```tsx
// components/TechStack.tsx
import { getTranslations } from 'next-intl/server';
import { techStackGroups } from '@/data/techStack';
import SectionHeading from './SectionHeading';
import TechBadge from './TechBadge';

export default async function TechStack() {
  const t = await getTranslations('TechStack');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {techStackGroups.map((group) => (
          <div key={group.labelKey}>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">
              {t(group.labelKey)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <TechBadge key={item} label={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/CreativeStack.tsx`**

```tsx
// components/CreativeStack.tsx
import { getTranslations } from 'next-intl/server';
import { Camera, Music, Video, Palette } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SectionHeading from './SectionHeading';

const creativeItems = [
  { key: 'photography', icon: Camera },
  { key: 'musicProduction', icon: Music },
  { key: 'videoContent', icon: Video },
  { key: 'design', icon: Palette },
];

export default async function CreativeStack() {
  const t = await getTranslations('CreativeStack');

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="flex flex-wrap gap-4 mb-6">
        {creativeItems.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800/30 border border-emerald-700/30"
          >
            <Icon className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-200">{t(key)}</span>
          </div>
        ))}
      </div>
      <Link
        href="/creative"
        className="text-sm text-emerald-300 hover:text-white transition-colors font-medium"
      >
        {t('explore')}
      </Link>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/TechStack.tsx components/CreativeStack.tsx
git commit -m "feat: add TechStack and CreativeStack section components"
```

---

## Task 12: Build AboutSection and ContactSection

**Files:**
- Create: `components/AboutSection.tsx`
- Create: `components/ContactSection.tsx`

- [ ] **Step 1: Create `components/AboutSection.tsx`**

```tsx
// components/AboutSection.tsx
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import SectionHeading from './SectionHeading';

export default async function AboutSection() {
  const t = await getTranslations('About');

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
          <Image
            src="/images/portraits/outdoor.jpg"
            alt="Stephen Adei"
            fill
            className="object-cover rounded-xl"
            quality={85}
          />
        </div>
        <div className="md:col-span-2">
          <p className="text-lg text-emerald-100 leading-relaxed mb-6">
            {t('content')}
          </p>
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              {t('languagesLabel')}
            </h3>
            <p className="text-emerald-200">{t('languages')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/ContactSection.tsx`**

```tsx
// components/ContactSection.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import SectionHeading from './SectionHeading';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [showPhone, setShowPhone] = useState(false);

  const contactLinks = [
    {
      href: 'mailto:info@stephenadei.nl',
      icon: Mail,
      label: t('email'),
    },
    {
      href: 'https://wa.me/31647357426',
      icon: Phone,
      label: t('whatsapp'),
    },
    {
      href: 'https://www.linkedin.com/in/stephen-adei/',
      icon: Linkedin,
      label: t('linkedin'),
    },
    {
      href: 'https://github.com/stephenadei',
      icon: Github,
      label: t('github'),
    },
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <SectionHeading title={t('title')} id="contact" />
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-emerald-100 mb-1">{t('subtitle')}</h3>
        <p className="text-emerald-300 mb-8">{t('role')}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-lg bg-emerald-800/30 border border-emerald-700/30 hover:border-emerald-500/50 hover:bg-emerald-800/50 transition-all text-emerald-200 hover:text-white"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Click-to-reveal phone */}
        <div className="mb-6">
          {showPhone ? (
            <a href="tel:+31614189013" className="text-emerald-200 hover:text-white transition-colors">
              +31 6 14 18 90 13
            </a>
          ) : (
            <button
              onClick={() => setShowPhone(true)}
              className="text-sm text-emerald-400 hover:text-emerald-200 transition-colors underline underline-offset-2"
            >
              {t('showPhone')}
            </button>
          )}
        </div>

        <p className="text-sm text-emerald-300/70">{t('available')}</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/AboutSection.tsx components/ContactSection.tsx
git commit -m "feat: add AboutSection and ContactSection components"
```

---

## Task 13: Assemble the overview page

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `tailwind.config.ts` (add `data/` to content paths)

- [ ] **Step 1: Update `tailwind.config.ts`**

Add `data/` to content paths:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 2: Rewrite `app/[locale]/page.tsx`**

```tsx
// app/[locale]/page.tsx
import Hero from '@/components/Hero';
import ServicesStrip from '@/components/ServicesStrip';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import ResearchSection from '@/components/ResearchSection';
import TechStack from '@/components/TechStack';
import CreativeStack from '@/components/CreativeStack';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-emerald-950 text-white">
      <Hero />
      <ServicesStrip />
      <ProjectsShowcase />
      <ResearchSection />
      <TechStack />
      <CreativeStack />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: Full build succeeds. All 8 sections render on the overview page.

- [ ] **Step 4: Commit**

```bash
git add app/\[locale\]/page.tsx tailwind.config.ts
git commit -m "feat: assemble overview page with all section components"
```

---

## Task 14: Clean up old components

**Files:**
- Delete: `components/BentoGrid.tsx`
- Delete: `components/Accordion.tsx`
- Delete: `components/ExpertiseSection.tsx`
- Delete: `components/EnhancedContactSection.tsx`
- Delete: `styles/globals.css` (moved to `app/globals.css`)

- [ ] **Step 1: Check that `app/globals.css` exists**

The layout imports `../globals.css` from `app/[locale]/layout.tsx`. Verify `app/globals.css` exists with Tailwind directives. If `styles/globals.css` was the canonical version, move it:

```bash
# If app/globals.css doesn't have the tailwind directives, copy them
cat app/globals.css
```

- [ ] **Step 2: Remove old components**

```bash
rm components/BentoGrid.tsx components/Accordion.tsx components/ExpertiseSection.tsx components/EnhancedContactSection.tsx
rm -rf styles/
```

- [ ] **Step 3: Build and verify nothing is broken**

```bash
npm run build
```

Expected: Build succeeds. No references to deleted components remain.

- [ ] **Step 4: Commit**

```bash
git rm components/BentoGrid.tsx components/Accordion.tsx components/ExpertiseSection.tsx components/EnhancedContactSection.tsx styles/globals.css
git commit -m "chore: remove old components replaced by redesign"
```

---

## Task 15: Build deep-dive project pages with MDX

**Files:**
- Create: `content/projects/sa3.mdx`
- Create: `content/projects/privelessen-dashboard.mdx`
- Create: `content/projects/aantekeningen-app.mdx`
- Create: `content/projects/platform-api.mdx`
- Create: `content/projects/stephenstat.mdx`
- Create: `components/ProjectPage.tsx`
- Modify: `app/[locale]/projects/[slug]/page.tsx`

- [ ] **Step 1: Create MDX content files**

Create `content/projects/sa3.mdx`:
```mdx
---
title: "SA3 — School Management System"
description: "Multi-curriculum school management for 500-1500 students"
techStack: ["Next.js 15", "React 19", "Prisma 5", "AWS RDS", "S3", "SQS", "Lambda", "KMS", "Terraform"]
url: "https://sa3.stephensprive.app"
---

## Overview

SA3 is a full-stack school management system built for an international school in Ghana, supporting multiple curricula (GES Primary, WASSCE, Cambridge IGCSE) and serving 500-1500 students per term.

## Key Features

- **Multi-curriculum support** — GES Primary, WASSCE, Cambridge IGCSE with distinct grading rules
- **Role-scoped permissions** — staff access controlled by role (teacher, head of department, admin)
- **Weighted grading** — configurable assessment workflows per curriculum
- **Offline score entry** — PWA with IndexedDB for areas with unreliable connectivity
- **PDF report cards** — generated at scale for all students
- **Field-level encryption** — AWS KMS for PII data protection

## Architecture

Deployed on AWS App Runner (containerised), with RDS (PostgreSQL), S3 for document storage, SQS for async operations, and Lambda for PDF generation. Infrastructure managed via Terraform.
```

Create similar MDX files for the other 4 projects with appropriate content. Each should follow the same frontmatter structure: `title`, `description`, `techStack`, `url` (optional).

- [ ] **Step 2: Create `components/ProjectPage.tsx`**

```tsx
// components/ProjectPage.tsx
import { getTranslations } from 'next-intl/server';
import BackLink from './BackLink';
import TechBadge from './TechBadge';
import { ExternalLink } from 'lucide-react';

interface ProjectPageProps {
  title: string;
  description: string;
  techStack: string[];
  url?: string;
  children: React.ReactNode;
}

export default async function ProjectPage({
  title,
  description,
  techStack,
  url,
  children,
}: ProjectPageProps) {
  return (
    <main className="min-h-screen bg-emerald-950 text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink />

        <h1 className="text-4xl sm:text-5xl font-bold text-emerald-100 mb-4">{title}</h1>
        <p className="text-lg text-emerald-200/80 mb-6">{description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors mb-8"
          >
            <ExternalLink className="w-4 h-4" />
            Visit live site
          </a>
        )}

        <div className="prose prose-invert prose-emerald max-w-none mt-8">
          {children}
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Update `app/[locale]/projects/[slug]/page.tsx`**

```tsx
// app/[locale]/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import ProjectPage from '@/components/ProjectPage';

const validSlugs = ['sa3', 'privelessen-dashboard', 'aantekeningen-app', 'platform-api', 'stephenstat'];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return {};

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(source);

  return {
    title: `${data.title} — Stephen Adei`,
    description: data.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) notFound();

  const filePath = path.join(process.cwd(), 'content', 'projects', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) notFound();

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(source);

  return (
    <ProjectPage
      title={data.title}
      description={data.description}
      techStack={data.techStack}
      url={data.url}
    >
      <MDXRemote source={content} />
    </ProjectPage>
  );
}
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

Expected: Build succeeds. `/projects/sa3` renders the MDX content with the project layout.

- [ ] **Step 5: Commit**

```bash
git add content/ components/ProjectPage.tsx app/\[locale\]/projects/\[slug\]/page.tsx
git commit -m "feat: add MDX-powered project deep-dive pages"
```

---

## Task 16: Build research deep-dive page

**Files:**
- Modify: `app/[locale]/research/page.tsx`

- [ ] **Step 1: Flesh out the research page**

```tsx
// app/[locale]/research/page.tsx
import { getTranslations } from 'next-intl/server';
import { Download, ExternalLink } from 'lucide-react';
import BackLink from '@/components/BackLink';
import SectionHeading from '@/components/SectionHeading';
import YouTubeEmbed from '@/components/YouTubeEmbed';
import { theses, education } from '@/data/research';

export async function generateMetadata() {
  return {
    title: 'Research — Stephen Adei',
    description: 'Academic research, theses, and projects in mathematics, quantum computing, and computational thinking.',
  };
}

export default async function ResearchPage() {
  const t = await getTranslations('Research');

  return (
    <main className="min-h-screen bg-emerald-950 text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink />
        <SectionHeading title={t('title')} />

        {/* Education Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-emerald-100 mb-8">{t('education.title')}</h3>
          <div className="border-l-2 border-emerald-700/50 pl-8 space-y-8">
            {education.map((edu) => (
              <div key={edu.key} className="relative">
                <div className="absolute -left-[37px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-950" />
                <h4 className="text-xl font-semibold text-emerald-100">
                  {t(`education.${edu.key}.title`)}
                </h4>
                <p className="text-emerald-300 mt-1">
                  {t(`education.${edu.key}.institution`)} · {t(`education.${edu.key}.years`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Theses */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-emerald-100 mb-8">{t('outputs.title')}</h3>
          <div className="space-y-6">
            {theses.map((thesis) => (
              <div
                key={thesis.key}
                className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30"
              >
                <p className="text-xs font-medium text-emerald-400 uppercase tracking-wider mb-2">
                  {t(`outputs.theses.${thesis.key}.type`)}
                </p>
                <h4 className="text-xl font-semibold text-emerald-100 mb-3">
                  {t(`outputs.theses.${thesis.key}.title`)}
                </h4>
                <p className="text-emerald-200/80 mb-4">
                  {t(`outputs.theses.${thesis.key}.description`)}
                </p>
                {thesis.file && (
                  <a
                    href={`/academic-works/${thesis.file}`}
                    download
                    className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    {t('downloadPdf')}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Pluk de Data with YouTube embed */}
        <div className="mb-16">
          <div className="rounded-xl p-8 bg-gradient-to-br from-emerald-800/40 to-emerald-900/40 border border-emerald-600/30">
            <h3 className="text-2xl font-bold text-emerald-100 mb-4">
              {t('plukDeData.title')}
            </h3>
            <p className="text-emerald-200/80 mb-3">{t('plukDeData.description')}</p>
            <p className="text-sm text-emerald-300 mb-6">{t('plukDeData.role')}</p>

            <div className="mb-6">
              <YouTubeEmbed videoId="NAvG24xGFHU" title={t('plukDeData.title')} />
            </div>

            <a
              href="https://www.hva.nl/onderzoeksresultaten/2025/6/computational-thinking-pluk-de-data"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {t('plukDeData.visitProject')}
            </a>
          </div>
        </div>

        {/* Archive project */}
        <div className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30">
          <h4 className="text-xl font-semibold text-emerald-100 mb-3">{t('archive.title')}</h4>
          <p className="text-emerald-200/80">{t('archive.description')}</p>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

Expected: `/research` renders the full page with timeline, theses, Pluk de Data with YouTube thumbnail, and archive project.

- [ ] **Step 3: Commit**

```bash
git add app/\[locale\]/research/page.tsx
git commit -m "feat: build research deep-dive page with YouTube embed"
```

---

## Task 17: Build creative deep-dive page

**Files:**
- Modify: `app/[locale]/creative/page.tsx`

- [ ] **Step 1: Flesh out the creative page**

```tsx
// app/[locale]/creative/page.tsx
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Camera, Music, Video, Palette } from 'lucide-react';
import BackLink from '@/components/BackLink';
import SectionHeading from '@/components/SectionHeading';

export async function generateMetadata() {
  return {
    title: 'Creative — Stephen Adei',
    description: 'Photography, music production, video content, and design work by Stephen Adei.',
  };
}

export default async function CreativePage() {
  const t = await getTranslations('CreativeStack');

  const photos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];

  return (
    <main className="min-h-screen bg-emerald-950 text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink />
        <SectionHeading title={t('title')} />

        {/* Photography */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-semibold text-emerald-100">{t('photography')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <div key={photo} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={`/images/photography/${photo}`}
                  alt={`Photography ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Music Production */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Music className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-semibold text-emerald-100">{t('musicProduction')}</h3>
          </div>
          <div className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30">
            <p className="text-emerald-200/80">Content coming soon — music production portfolio in development.</p>
          </div>
        </div>

        {/* Video/Content */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Video className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-semibold text-emerald-100">{t('videoContent')}</h3>
          </div>
          <div className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30">
            <p className="text-emerald-200/80">Content coming soon — video portfolio in development.</p>
          </div>
        </div>

        {/* Design */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-semibold text-emerald-100">{t('design')}</h3>
          </div>
          <div className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30">
            <p className="text-emerald-200/80">Content coming soon — design portfolio in development.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Build and verify**

```bash
npm run build
```

Expected: `/creative` renders with photo gallery and placeholder sections.

- [ ] **Step 3: Commit**

```bash
git add app/\[locale\]/creative/page.tsx
git commit -m "feat: build creative deep-dive page with photo gallery"
```

---

## Task 18: Final build, lint, and cleanup

**Files:**
- Modify: `CLAUDE.md` (update to reflect new architecture)

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: Clean build with no errors.

- [ ] **Step 2: Lint**

```bash
npm run lint
```

Fix any lint errors that arise.

- [ ] **Step 3: Update CLAUDE.md**

Update the CLAUDE.md to reflect the new architecture (next-intl, App Router with `[locale]`, server components, MDX content, etc.).

- [ ] **Step 4: Verify Docker build still works**

```bash
docker compose build
```

Expected: Docker image builds successfully.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: final cleanup, lint fixes, and CLAUDE.md update"
```
