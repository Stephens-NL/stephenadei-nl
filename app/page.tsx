'use client';

import React from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { GraduationCap, Camera, Database, Globe, Music } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from '../public/locales/en/common.json';
import nlTranslations from '../public/locales/nl/common.json';

// Initialize i18next
i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enTranslations },
      nl: { common: nlTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

const serviceCards = [
  {
    title: "privateTutoring",
    description: "privateTutoringDesc",
    icon: <GraduationCap className="w-8 h-8" />,
    url: "https://privelessen.stephenadei.nl",
    isLive: true,
    ctaText: "startLearning",
    cardStyle: "bg-gradient-to-br from-emerald-600 to-teal-700"
  },
  {
    title: "dataConsultancy",
    description: "dataConsultancyDesc",
    icon: <Database className="w-8 h-8" />,
    url: "https://data.stephenadei.nl",
    isLive: false,
    ctaText: "exploreServices",
    cardStyle: "bg-gray-700"
  },
  {
    title: "photography",
    description: "photographyDesc",
    icon: <Camera className="w-8 h-8" />,
    url: "https://photography.stephenadei.nl",
    isLive: false,
    ctaText: "viewPortfolio",
    cardStyle: "bg-gray-700"
  },
  {
    title: "music",
    description: "musicDesc",
    icon: <Music className="w-8 h-8" />,
    url: "https://music.stephenadei.nl",
    isLive: false,
    ctaText: "listenNow",
    cardStyle: "bg-gray-700"
  }
];

export default function Home() {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const [services, setServices] = useState(serviceCards);

  useEffect(() => {
    // Check if services are live (unchanged)
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'nl' : 'en');
  };

  return (
    <div className="relative min-h-screen bg-emerald-900 text-white font-sans overflow-hidden">
      <div className="fixed inset-0 sm:absolute">
        <Image
          src="/images/jpeg/ik-portrait.jpeg"
          alt="Stephen Adei"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          className="opacity-30 sm:opacity-50"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="fixed top-4 right-4 sm:top-8 sm:right-8 md:top-12 md:right-12 lg:top-16 lg:right-24 xl:right-32 2xl:right-64 z-50 flex flex-col items-center">
        <button
          onClick={toggleLanguage}
          className="bg-emerald-700 p-2 md:p-4 rounded-full transition-transform transform hover:scale-110 focus:ring-4 focus:ring-emerald-300 text-white mb-2"
        >
          <Globe className="w-6 h-6 md:w-8 md:h-8" />
          <span className="sr-only">Change Language</span>
        </button>
        <span className="text-white text-sm font-bold">
          {currentLang === 'en' ? 'NL' : 'EN'}
        </span>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-7xl sm:text-8xl font-black mb-8 tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-500 to-teal-600">
              {t('name')}
            </span>
            <span className="block text-5xl sm:text-6xl mt-4 text-emerald-100">{t('services')}</span>
          </h1>
          <p className="text-2xl mb-16 text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {t('intro')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.map((card, index) => (
              <div key={index} className="block">
                <div className={`rounded-lg p-6 shadow-lg backdrop-blur-sm transition-all duration-300 h-full flex flex-col justify-between ${card.cardStyle} ${card.isLive
                    ? 'hover:shadow-2xl hover:scale-105'
                    : 'opacity-70'
                  }`}>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-full ${card.isLive
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                          : 'bg-gray-500'
                        }`}>
                        {card.icon}
                      </div>
                    </div>
                    <h2 className="text-3xl font-semibold mb-4 text-white">{t(card.title)}</h2>
                    <p className="text-xl text-white mb-4">{t(card.description)}</p>
                  </div>
                  {card.isLive ? (
                    <Link href={card.url} className="inline-block mt-4 px-6 py-2 bg-white text-emerald-800 rounded-full hover:bg-emerald-100 transition-colors duration-300 font-semibold">
                      {t(card.ctaText)}
                    </Link>
                  ) : (
                    <p className="text-lg text-gray-200 mt-auto">{t('comingSoon')}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-800 bg-opacity-70 p-8 rounded-lg shadow-lg backdrop-blur-sm">
            <h2 className="text-4xl font-semibold mb-6 text-emerald-100">{t('about')}</h2>
            <p className="text-xl text-emerald-100 mb-6 leading-relaxed">
              {t('aboutContent')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-emerald-200">{t('education')}</h3>
                <p className="text-lg text-emerald-100">{t('educationContent')}</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-emerald-200">{t('languages')}</h3>
                <p className="text-lg text-emerald-100">{t('languagesContent')}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-semibold mb-2 text-emerald-200">{t('interests')}</h3>
                <p className="text-lg text-emerald-100">{t('interestsContent')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}