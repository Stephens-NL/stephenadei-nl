# Central Business Config — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a centralized `@stephen/business-config` npm package as the single source of truth for contact info, pricing, and business rules across all workspace projects.

**Architecture:** TypeScript package in `packages/business-config` exporting typed config objects. Imports `rates.json` directly for pricing. Generates a `business-config.json` artifact for non-JS consumers (Python/n8n) synced to S3 via existing GitHub Action. Projects migrate from hardcoded values to imports.

**Tech Stack:** TypeScript, npm workspaces, AWS S3, GitHub Actions

**Spec:** `docs/superpowers/specs/2026-03-20-central-business-config-design.md` (in the stephenadei-nl worktree)

**IMPORTANT:** This plan operates on the **monorepo root** at `/home/stephen/`, not the stephenadei-nl worktree. All paths are relative to `/home/stephen/`.

---

## Task 1: Create the business-config package scaffold

**Files:**
- Create: `packages/business-config/package.json`
- Create: `packages/business-config/tsconfig.json`
- Create: `packages/business-config/.gitignore`
- Create: `packages/business-config/src/index.ts`
- Create: `packages/business-config/src/types.ts`
- Move: `scripts/deploy/rates.json` → `packages/business-config/rates.json`

- [ ] **Step 1: Create `packages/business-config/package.json`**

```json
{
  "name": "@stephen/business-config",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc && ts-node scripts/generate-json.ts",
    "generate": "ts-node scripts/generate-json.ts"
  },
  "files": ["dist", "rates.json"],
  "devDependencies": {
    "typescript": "^5.9.3",
    "ts-node": "^10.9.2"
  }
}
```

- [ ] **Step 2: Create `packages/business-config/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "resolveJsonModule": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "scripts"]
}
```

- [ ] **Step 3: Create `packages/business-config/.gitignore`**

```
dist/
generated/
node_modules/
```

- [ ] **Step 4: Create `packages/business-config/src/types.ts`**

```typescript
export type Segment = 'vo' | 'hbo_wo' | 'weekend_hva';
export type Mode = 'online' | 'physical';
export type RateStatus = 'definitive' | 'draft';

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
  status: RateStatus;
  notes?: string;
}

export interface PhoneEntry {
  number: string;
  display: string;
  whatsappOnly: boolean;
}

export interface Address {
  label: string;
  street: string;
  postal: string;
  city: string;
  googleMapsUrl: string;
}
```

- [ ] **Step 5: Create stub `packages/business-config/src/index.ts`**

```typescript
export * from './types';
export { contact } from './contact';
export { pricing } from './pricing';
export { businessRules } from './business-rules';
```

- [ ] **Step 6: Move rates.json into the package**

```bash
cp scripts/deploy/rates.json packages/business-config/rates.json
```

Note: Don't delete the original yet — we update the sync script later.

- [ ] **Step 7: Run `npm install` to link the new package**

```bash
npm install
```

- [ ] **Step 8: Commit**

```bash
git add packages/business-config/
git commit -m "feat: scaffold @stephen/business-config package"
```

---

## Task 2: Implement contact.ts

**Files:**
- Create: `packages/business-config/src/contact.ts`

- [ ] **Step 1: Create `packages/business-config/src/contact.ts`**

