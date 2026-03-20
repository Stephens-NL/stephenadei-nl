# Central Business Config — Design Spec

## Overview

Create a centralized `@stephen/business-config` package that serves as the single source of truth for all business data across the workspace: contact information, pricing, business rules, and operational config. Replaces hardcoded values scattered across 7+ files in 6 projects.

**Package:** `packages/business-config` (`@stephen/business-config`)
**Consumers:** All npm workspace projects (direct import) + Python projects and n8n (via S3-synced JSON)

---

## Package Structure

```
packages/business-config/
  src/
    index.ts              # re-exports everything
    contact.ts            # phone, email, social, addresses
    pricing.ts            # unified rates (imports rates.json, provides typed access + helpers)
    business-rules.ts     # surcharges, premiums, cancellation, operating hours, identity
    types.ts              # all interfaces
  rates.json              # moved from scripts/deploy/rates.json — authoritative pricing data
  generated/
    business-config.json  # auto-generated, .gitignore'd, synced to S3
  scripts/
    generate-json.ts      # builds JSON from TS sources + rates.json
  package.json
  tsconfig.json
  .gitignore              # ignores generated/
```

---

## Config Modules

### Contact (`contact.ts`)

```typescript
export const contact = {
  phone: {
    primary: { number: '+31647357426', display: '+31 6 47 35 74 26', whatsappOnly: true },
    secondary: { number: '+31614189013', display: '+31 6 14 18 90 13', whatsappOnly: false },
  },
  email: {
    primary: 'info@stephenadei.nl',
    lessons: 'lessons@stephensprivelessen.nl',
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/stephen-adei/',
    github: 'https://github.com/stephenadei',
    instagram: {
      tutoring: 'https://www.instagram.com/stephensprivelessen/',
      music: 'https://www.instagram.com/callhimdavinci.als/',
      photography: 'https://www.instagram.com/callhimdavinci.jpg/',
      events: 'https://www.instagram.com/stephensevents/',
    },
  },
  addresses: {
    main: {
      label: 'Science Park',
      street: 'Science Park 904',
      postal: '1098 XH',
      city: 'Amsterdam',
      googleMapsUrl: 'https://maps.google.com/?q=Science Park 904, 1098 XH Amsterdam',
    },
    weekend: {
      label: 'Bijlmerplein',
      street: 'Bijlmerplein 888',
      postal: '1102 MG',
      city: 'Amsterdam',
      googleMapsUrl: 'https://maps.google.com/?q=Bijlmerplein 888, 1102 MG Amsterdam',
    },
  },
  whatsapp: (number: string) => `https://wa.me/${number.replace(/\+/g, '')}`,
};
```

### Pricing (`pricing.ts`)

**Design decision:** `rates.json` is the authoritative source with a rich structure (online/physical modes, 1-4 student counts, spoed packages, status, valid dates, locations). Rather than flattening this into a lossy TypeScript structure, the package imports `rates.json` directly, provides typed access, and adds query helpers.

```typescript
import ratesData from '../rates.json';

export type Segment = 'vo' | 'hbo_wo' | 'weekend_hva';
export type Mode = 'online' | 'physical';

export interface Rate {
  rate_id: string;
  segment: Segment;
  mode: Mode;
  label: string;
  amount_cents: number;
  per_unit: string;
  package_hours: number;
  student_count: number;
  per_person_cents?: number;
  location?: string;
  valid_from: string;
  valid_to: string | null;
  status: 'definitive' | 'draft';
  notes?: string;
}

export const pricing = {
  ...ratesData,
  rates: ratesData.rates as Rate[],

  /** Find rates by segment, mode, and student count */
  findRate: (segment: Segment, mode: Mode, studentCount: number): Rate | undefined =>
    ratesData.rates.find(
      (r) => r.segment === segment && r.mode === mode && r.student_count === studentCount
    ) as Rate | undefined,

  /** Get all rates for a segment */
  bySegment: (segment: Segment): Rate[] =>
    ratesData.rates.filter((r) => r.segment === segment) as Rate[],

  /** Get all definitive (non-draft) rates */
  definitive: (): Rate[] =>
    ratesData.rates.filter((r) => r.status === 'definitive') as Rate[],

  /** Format cents as Dutch currency */
  formatCents: (cents: number) =>
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(cents / 100),
};
```

This preserves the full dimensionality of rates.json (23 rates across online/physical, 1-4 students, standard/spoed, 3 segments) while providing typed access. Projects query what they need:

```typescript
// Marketing page: show VO online 1-student price
const voOnline = pricing.findRate('vo', 'online', 1);
// → { amount_cents: 24000, package_hours: 4, ... }

