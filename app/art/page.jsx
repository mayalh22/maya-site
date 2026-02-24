"use client";

import Image from 'next/image';
import artData from '@/lib/content/art.json';

export default function ArtPage() {
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];

  return (
    <main style={{ padding: '1rem' }}>
      <div className="about" style={{ marginBottom: '1rem' }}>
        <h1>Art</h1>
      </div>

      <section className="gallery" style={{ backgroundColor: 'transparent', padding: '0.5rem 0' }}>
        {artData.pieces.map((piece, index) => (
          <div key={index} className="card" style={{ backgroundColor: cardColors[index % cardColors.length], padding: '0.5rem' }}>
            <Image
              src={`/assets/${piece.image}`}
              alt={piece.title}
              width={400}
              height={300}
              style={{ borderRadius: '0px', display: 'block' }}
              loading="lazy"
            />
            <h4 style={{ margin: '0.4rem 0', fontSize: '0.9rem', color: 'var(--text-dark)', fontWeight: 'normal', textAlign: 'left' }}>{piece.title}</h4>
            <p style={{ margin: '0', fontSize: '0.8rem', color: 'var(--text-dark)', textAlign: 'left' }}>{piece.date}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
