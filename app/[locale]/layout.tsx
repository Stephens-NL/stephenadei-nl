import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import ChatLauncher from '@/components/ChatLauncher';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stephen Adei — Data Engineering, Mathematics, Education',
  description:
    'Engineering production data systems — backed by two Master\'s degrees in mathematics and education. 15+ years STEM tutoring, AWS data architecture, quantum computing research.',
  keywords:
    'Stephen Adei, data engineering, mathematics, private tutor, AWS, quantum computing, Amsterdam, TypeScript, Python',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  openGraph: {
    title: 'Stephen Adei — Data Engineering, Mathematics, Education',
    description:
      'Engineering production data systems — backed by two Master\'s degrees in mathematics and education.',
    url: 'https://stephenadei.nl',
    siteName: 'Stephen Adei',
    images: [
      {
        url: 'https://stephenadei.nl/images/jpg/banner3.jpg',
        width: 1200,
        height: 630,
        alt: 'Stephen Adei — Data Engineering, Mathematics, Education',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stephen Adei — Data Engineering, Mathematics, Education',
    description:
      'Engineering production data systems — backed by two Master\'s degrees in mathematics and education.',
    images: ['https://stephenadei.nl/images/jpg/banner3.jpg'],
    creator: '@stephenadei',
  },
  other: {
    'msapplication-TileColor': '#2b5797',
    'theme-color': '#ffffff',
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as 'en' | 'nl')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          {children}
          <ChatLauncher />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
