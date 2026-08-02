import Image from 'next/image';
import projectsFallback from '@/lib/content/projects.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';
import { resolveAssetSrc } from '@/lib/images';
import { getContentDoc } from '@/lib/firestore';

export const metadata = {
  title: 'Code Projects',
  description: 'Code & experiments.',
};

export const revalidate = 300;

export default async function ProjectsPage() {
  const { items: projectsData } = await getContentDoc('content/projects', { items: projectsFallback });

  return (
    <main className="container">
      <div className="about">
        <h1>Code Projects</h1>
      </div>

      <Section title="Projects" subtitle="Code & experiments">
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={project.title} className={getCardClass(index)} style={{ backgroundColor: getCardColor(index) }}>
              <h3 className="card-title">{project.title}</h3>

              {project.images?.length > 0 && (
                <Image
                  src={resolveAssetSrc(project.images[0])}
                  alt={project.title}
                  width={300}
                  height={160}
                  className="card-img"
                  loading="lazy"
                />
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
        </div>
      </Section>
    </main>
  );
}
