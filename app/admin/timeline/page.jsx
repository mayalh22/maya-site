'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';
import SectionMessageForm from '@/components/admin/SectionMessageForm';
import { SHAPE_FIELD } from '@/lib/shape';

const FIELDS = [
  {
    key: 'kind',
    label: 'Kind',
    type: 'select',
    required: true,
    options: [
      { value: 'experience', label: 'Experience' },
      { value: 'volunteering', label: 'Volunteering' },
      { value: 'honor', label: 'Honor' },
    ],
  },
  { key: 'title', label: 'Title', required: true },
  { key: 'organization', label: 'Organization' },
  { key: 'startDate', label: 'Date started', type: 'month', required: true },
  { key: 'endDate', label: 'Date ended', type: 'month' },
  { key: 'location', label: 'Location' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'siteUrl', label: 'Site', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

function capitalize(value) {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : value;
}

export default function TimelineAdminPage() {
  return (
    <>
      <SectionMessageForm path="siteContent/timeline" revalidateTarget="/timeline" title="Timeline intro" />
      <div className="section-wrapper">
        <div className="section-header">
          <h2>Timeline</h2>
        </div>
        <div className="section-body">
          <p className="admin-status">
            Entries are ordered automatically by date started: leave "Date ended" blank for an ongoing entry.
          </p>
          <CollectionEditor
            collectionName="timeline"
            fields={FIELDS}
            orderByField="startDate"
            itemLabel={(item) => item.title}
            itemDetail={(item) => `${capitalize(item.kind)} · ${item.startDate || item.date || ''}`}
            emptyMessage="No timeline entries yet."
            revalidatePath="/timeline"
          />
        </div>
      </div>
    </>
  );
}
