'use client';

import React from 'react';
import { useLocale } from 'next-intl';

interface FlagButtonProps { onSwitch: (locale: 'en' | 'nl') => void; }

const FlagButton: React.FC<FlagButtonProps> = ({ onSwitch }) => {
  const locale = useLocale();
  const targetLocale = locale === 'en' ? 'nl' : 'en';

  return (
    <button onClick={() => onSwitch(targetLocale)} className="w-10 h-7 rounded overflow-hidden relative transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-300" aria-label={locale === 'nl' ? 'Switch to English' : 'Schakel naar Nederlands'}>
      {locale === 'nl' ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" className="w-full h-full">
          <clipPath id="s"><rect width="30" height="15" /></clipPath>
          <rect width="60" height="30" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#s)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6"/>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" className="w-full h-full">
          <rect width="3" height="0.6667" y="0" fill="#AE1C28" />
          <rect width="3" height="0.6667" y="0.6667" fill="#FFFFFF" />
          <rect width="3" height="0.6667" y="1.3334" fill="#21468B" />
        </svg>
      )}
    </button>
  );
};

export default FlagButton;
