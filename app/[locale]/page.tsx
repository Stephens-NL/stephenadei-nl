import { getTranslations } from 'next-intl/server';

export default async function Home() {
  const t = await getTranslations('Hero');
  return (
    <div className="min-h-screen bg-emerald-950 text-white flex items-center justify-center">
      <h1 className="text-6xl font-bold">{t('name')}</h1>
    </div>
  );
}
