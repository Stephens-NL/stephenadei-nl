// components/Modal.tsx

import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { X } from 'lucide-react';
import FocusTrap from 'focus-trap-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  caption: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, caption }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sluit de modal bij het indrukken van de Escape-toets
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    } else {
      window.removeEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  // Focus op de sluitknop wanneer de modal opent
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Voorkom achtergrond scrollen wanneer modal open is
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <FocusTrap
      focusTrapOptions={{
        onDeactivate: onClose,
        clickOutsideDeactivates: true,
        // Gebruik de non-null assertion operator en type assertions
        initialFocus: () => closeButtonRef.current!,
        fallbackFocus: () => modalRef.current!,
      }}
    >
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          className="bg-white rounded-lg p-6 max-w-4xl w-full relative"
          ref={modalRef}
        >
          {/* Sluitknop */}
          <button
            onClick={onClose}
            ref={closeButtonRef}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Sluit modal"
            autoFocus
          >
            <X className="w-6 h-6" />
          </button>

          {/* Afbeelding */}
          <div className="w-full flex justify-center">
            <Image
              src={imageSrc}
              alt={caption}
              width={1200}
              height={630}
              className="rounded-lg max-w-full h-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Caption */}
          <p className="mt-4 text-center text-gray-700" id="modal-description">
            {caption}
          </p>
        </div>
      </div>
    </FocusTrap>,
    document.body
  );
};

export default Modal;
