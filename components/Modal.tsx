import React, { useEffect, useRef, useState } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

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
          <button
            onClick={onClose}
            ref={closeButtonRef}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
            aria-label="Sluit modal"
            autoFocus
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-full flex justify-center overflow-auto max-h-[80vh]">
            <Image
              src={imageSrc}
              alt={caption}
              width={1200}
              height={630}
              className={`rounded-lg max-w-full h-auto object-contain ${
                isMobile ? 'hover:scale-105' : 'hover:scale-110'
              } transition-transform duration-200`}
              loading="lazy"
            />
          </div>
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