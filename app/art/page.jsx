export const metadata = {
  title: 'Art - Maya Hazarika',
  description: 'See Maya Hazarika’s artwork gallery.',
};

import Header from '@/components/Header';
import artData from '@/lib/content/art.json';

export default function ArtPage() {
  return (
    <>

      <main className="container">
        <h1>Art</h1>

        <section id="art-section" className="gallery">
          {artData.pieces.map((piece, index) => (
            <div key={index} className="card">
              <img src={`/assets/${piece.image}`} alt={piece.title} />
              <h3>{piece.title}</h3>
              <p>{piece.description}</p>
            </div>
          ))}
        </section>
      </main>

    </>
  );
}
