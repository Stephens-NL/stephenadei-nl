import { Fraunces } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { buildOpenGraph } from '@/lib/seo';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '600'] });

const INTENTS = [
  { key: 'lessons', href: 'https://stephensprivelessen.nl' },
  { key: 'shoot', href: 'https://photo.stephenadei.nl' },
  { key: 'dj', href: 'https://on.soundcloud.com/fYNim8toFY1XLWBx9' },
  { key: 'work', href: 'https://linkedin.com/in/stephen-adei' },
] as const;

const CHIPS = [
  { label: 'IG · lessons', href: 'https://instagram.com/stephensprivelessen' },
  { label: 'IG · film', href: 'https://instagram.com/stevesanalogueadventure' },
  { label: 'IG · events', href: 'https://instagram.com/stephensevents' },
  { label: 'IG · DJ', href: 'https://instagram.com/askthemadhatter' },
  { label: 'Blog', href: 'https://blog.stephenadei.nl' },
];

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations('Links');
  return buildOpenGraph({
    locale: params.locale,
    path: '/links',
    title: 'Stephen Adei — links',
    description: t('description'),
  });
}

export default async function LinksPage() {
  const t = await getTranslations('Links');
  const ext = { target: '_blank', rel: 'noopener' } as const;
  // Covers the site chrome from the shared layout.
  return (
    <main className="fixed inset-0 z-[100] overflow-auto bg-[#f6f2ea] text-[#1c1a17]">
      <div className="mx-auto flex min-h-full w-full max-w-[440px] flex-col gap-[22px] px-6 pb-7 pt-12">
        <div className="flex items-center gap-3.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/portraits/professional.jpg" alt="Stephen Adei" width={52} height={52} className="h-[52px] w-[52px] rounded-full object-cover" />
          <p className="m-0 whitespace-pre-line text-[15px] text-[#5c5346]">{t('intro')}</p>
        </div>
        <h1 className={`${fraunces.className} m-0 text-[34px] font-semibold leading-[1.08]`}>{t('title')}</h1>
        <div className="flex flex-col gap-2.5">
          {INTENTS.map(({ key, href }) => (
            <a key={key} href={href} {...ext} className="flex items-center justify-between rounded-xl border border-[#ddd3c3] bg-[#fffdf8] px-[18px] py-4 transition-colors hover:text-[#9a4a2a]">
              <span className="flex flex-col gap-0.5">
                <span className={`${fraunces.className} text-xl`}>{t(`${key}.label`)}</span>
                <span className="text-[13px] text-[#5c5346]">{t(`${key}.sub`)}</span>
              </span>
              <span className="text-xl text-[#9a4a2a]" aria-hidden>→</span>
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="m-0 text-[11px] uppercase tracking-[0.12em] text-[#9a4a2a]">{t('follow')}</p>
          <div className="flex flex-wrap gap-2">
            {CHIPS.map(({ label, href }) => (
              <a key={href} href={href} {...ext} className="flex min-h-[44px] items-center rounded-[22px] border border-[#ddd3c3] px-3.5 text-sm transition-colors hover:text-[#9a4a2a]">{label}</a>
            ))}
          </div>
        </div>
        <a href="https://wa.me/31623743956" className="mt-auto flex min-h-[52px] items-center justify-center rounded-xl bg-[#1c1a17] text-base font-medium text-[#f6f2ea]">{t('whatsapp')}</a>
      </div>
    </main>
  );
}
