'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';

const FIELDS = [
  { key: 'kind', label: 'Kind', type: 'select', options: ['experience', 'volunteering', 'honor'], required: true },
  { key: 'title', label: 'Title', required: true },
  { key: 'organization', label: 'Organization' },
  { key: 'date', label: 'Date', type: 'month', required: true },
  { key: 'location', label: 'Location' },
  { key: 'description', label: 'Description', type: 'textarea' },
];

export default function TimelineAdminPage() {
  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Timeline</h2>
      </div>
      <div className="section-body">
        <CollectionEditor
          collectionName="timeline"
          fields={FIELDS}
          orderByField="date"
          itemLabel={(item) => item.title}
          itemDetail={(item) => `${item.kind} · ${item.date}`}
          emptyMessage="No timeline entries yet."
          revalidatePath="/timeline"
        />
      </div>
    </div>
  );
}
