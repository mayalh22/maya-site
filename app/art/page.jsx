import Section from '@/components/Section';
import EnlargeArt from './enlarge';
import { getSingleton, listOrdered } from '@/lib/db';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';
import EditableText from '@/components/editing/EditableText';
import OptionalSection from '@/components/editing/OptionalSection';

export const metadata = {
  title: 'Art',
  description: 'A gallery of art.',
};

export const revalidate = 300;

const CONTENT_PATH = 'siteContent/art';

export default async function ArtPage() {
  const [pieces, content, layout] = await Promise.all([
    listOrdered('art'),
    getSingleton(CONTENT_PATH, null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Art</h1>
        <EditableText
          value={content?.message}
          font={content?.messageFont}
          fieldKey="message"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/art"
          placeholder="Add an intro message…"
        />
      </div>

      <Section title="Gallery">
        <GridLayoutEditor
          sectionKey="art"
          defaultGap={16}
          defaultItemWidth={240}
          initial={layout?.art}
          revalidateTarget="/art"
        >
          <EnlargeArt pieces={pieces} />
        </GridLayoutEditor>
      </Section>

      <OptionalSection className="about" value={content?.closingMessage}>
        <EditableText
          value={content?.closingMessage}
          font={content?.closingMessageFont}
          fieldKey="closingMessage"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/art"
          placeholder="Add a closing message…"
        />
      </OptionalSection>
    </main>
  );
}
