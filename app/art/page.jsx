import Image from 'next/image';
import artData from '@/lib/content/art.json';

export const metadata = {
  title: 'Art - Maya Hazarika',
  description: "See Maya Hazarika's artwork gallery.",
};

export default function ArtPage() {
  return (
    <main className="container">
      <h1>Art</h1>
      <section id="art-section" className="gallery">
        {artData.pieces.map((piece, index) => (
          <div key={index} className="card">
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
    </main>
  );
}
