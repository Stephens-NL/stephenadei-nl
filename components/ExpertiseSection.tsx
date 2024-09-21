import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';

const ExpertiseSection: React.FC = () => {
  const { t } = useTranslation('common');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-6 bg-stone-700 rounded-lg shadow-lg mb-6 transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-bold mb-4 text-stone-100">
        {t('expertise.title')}
      </h3>
      <p className="text-lg text-stone-200 mb-4">{t('expertise.summary')}</p>
      <button
        className="px-4 py-2 bg-stone-600 text-stone-100 rounded-full hover:bg-stone-500 transition-colors duration-300"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? t('general.showLess') : t('general.showMore')}
      </button>
      {isExpanded && (
        <div className="mt-6 text-stone-200">
          <ul className="list-disc list-inside space-y-2">
            {Object.entries(t('expertise.items', { returnObjects: true })).map(([key, value]) => (
              <li key={key} className="transition-all duration-300 hover:translate-x-2">
                {typeof value === 'string' ? value : (value as { title: string }).title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExpertiseSection;