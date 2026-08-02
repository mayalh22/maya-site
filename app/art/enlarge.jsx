'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCardColor, getCardClass } from '@/lib/utils';
import { resolveAssetSrc } from '@/lib/images';
import Lightbox from '@/components/Lightbox';

export default function EnlargeArt({ pieces }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? pieces[selectedIndex] : null;

  return (
    <>
      <div className="card-grid">
        {pieces.map((piece, index) => (
          <div
            key={piece.title}
            className={getCardClass(index)}
            style={{ backgroundColor: getCardColor(index), cursor: 'pointer' }}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={resolveAssetSrc(piece.image)}
              alt={piece.title}
              width={400}
              height={160}
              className="card-img"
              loading="lazy"
            />
            <h4 className="card-title">{piece.title}</h4>
            <p className="card-date">{piece.date}</p>
          </div>
        ))}
      </div>

      <Lightbox
        item={selected ? { image: resolveAssetSrc(selected.image), title: selected.title, subtitle: selected.date } : null}
        onClose={() => setSelectedIndex(null)}
        backgroundColor={selectedIndex !== null ? getCardColor(selectedIndex) : undefined}
        className={selectedIndex !== null ? getCardClass(selectedIndex) : undefined}
      />
    </>
  );
}
