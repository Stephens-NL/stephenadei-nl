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
    pricing.ts            # unified rates (replaces rates.json + all project-local pricing)
    business-rules.ts     # surcharges, premiums, cancellation, operating hours, identity
    types.ts              # all interfaces
  generated/
    business-config.json  # auto-generated from TS sources, synced to S3
  scripts/
    generate-json.ts      # builds JSON from TS sources
  package.json
  tsconfig.json
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
    main: { label: 'Science Park', street: 'Science Park 904', postal: '1098 XH', city: 'Amsterdam' },
    weekend: { label: 'Bijlmerplein', street: 'Bijlmerplein 888', postal: '1102 MG', city: 'Amsterdam' },
  },
  whatsapp: (number: string) => `https://wa.me/${number.replace(/\+/g, '')}`,
};
```

### Pricing (`pricing.ts`)

All prices in cents. Values from `rates.json` (2026-03-20, authoritative source).

```typescript
export const pricing = {
  segments: {
    vo: {
      label: 'Voortgezet Onderwijs',
      packages: [
        { sessions: 4, pricePerSessionCents: 6000, totalCents: 24000 },
        { sessions: 8, pricePerSessionCents: 5500, totalCents: 44000 },
      ],
    },
    hbo_wo: {
      label: 'HBO / WO',
      packages: [
        { sessions: 4, pricePerSessionCents: 8000, totalCents: 32000 },
        { sessions: 8, pricePerSessionCents: 7500, totalCents: 60000 },
      ],
    },
    weekend_hva: {
      label: 'Weekend Programma (HvA)',
      packages: [
        { sessions: 4, pricePerSessionCents: 10500, totalCents: 42000 },
        { sessions: 8, pricePerSessionCents: 10000, totalCents: 80000 },
      ],
    },
  },
  currency: 'EUR',
  formatCents: (cents: number) => `€${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`,
};
```

### Business Rules (`business-rules.ts`)

```typescript
export const businessRules = {
  travel: {
    withinAmsterdamSurcharge: 0,
    outsideAmsterdamSurchargePct: 15,
    maxTravelDistanceKm: 30,
  },
  scheduling: {
    lastMinuteSurcharges: {
      within24hPct: 25,
      within48hPct: 15,
    },
    cancellation: {
      freeBeforeHours: 24,
      lateCancellationChargePct: 50,
      noShowChargePct: 100,
    },
    flexibilityPremiumPct: 10,
  },
  operatingHours: {
    weekdays: { start: '09:00', end: '21:00' },
    saturday: { start: '10:00', end: '18:00' },
    sunday: null,
  },
  business: {
    name: "Stephen's Privélessen",
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

`scripts/generate-json.ts` imports all config modules and writes a flat `generated/business-config.json`:

```json
{
  "version": "1.0.0",
  "generatedAt": "2026-03-20T17:00:00Z",
  "contact": { ... },
  "pricing": { ... },
  "businessRules": { ... }
}
```

**Note:** The `whatsapp()` helper function is not serializable — the JSON includes pre-computed WhatsApp URLs for all phone numbers instead.

**Triggers:**
- `npm run build` in the package runs `generate-json.ts`
- Pre-commit hook (or npm `prepare` script) ensures JSON stays in sync
- GitHub Action syncs to S3 on push to master

---

## S3 Sync

Extends the existing `sync-config-to-s3.yml` GitHub Action:

**Current:** syncs `scripts/deploy/rates.json` and `packages/taxonomy/src/static-data.ts`
**New:** also syncs `packages/business-config/generated/business-config.json`

S3 target: `s3://tutoring-datalake-711210709750/tutoring/config/business-config.json`

`rates.json` is deleted — its data now lives in `pricing.ts` and the generated JSON replaces it in S3.

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

// Phone reveal uses contact.phone.primary
```

Also update `messages/en.json` and `messages/nl.json` — remove any hardcoded contact values, keep only translation labels.

### 2. stephensprivelessen-nl — `data/config.ts`

**Before:** Full config object with contact, addresses, pricing rules
**After:** Re-export from business-config, remove duplicated values

```typescript
import { contact, businessRules } from '@stephen/business-config';
export { contact, businessRules };

// Any project-specific display config that layers on top can stay here
```

### 3. stephensprivelessen-nl — `data/pricingData.ts`

**Before:** Hardcoded pricing arrays for marketing display
**After:** Derive from `@stephen/business-config/pricing`

```typescript
import { pricing } from '@stephen/business-config';

// Transform pricing.segments into display format for marketing pages
export const pricingData = Object.entries(pricing.segments).map(([key, segment]) => ({
  category: segment.label,
  packages: segment.packages.map(pkg => ({
    sessions: pkg.sessions,
    price: pricing.formatCents(pkg.totalCents),
    pricePerSession: pricing.formatCents(pkg.pricePerSessionCents),
  })),
}));
```

### 4. privelessen-dashboard — `src/lib/pricing.ts`

**Before:** Hardcoded pricing constants in cents
**After:** Import from business-config

```typescript
import { pricing } from '@stephen/business-config';
export { pricing };
// Dashboard-specific payment logic stays here, but uses imported rates
```

### 5. shared-types — `src/pricing.ts`

**Before:** Pricing interfaces + hardcoded constants
**After:** Delete the constants (moved to business-config). Keep interfaces if still needed, or move them to `@stephen/business-config/types` and deprecate.

### 6. tutorbot — `text_helpers.py`

**Before:** Hardcoded phone/email in Python string templates
**After:** Read from S3-synced `business-config.json`

```python
import json
import boto3

def load_business_config():
    s3 = boto3.client('s3')
    obj = s3.get_object(Bucket='tutoring-datalake-711210709750', Key='tutoring/config/business-config.json')
    return json.loads(obj['Body'].read())

config = load_business_config()
PHONE = config['contact']['phone']['primary']['display']
EMAIL = config['contact']['email']['primary']
WHATSAPP_URL = config['contact']['whatsappUrls']['primary']
```

### 7. rates.json — `scripts/deploy/rates.json`

**Delete.** Replaced by `packages/business-config/generated/business-config.json`.

Update `scripts/deploy/sync_rates_to_s3.sh` to sync the new file, or replace with a new sync script.

### 8. GitHub Action — `.github/workflows/sync-config-to-s3.yml`

**Update path triggers:**
- Remove: `scripts/deploy/rates.json`
- Add: `packages/business-config/generated/business-config.json`

**Update sync command** to upload the new JSON to S3.

### 9. cv-portal — `cv-portal/content/` files

**Before:** Hardcoded phone/email in `pdf-service.ts`, `file-storage-service.ts`
**After:** Import from `@stephen/business-config` (cv-portal is JS/TS, can import directly)

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
  }
}
```

Add `"packages/business-config"` to the root `package.json` workspaces array.

---

## Out of Scope

- n8n workflow updates (they can read from S3 when needed)
- Internationalized pricing labels (projects handle their own i18n, config provides raw data)
- Runtime config fetching for npm projects (they import at build time)
- Multi-tenant support (single business)
