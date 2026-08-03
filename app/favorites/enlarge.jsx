'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';
import AttachmentList from '@/components/AttachmentList';
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.imageUrl}
              alt={item.title}
              className="favorites-img"
              loading="lazy"
              onClick={() => setSelectedIndex(index)}
              style={{
                cursor: 'pointer',
                ...(item.imageUrlWidth ? { width: item.imageUrlWidth } : {}),
                ...(item.imageUrlHeight ? { height: item.imageUrlHeight } : {}),
              }}
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
