'use client';

import React, { useRef, useState } from 'react';
// import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import {
  GraduationCap,
  Camera,
  Database,
  Music,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import BentoGrid from '@/components/BentoGrid';
import Modal from '@/components/Modal';
import FlagButton from '@/components/FlagButton';
import i18n from '../i18n'; // Adjust the path if needed


interface ServiceCard {
  key: 'privateTutoring' | 'dataConsultancy' | 'photography' | 'music';
  icon: React.ReactElement;
  url: string;
  isLive: boolean;
}

const serviceCards: ServiceCard[] = [
  {
    key: 'privateTutoring',
    icon: <GraduationCap className="w-8 h-8 transition-colors duration-300 group-hover:text-yellow-400" />,
    url: 'https://privelessen.stephenadei.nl',
    isLive: true,
  },
  {
    key: 'dataConsultancy',
    icon: <Database className="w-8 h-8" />,
    url: 'https://data.stephenadei.nl',
    isLive: false,
  },
  {
    key: 'photography',
    icon: <Camera className="w-8 h-8" />,
    url: 'https://photography.stephenadei.nl',
    isLive: false,
  },
  {
    key: 'music',
    icon: <Music className="w-8 h-8" />,
    url: 'https://music.stephenadei.nl',
    isLive: false,
  },
];

const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouching, setIsTouching] = useState(false);
  const [tiltX, setTiltX] = useState(0);
  const [tiltY, setTiltY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouching) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTiltX((y - centerY) / 10);
    setTiltY((centerX - x) / 10);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const y = e.touches[0].clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTiltX((y - centerY) / 10);
    setTiltY((centerX - x) / 10);
  };

  const handleMouseLeave = () => {
    setTiltX(0);
    setTiltY(0);
  };

  const handleTouchStart = () => {
    setIsTouching(true);
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    setTiltX(0);
    setTiltY(0);
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`,
      }}
    >
      {children}
    </div>
  );
};

const Home: React.FC = () => {
  const { t } = useTranslation('common');
  const currentLang = i18n.language;
  const [services] = useState<ServiceCard[]>(serviceCards);
  const [scrollPosition] = useState(0);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalCaption, setModalCaption] = useState('');

  // useEffect voor scroll handling blijft ongewijzigd

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'nl' : 'en');
  };

  const buttonOpacity = Math.max(1 - scrollPosition / 500, 0.5);

  // Function to open modal
  const openModal = (imageSrc: string, caption: string) => {
    setModalImage(imageSrc);
    setModalCaption(caption);
    setModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-emerald-900 text-white font-sans overflow-hidden">
      {/* Background Image */}
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

      {/* Language Toggle Button */}
      <div
        className="fixed top-4 right-4 sm:top-8 sm:right-8 md:top-12 md:right-12 lg:top-16 lg:right-24 xl:right-32 2xl:right-64 z-50 flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: buttonOpacity }}
      >
        <FlagButton currentLang={currentLang} onClick={toggleLanguage} />
        <span className="text-white text-sm font-bold mt-2">
          {currentLang === 'en' ? 'NL' : 'EN'}
        </span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          {/* Header */}
          <h1 className="text-7xl sm:text-8xl font-black mb-8 tracking-tighter">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-500 to-teal-600">
              {t('general.name')}
            </span>
            <span className="block text-5xl sm:text-6xl mt-4 text-emerald-100">
              {t('services.title')}
            </span>
          </h1>
          <p className="text-2xl mb-16 text-emerald-100 max-w-3xl mx-auto leading-relaxed select-none">
            {t('general.intro')}
          </p>

          {/* Service Cards */}
          <div className="grid grid-cols-1 gap-8 mb-16">
            {/* Private Tutoring Card (full width) */}
            <TiltCard className="col-span-1 group">
              <div
                className={`rounded-lg p-6 shadow-lg backdrop-blur-sm h-full flex flex-col justify-between bg-emerald-800 bg-opacity-70 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900 cursor-pointer select-none group`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 mr-4 transition-colors duration-300 group-hover:text-yellow-400">
                    {services[0].icon}
                  </div>
                  <h2 className="text-3xl font-semibold text-emerald-100">
                    {t('services.privateTutoring.title')}
                  </h2>
                </div>
                <p className="text-xl text-emerald-100 mb-4">
                  {t('services.privateTutoring.description')}
                </p>
                <Link href={services[0].url} passHref>
                  <span
                    className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300 cursor-pointer"
                  >
                    {t('services.privateTutoring.cta')}
                  </span>
                </Link>
              </div>
            </TiltCard>

            {/* Andere Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(1).map((card) => (
                <TiltCard key={card.key} className="block">
                  <div
                    className={`rounded-lg p-6 shadow-lg backdrop-blur-sm h-full flex flex-col justify-between bg-emerald-800 bg-opacity-70 ${
                      card.isLive ? 'hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900 cursor-pointer' : 'cursor-default'
                    } transition-colors duration-300 group select-none`}
                  >
                    {card.isLive ? (
                      <Link href={card.url} passHref>
                        <div className="cursor-pointer">
                          <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-full bg-gray-500">
                              {card.icon}
                            </div>
                          </div>
                          <h2 className="text-3xl font-semibold mb-4 text-emerald-100">
                            {t(`services.${card.key}.title`)}
                          </h2>
                          <p className="text-xl text-emerald-100 mb-4">
                            {t(`services.${card.key}.description`)}
                          </p>
                          <span className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300">
                            {t(`services.${card.key}.cta`)}
                          </span>
                        </div>
                      </Link>
                    ) : (
                      <div className="cursor-default">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-3 rounded-full bg-gray-500">
                            {card.icon}
                          </div>
                        </div>
                        <h2 className="text-3xl font-semibold mb-4 text-emerald-100">
                          {t(`services.${card.key}.title`)}
                        </h2>
                        <p className="text-xl text-emerald-100 mb-4">
                          {t(`services.${card.key}.description`)}
                        </p>
                        <p className="text-lg text-gray-400 mt-auto">
                          {t('general.comingSoon')}
                        </p>
                      </div>
                    )}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div className="mt-16">
            <h2 className="text-4xl font-semibold mb-6 text-emerald-100">
              {t('about.title')}
            </h2>
            <BentoGrid openModal={openModal} />
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={modalImage}
        caption={modalCaption}
      />
    </div>
  );
};

export default Home;