```typescript
import type { PhoneEntry, Address } from './types';

export const contact = {
  phone: {
    primary: { number: '+31647357426', display: '+31 6 47 35 74 26', whatsappOnly: true } as PhoneEntry,
    secondary: { number: '+31614189013', display: '+31 6 14 18 90 13', whatsappOnly: false } as PhoneEntry,
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
    } as Address,
    weekend: {
      label: 'Bijlmerplein',
      street: 'Bijlmerplein 888',
      postal: '1102 MG',
      city: 'Amsterdam',
      googleMapsUrl: 'https://maps.google.com/?q=Bijlmerplein 888, 1102 MG Amsterdam',
    } as Address,
  },
  whatsapp: (number: string) => `https://wa.me/${number.replace(/\+/g, '')}`,
} as const;
```

- [ ] **Step 2: Build the package to verify**

```bash
npm run build -w @stephen/business-config
```

Expected: Compiles without errors (pricing.ts and business-rules.ts don't exist yet — index.ts will fail. That's fine, we'll fix in next tasks).

Actually, the build will fail because index.ts imports contact, pricing, and business-rules. Create empty stubs first:

```bash
echo "export const pricing = {} as any;" > packages/business-config/src/pricing.ts
echo "export const businessRules = {} as any;" > packages/business-config/src/business-rules.ts
```

Then build:
```bash
npm run build -w @stephen/business-config
```

Expected: Compiles. `dist/` created with JS + type declarations.

- [ ] **Step 3: Commit**

```bash
git add packages/business-config/src/contact.ts packages/business-config/src/pricing.ts packages/business-config/src/business-rules.ts
git commit -m "feat: add contact config module"
```

---

## Task 3: Implement pricing.ts

**Files:**
- Modify: `packages/business-config/src/pricing.ts`

- [ ] **Step 1: Replace the pricing.ts stub**

```typescript
import type { Rate, Segment, Mode } from './types';
import ratesData from '../rates.json';

export const pricing = {
  version: ratesData.version,
  updatedAt: ratesData.updated_at,
  currency: ratesData.currency,
  policy: ratesData.policy,
  rates: ratesData.rates as Rate[],

  /** Find a rate by segment, mode, and student count */
  findRate(segment: Segment, mode: Mode, studentCount: number): Rate | undefined {
    return this.rates.find(
      (r) => r.segment === segment && r.mode === mode && r.student_count === studentCount
    );
  },

  /** Get all rates for a segment */
  bySegment(segment: Segment): Rate[] {
    return this.rates.filter((r) => r.segment === segment);
  },

  /** Get all definitive (non-draft) rates */
  definitive(): Rate[] {
    return this.rates.filter((r) => r.status === 'definitive');
  },

  /** Get spoed (urgent) rates */
  spoed(): Rate[] {
    return this.rates.filter((r) => r.package_hours === 2);
  },

  /** Format cents as Dutch currency (e.g. € 240,00) */
  formatCents(cents: number): string {
    return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(cents / 100);
  },
};
```

- [ ] **Step 2: Build and verify**

```bash
npm run build -w @stephen/business-config
```

Expected: Compiles successfully.

- [ ] **Step 3: Commit**

```bash
git add packages/business-config/src/pricing.ts
git commit -m "feat: add pricing module wrapping rates.json with typed queries"
```

---

## Task 4: Implement business-rules.ts

**Files:**
- Modify: `packages/business-config/src/business-rules.ts`

- [ ] **Step 1: Replace the business-rules.ts stub**

Values taken directly from `projects/stephensprivelessen-nl/data/config.ts`:

```typescript
export const businessRules = {
  travel: {
    sciencePark: 0,
    vuUva: 2000,
    homeAmsterdam: 5000,
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
      twoLessons: 15,
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
  paymentMethod: 'tikkie_upfront' as const,
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
} as const;
```

- [ ] **Step 2: Build and verify**

```bash
npm run build -w @stephen/business-config
```

Expected: Compiles with all three modules exporting correctly.

- [ ] **Step 3: Commit**

```bash
git add packages/business-config/src/business-rules.ts
git commit -m "feat: add business rules module with travel, scheduling, and identity"
```

---

## Task 5: Create JSON generator script

**Files:**
- Create: `packages/business-config/scripts/generate-json.ts`
- Create: `packages/business-config/generated/` (directory)

- [ ] **Step 1: Create `packages/business-config/scripts/generate-json.ts`**

```typescript
import fs from 'fs';
import path from 'path';
import { contact } from '../src/contact';
import { businessRules } from '../src/business-rules';
import ratesData from '../rates.json';

const output = {
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  contact: {
    phone: contact.phone,
    email: contact.email,
    social: contact.social,
    addresses: contact.addresses,
    whatsappUrls: {
      primary: contact.whatsapp(contact.phone.primary.number),
      secondary: contact.whatsapp(contact.phone.secondary.number),
    },
  },
  pricing: ratesData,
  businessRules,
};

const outDir = path.join(__dirname, '..', 'generated');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, 'business-config.json'),
  JSON.stringify(output, null, 2)
);

