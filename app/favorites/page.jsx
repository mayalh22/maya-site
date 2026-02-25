'use client';
import { useState } from "react";
import favoritesData from '@/lib/content/favorites.json';
import Grid from '../../components/Grid';

export default function FavoritesPage() {

  const grouped = favoritesData.top.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const sectionColors = {
    movie: 'var(--orange)',
    show: 'var(--teal)',
    book: 'var(--mint)',
    album: 'var(--pink)',
  };

  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--orange)', 'var(--light-yellow)'];

  return (
    <main style={{ padding: '1rem', fontFamily: 'Inter, sans-serif'}}>
      <div className="about" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1>My Favorites</h1>
        <p>{favoritesData.intro}</p>
      </div>

      <div className="starline" style={{ textAlign: 'center', fontSize: '1.5rem', margin: '1rem 0' }}>᯽</div>

      {Object.entries(grouped).map(([type, items]) => (
        <section
          key={type}
          style={{
            backgroundColor: 'var(--primary)',
            padding: '1rem',
            borderRadius: '0px',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--yellow)',
              color: 'var(--dark-blue)',
              padding: '0.5rem 1rem',
              display: 'inline-block',
              fontSize: '0.95rem',
              fontWeight: 'normal',
              marginBottom: '0.75rem',
              border: '2px solid rgba(0,0,0,0.06)',
              letterSpacing: '0.3px',
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)',gap: '1rem', marginTop: '0.75rem' }}>
            {items.map((item, index) => (
              <div key={index} style={{ backgroundColor: cardColors[index % cardColors.length], padding: '0.5rem', textAlign: 'left', fontWeight: 'normal' }}>
                <span style={{ fontSize: '0.95rem', color: 'var(--primary)' }}>{index + 1}. </span>{item.title}
<img
  src={item.image}
  alt={item.title}
  style={{
    width: '100%',
    aspectRatio: '5 / 6',
    objectFit: 'cover',
    borderRadius: '6px',
    display: 'block',
    marginBottom: '0.5rem'
  }}
/>
                <h4 style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--text-dark)' }}>{item.title}</h4>
                <p style={{ margin: '0.25rem 0', fontSize: '0.75rem', color: 'var(--text-dark)' }}>{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

    </main>
  );
}