import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import ProjectPage from '@/components/ProjectPage';

interface ProjectData {
  title: string;
  description: string;
  techStack: string[];
  url?: string;
  content: string;
}

const projectContent: Record<string, ProjectData> = {
  sa3: {
    title: 'SA3 — School Management System',
    description: 'Multi-curriculum school management for 500-1500 students',
    techStack: ['Next.js 15', 'React 19', 'Prisma 5', 'AWS RDS', 'S3', 'SQS', 'Lambda', 'KMS', 'Terraform'],
    url: 'https://sa3.stephensprive.app',
    content: `## Overview

SA3 is a full-stack school management system built for an international school in Ghana, supporting multiple curricula (GES Primary, WASSCE, Cambridge IGCSE) and serving 500-1500 students per term.

## Key Features

- **Multi-curriculum support** — GES Primary, WASSCE, Cambridge IGCSE with distinct grading rules
- **Role-scoped permissions** — staff access controlled by role
- **Weighted grading** — configurable assessment workflows per curriculum
- **Offline score entry** — PWA with IndexedDB for unreliable connectivity
- **PDF report cards** — generated at scale
- **Field-level encryption** — AWS KMS for PII data protection

## Architecture

Deployed on AWS App Runner (containerised), with RDS (PostgreSQL), S3 for document storage, SQS for async operations, and Lambda for PDF generation. Infrastructure managed via Terraform.`,
  },
  'privelessen-dashboard': {
    title: 'Privelessen Dashboard',
    description: 'Business management tool for the tutoring practice',
    techStack: ['Next.js 15', 'Prisma', 'Stripe', 'Google Calendar API', 'Chatwoot', 'TailwindCSS'],
    url: 'https://dash.stephensprivelessen.nl',
    content: `## Overview

A comprehensive dashboard for managing Stephen's private tutoring business — handling students, scheduling, payments, and CRM in one place.

## Key Features

- **Student management** with segmentation (new, existing, returning, weekend)
- **Google Calendar** bidirectional sync
- **Stripe payment tracking** and invoicing
- **Chatwoot CRM** integration for client communication
- **Calendar analytics** with Silver/Gold data layer aggregations`,
  },
  'aantekeningen-app': {
    title: 'Aantekeningen App',
    description: 'AI-powered student notes management',
    techStack: ['Next.js', 'Prisma', 'LangChain', 'OpenAI', 'AWS S3', 'Google Drive API'],
    content: `## Overview

A notes management application that syncs student documents from Google Drive to AWS S3, then uses AI to extract metadata, parse dates, and generate summaries.

## Key Features

- **Google Drive sync** to S3 datalake (Bronze tier)
- **AI metadata extraction** using LangChain/OpenAI
- **Date parsing** and intelligent file organization
- **List/grid views** with taxonomy management
- **3-layer caching** — in-memory, React Query, browser
- **Comprehensive test suite** — unit, integration, security, e2e, performance`,
  },
  'platform-api': {
    title: 'Platform API + Data Lake',
    description: 'REST API and medallion architecture on AWS S3',
    techStack: ['Express', 'TypeScript', 'AWS S3', 'Glue', 'Athena', 'Prisma', 'EventBridge'],
    url: 'https://upload.stephensprive.app',
    content: `## Overview

The operational backbone — a REST API providing external access to the PostgreSQL database and S3 datalake, plus the medallion data architecture that powers analytics across all projects.

## Data Lake Architecture

Three-tier medallion strategy on AWS S3:
- **Bronze** — raw data (PDFs, calendar exports, photos)
- **Silver** — cleaned, structured Parquet (Glue-registered tables)
- **Gold** — analytics-ready aggregations

## API Features

- Student database access
- S3 file uploads with presigned URLs
- Event-driven processing via EventBridge
- Upload portal for external file submissions`,
  },
  stephenstat: {
    title: 'StephenStat',
    description: 'Statistical analysis and visualization tool',
    techStack: ['Next.js 15', 'Recharts', 'jstat', 'PapaParse', 'TypeScript'],
    url: 'https://stephenstat.stephensprive.app',
    content: `## Overview

A web-based statistical analysis and visualization tool that bridges mathematics and engineering — built to make statistical concepts interactive and accessible.

## Features

- Interactive statistical analysis
- Data visualization with Recharts
- CSV data import via PapaParse
- Statistical computations with jstat`,
  },
};

const validSlugs = Object.keys(projectContent);

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    validSlugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projectContent[params.slug];
  if (!project) return {};
  return { title: `${project.title} — Stephen Adei`, description: project.description };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const project = projectContent[slug];
  if (!project) notFound();

  const t = await getTranslations('Common');

  return (
    <ProjectPage
      title={project.title}
      description={project.description}
      techStack={project.techStack}
      url={project.url}
      visitLabel={t('visitLiveSite')}
    >
      <MDXRemote source={project.content} />
    </ProjectPage>
  );
}