console.log(`Generated business-config.json at ${outDir}/business-config.json`);
```

- [ ] **Step 2: Create the scripts tsconfig for ts-node**

Create `packages/business-config/scripts/tsconfig.json`:
```json
{
  "extends": "../../../tsconfig.base.json",
  "compilerOptions": {
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "outDir": "../dist-scripts"
  },
  "include": ["./**/*", "../src/**/*"]
}
```

Update the `generate` script in `packages/business-config/package.json` to use this config:
```json
"generate": "ts-node --project scripts/tsconfig.json scripts/generate-json.ts"
```

Also update the `build` script:
```json
"build": "tsc && ts-node --project scripts/tsconfig.json scripts/generate-json.ts"
```

- [ ] **Step 3: Run the generator**

```bash
npm run generate -w @stephen/business-config
```

Expected: Creates `packages/business-config/generated/business-config.json` with all config data.

- [ ] **Step 4: Verify the JSON output**

```bash
cat packages/business-config/generated/business-config.json | head -20
```

Expected: JSON with version, generatedAt, contact with whatsappUrls, pricing, businessRules.

- [ ] **Step 5: Full build**

```bash
npm run build -w @stephen/business-config
```

Expected: Both tsc and generate succeed.

- [ ] **Step 6: Commit**

```bash
git add packages/business-config/scripts/ packages/business-config/package.json
git commit -m "feat: add JSON generator for non-JS consumers"
```

---

## Task 6: Update S3 sync infrastructure

**Files:**
- Modify: `.github/workflows/sync-config-to-s3.yml`
- Modify: `scripts/deploy/sync_rates_to_s3.sh`
- Delete: `scripts/deploy/rates.json` (moved to package)

- [ ] **Step 1: Update the sync script**

Edit `scripts/deploy/sync_rates_to_s3.sh` to point to the new rates.json location and also sync the generated business-config.json:

```bash
#!/usr/bin/env bash
# Sync business config to S3.
# Sources:
#   packages/business-config/rates.json → S3 config + silver NDJSON
#   packages/business-config/generated/business-config.json → S3 config
set -euo pipefail

WORKSPACE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
RATES_JSON="${WORKSPACE_ROOT}/packages/business-config/rates.json"
BUSINESS_CONFIG_JSON="${WORKSPACE_ROOT}/packages/business-config/generated/business-config.json"
BUCKET="${DATALAKE_BUCKET:-tutoring-datalake-711210709750}"
S3_CONFIG_RATES="s3://${BUCKET}/tutoring/config/rates.json"
S3_CONFIG_BUSINESS="s3://${BUCKET}/tutoring/config/business-config.json"
S3_SILVER="s3://${BUCKET}/tutoring/silver/rates/rates.ndjson"

if [ ! -f "$RATES_JSON" ]; then
  echo "ERROR: rates.json not found at $RATES_JSON"
  exit 1
fi

# Generate business-config.json if not exists
if [ ! -f "$BUSINESS_CONFIG_JSON" ]; then
  echo "Generating business-config.json..."
  cd "$WORKSPACE_ROOT" && npm run generate -w @stephen/business-config
fi

echo "Uploading rates config to $S3_CONFIG_RATES ..."
aws s3 cp "$RATES_JSON" "$S3_CONFIG_RATES" --content-type application/json

echo "Uploading business config to $S3_CONFIG_BUSINESS ..."
aws s3 cp "$BUSINESS_CONFIG_JSON" "$S3_CONFIG_BUSINESS" --content-type application/json

echo "Writing silver NDJSON to $S3_SILVER ..."
export RATES_JSON BUCKET
python3 << 'PY'
import json
import os
import boto3
from datetime import datetime, timezone

with open(os.environ["RATES_JSON"]) as f:
    data = json.load(f)

bucket = os.environ["BUCKET"]
updated = data.get("updated_at") or datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
lines = []
for r in data.get("rates", []):
    row = {
        "rate_id": r.get("rate_id", ""),
        "segment": r.get("segment", ""),
        "label": r.get("label", ""),
        "amount_cents": r.get("amount_cents", 0),
        "per_unit": r.get("per_unit", "package"),
        "package_hours": r.get("package_hours"),
        "student_count": r.get("student_count"),
        "valid_from": r.get("valid_from", ""),
        "valid_to": r.get("valid_to"),
        "notes": r.get("notes", ""),
        "updated_at": updated,
    }
    lines.append(json.dumps(row))

