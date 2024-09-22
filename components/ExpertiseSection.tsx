import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { ExpertiseSectionData, ExpertiseItemData } from '../types/i18n'; // Pas dit pad aan

const ExpertiseSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [expertiseData, setExpertiseData] = useState<ExpertiseSectionData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const expertise = t('expertise', { returnObjects: true }) as ExpertiseSectionData;
      console.log('Raw expertise data:', JSON.stringify(expertise, null, 2));
      
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
    setExpandedItems(prev =>
      prev.includes(itemKey)
        ? prev.filter(i => i !== itemKey)
        : [...prev, itemKey]
    );
  };

  if (error) {
    return <div className="text-red-500">Error loading expertise data: {error}</div>;
  }

  if (!expertiseData || !expertiseData.items) {
    return <div>Loading expertise data...</div>;
  }

  return (
    <div className="p-6 bg-stone-700 rounded-lg shadow-lg mb-6 transition-all duration-300 hover:shadow-xl">
      <h2 className="text-3xl font-bold mb-4 text-stone-100">{expertiseData.title}</h2>
      <p className="text-lg text-stone-200 mb-6">{expertiseData.summary}</p>

      {Object.entries(expertiseData.items).map(([key, item]) => {
        console.log(`Processing item: ${key}`, JSON.stringify(item, null, 2));
        const isItemObject = typeof item === 'object' && item !== null;
        const title = isItemObject ? (item as ExpertiseItemData).title : item as string;
        const details = isItemObject ? (item as ExpertiseItemData).details : null;

        return (
          <div key={key} className="mb-6">
            <h3
              className="text-2xl font-semibold mb-3 text-stone-100 cursor-pointer hover:text-stone-300 transition-colors duration-300"
              onClick={() => toggleItem(key)}
            >
              {title}
              {details && <span className="ml-2">{expandedItems.includes(key) ? '▼' : '▶'}</span>}
            </h3>
            
            {details && expandedItems.includes(key) && (
              <p className="text-stone-200 ml-4">{details}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ExpertiseSection;