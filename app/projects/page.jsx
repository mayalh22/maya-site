import Section from '@/components/Section';
import { listCollection } from '@/lib/db';

export const metadata = {
  title: 'Projects',
  description: 'Code and design projects.',
};

export const revalidate = 300;

export default async function ProjectsPage() {
  const projects = await listCollection('projects');

  return (
    <main className="container">
      <div className="about">
        <h1>Projects</h1>
      </div>

      <Section title="Projects">
        {projects.length === 0 ? (
          <p className="empty-state">No projects yet.</p>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <div key={project.id} className="card">
                {project.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={project.imageUrl} alt={project.title} className="card-img" loading="lazy" />
                )}
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
              </div>
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
