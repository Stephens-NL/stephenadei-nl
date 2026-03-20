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
