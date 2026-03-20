import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import SectionHeading from './SectionHeading';

export default async function AboutSection() {
  const t = await getTranslations('About');
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading title={t('title')} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
          <Image src="/images/portraits/outdoor.jpg" alt="Stephen Adei" fill className="object-cover rounded-xl" quality={85} />
        </div>
        <div className="md:col-span-2">
          <p className="text-lg text-emerald-100 leading-relaxed mb-6">{t('content')}</p>
          <div>
            <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-2">{t('languagesLabel')}</h3>
            <p className="text-emerald-200">{t('languages')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
