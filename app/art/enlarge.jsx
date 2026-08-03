'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';

export default function EnlargeArt({ pieces }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? pieces[selectedIndex] : null;

  return (
    <>
      <div className="card-grid">
        {pieces.map((piece, index) => (
          <div key={piece.id} className="card" onClick={() => setSelectedIndex(index)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={piece.imageUrl} alt={piece.title} className="card-img" loading="lazy" />
            <h4 className="card-title">{piece.title}</h4>
            {piece.date && <p className="card-date">{piece.date}</p>}
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
