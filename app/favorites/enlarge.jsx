'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';

export default function Enlarge({ items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <>
      <div className="favorites-grid">
        {items.map((item, index) => (
          <div key={item.id} className="favorites-card" onClick={() => setSelectedIndex(index)}>
            <span className="favorites-rank">{index + 1}.</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.imageUrl} alt={item.title} className="favorites-img" loading="lazy" />
            <p className="favorites-title">{item.title}</p>
            {item.subtitle && <p className="favorites-sub">{item.subtitle}</p>}
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