// Dashboard: get all HBO rates
const hboRates = pricing.bySegment('hbo_wo');
```

### Business Rules (`business-rules.ts`)

Values taken directly from `stephensprivelessen-nl/data/config.ts` (the actual codebase values):

```typescript
export const businessRules = {
  travel: {
    sciencePark: 0,         // default physical location — no surcharge
    vuUva: 2000,            // uni locations outside Science Park — €20
    homeAmsterdam: 5000,    // at-home in Amsterdam area — €50
  },
  scheduling: {
    lastMinuteSurcharges: {
      lessThan24hPct: 20,
      lessThan12hPct: 50,
    },
    cancellation: {
      freeBeforeHours: 24,
    },
    flexibilityPremium: {
      twoLessons: 15,       // percentage
      fourLessons: 30,
      sixOrMoreLessons: 50,
    },
  },
  operatingHours: {
    weekdays: { start: '18:00', end: '21:00' },
    saturday: { start: '10:00', end: '18:00' },
    sunday: { start: '14:00', end: '18:00', onlineOnly: true, makeupOnly: true },
  },
  maxHoursPerWeek: 2,
  paymentMethod: 'tikkie_upfront',
  invoiceOnRequest: true,
  business: {
    name: "Stephen's Privelessen",
    nameNl: 'Stephens Privelessen',
    nameEn: "Stephen's Private Lessons",
    owner: 'Stephen Adei',
    kvk: null,
    btw: null,
    siteUrl: 'https://stephensprivelessen.nl',
    dashboardUrl: 'https://dash.stephensprivelessen.nl',
    portfolioUrl: 'https://stephenadei.nl',
  },
};
```

---

## JSON Generation

`scripts/generate-json.ts` imports all config modules and writes `generated/business-config.json`:

```json
{
  "version": "1.0.0",
  "generatedAt": "2026-03-20T17:00:00Z",
  "contact": {
    "phone": { ... },
    "email": { ... },
    "social": { ... },
    "addresses": { ... },
    "whatsappUrls": {
      "primary": "https://wa.me/31647357426",
      "secondary": "https://wa.me/31614189013"
    }
  },
  "pricing": { "...full rates.json content..." },
  "businessRules": { ... }
}
```

**Note:** The `whatsapp()` helper and query functions are not serializable — the JSON includes pre-computed WhatsApp URLs and the full rates array. Python consumers query the array directly.

**The generated JSON is `.gitignore`'d** — it's a build artifact. The GitHub Action generates and syncs it.

**Triggers:**
- `npm run build` in the package runs `generate-json.ts`
- GitHub Action generates then syncs to S3 on push to master

---

## S3 Sync

Extends the existing `sync-config-to-s3.yml` GitHub Action:

**Current:** syncs `scripts/deploy/rates.json` and `packages/taxonomy/src/static-data.ts`
**New:** syncs `packages/business-config/generated/business-config.json` (generated during the Action)

S3 target: `s3://tutoring-datalake-711210709750/tutoring/config/business-config.json`

The old `scripts/deploy/rates.json` is deleted — `rates.json` now lives inside the package at `packages/business-config/rates.json`. The sync script is updated to point there.

---

## Workspace Prerequisite

`stephensprivelessen-nl` and `cv` are NOT currently npm workspace members. Before they can import `@stephen/business-config`, add them:

In root `package.json`, add to `workspaces`:
```json
"projects/stephensprivelessen-nl",
"projects/cv"
```

Then run `npm install` to link.

---

## Migrations

### 1. stephenadei-nl — `components/ContactSection.tsx`

**Before:** Hardcoded phone, email, WhatsApp URL, LinkedIn, GitHub
**After:** Import from `@stephen/business-config`

```typescript
import { contact } from '@stephen/business-config';

const contactLinks = [
  { href: `mailto:${contact.email.primary}`, icon: Mail, label: t('email') },
  { href: contact.whatsapp(contact.phone.primary.number), icon: Phone, label: t('whatsapp') },
  { href: contact.social.linkedin, icon: Linkedin, label: t('linkedin') },
  { href: contact.social.github, icon: Github, label: t('github') },
];

// Phone reveal uses contact.phone.primary.display and contact.phone.primary.number
```

Also update `messages/en.json` and `messages/nl.json` — remove any hardcoded contact values, keep only translation labels.

### 2. stephensprivelessen-nl — `data/config.ts`

**Before:** Full config object with contact, addresses, pricing modifiers
**After:** Re-export from business-config

```typescript
import { contact, businessRules } from '@stephen/business-config';
export { contact, businessRules };

// Project-specific display derivations (if any) can layer on top
```

### 3. stephensprivelessen-nl — `data/pricingData.ts`

