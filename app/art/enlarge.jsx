'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCardColor, getCardClass } from '@/lib/utils';

export default function EnlargeArt({ pieces }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

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
              src={`/assets/${piece.image}`}
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

      {selectedIndex !== null && (
        <div
          onClick={() => setSelectedIndex(null)}
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
            className={getCardClass(selectedIndex)}
            style={{
              backgroundColor: getCardColor(selectedIndex),
              width: '80%',
              maxWidth: '800px',
              maxHeight: '80vh',
              position: 'relative',
              textAlign: 'center',
              overflow: 'hidden', // ensures image fits
            }}
          >
            <button
              onClick={() => setSelectedIndex(null)}
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
                maxHeight: 'calc(80vh - 80px)', // leave room for title + button
              }}
            >
              <Image
                src={`/assets/${pieces[selectedIndex].image}`}
                alt={pieces[selectedIndex].title}
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

            <h4 className="card-title">{pieces[selectedIndex].title}</h4>
            <p className="card-date">{pieces[selectedIndex].date}</p>
          </div>
        </div>
      )}
    </>
  );
}