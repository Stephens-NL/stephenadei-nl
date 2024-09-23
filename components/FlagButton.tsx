// components/FlagButton.tsx
'use client';

import React from 'react';

interface FlagButtonProps {
  currentLang: string;
  onClick: () => void;
}

const FlagButton: React.FC<FlagButtonProps> = ({ currentLang, onClick }) => {
  const isDutch = currentLang === 'nl';

  return (
    <button
      onClick={onClick}
      className={`w-12 h-8 rounded overflow-hidden relative transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-300`}
      aria-label={isDutch ? 'Switch to English' : 'Schakel naar Nederlands'}
    >
      {isDutch ? (
        // Amerikaanse Vlag als SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 247 130"
          className="w-full h-full"
        >
          <defs>
            <clipPath id="clip">
              <rect width="247" height="130" />
            </clipPath>
          </defs>
          <g clipPath="url(#clip)">
            {/* Strepen */}
            {[...Array(13)].map((_, i) => (
              <rect
                key={i}
                y={i * 10}
                width="247"
                height="10"
                fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
              />
            ))}
            {/* Blauw Veld */}
            <rect width="98" height="70" fill="#3C3B6E" />
            {/* Witte Sterren */}
            <g fill="#FFFFFF">
              {[...Array(50)].map((_, i) => {
                const row = Math.floor(i / 6);
                const col = i % 6;
                const offset = row % 2 === 0 ? 0 : 5;
                if (row >= 10) return null; // Max 10 rijen
                return (
                  <polygon
                    key={i}
                    points="0,-3 2,7 7,8 3,13 5,19 0,15 -5,19 -3,13 -7,8 -2,7"
                    transform={`translate(${10 + col * 16 + offset}, ${10 + row * 6}) scale(1.5)`}
                  />
                );
              })}
            </g>
          </g>
        </svg>
      ) : (
        // Nederlandse Vlag als SVG
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3 2"
          className="w-full h-full"
        >
          <rect width="3" height="0.6667" y="0" fill="#AE1C28" />
          <rect width="3" height="0.6667" y="0.6667" fill="#FFFFFF" />
          <rect width="3" height="0.6667" y="1.3334" fill="#21468B" />
        </svg>
      )}
    </button>
  );
};

export default FlagButton;