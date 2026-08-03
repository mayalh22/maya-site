import Section from '@/components/Section';
import { getSingleton, listOrdered } from '@/lib/db';
import { shapeClassName } from '@/lib/shape';
import AttachmentList from '@/components/AttachmentList';
import CroppedImage from '@/components/CroppedImage';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';

export const metadata = {
  title: 'Projects',
  description: 'Code and design projects.',
};

export const revalidate = 300;

export default async function ProjectsPage() {
  const [projects, content, layout] = await Promise.all([
    listOrdered('projects'),
    getSingleton('siteContent/projects', null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Projects</h1>
        {content?.message && <p>{content.message}</p>}
      </div>

      <Section title="Projects">
        {projects.length === 0 ? (
          <p className="empty-state">No projects yet.</p>
        ) : (
          <GridLayoutEditor
            sectionKey="projects"
            defaultGap={16}
            defaultItemWidth={300}
            initial={layout?.projects}
            revalidateTarget="/projects"
          >
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={project.id} className={`card ${shapeClassName(project.shape, index)}`.trim()}>
                <CroppedImage
                  src={project.imageUrl}
                  alt={project.title}
                  className="card-img"
                  zoom={project.imageUrlZoom}
                  posX={project.imageUrlPosX}
                  posY={project.imageUrlPosY}
                />
                <h3 className="card-title">{project.title}</h3>
                {project.description && <p>{project.description}</p>}
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
              </div>
            ))}
          </div>
          </GridLayoutEditor>
        )}
      </Section>

      {content?.closingMessage && (
        <div className="about">
          <p>{content.closingMessage}</p>
        </div>
      )}
    </main>
  );
}
