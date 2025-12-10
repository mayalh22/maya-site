export const metadata = {
  title: 'Code Projects - Maya Hazarika',
  description: 'Maya Hazarika\'s coding projects and portfolio.',
};

import projectsData from '@/lib/content/projects.json';

export default function ProjectsPage() {
  return (
    <main className="container">
      <h1>Code Projects</h1>
      <section id="projects-section" className="card-grid">
        {projectsData.map((project, index) => (
          <div key={index} className="card">
            <h3>{project.title}</h3>
            {project.images && project.images.length > 0 && (
              <div className="project-images">
                <Image src={`/assets/${project.images[0]}`} alt={project.title} />
              </div>
            )}
            <p>{project.description}</p>
            <div className="project-links">
              {project.repository && (
                <a href={project.repository} className="btn" target="_blank" rel="noopener noreferrer">
                  Repository
                </a>
              )}
              {project.playable && (
                <a href={project.playable} className="btn" target="_blank" rel="noopener noreferrer">
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
