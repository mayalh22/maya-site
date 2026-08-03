'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';
import AttachmentList from '@/components/AttachmentList';
import { shapeClassName } from '@/lib/shape';

export default function EnlargeArt({ pieces }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? pieces[selectedIndex] : null;

  return (
    <>
      <div className="card-grid">
        {pieces.map((piece, index) => (
          <div key={piece.id} className={`card ${shapeClassName(piece.shape, index)}`.trim()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={piece.imageUrl}
              alt={piece.title}
              className="card-img"
              loading="lazy"
              onClick={() => setSelectedIndex(index)}
              style={{
                cursor: 'pointer',
                ...(piece.imageUrlWidth ? { width: piece.imageUrlWidth } : {}),
                ...(piece.imageUrlHeight ? { height: piece.imageUrlHeight } : {}),
              }}
            />
            <h4 className="card-title">{piece.title}</h4>
            {piece.date && <p className="card-date">{piece.date}</p>}
            {piece.siteUrl && (
              <a href={piece.siteUrl} className="btn btn-small" target="_blank" rel="noopener noreferrer">
                Visit site
              </a>
            )}
            <AttachmentList attachments={piece.attachments} />
          </div>
        ))}
      </div>

      <Lightbox
        item={selected ? { image: selected.imageUrl, title: selected.title, subtitle: selected.date } : null}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
