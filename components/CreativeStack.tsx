import { getTranslations } from 'next-intl/server';
import { Camera, Music, Video, Palette } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import SectionHeading from './SectionHeading';

const creativeItems = [
  { key: 'photography', icon: Camera },
  { key: 'musicProduction', icon: Music },
  { key: 'videoContent', icon: Video },
  { key: 'design', icon: Palette },
];

export default async function CreativeStack() {
  const t = await getTranslations('CreativeStack');
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="flex flex-wrap gap-4 mb-6">
        {creativeItems.map(({ key, icon: Icon }) => (
          <div key={key} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-800/30 border border-emerald-700/30">
            <Icon className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-200">{t(key)}</span>
          </div>
        ))}
      </div>
      <Link href="/creative" className="text-sm text-emerald-300 hover:text-white transition-colors font-medium">{t('explore')}</Link>
    </section>
  );
}
