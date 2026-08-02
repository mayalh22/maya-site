'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Lightbox({ item, onClose, backgroundColor, className }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!item) return;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onClick={onClose}
    >
      <div
        className={className ? `lightbox-content ${className}` : 'lightbox-content'}
        style={{ backgroundColor }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>

        <div className="lightbox-image-wrap">
          <Image
            src={item.image}
            alt={item.title || ''}
            width={800}
            height={800}
            className="lightbox-image"
          />
        </div>

        {item.title && <h4 className="card-title lightbox-title">{item.title}</h4>}
        {item.subtitle && <p className="card-date lightbox-subtitle">{item.subtitle}</p>}
      </div>
    </div>
  );
}
