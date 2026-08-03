'use client';

import CollectionEditor from '@/components/admin/CollectionEditor';

const FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'repoUrl', label: 'Repository URL', type: 'url' },
  { key: 'liveUrl', label: 'Live URL', type: 'url' },
];

export default function ProjectsAdminPage() {
  return (
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
        />
      </div>
    </div>
  );
}
