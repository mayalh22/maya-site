'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'date', label: 'Date' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
];

export default function ArtAdminPage() {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Art</h2>
      </div>
      <div className="section-body">
        <CollectionEditor
          collectionName="art"
          fields={FIELDS}
          itemLabel={(item) => item.title}
          emptyMessage="No art yet."
          revalidatePath="/art"
        />
      </div>
    </div>
  );
}
