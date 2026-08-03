'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';
import AttachmentList from '@/components/AttachmentList';
import CroppedImage from '@/components/CroppedImage';
import { shapeClassName } from '@/lib/shape';

export default function Enlarge({ items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div className="favorites-grid">
        {items.map((item, index) => (
          <div key={item.id} className={`favorites-card ${shapeClassName(item.shape, index)}`.trim()}>
            <span className="favorites-rank">{index + 1}.</span>
            <CroppedImage
              src={item.imageUrl}
              alt={item.title}
              className="favorites-img"
              style={{ cursor: 'pointer' }}
              zoom={item.imageUrlZoom}
              posX={item.imageUrlPosX}
              posY={item.imageUrlPosY}
              onClick={() => setSelectedIndex(index)}
            />
            <p className="favorites-title">{item.title}</p>
            {item.subtitle && <p className="favorites-sub">{item.subtitle}</p>}
            {item.siteUrl && (
              <a
                href={item.siteUrl}
                className="btn btn-small"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                Visit site
              </a>
            )}
            <AttachmentList attachments={item.attachments} />
          </div>
        ))}
      </div>

      <Lightbox
        item={selected ? { image: selected.imageUrl, title: selected.title, subtitle: selected.subtitle } : null}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
