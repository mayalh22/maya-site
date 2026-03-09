import Image from 'next/image';
import artData from '@/lib/content/art.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';
import EnlargeArt from './enlarge';

export default function ArtPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Art</h1>
        <p>{artData.intro}</p>
      </div>

      <Section title="Gallery">
<EnlargeArt pieces={artData.pieces} />      </Section>
    </main>
  );
}