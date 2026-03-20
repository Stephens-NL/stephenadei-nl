'use client';

import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ModalProps { isOpen: boolean; onClose: () => void; imageSrc: string; caption: string; }

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageSrc, caption }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);
  useEffect(() => { const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); }; if (isOpen) window.addEventListener('keydown', handleEsc); return () => window.removeEventListener('keydown', handleEsc); }, [isOpen, onClose]);
  useEffect(() => { if (isOpen && closeButtonRef.current) closeButtonRef.current.focus(); }, [isOpen]);
  useEffect(() => { const orig = document.body.style.overflow; if (isOpen) document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = orig; }; }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="bg-emerald-950 border border-emerald-800 rounded-lg p-6 max-w-4xl w-full relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} ref={closeButtonRef} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors" aria-label="Close">
          <X className="w-6 h-6" />
        </button>
        <div className="w-full flex justify-center overflow-hidden max-h-[70vh]">
          <Image src={imageSrc} alt={caption} width={1200} height={800} className="max-w-full max-h-full object-contain" />
        </div>
        <p className="mt-4 text-center text-emerald-200">{caption}</p>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
