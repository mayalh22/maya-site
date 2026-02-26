'use client';
import Image from 'next/image';
import projectsData from '@/lib/content/projects.json';
import Section from '@/components/Section';

export default function ProjectsPage() {
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--orange)', 'var(--light-pink)'];

  return (
    <main className="container" style={{ padding: '2rem 1rem' }}>
<h1 style={{ textAlign: 'center', color: 'var(--text-dark)' }}>
  <span style={{ fontSize: '1.5rem', color: 'var(--pink)', animation: 'spin 2s linear infinite', marginRight: '0.5rem' }}>᯽</span>
  Code Projects
  <span style={{ fontSize: '1.5rem', color: 'var(--pink)', animation: 'spin 2s linear infinite', marginLeft: '0.5rem' }}>᯽</span>
</h1>

      <Section title="Projects" subtitle="Code & experiments">
        <section className="code-section" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginRight: '1rem',
            position: 'absolute',
            left: '-2rem',
            top: 0,
            bottom: 0,
          }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--yellow)', animation: 'spin 2s linear infinite' }}>᯽</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--yellow)', animation: 'spin 2.5s linear infinite' }}>᯽</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--yellow)', animation: 'spin 3s linear infinite' }}>᯽</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', width: '100%', maxWidth: '1000px' }}>
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="card"
                style={{
                  backgroundColor: cardColors[index % cardColors.length],
                  padding: '1rem',
                }}
              >
                <h3 style={{ marginBottom: '0.75rem', color: 'var(--text-dark)' }}>
                  {project.title}
                </h3>

                {project.images && project.images.length > 0 && (
                  <div className="project-images" style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <Image
                      src={`/assets/${project.images[0]}`}
                      alt={project.title}
                      width={300}
                      height={160}
                      style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                )}

                <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: 'var(--text-dark)' }}>
                  {project.description}
                </p>

                <div className="project-links" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            marginLeft: '1rem',
            position: 'absolute',
            right: '-2rem',
            top: 0,
            bottom: 0,
          }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--yellow)', animation: 'spin 2.2s linear infinite' }}>᯽</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--yellow)', animation: 'spin 2.8s linear infinite' }}>᯽</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--yellow)', animation: 'spin 3.5s linear infinite' }}>᯽</span>
          </div>

        </section>
      </Section>
    </main>
  );
}