import { getTranslations } from 'next-intl/server';
import { GraduationCap, Database, Camera, Music } from 'lucide-react';
import { serviceCards } from '@/data/services';
import SectionHeading from './SectionHeading';

const iconMap = { GraduationCap, Database, Camera, Music } as const;

export default async function ServicesStrip() {
  const t = await getTranslations('Services');
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {serviceCards.map((card) => {
          const Icon = iconMap[card.iconName];
          return (
            <div key={card.key} className="relative rounded-lg p-5 bg-emerald-800/40 backdrop-blur-sm border border-emerald-700/30 hover:border-emerald-500/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-700/50"><Icon className="w-5 h-5 text-emerald-300" /></div>
                <h3 className="text-lg font-semibold text-emerald-100">{t(`${card.key}.title`)}</h3>
              </div>
              <p className="text-sm text-emerald-200/80 mb-4">{t(`${card.key}.description`)}</p>
              {card.isLive ? (
                <a href={card.url} target="_blank" rel="noopener noreferrer" className="inline-block text-sm font-medium text-emerald-300 hover:text-white transition-colors">{t('visitSite')} →</a>
              ) : (
                <span className="inline-block text-sm text-emerald-500/60">{t('comingSoon')}</span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
