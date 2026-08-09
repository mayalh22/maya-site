'use client';

import AttachmentList from '@/components/AttachmentList';
import EditableImage from '@/components/editing/EditableImage';
import EditableText from '@/components/editing/EditableText';
import ItemEditPanel from '@/components/editing/ItemEditPanel';
import { useAdminUser } from '@/lib/auth';
import { useOwnerCollection } from '@/lib/useOwnerCollection';
import { shapeClassName, SHAPE_FIELD } from '@/lib/shape';

const CREATE_FIELDS = [
  { key: 'title', label: 'Title', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'imageUrl', label: 'Image URL', type: 'url', required: true },
  { key: 'repoUrl', label: 'Repository URL', type: 'link' },
  { key: 'liveUrl', label: 'Live URL', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

const EXTRA_FIELDS = [
  { key: 'repoUrl', label: 'Repository URL', type: 'link' },
  { key: 'liveUrl', label: 'Live URL', type: 'link' },
  { key: 'attachments', label: 'Attachments', type: 'attachments' },
  SHAPE_FIELD,
];

export default function ProjectsGrid({ projects: initialProjects }) {
  const { isOwner } = useAdminUser();
  const { items, patchItem, createItem, deleteItem } = useOwnerCollection('projects', {
    initialItems: initialProjects,
    reorderable: true,
    revalidateTarget: '/projects',
  });
  const list = items || [];

  if (list.length === 0 && !isOwner) {
    return <p className="empty-state">No projects yet.</p>;
  }

  return (
    <div className="projects-grid">
      {list.map((project, index) => {
        const target = { type: 'item', collection: 'projects', id: project.id };
        return (
          <div key={project.id} className={`card ${shapeClassName(project.shape, index)}`.trim()}>
            <EditableImage
              src={project.imageUrl}
              alt={project.title}
              className="card-img"
              sizes="(max-width: 768px) 45vw, 300px"
              zoomX={project.imageUrlZoomX ?? project.imageUrlZoom}
              zoomY={project.imageUrlZoomY ?? project.imageUrlZoom}
              posX={project.imageUrlPosX}
              posY={project.imageUrlPosY}
              sizeW={project.imageUrlSizeW}
              sizeH={project.imageUrlSizeH}
              cropKeyPrefix="imageUrl"
              target={target}
              revalidateTarget="/projects"
            />
            <EditableText
              as="h3"
              className="card-title"
              value={project.title}
              align={project.titleAlign}
              fieldKey="title"
              target={target}
              revalidateTarget="/projects"
              placeholder="Title"
            />
            <EditableText
              as="p"
              value={project.description}
              align={project.descriptionAlign}
              fieldKey="description"
              multiline
              target={target}
              revalidateTarget="/projects"
              placeholder="Add a description…"
            />
            {(project.repoUrl || project.liveUrl) && (
              <div className="project-links">
                {project.repoUrl && (
                  <a href={project.repoUrl} className="btn" target="_blank" rel="noopener noreferrer">
                    Repository
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} className="btn" target="_blank" rel="noopener noreferrer">
                    View project
                  </a>
                )}
              </div>
            )}
            <AttachmentList attachments={project.attachments} />
            {isOwner && (
              <ItemEditPanel
                fields={EXTRA_FIELDS}
                initial={project}
                collectionName="projects"
                itemId={project.id}
                triggerLabel="✎ More fields"
                triggerClassName="btn-more-fields"
                onSubmit={(form) => patchItem(project.id, form)}
                onDelete={() => deleteItem(project.id)}
              />
            )}
          </div>
        );
      })}
      {isOwner && (
        <div className="card add-item-card">
          <ItemEditPanel
            fields={CREATE_FIELDS}
            initial={{}}
            collectionName="projects"
            triggerLabel="+ Add project"
            triggerClassName="btn"
            submitLabel="Add"
            onSubmit={(form) => createItem(form)}
          />
        </div>
      )}
    </div>
  );
}
