'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCardColor, getCardClass } from '@/lib/utils';

export default function Enlarge({ categories }) {
  const [selected, setSelected] = useState(null); // { categoryIndex, photoIndex }

  return (
    <>
      {categories.map((category, catIdx) => (
        <div key={catIdx} className="photo-grid">
          {category.photos.map((photo, idx) => (
            <div
              key={idx}
              className={getCardClass(idx)}
              style={{ backgroundColor: getCardColor(idx), cursor: 'pointer' }}
              onClick={() => setSelected({ categoryIndex: catIdx, photoIndex: idx })}
            >
              <Image
                src={`/assets/${photo.image}`}
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

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: getCardColor(selected.photoIndex),
              width: '80%',
              maxWidth: '800px',
              maxHeight: '80vh',
              position: 'relative',
              textAlign: 'center',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute',
                top: 10,
                right: 12,
                fontSize: 28,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                maxHeight: 'calc(80vh - 80px)',
              }}
            >
              <Image
                src={`/assets/${categories[selected.categoryIndex].photos[selected.photoIndex].image}`}
                alt={categories[selected.categoryIndex].photos[selected.photoIndex].caption}
                width={800}
                height={800}
                style={{
                  width: 'auto',
                  height: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            <p className="photo-caption">
              {categories[selected.categoryIndex].photos[selected.photoIndex].caption}
            </p>
            <p className="photo-date">
              {categories[selected.categoryIndex].photos[selected.photoIndex].date}
            </p>
          </div>
        </div>
      )}
    </>
  );
}