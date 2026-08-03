'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';
import SectionMessageForm from '@/components/admin/SectionMessageForm';
import { SHAPE_FIELD } from '@/lib/shape';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'repoUrl', label: 'Repository URL', type: 'link' },
  { key: 'liveUrl', label: 'Live URL', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function ProjectsAdminPage() {
  return (
    <>
      <SectionMessageForm path="siteContent/projects" revalidateTarget="/projects" title="Projects intro" />
      <div className="section-wrapper">
        <div className="section-header">
          <h2>Projects</h2>
        </div>
        <div className="section-body">
          <CollectionEditor
            collectionName="projects"
            fields={FIELDS}
            itemLabel={(item) => item.title}
            emptyMessage="No projects yet."
            revalidatePath="/projects"
            reorderable
          />
        </div>
      </div>
    </>
  );
}
