"use client";
import Grid from '../../components/Grid';
import Image from 'next/image';
import artData from '@/lib/content/art.json';

export default function ArtPage() {
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--orange)', 'var(--light-pink)'];

  return (
    <main style={{ padding: '1rem' }}>
      <div className="about" style={{ marginBottom: '1rem' }}>
        <h1>Art</h1>
      </div>

      <section className="art-section section-dark-green">
        <Grid columns={4} rowHeight="auto">
          {artData.pieces.map((piece, index) => (
            <div
              key={index}
              className="card"
              style={{
                backgroundColor: cardColors[index % cardColors.length],
                padding: '0.5rem',
              }}
            >
              <Image
                src={`/assets/${piece.image}`}
                alt={piece.title}
                width={400}
                height={160}
                style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <h4
                style={{
                  margin: '0.4rem 0',
                  fontSize: '0.9rem',
                  color: 'var(--text-dark)',
                  fontWeight: 'normal',
                  textAlign: 'left',
                }}
              >
                {piece.title}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.8rem',
                  color: 'var(--text-dark)',
                  textAlign: 'left',
                }}
              >
                {piece.date}
              </p>
            </div>
          ))}
        </Grid>
      </section>
    </main>
  );
}