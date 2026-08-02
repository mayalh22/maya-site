import artFallback from '@/lib/content/art.json';
import Section from '@/components/Section';
import EnlargeArt from './enlarge';
import { getContentDoc } from '@/lib/firestore';

export const metadata = {
  title: 'Art',
  description: 'A gallery of my art projects.',
};

export const revalidate = 300;

export default async function ArtPage() {
  const artData = await getContentDoc('content/art', artFallback);

  return (
    <main className="container">
      <div className="about">
        <h1>Art</h1>
        <p>{artData.intro}</p>
      </div>

      <Section title="Gallery">
        <EnlargeArt pieces={artData.pieces} />
      </Section>
    </main>
  );
}
