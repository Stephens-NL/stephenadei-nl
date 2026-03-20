import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Camera, Music, Video, Palette } from 'lucide-react';
import BackLink from '@/components/BackLink';
import SectionHeading from '@/components/SectionHeading';

export async function generateMetadata() {
  return {
    title: 'Creative — Stephen Adei',
    description: 'Photography, music production, video content, and design work by Stephen Adei.',
  };
}

export default async function CreativePage() {
  const t = await getTranslations('CreativeStack');
  const common = await getTranslations('Common');
  const photos = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];

  return (
    <main className="min-h-screen bg-emerald-950 text-white pt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BackLink />
        <SectionHeading title={t('title')} />
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Camera className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-semibold text-emerald-100">{t('photography')}</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {photos.map((photo, i) => (
              <div key={photo} className="relative aspect-square rounded-lg overflow-hidden">
                <Image src={`/images/photography/${photo}`} alt={`Photography ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
        {[
          { key: 'musicProduction', icon: Music },
          { key: 'videoContent', icon: Video },
          { key: 'design', icon: Palette },
        ].map(({ key, icon: Icon }) => (
          <div key={key} className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Icon className="w-6 h-6 text-emerald-400" />
              <h3 className="text-2xl font-semibold text-emerald-100">{t(key)}</h3>
            </div>
            <div className="rounded-xl p-6 bg-emerald-800/30 border border-emerald-700/30">
              <p className="text-emerald-200/80">{common('comingSoonContent')}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
