import Image from 'next/image';
import artData from '@/lib/content/art.json';
import Section from '@/components/Section';

export const metadata = {
  title: 'Art - Maya Hazarika',
  description: "See Maya Hazarika's artwork gallery.",
};

export default function ArtPage() {
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];

  return (
    <main className="container">
      <h1>Art</h1>
      <Section title="Gallery" subtitle="Selected pieces" colorVar="var(--mint)">
        <section id="art-section" className="gallery">
          {artData.pieces.map((piece, index) => (
            <div key={index} className="card" style={{ backgroundColor: cardColors[index % cardColors.length], borderRadius: '8px' }}>
              <Image
                src={`/assets/${piece.image}`}
                alt={piece.title}
                width={400}
                height={300}
                loading="lazy"
              />
              <h3>{piece.title}</h3>
              <p>{piece.description}</p>
              <p><small>{piece.date}</small></p>
            </div>
          ))}
        </section>
      </Section>
    </main>
  );
}
