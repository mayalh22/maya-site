import Image from 'next/image';
import artData from '@/lib/content/art.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';

export default function ArtPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Art</h1>
        <p>{artData.intro}</p>
      </div>

      <Section title="Gallery">
        <div className="card-grid">
          {artData.pieces.map((piece, index) => (
<div className={getCardClass(index)} style={{ backgroundColor: getCardColor(index) }}>
              <Image
                src={`/assets/${piece.image}`}
                alt={piece.title}
                width={400}
                height={160}
                className="card-img"
                loading="lazy"
              />
              <h4 className="card-title">{piece.title}</h4>
              <p className="card-date">{piece.date}</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}