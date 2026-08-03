import Section from '@/components/Section';
import { listCollection } from '@/lib/db';

export const metadata = {
  title: 'Timeline',
  description: 'Experience, volunteering, and honors.',
};

export const revalidate = 300;

const SECTIONS = [
  { kind: 'experience', title: 'Experience' },
  { kind: 'volunteering', title: 'Volunteering' },
  { kind: 'honor', title: 'Honors' },
];

export default async function TimelinePage() {
  const entries = await listCollection('timeline', { orderByField: 'date', direction: 'desc' });

  return (
    <main className="container">
      <div className="about">
        <h1>Timeline</h1>
      </div>

      {SECTIONS.map(({ kind, title }) => {
        const items = entries.filter((entry) => entry.kind === kind);
        return (
          <Section key={kind} title={title}>
            {items.length === 0 ? (
              <p className="empty-state">No entries yet.</p>
            ) : kind === 'experience' ? (
              <div className="timeline-track">
                {items.map((event) => (
                  <div key={event.id} className="timeline-item">
                    <p className="timeline-date">{event.date}</p>
                    <h3>{event.title}{event.organization ? ` at ${event.organization}` : ''}</h3>
                    {event.location && <p><em>{event.location}</em></p>}
                    {event.description && <p>{event.description}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="card-grid">
                {items.map((item) => (
                  <div key={item.id} className="card">
                    <h3>{item.title}</h3>
                    {item.organization && <p>{item.organization}</p>}
                    <p className="card-date">{item.date}</p>
                    {item.description && <p>{item.description}</p>}
                  </div>
                ))}
              </div>
            )}
          </Section>
        );
      })}
    </main>
  );
}
