'use client';

import React, { useRef } from 'react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { GraduationCap, Camera, Database, Globe, Music, LucideIcon, BookOpen, Code, ChevronUp, ChevronDown } from 'lucide-react';
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

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactElement<LucideIcon>;
  url: string;
  isLive: boolean;
  ctaText: string;
  cardStyle: string;
}

const serviceCards: ServiceCard[] = [
  {
    title: "privateTutoring",
    description: "privateTutoringDesc",
    icon: <GraduationCap className="w-8 h-8" />,
    url: "https://privelessen.stephenadei.nl",
    isLive: true,
    ctaText: "startLearning",
    cardStyle: "bg-emerald-800 bg-opacity-70 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900"
  },
  {
    title: "dataConsultancy",
    description: "dataConsultancyDesc",
    icon: <Database className="w-8 h-8" />,
    url: "https://data.stephenadei.nl",
    isLive: false,
    ctaText: "exploreServices",
    cardStyle: "bg-emerald-800 bg-opacity-70"
  },
  {
    title: "photography",
    description: "photographyDesc",
    icon: <Camera className="w-8 h-8" />,
    url: "https://photography.stephenadei.nl",
    isLive: false,
    ctaText: "viewPortfolio",
    cardStyle: "bg-emerald-800 bg-opacity-70"
  },
  {
    title: "music",
    description: "musicDesc",
    icon: <Music className="w-8 h-8" />,
    url: "https://music.stephenadei.nl",
    isLive: false,
    ctaText: "listenNow",
    cardStyle: "bg-emerald-800 bg-opacity-70"
  }
];

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = (y - centerY) / 10;
    const tiltY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  caption: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, caption }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-3xl w-full">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>
        <Image src={imageSrc} alt={caption} width={800} height={600} className="rounded-lg" />
        <p className="mt-4 text-lg text-gray-800">{caption}</p>
      </div>
    </div>
  );
};

const BentoGrid: React.FC = () => {
  const { t } = useTranslation('common');
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalCaption, setModalCaption] = useState('');

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const openModal = (imageSrc: string, caption: string) => {
    setModalImage(imageSrc);
    setModalCaption(caption);
    setModalOpen(true);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-emerald-900 rounded-lg shadow-lg">
      {/* Main introduction with outdoor image */}
      <div className="md:col-span-2 bg-emerald-700 p-6 rounded-lg overflow-hidden">
        <h3 className="text-2xl font-bold mb-4">{t('aboutIntro')}</h3>
        <p className="text-lg mb-4">{t('aboutContent')}</p>
        <div className="relative h-64 md:h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openModal("/images/portraits/outdoor.jpg", t('outdoorPhotoCaption'))}>
          <Image
            src="/images/portraits/outdoor.jpg"
            alt="Stephen Adei outdoor"
            layout="fill"
            objectFit="cover"
            className="rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Teaching photo */}
      <div className="bg-emerald-600 p-4 rounded-lg overflow-hidden">
        <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4 cursor-pointer"
          onClick={() => openModal("/images/teaching/teaching.jpg", t('teachingPhotoCaption'))}>
          <Image
            src="/images/teaching/teaching.jpg"
            alt="Stephen teaching"
            layout="fill"
            objectFit="cover"
            className="rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-bold mb-2">{t('teachingPhotoCaption')}</h3>
      </div>

      {/* Educational background */}
      <div className="bg-teal-600 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{t('education')}</h3>
        <p>{t('educationContent')}</p>
      </div>

      {/* Tutoring experience */}
      <div className="bg-green-600 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{t('tutoringExperience')}</h3>
        <p>{t('tutoringContent')}</p>
        <button onClick={toggleExpand} className="mt-2 flex items-center text-white hover:underline">
          {t('readMore')} {isExpanded ? <ChevronUp className="ml-1 w-4 h-4" /> : <ChevronDown className="ml-1 w-4 h-4" />}
        </button>
        {isExpanded && (
          <div className="mt-2">
            <p>{t('tutoringExpandedContent')}</p>
          </div>
        )}
      </div>

      {/* Research highlight */}
      <div className="bg-teal-700 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{t('research')}</h3>
        <p>{t('researchContent')}</p>
      </div>

      {/* Math formula */}
      <div className="bg-green-700 p-4 rounded-lg flex items-center justify-center">
        <Image src="/images/schrodinger-equation.svg" alt="Quantum computing formula" width={200} height={100} className="max-w-full h-auto" />
      </div>

      {/* Photography */}
      <div className="md:col-span-2 bg-emerald-600 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{t('photography')}</h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="relative h-32 rounded-lg overflow-hidden">
            <Image src="/images/photography/photo1.jpg" alt="Portrait 1" layout="fill" objectFit="cover" className="rounded-lg transform transition-transform duration-300 hover:scale-105" />
          </div>
          <div className="relative h-32 rounded-lg overflow-hidden">
            <Image src="/images/photography/photo2.jpg" alt="Portrait 2" layout="fill" objectFit="cover" className="rounded-lg transform transition-transform duration-300 hover:scale-105" />
          </div>
          <div className="relative h-32 rounded-lg overflow-hidden">
            <Image src="/images/photography/photo3.jpg" alt="Portrait 3" layout="fill" objectFit="cover" className="rounded-lg transform transition-transform duration-300 hover:scale-105" />
          </div>
        </div>
      </div>

      {/* Tech stack */}
      <div className="md:col-span-3 bg-teal-600 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{t('techStack')}</h3>
        <div className="flex space-x-4 mb-2">
          <Code className="w-6 h-6" />
          <BookOpen className="w-6 h-6" />
          <Database className="w-6 h-6" />
        </div>
        <p>{t('techStackContent')}</p>
      </div>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageSrc={modalImage}
        caption={modalCaption}
      />
    </div>
  );
};

