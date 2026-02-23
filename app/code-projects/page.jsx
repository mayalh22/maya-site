'use client';
import Image from 'next/image';
import projectsData from '@/lib/content/projects.json';
import Section from '@/components/Section';

export const metadata = {
  title: 'Code Projects',
  description: "My coding projects and portfolio.",
};

export default function ProjectsPage() {
  // Define a set of colors for alternating cards
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <h1 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--text-dark)' }}>Code Projects</h1>

      <Section title="Projects" subtitle="Code & experiments" colorVar="var(--teal)">
        <section
          id="projects-section"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            justifyContent: 'center',
          }}
        >
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="card"
            style={{
              backgroundColor: cardColors[index % cardColors.length],
              borderRadius: '12px',
              padding: '1rem',
              width: '300px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
            }}
          >
            <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-dark)' }}>{project.title}</h3>

            {project.images && project.images.length > 0 && (
              <div
                className="project-images"
                style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                }}
              >
                <Image
                  src={`/assets/${project.images[0]}`}
                  alt={project.title}
                  width={400}
                  height={250}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
            )}

            <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-dark)' }}>
              {project.description}
            </p>

            <div
              className="project-links"
              style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {project.repository && (
                <a
                  href={project.repository}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--text-light)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--secondary)')}
                >
                  Repository
                </a>
              )}
              {project.playable && (
                <a
                  href={project.playable}
                  className="btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--text-light)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
        </section>
      </Section>
    </main>
  );
}