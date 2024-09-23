// ExpertiseSection.tsx

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { ExpertiseSectionData, ExpertiseItemData } from '../types/i18n';
import { FaChevronDown } from 'react-icons/fa';

const ExpertiseSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [expertiseData, setExpertiseData] = useState<ExpertiseSectionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const expertise = t('expertise', { returnObjects: true }) as ExpertiseSectionData;

      if (!expertise || typeof expertise !== 'object') {
        throw new Error('Expertise data is not an object');
      }

      if (!expertise.items || typeof expertise.items !== 'object') {
        throw new Error('Expertise items is not an object');
      }

      setExpertiseData(expertise);
    } catch (err) {
      console.error('Error loading expertise data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [t]);

  const toggleItem = (itemKey: string) => {
    setExpandedItem(prev => (prev === itemKey ? null : itemKey));
  };

  if (error) {
    return <div className="text-red-500">Error loading expertise data: {error}</div>;
  }

  if (!expertiseData || !expertiseData.items) {
    return <div>Loading expertise data...</div>;
  }

  return (
    <div className="relative bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-4 text-white">{expertiseData.title}</h2>
      <p className="text-lg text-white mb-6">{expertiseData.summary}</p>

      {Object.entries(expertiseData.items).map(([key, item]) => {
        const isItemObject = typeof item === 'object' && item !== null;
        const title = isItemObject ? (item as ExpertiseItemData).title : (item as string);
        const details = isItemObject ? (item as ExpertiseItemData).details : null;
        const isExpanded = expandedItem === key;

        return (
          <div key={key} className="mb-4">
            <button
              onClick={() => toggleItem(key)}
              className="flex items-center justify-between w-full text-left text-xl font-semibold text-white focus:outline-none transition-colors duration-300 hover:text-gray-300"
              aria-expanded={isExpanded}
            >
              <span>{title}</span>
              {details && (
                <span
                  className={`ml-2 transform transition-transform duration-300 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                >
                  <FaChevronDown />
                </span>
              )}
            </button>
            {details && (
              <div
                className={`mt-2 text-white text-base leading-relaxed overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {details}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExpertiseSection;