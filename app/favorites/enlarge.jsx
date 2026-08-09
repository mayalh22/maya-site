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

const TYPES = ['Movie', 'Show', 'Book', 'Album'];

const CREATE_FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'type', label: 'Type', type: 'select', options: TYPES, required: true },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

const EXTRA_FIELDS = [
  { key: 'type', label: 'Type', type: 'select', options: TYPES, required: true },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function Enlarge({ favorites: initialFavorites, layout }) {
  const { isOwner } = useAdminUser();
  const { items, patchItem, createItem, deleteItem } = useOwnerCollection('favorites', {
    initialItems: initialFavorites,
    reorderable: true,
    revalidateTarget: '/favorites',
  });
  const [selectedId, setSelectedId] = useState(null);
  const list = items || [];
  const selected = list.find((i) => i.id === selectedId) || null;

  if (list.length === 0 && !isOwner) {
    return <p className="empty-state">No favorites yet.</p>;
  }

  return (
    <>
      {TYPES.map((type) => {
        const typeItems = list.filter((item) => item.type === type);
        if (typeItems.length === 0 && !isOwner) return null;
        return (
          <section key={type} className="favorites-section">
            <div className="favorites-type-label">{type}s</div>
            <GridLayoutEditor
              sectionKey={`favorites-${type}`}
              defaultGap={16}
              defaultItemWidth={140}
              initial={layout?.[`favorites-${type}`]}
              revalidateTarget="/favorites"
            >
              <div className="favorites-grid">
                {typeItems.map((item, index) => {
                  const target = { type: 'item', collection: 'favorites', id: item.id };
                  return (
                    <div key={item.id} className={`favorites-card ${shapeClassName(item.shape, index)}`.trim()}>
                      <span className="favorites-rank">{index + 1}.</span>
                      <EditableImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="favorites-img"
                        style={{ cursor: 'pointer' }}
                        sizes="140px"
                        zoomX={item.imageUrlZoomX ?? item.imageUrlZoom}
                        zoomY={item.imageUrlZoomY ?? item.imageUrlZoom}
                        posX={item.imageUrlPosX}
                        posY={item.imageUrlPosY}
                        sizeW={item.imageUrlSizeW}
                        sizeH={item.imageUrlSizeH}
                        cropKeyPrefix="imageUrl"
                        target={target}
                        revalidateTarget="/favorites"
                        onClick={() => setSelectedId(item.id)}
                      />
                      <EditableText
                        as="p"
                        className="favorites-title"
                        value={item.title}
                        align={item.titleAlign}
                        fieldKey="title"
                        target={target}
                        revalidateTarget="/favorites"
                        placeholder="Title"
                      />
                      <EditableText
                        as="p"
                        className="favorites-sub"
                        value={item.subtitle}
                        align={item.subtitleAlign}
                        fieldKey="subtitle"
                        target={target}
                        revalidateTarget="/favorites"
                        placeholder="Add a subtitle…"
                      />
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
                      {isOwner && (
                        <ItemEditPanel
                          fields={EXTRA_FIELDS}
                          initial={item}
                          collectionName="favorites"
                          itemId={item.id}
                          triggerLabel="✎ More fields"
                          triggerClassName="btn-more-fields"
                          onSubmit={(form) => patchItem(item.id, form)}
                          onDelete={() => deleteItem(item.id)}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </GridLayoutEditor>
          </section>
        );
      })}

      {isOwner && (
        <div className="favorites-section">
          <ItemEditPanel
            fields={CREATE_FIELDS}
            initial={{}}
            collectionName="favorites"
            triggerLabel="+ Add favorite"
            triggerClassName="btn"
            submitLabel="Add"
            onSubmit={(form) => createItem(form)}
          />
        </div>
      )}

      <Lightbox
        item={selected ? { image: selected.imageUrl, title: selected.title, subtitle: selected.subtitle } : null}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
}
