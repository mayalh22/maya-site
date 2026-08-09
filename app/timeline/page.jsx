import { getSingleton, listCollection } from '@/lib/db';
import EditableText from '@/components/editing/EditableText';
import OptionalSection from '@/components/editing/OptionalSection';
import TimelineSections from './TimelineSections';

export const metadata = {
  title: 'Timeline',
  description: 'Experience, volunteering, and honors.',
};

export const revalidate = 300;

const CONTENT_PATH = 'siteContent/timeline';

export default async function TimelinePage() {
  const [entries, content, layout] = await Promise.all([
    listCollection('timeline'),
    getSingleton(CONTENT_PATH, null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Timeline</h1>
        <EditableText
          value={content?.message}
          align={content?.messageAlign}
          fieldKey="message"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/timeline"
          placeholder="Add an intro message…"
        />
      </div>

      <TimelineSections entries={entries} layout={layout} />

      <OptionalSection className="about" value={content?.closingMessage}>
        <EditableText
          value={content?.closingMessage}
          align={content?.closingMessageAlign}
          fieldKey="closingMessage"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/timeline"
          placeholder="Add a closing message…"
        />
      </OptionalSection>
    </main>
  );
}
