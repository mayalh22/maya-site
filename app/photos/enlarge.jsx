'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';

export default function Enlarge({ categories, photos }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = photos.find((p) => p.id === selectedId) || null;

  return (
    <>
      {categories.map((category) => (
        <div key={category} className="photo-category">
          <h3 className="photo-category-title">{category}</h3>
          <div className="photo-grid">
            {photos
              .filter((photo) => photo.category === category)
              .map((photo) => (
                <div key={photo.id} className="photo-card" onClick={() => setSelectedId(photo.id)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.imageUrl} alt={photo.caption} loading="lazy" />
                  <p className="photo-caption">{photo.caption}</p>
                  {photo.date && <p className="photo-date">{photo.date}</p>}
                </div>
              ))}
          </div>
        </div>
      ))}

      <Lightbox
        item={selected ? { image: selected.imageUrl, title: selected.caption, subtitle: selected.date } : null}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
