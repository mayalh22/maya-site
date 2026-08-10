'use client';

import { useState } from 'react';
import Lightbox from '@/components/Lightbox';
import AttachmentList from '@/components/AttachmentList';
import EditableImage from '@/components/editing/EditableImage';
import EditableText from '@/components/editing/EditableText';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import { useAdminUser } from '@/lib/auth';
import { useOwnerCollection } from '@/lib/useOwnerCollection';
import { useDragReorder } from '@/lib/useDragReorder';
import { shapeClassName, SHAPE_FIELD } from '@/lib/shape';

const CREATE_FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'date', label: 'Date' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

const EXTRA_FIELDS = [
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function EnlargeArt({ pieces: initialPieces }) {
  const { isOwner } = useAdminUser();
  const { items, patchItem, createItem, deleteItem, reorder } = useOwnerCollection('art', {
    initialItems: initialPieces,
    reorderable: true,
    revalidateTarget: '/art',
  });
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [rearranging, setRearranging] = useState(false);
  const list = items || [];
  const selected = selectedIndex !== null ? list[selectedIndex] : null;
  const { dragHandlers, dragIndex } = useDragReorder(list, reorder);

  if (list.length === 0 && !isOwner) {
    return <p className="empty-state">No art yet.</p>;
  }

  return (
    <>
      {isOwner && list.length > 1 && (
        <div className="rearrange-row">
          <button type="button" className="layout-editor-toggle" onClick={() => setRearranging((v) => !v)}>
            {rearranging ? 'Done rearranging' : 'Rearrange'}
          </button>
        </div>
      )}
      <div className="card-grid">
        {list.map((piece, index) => {
          const target = { type: 'item', collection: 'art', id: piece.id };
          return (
            <div
              key={piece.id}
              className={`card ${shapeClassName(piece.shape, index)} ${dragIndex === index ? 'dragging' : ''}`.trim()}
              {...(rearranging ? dragHandlers(index) : {})}
            >
              <EditableImage
                src={piece.imageUrl}
                alt={piece.title}
                className="card-img"
                style={{ cursor: 'pointer' }}
                sizes="(max-width: 768px) 45vw, 300px"
                zoomX={piece.imageUrlZoomX ?? piece.imageUrlZoom}
                zoomY={piece.imageUrlZoomY ?? piece.imageUrlZoom}
                posX={piece.imageUrlPosX}
                posY={piece.imageUrlPosY}
                sizeW={piece.imageUrlSizeW}
                sizeH={piece.imageUrlSizeH}
                cropKeyPrefix="imageUrl"
                target={target}
                revalidateTarget="/art"
                onClick={() => setSelectedIndex(index)}
              />
              <EditableText
                as="h4"
                className="card-title"
                value={piece.title}
                align={piece.titleAlign}
                fieldKey="title"
                target={target}
                revalidateTarget="/art"
                placeholder="Title"
              />
              <EditableText
                as="p"
                className="card-date"
                value={piece.date}
                fieldKey="date"
                target={target}
                revalidateTarget="/art"
                placeholder="Add a date…"
              />
              {piece.siteUrl && (
                <a href={piece.siteUrl} className="btn btn-small" target="_blank" rel="noopener noreferrer">
                  Visit site
                </a>
              )}
              <AttachmentList attachments={piece.attachments} />
              {isOwner && (
                <ItemEditPanel
                  fields={EXTRA_FIELDS}
                  initial={piece}
                  collectionName="art"
                  itemId={piece.id}
                  triggerLabel="✎ More fields"
                  triggerClassName="btn-more-fields"
                  onSubmit={(form) => patchItem(piece.id, form)}
                  onDelete={() => deleteItem(piece.id)}
                />
              )}
            </div>
          );
        })}
        {isOwner && (
          <div className="card add-item-card">
            <ItemEditPanel
              fields={CREATE_FIELDS}
              initial={{}}
              collectionName="art"
              triggerLabel="+ Add art"
              triggerClassName="btn"
              submitLabel="Add"
              onSubmit={(form) => createItem(form)}
            />
          </div>
        )}
      </div>

      <Lightbox
        item={selected ? { image: selected.imageUrl, title: selected.title, subtitle: selected.date } : null}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
