// components/BentoGrid.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Modal from './Modal'; // Zorg ervoor dat het pad correct is
import { BookOpen, ChevronDown, ChevronUp, Code, Database } from 'lucide-react';

// Accordion Component for collapsible sections
const Accordion: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-700">
      <button
        className="w-full flex justify-between items-center py-4 text-left text-emerald-100 font-semibold focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-emerald-200">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

// Expertise Section for more detailed information
const ExpertiseSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 bg-emerald-800 rounded-lg shadow-lg mb-6">
      <h3 className="text-2xl font-bold mb-4 text-emerald-100">
        {t('expertise')}
      </h3>
      <p className="text-lg text-emerald-200">{t('expertiseSummary')}</p>
      <button
        className="mt-4 text-emerald-300 hover:underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? t('showLess') : t('showMore')}
      </button>
      {isExpanded && (
        <div className="mt-4 text-emerald-100">
          <ul className="list-disc list-inside">
            <li>{t('advancedEducation')}</li>
            <li>{t('diverseKnowledge')}</li>
            <li>{t('researchAppliedMath')}</li>
            <li>{t('programmingSkills')}</li>
            <li>{t('problemSolving')}</li>
            <li>{t('continuousLearning')}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

const BentoGrid: React.FC = () => {
  const { t } = useTranslation('common');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalCaption, setModalCaption] = useState('');

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
        <div
          className="relative h-64 md:h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            openModal('/images/portraits/outdoor.jpg', t('outdoorPhotoCaption'))
          }
        >
          <Image
            src="/images/portraits/outdoor.jpg"
            alt="Stephen Adei outdoor"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      {/* Teaching photo */}
      <div className="bg-emerald-600 p-4 rounded-lg overflow-hidden">
        <div
          className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4 cursor-pointer"
          onClick={() =>
            openModal('/images/teaching/teaching.jpg', t('teachingPhotoCaption'))
          }
        >
          <Image
            src="/images/teaching/teaching.jpg"
            alt="Stephen teaching"
            fill
            style={{ objectFit: 'cover' }}
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
      </div>

      {/* Photography */}
      <div className="md:col-span-2 bg-emerald-600 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{t('photography')}</h3>
        <div className="grid grid-cols-3 gap-2">
          {['photo1.jpg', 'photo2.jpg', 'photo3.jpg'].map((photo, index) => (
            <div
              key={index}
              className="relative h-32 rounded-lg overflow-hidden cursor-pointer"
              onClick={() =>
                openModal(
                  `/images/photography/${photo}`,
                  `${t('photography')} ${index + 1}`
                )
              }
            >
              <Image
                src={`/images/photography/${photo}`}
                alt={`Portrait ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
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

      {/* Accordion Sections */}
      <div className="md:col-span-3 bg-emerald-600 p-4 rounded-lg">
        <h3 className="text-xl font-bold mb-2">{t('additionalInfo')}</h3>
        <Accordion
          title={t('aboutTeachingTitle')}
          content={t('aboutTeachingContent')}
        />
        <Accordion
          title={t('aboutLanguagesTitle')}
          content={t('aboutLanguagesContent')}
        />
        <Accordion
          title={t('aboutInterestsTitle')}
          content={t('aboutInterestsContent')}
        />
      </div>

      {/* Expertise Section */}
      <ExpertiseSection />

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

export default BentoGrid;
