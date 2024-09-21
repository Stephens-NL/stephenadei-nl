import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Accordion: React.FC<{ title: string; content: string }> = ({
  title,
  content,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-stone-600">
      <button
        className="w-full flex justify-between items-center py-4 text-left text-stone-100 font-semibold focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="w-6 h-6 text-stone-300" />
        ) : (
          <ChevronDown className="w-6 h-6 text-stone-300" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 text-stone-200">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;