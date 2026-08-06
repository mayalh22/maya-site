'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';
import AttachmentList from '@/components/AttachmentList';
import CroppedImage from '@/components/CroppedImage';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';
import { shapeClassName } from '@/lib/shape';

export default function Enlarge({ categories, photos, layout }) {
  const [selectedId, setSelectedId] = useState(null);
  const selected = photos.find((p) => p.id === selectedId) || null;

  return (
    <>
      {categories.map((category) => (
        <div key={category} className="photo-category">
          <h3 className="photo-category-title">{category}</h3>
          <GridLayoutEditor
            sectionKey={`photos-${category}`}
            defaultGap={16}
            defaultItemWidth={160}
            initial={layout?.[`photos-${category}`]}
            revalidateTarget="/photos"
          >
          <div className="photo-grid">
            {photos
              .filter((photo) => photo.category === category)
              .map((photo, index) => (
                <div key={photo.id} className={`photo-card ${shapeClassName(photo.shape, index)}`.trim()}>
                  <CroppedImage
                    src={photo.imageUrl}
                    alt={photo.caption}
                    className="photo-img-frame"
                    style={{ cursor: 'pointer' }}
                    zoom={photo.imageUrlZoom}
                    zoomX={photo.imageUrlZoomX}
                    zoomY={photo.imageUrlZoomY}
                    posX={photo.imageUrlPosX}
                    posY={photo.imageUrlPosY}
                    sizeW={photo.imageUrlSizeW}
                    sizeH={photo.imageUrlSizeH}
                    onClick={() => setSelectedId(photo.id)}
                  />
                  <p className="photo-caption">{photo.caption}</p>
                  {photo.date && <p className="photo-date">{photo.date}</p>}
                  {photo.siteUrl && (
                    <a href={photo.siteUrl} className="btn btn-small" target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Visit site
                    </a>
                  )}
                  <AttachmentList attachments={photo.attachments} />
                </div>
              ))}
          </div>
          </GridLayoutEditor>
        </div>
      ))}

      <Lightbox
        item={selected ? { image: selected.imageUrl, title: selected.caption, subtitle: selected.date } : null}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
