import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <Image src="/images/portraits/professional.jpg" alt="" fill className="object-cover opacity-20" quality={90} priority />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950 via-emerald-950/80 to-emerald-950" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-400 to-teal-500 mb-6">{t('name')}</h1>
          <p className="text-xl sm:text-2xl text-emerald-100 leading-relaxed mb-8 max-w-2xl">{t('headline')}</p>
          <div className="flex flex-wrap gap-3 mb-10">
            {['badge1', 'badge2', 'badge3'].map((key) => (
              <span key={key} className="px-4 py-1.5 text-sm font-medium rounded-full bg-emerald-800/50 text-emerald-200 border border-emerald-700/50">{t(key)}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-400 transition-colors">{t('ctaWork')}</a>
            <a href="#contact" className="px-8 py-3 border border-emerald-500 text-emerald-200 font-semibold rounded-lg hover:bg-emerald-500/10 transition-colors">{t('ctaContact')}</a>
          </div>
        </div>
        <div className="hidden lg:block relative h-[500px] rounded-2xl overflow-hidden">
          <Image src="/images/portraits/professional2.jpeg" alt="Stephen Adei" fill className="object-cover rounded-2xl" quality={90} priority />
        </div>
      </div>
    </section>
  );
}
