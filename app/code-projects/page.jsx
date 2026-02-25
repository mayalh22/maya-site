'use client';
import Image from 'next/image';
import projectsData from '@/lib/content/projects.json';
import Section from '@/components/Section';

export default function ProjectsPage() {
  // Define a set of colors for alternating cards
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--orange)', 'var(--light-yellow)'];

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
      <h1
        style={{
          marginBottom: '1.5rem',
          textAlign: 'center',
          color: 'var(--text-dark)',
        }}
      >
        Code Projects
      </h1>

      <Section title="Projects" subtitle="Code & experiments">
        <section className="code-section">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '1rem' }}>
              <span style={{ fontSize: '1.5rem', color: 'var(--olive)', animation: 'spin 2s linear infinite' }}>✦</span>
              <span style={{ fontSize: '1.5rem', color: 'var(--olive)', animation: 'spin 2s linear infinite' }}>✦</span>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                width: '100%',
              }}
            >
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="card"
                style={{
                  backgroundColor:
                    cardColors[index % cardColors.length],
                  padding: '1rem',
                }}
              >
                <h3
                  style={{
                    marginBottom: '0.75rem',
                    color: 'var(--text-dark)',
                  }}
                >
                  {project.title}
                </h3>

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
                      width={300}
                      height={160}
                      style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                      loading="lazy"
                    />
                  </div>
                )}

                <p
                  style={{
                    fontSize: '0.9rem',
                    marginBottom: '0.75rem',
                    color: 'var(--text-dark)',
                  }}
                >
                  {project.description}
                </p>

                <div
                  className="project-links"
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}
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
                        transition: 'background-color 0.2s',
                      }}
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
                        transition: 'background-color 0.2s',
                      }}
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </Section>
    </main>
  );
}