export default function Home() {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.language;
  const [services, setServices] = useState<ServiceCard[]>(serviceCards);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(currentLang === 'en' ? 'nl' : 'en');
  };

  const buttonOpacity = Math.max(1 - scrollPosition / 500, 0.5);

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
      
      <div 
        className="fixed top-4 right-4 sm:top-8 sm:right-8 md:top-12 md:right-12 lg:top-16 lg:right-24 xl:right-32 2xl:right-64 z-50 flex flex-col items-center transition-opacity duration-300"
        style={{ opacity: buttonOpacity }}
      >
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
          
          <div className="grid grid-cols-1 gap-8 mb-16">
            {/* Private Tutoring Card (full width) */}
            <TiltCard className="col-span-1">
              <div className="rounded-lg p-6 shadow-lg backdrop-blur-sm h-full flex flex-col justify-between bg-emerald-800 bg-opacity-70 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900">
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 mr-4">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl font-semibold text-emerald-100">{t('privateTutoring')}</h2>
                </div>
                <p className="text-xl text-emerald-100 mb-4">{t('privateTutoringDesc')}</p>
                <Link href="https://privelessen.stephenadei.nl" className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-300">
                  {t('startLearning')}
                </Link>
              </div>
            </TiltCard>

            {/* Other Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.slice(1).map((card, index) => (
                <TiltCard key={index} className="block">
                  <div className={`rounded-lg p-6 shadow-lg backdrop-blur-sm h-full flex flex-col justify-between ${card.cardStyle} opacity-70`}>
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-full bg-gray-500">
                          {card.icon}
                        </div>
                      </div>
                      <h2 className="text-3xl font-semibold mb-4 text-emerald-100">{t(card.title)}</h2>
                      <p className="text-xl text-emerald-100 mb-4">{t(card.description)}</p>
                    </div>
                    <p className="text-lg text-gray-400 mt-auto">{t('comingSoon')}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-4xl font-semibold mb-6 text-emerald-100">{t('about')}</h2>
            <BentoGrid />
          </div>
        </div>
      </div>
    </div>
  );
}