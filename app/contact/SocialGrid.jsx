'use client';

import AttachmentList from '@/components/AttachmentList';
import EditableText from '@/components/editing/EditableText';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import { useAdminUser } from '@/lib/auth';
import { useOwnerCollection } from '@/lib/useOwnerCollection';
import { shapeClassName, SHAPE_FIELD } from '@/lib/shape';

const CREATE_FIELDS = [
  { key: 'platform', label: 'Platform', required: true },
  { key: 'username', label: 'Username' },
  { key: 'url', label: 'URL', type: 'text', required: true },
  { key: 'description', label: 'Description' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

const EXTRA_FIELDS = [
  { key: 'url', label: 'URL', type: 'text', required: true },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function SocialGrid({ social: initialSocial }) {
  const { isOwner } = useAdminUser();
  const { items, patchItem, createItem, deleteItem } = useOwnerCollection('social', {
    initialItems: initialSocial,
    reorderable: true,
    revalidateTarget: '/contact',
  });
  const list = items || [];

  if (list.length === 0 && !isOwner) {
    return <p className="empty-state">No social links yet.</p>;
  }

  return (
    <div className="contact-grid">
      {list.map((link, index) => {
        const target = { type: 'item', collection: 'social', id: link.id };
        return (
          <div key={link.id} className={`card ${shapeClassName(link.shape, index)}`.trim()}>
            <EditableText
              as="h3"
              value={link.platform}
              align={link.platformAlign}
              fieldKey="platform"
              target={target}
              revalidateTarget="/contact"
              placeholder="Platform"
            />
            <EditableText
              as="p"
              value={link.username}
              align={link.usernameAlign}
              fieldKey="username"
              target={target}
              revalidateTarget="/contact"
              placeholder="Add a username…"
            />
            <EditableText
              as="p"
              value={link.description}
              align={link.descriptionAlign}
              fieldKey="description"
              target={target}
              revalidateTarget="/contact"
              placeholder="Add a description…"
            />
            {link.url && (
              <a href={link.url} className="btn" target="_blank" rel="noopener noreferrer">
                {link.platform}
              </a>
            )}
            <AttachmentList attachments={link.attachments} />
            {isOwner && (
              <ItemEditPanel
                fields={EXTRA_FIELDS}
                initial={link}
                collectionName="social"
                itemId={link.id}
                triggerLabel="✎ More fields"
                triggerClassName="btn-more-fields"
                onSubmit={(form) => patchItem(link.id, form)}
                onDelete={() => deleteItem(link.id)}
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
            collectionName="social"
            triggerLabel="+ Add social link"
            triggerClassName="btn"
            submitLabel="Add"
            onSubmit={(form) => createItem(form)}
          />
        </div>
      )}
    </div>
  );
}
