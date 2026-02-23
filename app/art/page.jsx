"use client";

import Image from 'next/image';
import artData from '@/lib/content/art.json';

export default function ArtPage() {
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];

  return (
    <main style={{ padding: '1rem' }}>
      <div className="about" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1>Art</h1>
      </div>

      <section
        style={{
          backgroundColor: 'var(--mint)',
          padding: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ fontSize: '1.1rem', fontFamily: 'Georgia, serif', fontWeight: 'normal', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
          Some of my art!
        </div>

        <div
          style={{
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            marginTop: '0.5rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              animation: 'none',
            }}
          >
            {artData.pieces.map((piece, index) => (
              <div
                key={index}
                style={{
                  minWidth: '130px',
                  backgroundColor: cardColors[index % cardColors.length],
                  padding: '0.5rem',
                  textAlign: 'center',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--yellow)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = cardColors[index % cardColors.length])}
              >
                <Image
                  src={`/assets/${piece.image}`}
                  alt={piece.title}
                  width={100}
                  height={100}
                  style={{ borderRadius: '0px', display: 'block', marginBottom: '0.4rem', width: '100%', height: 'auto' }}
                  loading="lazy"
                />
                <h4 style={{ margin: '0.2rem 0', fontSize: '0.75rem', color: 'var(--text-dark)', fontWeight: 'normal' }}>{piece.title}</h4>
                <p style={{ margin: '0.2rem 0', fontSize: '0.65rem', color: 'var(--text-dark)' }}>{piece.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
