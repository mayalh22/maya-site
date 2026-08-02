'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getCardColor, getCardClass } from '@/lib/utils';
import { resolveAssetSrc } from '@/lib/images';
import Lightbox from '@/components/Lightbox';

export default function Enlarge({ items }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const selected = selectedIndex !== null ? items[selectedIndex] : null;

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
            <Image
              src={resolveAssetSrc(item.image)}
              alt={item.title}
              width={200}
              height={240}
              className="favorites-img"
            />
            <p className="favorites-title">{item.title}</p>
            <p className="favorites-sub">{item.subtitle}</p>
          </div>
        ))}
      </div>

      <Lightbox
        item={selected ? { image: resolveAssetSrc(selected.image), title: selected.title, subtitle: selected.subtitle } : null}
        onClose={() => setSelectedIndex(null)}
        backgroundColor={selectedIndex !== null ? getCardColor(selectedIndex) : undefined}
        className={selectedIndex !== null ? getCardClass(selectedIndex) : undefined}
      />
    </>
  );
}