**Before:** Hardcoded pricing arrays for marketing display
**After:** Derive from business-config pricing queries

```typescript
import { pricing } from '@stephen/business-config';

// Example: build marketing display data for VO segment
const voOnline1 = pricing.findRate('vo', 'online', 1);
const voPhysical1 = pricing.findRate('vo', 'physical', 1);
// ... transform into display format for marketing pages
```

### 4. privelessen-dashboard — `src/lib/pricing.ts`

**Before:** 218 lines with hardcoded pricing constants, SchoolLevel mappings, calculateLessonPrice, formatPrice
**After:** Import rate data from business-config, keep domain logic local

```typescript
import { pricing } from '@stephen/business-config';

// SchoolLevel → segment mapping stays here (dashboard domain logic)
// calculateLessonPrice stays here but reads rates from pricing.findRate()
// formatPrice stays here (uses Intl.NumberFormat which business-config also uses)
```

The dashboard's domain logic (school level mappings, price calculations, time-based pricing) stays in the dashboard. Only the raw rate values come from business-config.

### 5. shared-types — `src/pricing.ts`

**Before:** Pricing interfaces + hardcoded constants (€200-€250 — outdated values)
**After:** Delete the constants. Move interfaces to `@stephen/business-config/types` if still needed. The shared-types pricing constants are outdated and should not be used.

### 6. tutorbot — `text_helpers.py`

**Before:** Phone/email hardcoded inline in dozens of multi-line WhatsApp message templates (46,000+ token file)
**After:** Load contact data from S3-synced JSON at startup, use variables in templates

```python
import json
import boto3

def load_business_config():
    s3 = boto3.client('s3')
    obj = s3.get_object(
        Bucket='tutoring-datalake-711210709750',
        Key='tutoring/config/business-config.json'
    )
    return json.loads(obj['Body'].read())

_config = load_business_config()
PHONE = _config['contact']['phone']['primary']['display']
EMAIL = _config['contact']['email']['primary']
WHATSAPP_URL = _config['contact']['whatsappUrls']['primary']
```

**Migration complexity note:** `text_helpers.py` is a large file with contact info embedded inline in formatted message strings. Each occurrence needs to be replaced with f-string interpolation using the loaded variables. This is a mechanical but high-touch migration — estimate ~20 replacements across the file.

### 7. rates.json — `scripts/deploy/rates.json`

**Move** to `packages/business-config/rates.json`. Delete from `scripts/deploy/`.

Update `scripts/deploy/sync_rates_to_s3.sh` to reference the new location, or fold the sync into the `generate-json.ts` workflow.

### 8. GitHub Action — `.github/workflows/sync-config-to-s3.yml`

**Update path triggers:**
- Remove: `scripts/deploy/rates.json`
- Add: `packages/business-config/rates.json`, `packages/business-config/src/**`

**Update workflow steps:**
1. Run `npm run build -w @stephen/business-config` to generate JSON
2. Sync `packages/business-config/generated/business-config.json` to S3
3. Also sync the raw `rates.json` to its existing S3 location for backward compatibility

### 9. cv-portal — `cv-portal/content/` files

**Primary target:** `cv-portal/content/shared-data/cv-data.yaml` — contains phone, email, LinkedIn, GitHub used by LaTeX templates and content pipelines.

**Secondary targets:** `cv-portal/app/lib/services/pdf-service.ts` and `file-storage-service.ts` — each has a single email reference.

**Approach for YAML:** The generate-json.ts script also outputs a `cv-contact.yaml` fragment that the cv-portal build can merge into cv-data.yaml, or cv-data.yaml references the JSON. This is a lighter touch — the YAML file has a lot of CV-specific content beyond contact info.

**Approach for TS files:** Direct import from `@stephen/business-config` after adding cv to workspaces.

---

## Package Configuration

`packages/business-config/package.json`:
```json
{
  "name": "@stephen/business-config",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc && ts-node scripts/generate-json.ts",
    "generate": "ts-node scripts/generate-json.ts"
  },
  "files": ["dist", "rates.json"]
}
```

**Root package.json updates:**
1. Add `"packages/business-config"` — already covered by `"packages/*"` glob
2. Add `"projects/stephensprivelessen-nl"` to workspaces
3. Add `"projects/cv"` to workspaces

---

## Out of Scope

- n8n workflow updates (they can read from S3 when needed)
- Internationalized pricing labels (projects handle their own i18n, config provides raw data)
- Runtime config fetching for npm projects (they import at build time)
- Multi-tenant support (single business)
- Refactoring privelessen-dashboard's pricing domain logic (only the raw rates move)
- Full tutorbot text_helpers.py rewrite (only contact data extraction, not template restructuring)
