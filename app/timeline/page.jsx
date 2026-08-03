import { Fragment } from 'react';
import Section from '@/components/Section';
import AttachmentList from '@/components/AttachmentList';
import { getSingleton, listCollection } from '@/lib/db';
import { shapeClassName } from '@/lib/shape';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';

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

function sortKey(entry) {
  return entry.startDate || entry.date || '';
}

// Blank endDate means "ongoing" only for entries created with the new
// startDate/endDate schema; legacy single-date entries don't fabricate one.
function formatRange(entry) {
  const start = entry.startDate || entry.date;
  if (!start) return '';
  if (entry.endDate) return `${start} – ${entry.endDate}`;
  if (entry.startDate) return `${start} – Present`;
  return start;
}

export default async function TimelinePage() {
  const [entries, content, layout] = await Promise.all([
    listCollection('timeline'),
    getSingleton('siteContent/timeline', null),
    getSingleton('settings/layout', {}),
  ]);
  const sorted = [...entries].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));

  return (
    <main className="container">
      <div className="about">
        <h1>Timeline</h1>
        {content?.message && <p>{content.message}</p>}
      </div>

      {SECTIONS.map(({ kind, title }) => {
        const items = sorted.filter((entry) => entry.kind === kind);
        return (
          <Section key={kind} title={title}>
            {items.length === 0 ? (
              <p className="empty-state">No entries yet.</p>
            ) : kind === 'experience' ? (
              <GridLayoutEditor
                sectionKey={`timeline-${kind}`}
                defaultGap={24}
                defaultItemWidth={260}
                initial={layout?.[`timeline-${kind}`]}
                revalidateTarget="/timeline"
              >
                <div className="timeline-track">
                  {items.map((event, index) => (
                    <Fragment key={event.id}>
                      <div className="timeline-item">
                        <p className="timeline-date">{formatRange(event)}</p>
                        <h3>{event.title}{event.organization ? ` at ${event.organization}` : ''}</h3>
                        {event.location && <p><em>{event.location}</em></p>}
                        {event.description && <p>{event.description}</p>}
                        {event.siteUrl && (
                          <a href={event.siteUrl} className="btn btn-small" target="_blank" rel="noopener noreferrer">
                            Visit site
                          </a>
                        )}
                        <AttachmentList attachments={event.attachments} />
                      </div>
                      {index < items.length - 1 && (
                        <span className="timeline-arrow" aria-hidden="true">→</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </GridLayoutEditor>
            ) : (
              <GridLayoutEditor
                sectionKey={`timeline-${kind}`}
                defaultGap={16}
                defaultItemWidth={240}
                initial={layout?.[`timeline-${kind}`]}
                revalidateTarget="/timeline"
              >
                <div className="card-grid">
                  {items.map((item, index) => (
                    <div key={item.id} className={`card ${shapeClassName(item.shape, index)}`.trim()}>
                      <h3>{item.title}</h3>
                      {item.organization && <p>{item.organization}</p>}
                      <p className="card-date">{formatRange(item)}</p>
                      {item.description && <p>{item.description}</p>}
                      {item.siteUrl && (
                        <a href={item.siteUrl} className="btn btn-small" target="_blank" rel="noopener noreferrer">
                          Visit site
                        </a>
                      )}
                      <AttachmentList attachments={item.attachments} />
                    </div>
                  ))}
                </div>
              </GridLayoutEditor>
            )}
          </Section>
        );
      })}

      {content?.closingMessage && (
        <div className="about">
          <p>{content.closingMessage}</p>
        </div>
      )}
    </main>
  );
}
