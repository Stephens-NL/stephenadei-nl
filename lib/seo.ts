import type { Metadata } from 'next';

export const SITE = 'https://stephenadei.nl';
const LOCALES = ['en', 'nl'] as const;
const OG_LOCALE: Record<string, string> = { en: 'en_US', nl: 'nl_NL' };

// en is the default locale and has no prefix (localePrefix: 'as-needed')
const urlFor = (locale: string, path: string) =>
  `${SITE}${locale === 'en' ? '' : `/${locale}`}${path === '/' ? (locale === 'en' ? '/' : '') : path}`;

// Next replaces a page's openGraph object instead of merging, so every page goes through here.
// og:image is the /api/og text card (middleware skips /api, so no locale redirect).
export function buildOpenGraph({
  locale,
  path,
  title,
  description,
  project,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  project?: string;
}): Metadata {
  const url = urlFor(locale, path);
  const image = `${SITE}/api/og${project ? `?project=${project}` : ''}`;
  const alt = project ? `${title}` : 'Stephen Adei — Data Engineering, Mathematics, Education';
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, urlFor(l, path)])),
        'x-default': urlFor('en', path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Stephen Adei',
      type: 'website',
      locale: OG_LOCALE[locale] ?? 'en_US',
      images: [{ url: image, width: 1200, height: 630, alt, type: 'image/png' }],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
    },
    twitter: { card: 'summary_large_image', title, description, creator: '@stephenadei', images: [image] },
  };
}
