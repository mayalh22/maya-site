'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';
import AttachmentList from '@/components/AttachmentList';
import EditableImage from '@/components/editing/EditableImage';
import EditableText from '@/components/editing/EditableText';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';
import { useAdminUser } from '@/lib/auth';
import { useOwnerCollection } from '@/lib/useOwnerCollection';
import { shapeClassName, SHAPE_FIELD } from '@/lib/shape';

function fieldsFor(suggestions) {
  return [
    { key: 'caption', label: 'Caption', required: true },
    { key: 'category', label: 'Category', type: 'datalist', required: true, suggestions },
    { key: 'date', label: 'Date' },
    { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
    { key: 'siteUrl', label: 'Site', type: 'link' },
    { key: 'attachments', label: 'Attachments', type: 'attachments' },
    SHAPE_FIELD,
  ];
}

function extraFieldsFor(suggestions) {
  return [
    { key: 'category', label: 'Category', type: 'datalist', required: true, suggestions },
    { key: 'siteUrl', label: 'Site', type: 'link' },
    { key: 'attachments', label: 'Attachments', type: 'attachments' },
    SHAPE_FIELD,
  ];
}

export default function Enlarge({ photos: initialPhotos, layout }) {
  const { isOwner } = useAdminUser();
  const { items, patchItem, createItem, deleteItem } = useOwnerCollection('photos', {
    initialItems: initialPhotos,
    reorderable: true,
    revalidateTarget: '/photos',
  });
  const [selectedId, setSelectedId] = useState(null);
  const list = items || [];
  const selected = list.find((p) => p.id === selectedId) || null;
  const categories = Array.from(new Set(list.map((p) => p.category).filter(Boolean))).sort();

  if (list.length === 0 && !isOwner) {
    return <p className="empty-state">No photos yet.</p>;
  }

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
              {list
                .filter((photo) => photo.category === category)
                .map((photo, index) => {
                  const target = { type: 'item', collection: 'photos', id: photo.id };
                  return (
                    <div key={photo.id} className={`photo-card ${shapeClassName(photo.shape, index)}`.trim()}>
                      <EditableImage
                        src={photo.imageUrl}
                        alt={photo.caption}
                        className="photo-img-frame"
                        style={{ cursor: 'pointer' }}
                        zoomX={photo.imageUrlZoomX ?? photo.imageUrlZoom}
                        zoomY={photo.imageUrlZoomY ?? photo.imageUrlZoom}
                        posX={photo.imageUrlPosX}
                        posY={photo.imageUrlPosY}
                        sizeW={photo.imageUrlSizeW}
                        sizeH={photo.imageUrlSizeH}
                        cropKeyPrefix="imageUrl"
                        target={target}
                        revalidateTarget="/photos"
                        onClick={() => setSelectedId(photo.id)}
                      />
                      <EditableText
                        as="p"
                        className="photo-caption"
                        value={photo.caption}
                        font={photo.captionFont}
                        fieldKey="caption"
                        target={target}
                        revalidateTarget="/photos"
                        placeholder="Caption"
                      />
                      <EditableText
                        as="p"
                        className="photo-date"
                        value={photo.date}
                        fieldKey="date"
                        target={target}
                        revalidateTarget="/photos"
                        placeholder="Add a date…"
                        allowFont={false}
                      />
                      {photo.siteUrl && (
                        <a
                          href={photo.siteUrl}
                          className="btn btn-small"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Visit site
                        </a>
                      )}
                      <AttachmentList attachments={photo.attachments} />
                      {isOwner && (
                        <ItemEditPanel
                          fields={extraFieldsFor(categories)}
                          initial={photo}
                          collectionName="photos"
                          itemId={photo.id}
                          triggerLabel="✎ More fields"
                          onSubmit={(form) => patchItem(photo.id, form)}
                          onDelete={() => deleteItem(photo.id)}
                        />
                      )}
                    </div>
                  );
                })}
            </div>
          </GridLayoutEditor>
        </div>
      ))}

      {isOwner && (
        <div className="photo-category">
          <ItemEditPanel
            fields={fieldsFor(categories)}
            initial={{}}
            collectionName="photos"
            triggerLabel="+ Add photo"
            triggerClassName="btn"
            submitLabel="Add"
            onSubmit={(form) => createItem(form)}
          />
        </div>
      )}

      <Lightbox
        item={selected ? { image: selected.imageUrl, title: selected.caption, subtitle: selected.date } : null}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
