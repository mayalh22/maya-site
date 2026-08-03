'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';
import SectionMessageForm from '@/components/admin/SectionMessageForm';
import { SHAPE_FIELD } from '@/lib/shape';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'type', label: 'Type', type: 'select', options: ['Movie', 'Show', 'Book', 'Album'], required: true },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function FavoritesAdminPage() {
  return (
    <>
      <SectionMessageForm path="siteContent/favorites" revalidateTarget="/favorites" title="Favorites intro" />
      <div className="section-wrapper">
        <div className="section-header">
          <h2>Favorites</h2>
        </div>
        <div className="section-body">
          <p className="admin-status">Drag to reorder within a type — rank numbers on the public page follow this order.</p>
          <CollectionEditor
            collectionName="favorites"
            fields={FIELDS}
            itemLabel={(item) => item.title}
            itemDetail={(item) => item.type}
            emptyMessage="No favorites yet."
            revalidatePath="/favorites"
            reorderable
          />
        </div>
      </div>
    </>
  );
}
