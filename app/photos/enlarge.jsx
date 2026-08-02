'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCardColor, getCardClass } from '@/lib/utils';
import { resolveAssetSrc } from '@/lib/images';
import Lightbox from '@/components/Lightbox';

export default function Enlarge({ categories }) {
  const [selected, setSelected] = useState(null); // { categoryIndex, photoIndex }

  const selectedPhoto = selected
    ? categories[selected.categoryIndex].photos[selected.photoIndex]
    : null;

  return (
    <>
      {categories.map((category, catIdx) => (
        <div key={category.category} className="photo-grid">
          {category.photos.map((photo, idx) => (
            <div
              key={photo.image}
              className={getCardClass(idx)}
              style={{ backgroundColor: getCardColor(idx), cursor: 'pointer' }}
              onClick={() => setSelected({ categoryIndex: catIdx, photoIndex: idx })}
            >
              <Image
                src={resolveAssetSrc(photo.image)}
                alt={photo.caption}
                width={200}
                height={150}
                loading="lazy"
              />
              <p className="photo-caption">{photo.caption}</p>
              <p className="photo-date">{photo.date}</p>
            </div>
          ))}
        </div>
      ))}

      <Lightbox
        item={selectedPhoto ? { image: resolveAssetSrc(selectedPhoto.image), title: selectedPhoto.caption, subtitle: selectedPhoto.date } : null}
        onClose={() => setSelected(null)}
        backgroundColor={selected ? getCardColor(selected.photoIndex) : undefined}
        className={selected ? getCardClass(selected.photoIndex) : undefined}
      />
    </>
  );
}
