'use client';

import { useState } from 'react';
import { getCardColor, getCardClass } from '@/lib/utils';

export default function Enlarge({ items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  return (
    <>
      <div className="favorites-grid">
        {items.map((item, index) => (
          <div
            key={item.title}
            className={getCardClass(index)}
            style={{ backgroundColor: getCardColor(index), cursor: 'pointer' }}
            onClick={() => setSelectedIndex(index)}
          >
            <span className="favorites-rank">{index + 1}.</span>
            <img src={item.image} alt={item.title} className="favorites-img" />
            <p className="favorites-title">{item.title}</p>
            <p className="favorites-sub">{item.subtitle}</p>
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
            padding: '100px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={getCardClass(selectedIndex)}
            style={{
              backgroundColor: getCardColor(selectedIndex),
              width: '50%',
              maxWidth: '600px',
              position: 'relative',
              textAlign: 'center',
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

            <span className="favorites-rank">{selectedIndex + 1}.</span>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src={items[selectedIndex].image}
                alt={items[selectedIndex].title}
                className="favorites-img"
              />
            </div>

            <p className="favorites-title">{items[selectedIndex].title}</p>
            <p className="favorites-sub">{items[selectedIndex].subtitle}</p>
          </div>
        </div>
      )}
    </>
  );
}