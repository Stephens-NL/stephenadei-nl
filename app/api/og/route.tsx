import { ogCard } from '@/lib/og-card';
import { projectContent } from '@/lib/projects';

// /api/og -> home card, /api/og?project=<slug> -> project card. Slug is looked up, never echoed.
export function GET(req: Request) {
  const p = projectContent[new URL(req.url).searchParams.get('project') ?? ''];
  return p
    ? ogCard({ eyebrow: 'Stephen Adei', headline: p.title, line: p.description })
    : ogCard({ headline: 'Stephen Adei', line: 'Data Engineering, Mathematics, Education' });
}
