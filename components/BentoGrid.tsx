import React from 'react';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { BookOpen, Code, Database, Download } from 'lucide-react';

import Accordion from './Accordion';
import ExpertiseSection from './ExpertiseSection';

interface BentoGridProps {
  openModal: (imageSrc: string, caption: string) => void;
}

interface AcademicWork {
  title: string;
  type: string;
  description: string;
  file: string;
}

const BentoGrid: React.FC<BentoGridProps> = ({ openModal }) => {
  const { t } = useTranslation('common');

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    if (image.naturalWidth > image.naturalHeight) {
      image.classList.add('landscape');
    } else {
      image.classList.add('portrait');
    }
  };

  const about = t('about', { returnObjects: true });
  const services = t('services', { returnObjects: true });
  const photos = t('photos', { returnObjects: true });
  const general = t('general', { returnObjects: true });

  const academicWorks = about.sections.academicWorks.works as AcademicWork[];

  if (!Array.isArray(academicWorks)) {
    console.error('Academic Works is not an array:', academicWorks);
    return null;
  }

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm rounded-lg shadow-xl overflow-hidden">
      {/* Shimmering overlay with pointer-events-none */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 animate-shimmer pointer-events-none"></div>

      {/* Main introduction with outdoor image */}
      <div className="relative md:col-span-2 bg-white bg-opacity-20 p-6 rounded-lg shadow-lg overflow-hidden">
        <h3 className="text-2xl font-bold mb-4 text-white">{about.intro}</h3>
        <p className="text-lg mb-4 text-white">{about.content}</p>
        <div
          className="relative h-64 md:h-96 rounded-lg overflow-hidden cursor-pointer"
          onClick={() => openModal('/images/portraits/outdoor.jpg', photos.outdoor.caption)}
        >
          <Image
            src="/images/portraits/outdoor.jpg"
            alt="Stephen Adei outdoor"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg transform transition-transform duration-300 hover:scale-105"
            onLoad={handleImageLoad}
          />
        </div>
      </div>

      {/* Teaching photo */}
      <div className="relative bg-white bg-opacity-20 p-4 rounded-lg shadow-lg overflow-hidden">
        <div
          className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-4 cursor-pointer"
          onClick={() => openModal('/images/teaching/teaching.jpg', photos.teaching.caption)}
        >
          <Image
            src="/images/teaching/teaching.jpg"
            alt="Stephen teaching"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            className="rounded-lg transform transition-transform duration-300 hover:scale-105"
            onLoad={handleImageLoad}
          />
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{photos.teaching.caption}</h3>
      </div>

      {/* Educational background */}
      <div className="relative bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-white">{about.sections.education.title}</h3>
        <p className="text-white">{about.sections.education.content}</p>
      </div>

      {/* Tutoring experience */}
      <div className="relative bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-white">{about.sections.tutoring.title}</h3>
        <p className="text-white">{about.sections.tutoring.content}</p>
      </div>

      {/* Photography */}
      <div className="relative md:col-span-2 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-white">{services.photography.title}</h3>
        <div className="grid grid-cols-3 gap-2">
          {['photo1.jpg', 'photo2.jpg', 'photo3.jpg'].map((photo, index) => (
            <div
              key={index}
              className="relative h-32 rounded-lg overflow-hidden cursor-pointer"
              onClick={() => openModal(`/images/photography/${photo}`, `${services.photography.title} ${index + 1}`)}
            >
              <Image
                src={`/images/photography/${photo}`}
                alt={`Portrait ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="rounded-lg transform transition-transform duration-300 hover:scale-105"
                onLoad={handleImageLoad}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack */}
      <div className="relative md:col-span-3 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-white">{about.sections.techStack.title}</h3>
        <div className="flex space-x-4 mb-2">
          <Code className="w-6 h-6 text-white" />
          <BookOpen className="w-6 h-6 text-white" />
          <Database className="w-6 h-6 text-white" />
        </div>
        <p className="text-white">{about.sections.techStack.content}</p>
      </div>

      {/* Accordion Sections */}
      <div className="relative md:col-span-3 bg-white bg-opacity-20 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-2 text-white">{general.additionalInfo}</h3>
        <Accordion
          title={about.sections.teaching.title}
          content={about.sections.teaching.content}
        />
        <Accordion
          title={about.sections.languages.title}
          content={about.sections.languages.content}
        />
        <Accordion
          title={about.sections.interests.title}
          content={about.sections.interests.content}
        />
      </div>

      <div className="md:col-span-3">
        <ExpertiseSection />
      </div>

      {/* Academic Works Section */}
      <div className="relative md:col-span-3 bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4 text-white">{about.sections.academicWorks.title}</h3>
        <p className="mb-6 text-white">{about.sections.academicWorks.content}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {academicWorks.map((work: AcademicWork, index: number) => (
            <div key={index} className="bg-black bg-opacity-30 p-4 rounded-lg shadow transition-all duration-300 hover:shadow-lg">
              <h4 className="text-lg font-semibold mb-2 text-white">{work.title}</h4>
              <p className="text-sm mb-2 text-gray-200">{work.type}</p>
              <p className="text-sm mb-4 text-white">{work.description}</p>
              <a
                href={`/academic-works/${work.file}`}
                download
                className="inline-flex items-center text-gray-300 hover:text-white transition-colors duration-300"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BentoGrid;