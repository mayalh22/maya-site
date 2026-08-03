'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';
import SectionMessageForm from '@/components/admin/SectionMessageForm';
import { SHAPE_FIELD } from '@/lib/shape';

const FIELDS = [
  { key: 'caption', label: 'Caption', required: true },
  { key: 'category', label: 'Category', type: 'datalist', required: true },
  { key: 'date', label: 'Date' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function PhotosAdminPage() {
  return (
    <>
      <SectionMessageForm path="siteContent/photos" revalidateTarget="/photos" title="Photos intro" />
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
            reorderable
          />
        </div>
      </div>
    </>
  );
}
