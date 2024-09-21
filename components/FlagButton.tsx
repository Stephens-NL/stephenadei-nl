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
      aria-label={isDutch ? "Switch to English" : "Schakel naar Nederlands"}
    >
      {isDutch ? (
        // Amerikaanse vlag (vereenvoudigd)
        <>
          <div className="absolute inset-0 bg-blue-700">
            <div className="absolute left-0 top-0 w-5 h-4 bg-blue-900">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute w-0.5 h-0.5 bg-white" style={{
                  top: `${0.5 + i * 0.75}rem`,
                  left: `${0.5 + (i % 2) * 0.75}rem`,
                }}></div>
              ))}
            </div>
            {[...Array(7)].map((_, i) => (
              <div key={i} className="absolute w-full h-1 bg-red-600" style={{
                top: `${i * 1.15}rem`,
              }}></div>
            ))}
          </div>
        </>
      ) : (
        // Nederlandse vlag
        <>
          <div className="absolute inset-x-0 top-0 h-1/3 bg-red-600"></div>
          <div className="absolute inset-x-0 top-1/3 h-1/3 bg-white"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-blue-600"></div>
        </>
      )}
    </button>
  );
};

export default FlagButton;