export const metadata = {
  title: 'Timeline - Maya Hazarika',
  description: 'Maya Hazarika\'s event history.',
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

      {/* Combined timeline: show all events together, not separated by year */}
      <Section title="Timeline">
        {timelineData.sections.flatMap(s => s.events).map((event, idx) => (
          <div key={idx} className="timeline-item" style={{ backgroundColor: 'transparent' }}>
            <div className="timeline-date">{event.date}</div>
            <h3>
              {event.role} {event.organization ? `at ${event.organization}` : ''}
            </h3>
            {event.location && <p><em>{event.location}</em></p>}
            <p>{event.description}</p>
          </div>
        ))}
      </Section>

      <Section title={timelineData.volunteering.title}>
        <div className="card-grid">
          {timelineData.volunteering.roles.map((role, index) => {
            const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];
            return (
              <div key={index} className="card" style={{ backgroundColor: cardColors[index % cardColors.length] }}>
                <h3>{role.role}</h3>
                <p><strong>{role.organization}</strong></p>
                {role.category && <span className="tag">{role.category}</span>}
                <p><small>{role.date}</small></p>
                <p>{role.description}</p>
              </div>
            );
          })}
        </div>
      </Section>
    </main>
  );
}