body = "\n".join(lines)
boto3.client("s3").put_object(
    Bucket=bucket,
    Key="tutoring/silver/rates/rates.ndjson",
    Body=body.encode(),
    ContentType="application/x-ndjson",
)
print(f"Written {len(lines)} rates to silver.")
PY

echo "Done. Config + silver rates zijn bijgewerkt."
```

- [ ] **Step 2: Update the GitHub Action**

Edit `.github/workflows/sync-config-to-s3.yml`:

```yaml
name: Sync Config to S3

on:
  push:
    branches: [master]
    paths:
      - "packages/business-config/rates.json"
      - "packages/business-config/src/**"
      - "packages/taxonomy/src/static-data.ts"
      - ".github/workflows/sync-config-to-s3.yml"

jobs:
  detect-changes:
    runs-on: self-hosted
    outputs:
      business-config: ${{ steps.filter.outputs.business-config }}
      taxonomy: ${{ steps.filter.outputs.taxonomy }}
    steps:
      - uses: actions/checkout@v4
      - uses: dorny/paths-filter@v3
        id: filter
        with:
          filters: |
            business-config:
              - "packages/business-config/rates.json"
              - "packages/business-config/src/**"
            taxonomy:
              - "packages/taxonomy/src/static-data.ts"

  sync-business-config:
    needs: detect-changes
    if: needs.detect-changes.outputs.business-config == 'true'
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v4
      - name: Install dependencies
        run: npm ci
      - name: Build and generate JSON
        run: npm run build -w @stephen/business-config
      - name: Sync to S3
        run: /home/stephen/scripts/deploy/sync_rates_to_s3.sh
      - name: Notify
        if: success()
        run: /home/stephen/scripts/notify/telegram_alert.sh "📊 *Business config synced to S3* (commit \`${GITHUB_SHA:0:7}\`)"

  sync-taxonomy:
    needs: detect-changes
    if: needs.detect-changes.outputs.taxonomy == 'true'
    runs-on: self-hosted
    steps:
      - uses: actions/checkout@v4
      - name: Sync taxonomy to S3
        run: /home/stephen/scripts/deploy/sync_taxonomy_to_s3.sh
      - name: Notify
        if: success()
        run: /home/stephen/scripts/notify/telegram_alert.sh "🏷️ *Taxonomy synced to S3* (commit \`${GITHUB_SHA:0:7}\`)"
```

- [ ] **Step 3: Delete the old rates.json**

```bash
rm scripts/deploy/rates.json
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/sync-config-to-s3.yml scripts/deploy/sync_rates_to_s3.sh
git rm scripts/deploy/rates.json
git commit -m "feat: update S3 sync to use business-config package"
```

---

## Task 7: Add workspace members and install

**Files:**
- Modify: `/home/stephen/package.json`

- [ ] **Step 1: Add stephensprivelessen-nl and cv to workspaces**

In the root `package.json`, add to the workspaces array:
```json
"projects/stephensprivelessen-nl",
"projects/cv"
```

- [ ] **Step 2: Run npm install**

```bash
npm install
```

Expected: All workspace links resolve. `@stephen/business-config` is available to all projects.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add stephensprivelessen-nl and cv to npm workspaces"
```

---

## Task 8: Migrate stephenadei-nl (ContactSection)

**Files:**
- Modify: `projects/stephenadei-nl/components/ContactSection.tsx`
- Modify: `projects/stephenadei-nl/package.json` (add dependency)

- [ ] **Step 1: Add `@stephen/business-config` dependency**

In `projects/stephenadei-nl/package.json`, add to dependencies:
```json
"@stephen/business-config": "*"
```

Then: `npm install`

- [ ] **Step 2: Update ContactSection.tsx**

Read the current file first. Replace hardcoded contact data with imports:

