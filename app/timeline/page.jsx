export const metadata = {
  title: 'Timeline',
  description: 'My event history.',
};

import timelineData from '@/lib/content/timeline.json';
import Section from '@/components/Section';

export default function TimelinePage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Timeline</h1>
        <p>{timelineData.intro}</p>
      </div>

      <Section title="Timeline">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '1rem' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--olive)', animation: 'spin 2s linear infinite' }}>᯽</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--olive)', animation: 'spin 2s linear infinite' }}>᯽</span>
          </div>
          <div style={{ flex: 1 }}>
            {timelineData.sections.flatMap(s => s.events).map((event, idx) => (
              <div key={idx} className="timeline-item" style={{ backgroundColor: 'transparent', marginBottom: '0.5rem' }}>
                <div className="timeline-date" style={{ marginBottom: '0.2rem' }}>{event.date}</div>
                <h3 style={{ fontWeight: 'normal' }}>
                  {event.role} {event.organization ? `at ${event.organization}` : ''}
                </h3>
                {event.location && <p style={{ fontWeight: 'normal' }}><em>{event.location}</em></p>}
                <p style={{ fontWeight: 'normal', marginBottom: '0.2rem' }}>{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title={timelineData.volunteering.title}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '1rem' }}>
            <span style={{ fontSize: '1.5rem', color: 'var(--olive)', animation: 'spin 2s linear infinite' }}>᯽</span>
            <span style={{ fontSize: '1.5rem', color: 'var(--olive)', animation: 'spin 2s linear infinite' }}>᯽</span>
          </div>
          <div style={{ flex: 1 }}>
            <div className="card-grid">
              {timelineData.volunteering.roles.map((role, index) => {
                const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--orange)', 'var(--light-yellow)'];
                return (
                  <div key={index} className="card" style={{ backgroundColor: cardColors[index % cardColors.length] }}>
                    <h3 style={{ fontWeight: 'normal' }}>{role.role}</h3>
                    <p style={{ fontWeight: 'normal' }}>{role.organization}</p>
                    {role.category && <span className="tag">{role.category}</span>}
                    <p style={{ fontWeight: 'normal' }}><small>{role.date}</small></p>
                    <p style={{ fontWeight: 'normal' }}>{role.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
