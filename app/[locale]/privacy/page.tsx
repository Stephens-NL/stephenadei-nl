import { getTranslations } from 'next-intl/server';
import BackLink from '@/components/BackLink';

export async function generateMetadata() {
  const t = await getTranslations('Privacy');
  return { title: `${t('title')} — Stephen Adei` };
}

export default async function PrivacyPage() {
  const t = await getTranslations('Privacy');
  const sections = t.raw('sections') as { title: string; body: string[] }[];
  return (
    <main className="min-h-screen bg-emerald-950 text-white pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink />
        <h1 className="text-3xl font-bold text-emerald-100 mb-2">{t('title')}</h1>
        <p className="text-sm text-emerald-300/70 mb-8">{t('version')}</p>
        {sections.map((s) => (
          <section key={s.title} className="mb-8">
            <h2 className="text-xl font-semibold text-emerald-100 mb-2">{s.title}</h2>
            {s.body.map((p) => (
              <p key={p} className="text-emerald-200/90 mb-3 leading-relaxed">{p}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