```typescript
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';
import { contact } from '@stephen/business-config';
import SectionHeading from './SectionHeading';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [showPhone, setShowPhone] = useState(false);

  const contactLinks = [
    { href: `mailto:${contact.email.primary}`, icon: Mail, label: t('email') },
    { href: contact.whatsapp(contact.phone.primary.number), icon: Phone, label: t('whatsapp') },
    { href: contact.social.linkedin, icon: Linkedin, label: t('linkedin') },
    { href: contact.social.github, icon: Github, label: t('github') },
  ];

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16">
      <SectionHeading title={t('title')} />
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-2xl font-semibold text-emerald-100 mb-1">{t('subtitle')}</h3>
        <p className="text-emerald-300 mb-8">{t('role')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-lg bg-emerald-800/30 border border-emerald-700/30 hover:border-emerald-500/50 hover:bg-emerald-800/50 transition-all text-emerald-200 hover:text-white">
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{link.label}</span>
              </a>
            );
          })}
        </div>
        <div className="mb-6">
          {showPhone ? (
            <a href={`tel:${contact.phone.primary.number}`} className="text-emerald-200 hover:text-white transition-colors">
              {contact.phone.primary.display}
            </a>
          ) : (
            <button onClick={() => setShowPhone(true)} className="text-sm text-emerald-400 hover:text-emerald-200 transition-colors underline underline-offset-2">
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

- [ ] **Step 3: Build and verify**

```bash
cd projects/stephenadei-nl && npm run build
```

Expected: Build passes with contact data from business-config.

- [ ] **Step 4: Commit**

```bash
git add projects/stephenadei-nl/components/ContactSection.tsx projects/stephenadei-nl/package.json
git commit -m "refactor(stephenadei-nl): use @stephen/business-config for contact data"
```

---

## Task 9: Migrate stephensprivelessen-nl (config.ts)

**Files:**
- Modify: `projects/stephensprivelessen-nl/data/config.ts`
- Modify: `projects/stephensprivelessen-nl/package.json`

- [ ] **Step 1: Add dependency**

In `projects/stephensprivelessen-nl/package.json`, add to dependencies:
```json
"@stephen/business-config": "*"
```

Then: `npm install`

- [ ] **Step 2: Replace config.ts**

Read the current file first. Replace with a re-export that preserves the existing `config` shape so downstream imports don't break:

```typescript
import { contact, businessRules } from '@stephen/business-config';

// Re-export in the shape that existing components expect
export const config = {
  contact: {
    email: contact.email.primary,
    phone: contact.phone.primary.number,
    whatsapp: contact.whatsapp(contact.phone.primary.number),
    display: {
      phone: contact.phone.primary.display,
      href: `tel:${contact.phone.primary.number}`,
    },
  },
  social: {
    instagram: contact.social.instagram.tutoring,
  },
  business: {
    name: businessRules.business.name,
    nameNl: businessRules.business.nameNl,
    nameEn: businessRules.business.nameEn,
    owner: businessRules.business.owner,
    siteUrl: businessRules.business.siteUrl,
    dashboardUrl: businessRules.business.dashboardUrl,
    mainOffice: {
      address: contact.addresses.main.street,
      postalCode: contact.addresses.main.postal,
      city: contact.addresses.main.city,
      googleMapsUrl: contact.addresses.main.googleMapsUrl,
    },
    weekendOffice: {
      address: contact.addresses.weekend.street,
      postalCode: contact.addresses.weekend.postal,
      city: contact.addresses.weekend.city,
      googleMapsUrl: contact.addresses.weekend.googleMapsUrl,
    },
  },
  pricing: {
    travelCosts: {
      sciencePark: businessRules.travel.sciencePark,
      vuUva: businessRules.travel.vuUva / 100, // config.ts used euros, business-rules uses cents
      homeAmsterdam: businessRules.travel.homeAmsterdam / 100,
    },
    lastMinuteSurcharges: {
      lessThan24Hours: businessRules.scheduling.lastMinuteSurcharges.lessThan24hPct,
      lessThan12Hours: businessRules.scheduling.lastMinuteSurcharges.lessThan12hPct,
    },
    flexibilityPremium: {
      twoLessons: businessRules.scheduling.flexibilityPremium.twoLessons,
      fourLessons: businessRules.scheduling.flexibilityPremium.fourLessons,
      sixOrMoreLessons: businessRules.scheduling.flexibilityPremium.sixOrMoreLessons,
    },
  },
} as const;
```

**Important:** The original `config.ts` uses euros for travel costs (0, 20, 50), but `business-rules.ts` stores cents (0, 2000, 5000). The re-export converts back to preserve the existing interface. Downstream consumers can migrate to cents over time.

- [ ] **Step 3: Build and verify**

```bash
cd projects/stephensprivelessen-nl && npm run build
```

Expected: Build passes. Existing components that import `config` continue to work.

- [ ] **Step 4: Commit**

```bash
git add projects/stephensprivelessen-nl/data/config.ts projects/stephensprivelessen-nl/package.json
git commit -m "refactor(stephensprivelessen-nl): derive config from @stephen/business-config"
```

---

## Task 10: Migrate shared-types pricing

**Files:**
- Modify: `packages/shared-types/src/pricing.ts`

- [ ] **Step 1: Update shared-types/pricing.ts**

Read the current file. Keep the interfaces and `formatPrice` function, but replace the hardcoded `PRICING` constants with imports from business-config. Also re-export for backward compatibility:

```typescript
/**
 * Pricing types and utilities.
 * Raw rate data now comes from @stephen/business-config.
 * This file re-exports for backward compatibility.
 */
