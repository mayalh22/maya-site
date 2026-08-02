import timelineFallback from '@/lib/content/timeline.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';
import { getContentDoc } from '@/lib/firestore';
import { TIMELINE_DOC_PATH } from '@/lib/timeline';

export const metadata = {
  title: 'Timeline',
  description: 'My event history.',
};

export const revalidate = 300;

export default async function TimelinePage() {
  const timelineData = await getContentDoc(TIMELINE_DOC_PATH, timelineFallback);
  const honors = timelineData.honors;

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
            <div key={role.organization} className={getCardClass(index)} style={{ backgroundColor: getCardColor(index) }}>
              <h3>{role.role}</h3>
              <p>{role.organization}</p>
              {role.category && <span className="tag">{role.category}</span>}
              <p><small>{role.date}</small></p>
              <p>{role.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {honors && honors.awards?.length > 0 && (
        <Section title={honors.title}>
          <div className="card-grid">
            {honors.awards.map((award, index) => (
              <div key={award.title} className={getCardClass(index)} style={{ backgroundColor: getCardColor(index) }}>
                <h3>{award.title}</h3>
                <p>{award.issuer}</p>
                <p><small>{award.date}</small></p>
                <p>{award.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </main>
  );
}
