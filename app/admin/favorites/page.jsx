'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'subtitle', label: 'Subtitle' },
  { key: 'type', label: 'Type', type: 'select', options: ['Movie', 'Show', 'Book', 'Album'], required: true },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
];

export default function FavoritesAdminPage() {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Favorites</h2>
      </div>
      <div className="section-body">
        <CollectionEditor
          collectionName="favorites"
          fields={FIELDS}
          itemLabel={(item) => item.title}
          itemDetail={(item) => item.type}
          emptyMessage="No favorites yet."
          revalidatePath="/favorites"
        />
      </div>
    </div>
  );
}