import type { PricingTier } from './education-levels';

export { pricing, type Rate, type Segment, type Mode } from '@stephen/business-config';

export interface PackagePricing {
  individual: number;
  group2: number;
  group3: number;
  group4: number;
}

export interface PricingStructure {
  package4h: PackagePricing;
  urgent2h: number;
  extraStudentPerLesson: number;
  hourlyRate: number;
}

/**
 * @deprecated Use pricing.findRate() from @stephen/business-config instead.
 * These values are kept for backward compatibility but may be outdated.
 */
export const PRICING: Record<PricingTier, PricingStructure> = {
  MIDDELBARE_SCHOOL: {
    package4h: { individual: 24000, group2: 32000, group3: 42000, group4: 52000 },
    urgent2h: 12000,
    extraStudentPerLesson: 3000,
    hourlyRate: 6000,
  },
  HOGER_ONDERWIJS: {
    package4h: { individual: 36000, group2: 52000, group3: 66000, group4: 66000 },
    urgent2h: 18000,
    extraStudentPerLesson: 4000,
    hourlyRate: 9000,
  },
};

export function getPricingForTier(tier: PricingTier): PricingStructure {
  return PRICING[tier];
}

export function calculatePackage4hPrice(studentCount: number, tier: PricingTier): number {
  const p = PRICING[tier].package4h;
  if (studentCount === 1) return p.individual;
  if (studentCount === 2) return p.group2;
  if (studentCount === 3) return p.group3;
  if (studentCount >= 4) return p.group4;
  throw new Error(`Invalid student count: ${studentCount}`);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}
```

Note: Updated the PRICING constants to match `rates.json` online rates (the old values were outdated). Marked as `@deprecated`.

- [ ] **Step 2: Add dependency**

In `packages/shared-types/package.json`, add:
```json
"dependencies": {
  "@stephen/business-config": "*"
}
```

- [ ] **Step 3: Build and verify**

```bash
npm run build -w @stephen/shared-types
```

Expected: Compiles. Re-exports work.

- [ ] **Step 4: Commit**

```bash
git add packages/shared-types/src/pricing.ts packages/shared-types/package.json
git commit -m "refactor(shared-types): re-export pricing from business-config, deprecate old constants"
```

---

## Task 11: Migrate tutorbot (Python — contact data)

**Files:**
- Create: `projects/tutorbot/modules/utils/business_config.py`
- Modify: `projects/tutorbot/modules/utils/text_helpers.py`

- [ ] **Step 1: Create `projects/tutorbot/modules/utils/business_config.py`**

```python
"""
Load business config from S3 (synced from @stephen/business-config).
Provides contact info, pricing, and business rules.
"""
import json
import os

import boto3

_BUCKET = os.environ.get('DATALAKE_BUCKET', 'tutoring-datalake-711210709750')
_KEY = 'tutoring/config/business-config.json'
_config = None


