"use client";

import Image from 'next/image';
import photosData from '@/lib/content/photos.json';

export default function PhotosPage() {
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--orange)', 'var(--light-yellow)'];
  const sectionColors = ['var(--pink)', 'var(--orange)', 'var(--yellow)', 'var(--light-yellow)'];

  return (
    <main style={{ padding: '1rem' }}>
      <div className="about">
        <h1>Photos</h1>
        <p>{photosData.intro}</p>
      </div>

      {photosData.categories.map((category, index) => (
        <section
          key={index}
          style={{
            backgroundColor: sectionColors[index % sectionColors.length],
            padding: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ fontSize: '1.1rem', fontFamily: 'Inter, sans-serif', fontWeight: 'normal', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>
            {category.category}
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '0.5rem',
            }}
          >
            {category.photos.map((photo, idx) => {
              let bgColor = cardColors[idx % cardColors.length];
              // Flowers: 2,6,10,14,18 not pink, make white
              if (category.category.toLowerCase() === 'flowers' && [1,5,9,13,17].includes(idx)) bgColor = '#fff';
              // Food: 3,7,11,15,19 not orange, make white
              if (category.category.toLowerCase() === 'food' && [2,6,10,14,18].includes(idx)) bgColor = '#fff';
              return (
                <div
                  key={idx}
                  style={{
                    width: '180px',
                    backgroundColor: bgColor,
                    padding: '0.5rem',
                    textAlign: 'left',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--mint)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = bgColor}
                >
                <Image
                  src={`/assets/${photo.image}`}
                  alt={photo.caption}
                  width={200}
                  height={150}
                  style={{ width: '100%', height: '130px', objectFit: 'cover', display: 'block', marginBottom: '0.4rem' }}
                  loading="lazy"
                />
                <p style={{ margin: '0.2rem 0', fontSize: '0.65rem', color: 'var(--text-dark)' }}>{photo.caption}</p>
                <p style={{ margin: '0.2rem 0', fontSize: '0.6rem', color: 'var(--text-dark)' }}>{photo.date}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}