import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { BookOpen, Code, Database } from 'lucide-react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

import Accordion from './Accordion';
import ExpertiseSection from './ExpertiseSection';

const BentoGrid: React.FC<{ openModal: (imageSrc: string, caption: string) => void }> = ({ openModal }) => {
  const { t } = useTranslation('common');
  const [expandedWork, setExpandedWork] = useState<number | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-stone-800 rounded-lg shadow-xl">
      {/* Main introduction with outdoor image */}
      <div className="md:col-span-2 bg-stone-700 p-6 rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-2xl font-bold mb-4 text-stone-100">{t('about.intro')}</h3>
        <p className="text-lg mb-4 text-stone-200">{t('about.content')}</p>
        <div
          className="relative h-64 md:h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() =>
            openModal('/images/portraits/outdoor.jpg', t('photos.outdoor.caption'))
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
      <div className="bg-stone-600 p-4 rounded-lg shadow-lg overflow-hidden">
        <div
          className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4 cursor-pointer"
          onClick={() =>
            openModal('/images/teaching/teaching.jpg', t('photos.teaching.caption'))
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
        <h3 className="text-xl font-bold mb-2 text-stone-100">{t('photos.teaching.caption')}</h3>
      </div>

      {/* Educational background */}
      <div className="bg-stone-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-stone-100">{t('about.sections.education.title')}</h3>
        <p className="text-stone-200">{t('about.sections.education.content')}</p>
      </div>

      {/* Tutoring experience */}
      <div className="bg-stone-600 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-stone-100">{t('about.sections.tutoring.title')}</h3>
        <p className="text-stone-200">{t('about.sections.tutoring.content')}</p>
      </div>

      {/* Photography */}
      <div className="md:col-span-2 bg-stone-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-stone-100">{t('services.photography.title')}</h3>
        <div className="grid grid-cols-3 gap-2">
          {['photo1.jpg', 'photo2.jpg', 'photo3.jpg'].map((photo, index) => (
            <div
              key={index}
              className="relative h-32 rounded-lg overflow-hidden cursor-pointer"
              onClick={() =>
                openModal(
                  `/images/photography/${photo}`,
                  `${t('services.photography.title')} ${index + 1}`
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
      <div className="md:col-span-3 bg-stone-600 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-stone-100">{t('about.sections.techStack.title')}</h3>
        <div className="flex space-x-4 mb-2">
          <Code className="w-6 h-6 text-stone-300" />
          <BookOpen className="w-6 h-6 text-stone-300" />
          <Database className="w-6 h-6 text-stone-300" />
        </div>
        <p className="text-stone-200">{t('about.sections.techStack.content')}</p>
      </div>

      {/* Accordion Sections */}
      <div className="md:col-span-3 bg-stone-700 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-stone-100">{t('general.additionalInfo')}</h3>
        <Accordion
          title={t('about.sections.teaching.title')}
          content={t('about.sections.teaching.content')}
        />
        <Accordion
          title={t('about.sections.languages.title')}
          content={t('about.sections.languages.content')}
        />
        <Accordion
          title={t('about.sections.interests.title')}
          content={t('about.sections.interests.content')}
        />
      </div>

      {/* Academic Works Section */}
      <div className="md:col-span-3 bg-stone-700 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-stone-100">{t('about.sections.academicWorks.title')}</h3>
        <p className="mb-6 text-stone-200">{t('about.sections.academicWorks.content')}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t('about.sections.academicWorks.works', { returnObjects: true }).map((work, index) => (
            <div key={index} className="bg-stone-800 p-4 rounded-lg shadow transition-all duration-300 hover:shadow-lg">
              <h4 className="text-lg font-semibold mb-2 text-stone-100">{work.title}</h4>
              <p className="text-sm mb-2 text-stone-300">{work.type}</p>
              <p className="text-sm mb-4 text-stone-200">{work.description}</p>
              <button 
                onClick={() => setExpandedWork(expandedWork === index ? null : index)}
                className="text-stone-300 hover:text-stone-100 transition-colors duration-300"
              >
                {expandedWork === index ? 'Hide Cover' : 'Show Cover'}
              </button>
              {expandedWork === index && (
                <div className="mt-4">
                  <Document
                    file={`/academic-works/${work.file}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading={<p className="text-stone-300">Loading cover...</p>}
                    error={<p className="text-red-500">Error loading PDF. Please try again.</p>}
                  >
                    <Page 
                      pageNumber={1} 
                      width={300}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </Document>
                  {numPages && (
                    <p className="text-stone-400 text-sm mt-2">Page 1 of {numPages}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Expertise Section */}
      <ExpertiseSection />
    </div>
  );
};

export default BentoGrid;