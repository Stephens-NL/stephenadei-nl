import { getTranslations } from 'next-intl/server';

const validSlugs = ['sa3', 'privelessen-dashboard', 'aantekeningen-app', 'platform-api', 'stephenstat'];

export function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const t = await getTranslations('Projects');
  return (
    <div className="min-h-screen bg-emerald-900 text-white p-8">
      <h1 className="text-4xl font-bold">{slug}</h1>
      <p className="mt-4 text-emerald-200">Project detail page — coming soon</p>
    </div>
  );
}
