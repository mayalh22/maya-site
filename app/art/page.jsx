import Section from '@/components/Section';
import EnlargeArt from './enlarge';
import { getSingleton, listOrdered } from '@/lib/db';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';

export const metadata = {
  title: 'Art',
  description: 'A gallery of art.',
};

export const revalidate = 300;

export default async function ArtPage() {
  const [pieces, content, layout] = await Promise.all([
    listOrdered('art'),
    getSingleton('siteContent/art', null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Art</h1>
        {content?.message && <p>{content.message}</p>}
      </div>

      <Section title="Gallery">
        {pieces.length === 0 ? (
          <p className="empty-state">No art yet.</p>
        ) : (
          <GridLayoutEditor
            sectionKey="art"
            defaultGap={16}
            defaultItemWidth={240}
            initial={layout?.art}
            revalidateTarget="/art"
          >
            <EnlargeArt pieces={pieces} />
          </GridLayoutEditor>
        )}
      </Section>

      {content?.closingMessage && (
        <div className="about">
          <p>{content.closingMessage}</p>
        </div>
      )}
    </main>
  );
}