def get_config() -> dict:
    """Load and cache business config from S3."""
    global _config
    if _config is None:
        try:
            s3 = boto3.client('s3')
            obj = s3.get_object(Bucket=_BUCKET, Key=_KEY)
            _config = json.loads(obj['Body'].read())
        except Exception:
            # Fallback: load from local file if S3 unavailable (dev)
            fallback = os.path.join(os.path.dirname(__file__), '..', '..', 'business-config.json')
            if os.path.exists(fallback):
                with open(fallback) as f:
                    _config = json.load(f)
            else:
                raise
    return _config


# Convenience accessors
def phone() -> str:
    return get_config()['contact']['phone']['primary']['display']

def phone_raw() -> str:
    return get_config()['contact']['phone']['primary']['number']

def email() -> str:
    return get_config()['contact']['email']['primary']

def whatsapp_url() -> str:
    return get_config()['contact']['whatsappUrls']['primary']
```

- [ ] **Step 2: Search and replace in text_helpers.py**

Read the file and identify all hardcoded instances of:
- `+31647357426` or `+31 6 47357426` or similar phone patterns
- `info@stephenadei.nl`
- WhatsApp URLs with the phone number

Replace each with imports from `business_config`:

At the top of `text_helpers.py`, add:
```python
from modules.utils.business_config import phone, email, whatsapp_url, phone_raw
```

Then replace each hardcoded occurrence. This is a mechanical find-and-replace — estimate ~20 occurrences.

**Note:** This is a large file. Only replace contact data, do not restructure templates.

- [ ] **Step 3: Test tutorbot locally**

```bash
cd projects/tutorbot && python -c "from modules.utils.business_config import get_config; print(get_config()['contact']['phone']['primary']['display'])"
```

Expected: Prints the phone number (requires S3 access or local fallback file).

- [ ] **Step 4: Commit**

```bash
git add projects/tutorbot/modules/utils/business_config.py projects/tutorbot/modules/utils/text_helpers.py
git commit -m "refactor(tutorbot): load contact data from business-config S3 JSON"
```

---

## Task 12: Migrate cv-portal (TS files only)

**Files:**
- Modify: `projects/cv/cv-portal/app/lib/services/pdf-service.ts`
- Modify: `projects/cv/cv-portal/app/lib/services/file-storage-service.ts`
- Modify: `projects/cv/cv-portal/package.json` (if exists at app level)

- [ ] **Step 1: Add dependency**

Check if cv-portal has its own `package.json`. If so, add `@stephen/business-config`. If not, the workspace-level dependency should suffice after adding cv to workspaces.

- [ ] **Step 2: Update pdf-service.ts and file-storage-service.ts**

Read each file. Replace the hardcoded `info@stephenadei.nl` with:
```typescript
import { contact } from '@stephen/business-config';
// Use: contact.email.primary
```

- [ ] **Step 3: Commit**

```bash
git add projects/cv/
git commit -m "refactor(cv-portal): use @stephen/business-config for email"
```

**Note:** The cv-data.yaml migration (YAML file used by LaTeX templates) is out of scope for this plan — it requires a different approach since YAML can't import TS modules.

---

## Task 13: Final verification and cleanup

**Files:**
- Modify: various (lint fixes if needed)

- [ ] **Step 1: Full workspace build**

```bash
npm run build -w @stephen/business-config
npm run build -w @stephen/shared-types
```

Expected: Both packages build cleanly.

- [ ] **Step 2: Build stephenadei-nl**

```bash
cd projects/stephenadei-nl && npm run build
```

Expected: Build passes with business-config imports.

- [ ] **Step 3: Build stephensprivelessen-nl**

```bash
cd projects/stephensprivelessen-nl && npm run build
```

Expected: Build passes with re-exported config.

- [ ] **Step 4: Build privelessen-dashboard**

```bash
cd projects/privelessen-dashboard && npm run build
```

Expected: Build passes (shared-types dependency updated, no direct changes yet to dashboard pricing.ts — that's a follow-up).

- [ ] **Step 5: Generate and verify business-config.json**

```bash
npm run generate -w @stephen/business-config
cat packages/business-config/generated/business-config.json | python3 -m json.tool | head -30
```

Expected: Valid JSON with all sections populated.

- [ ] **Step 6: Commit any remaining changes**

```bash
git add -A
git status
# Only commit if there are actual changes
git commit -m "chore: final cleanup after business-config migration"
```
