'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';
import SectionMessageForm from '@/components/admin/SectionMessageForm';
import { SHAPE_FIELD } from '@/lib/shape';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'date', label: 'Date' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function ArtAdminPage() {
  return (
    <>
      <SectionMessageForm path="siteContent/art" revalidateTarget="/art" title="Art intro" />
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
            reorderable
          />
        </div>
      </div>
    </>
  );
}
