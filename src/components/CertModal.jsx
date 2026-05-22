import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import gsap from 'gsap';

const CertModal = ({ cert, onClose }) => {
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';

    // Animation in
    const tl = gsap.timeline();
    tl.to(backdropRef.current, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      .fromTo(modalRef.current, 
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' },
        "-=0.1"
      );

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    // Animation out
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(modalRef.current, { y: 30, opacity: 0, scale: 0.95, duration: 0.2, ease: 'power2.in' })
      .to(backdropRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, "-=0.1");
  };

  if (!cert) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      style={{ pointerEvents: 'auto' }}
    >
      {/* Backdrop */}
      <div 
        ref={backdropRef}
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm opacity-0"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div 
        ref={modalRef}
        className="relative z-10 w-full max-w-5xl max-h-[90vh] flex flex-col items-center justify-center opacity-0"
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute -top-16 right-0 md:-right-16 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer border border-white/20"
          aria-label="Close modal"
        >
          <X size={28} />
        </button>
        
        <img 
          src={cert.image} 
          alt={cert.name}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()} 
        />
      </div>
    </div>,
    document.body
  );
};

export default CertModal;
