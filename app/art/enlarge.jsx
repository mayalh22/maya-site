'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';
import AttachmentList from '@/components/AttachmentList';
import CroppedImage from '@/components/CroppedImage';
import { shapeClassName } from '@/lib/shape';

export default function EnlargeArt({ pieces }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? pieces[selectedIndex] : null;

  return (
    <>
      <div className="card-grid">
        {pieces.map((piece, index) => (
          <div key={piece.id} className={`card ${shapeClassName(piece.shape, index)}`.trim()}>
            <CroppedImage
              src={piece.imageUrl}
              alt={piece.title}
              className="card-img"
              style={{ cursor: 'pointer' }}
              zoom={piece.imageUrlZoom}
              zoomX={piece.imageUrlZoomX}
              zoomY={piece.imageUrlZoomY}
              posX={piece.imageUrlPosX}
              posY={piece.imageUrlPosY}
              onClick={() => setSelectedIndex(index)}
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
