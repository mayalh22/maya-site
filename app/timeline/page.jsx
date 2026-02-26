import timelineData from '@/lib/content/timeline.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';

export const metadata = {
  title: 'Timeline',
  description: 'My event history.',
};

export default function TimelinePage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Timeline</h1>
        <p>{timelineData.intro}</p>
      </div>

      <Section title="Timeline">
        {timelineData.sections.flatMap(s => s.events).map((event, idx) => (
          <div key={idx} className="timeline-item">
            <p className="timeline-date">{event.date}</p>
            <h3>{event.role}{event.organization ? ` at ${event.organization}` : ''}</h3>
            {event.location && <p><em>{event.location}</em></p>}
            <p>{event.description}</p>
          </div>
        ))}
      </Section>

      <Section title={timelineData.volunteering.title}>
        <div className="card-grid">
          {timelineData.volunteering.roles.map((role, index) => (
<div className={getCardClass(index)} style={{ backgroundColor: getCardColor(index) }}>
              <h3>{role.role}</h3>
              <p>{role.organization}</p>
              {role.category && <span className="tag">{role.category}</span>}
              <p><small>{role.date}</small></p>
              <p>{role.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}