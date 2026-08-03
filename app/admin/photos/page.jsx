'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';

const FIELDS = [
  { key: 'caption', label: 'Caption', required: true },
  { key: 'category', label: 'Category', type: 'datalist', required: true },
  { key: 'date', label: 'Date' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
];

export default function PhotosAdminPage() {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Photos</h2>
      </div>
      <div className="section-body">
        <CollectionEditor
          collectionName="photos"
          fields={FIELDS}
          itemLabel={(item) => item.caption}
          itemDetail={(item) => item.category}
          emptyMessage="No photos yet."
          revalidatePath="/photos"
        />
      </div>
    </div>
  );
}
