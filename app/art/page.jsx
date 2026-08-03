import Section from '@/components/Section';
import EnlargeArt from './enlarge';
import { listCollection } from '@/lib/db';

export const metadata = {
  title: 'Art',
  description: 'A gallery of art.',
};

export const revalidate = 300;

export default async function ArtPage() {
  const pieces = await listCollection('art');

  return (
    <main className="container">
      <div className="about">
        <h1>Art</h1>
      </div>

      <Section title="Gallery">
        {pieces.length === 0 ? (
          <p className="empty-state">No art yet.</p>
        ) : (
          <EnlargeArt pieces={pieces} />
        )}
      </Section>
    </main>
  );
}
