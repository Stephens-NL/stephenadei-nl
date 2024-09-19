'use client';

import { useTranslation } from 'next-i18next';
import Head from 'next/head'; // Import Head for metadata management
import Image from 'next/image';
import { ArrowRight, Camera, Database, Globe } from 'lucide-react';
import Link from 'next/link';

const serviceCards = [
  {
    title: "privateTutoring",
    description: "privateTutoringDesc",
    icon: <ArrowRight className="w-6 h-6" />,
    url: "https://privelessen.stephenadei.nl"
  },
  {
    title: "dataConsultancy",
    description: "dataConsultancyDesc",
    icon: <Database className="w-6 h-6" />,
    url: "https://data.stephenadei.nl"
  },
  {
    title: "photography",
    description: "photographyDesc",
    icon: <Camera className="w-6 h-6" />,
    url: "https://photography.stephenadei.nl"
  },
];

export default function Home() {
  const { t, i18n } = useTranslation('common');  // Use translation
  const currentLang = i18n.language === 'en' ? 'en' : 'nl'; // Check the current language
  
  return (
    <>
      <Head>
        <title>{t('name')} - {t('services')}</title>
        <meta name="description" content={t('intro')} />
        <meta name="keywords" content="Stephen Adei, private tutoring, photography, data consultancy, programming" />
        <meta property="og:title" content={t('name')} />
        <meta property="og:description" content={t('intro')} />
        <meta property="og:image" content="/images/metadata_images/facebook_linkedin.png" />
        <meta property="og:url" content={`https://stephenadei.nl/${currentLang}`} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={t('name')} />
        <meta property="twitter:description" content={t('intro')} />
      </Head>

      <div className="relative min-h-screen bg-emerald-900 text-white font-sans overflow-hidden">
        <div className="fixed inset-0 sm:absolute">
          <Image
            src="/images/jpeg/ik-portrait.jpeg"
            alt="Stephen Adei"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-20 sm:opacity-100"
          />
        </div>
        <button
          onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'nl' : 'en')}
          className="fixed top-4 right-4 z-50 bg-emerald-700 p-2 md:p-4 rounded-full transition-transform transform hover:scale-110 focus:ring-4 focus:ring-emerald-300 text-white"
        >
          <Globe className="w-6 h-6 md:w-8 md:h-8" />
          <span className="sr-only">Change Language</span>
        </button>
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-6xl sm:text-7xl font-black mb-6 tracking-tighter">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-500 to-teal-600">
                {t('name')}
              </span>
              <span className="block text-4xl sm:text-5xl mt-2 text-emerald-100">{t('services')}</span>
            </h1>
            <p className="text-xl mb-12 text-emerald-200 max-w-2xl mx-auto leading-relaxed">
              {t('intro')}
            </p>
            <div className="mb-12">
              <h2 className="text-3xl font-semibold mb-4 text-emerald-100">{t('about')}</h2>
              <p className="text-lg text-emerald-200 mb-4">
                {t('aboutContent')}
              </p>
              <ul className="text-emerald-200 text-left max-w-md mx-auto">
                <li>{t('education')}: {t('educationContent')}</li>
                <li>{t('languages')}: {t('languagesContent')}</li>
                <li>{t('interests')}: {t('interestsContent')}</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceCards.map((card, index) => (
                <Link href={card.url} key={index} className="block">
                  <div className="bg-emerald-800 bg-opacity-50 rounded-lg p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full">{card.icon}</div>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">{t(card.title)}</h2>
                    <p className="text-emerald-100 mb-4">{t(card.description)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}