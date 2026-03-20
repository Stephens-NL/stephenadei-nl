import { getTranslations } from 'next-intl/server';
import { techStackGroups } from '@/data/techStack';
import SectionHeading from './SectionHeading';
import TechBadge from './TechBadge';

export default async function TechStack() {
  const t = await getTranslations('TechStack');
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {techStackGroups.map((group) => (
          <div key={group.labelKey}>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3">{t(group.labelKey)}</h3>
            <div className="flex flex-wrap gap-2">{group.items.map((item) => (<TechBadge key={item} label={item} />))}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
