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

  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--orange)', 'var(--light-yellow)'];

  return (
    <main style={{ padding: '1rem', fontFamily: 'Inter, sans-serif' }}>
      <div className="about" style={{ textAlign: 'left', marginBottom: '1rem' }}>
        <h4>My Favorites</h4>
        <h4>{favoritesData.intro}</h4>
      </div>

      <div className="starline" style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem 0' }}>᯽</div>

      {Object.entries(grouped).map(([type, items]) => (
        <section
          key={type}
          style={{
            backgroundColor: 'var(--primary)',
            padding: '1rem',
            borderRadius: '0px',
            marginBottom: '3rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h4
              style={{
                backgroundColor: 'var(--pink)',
                color: 'var(--dark-blue)',
                display: 'inline-block',
                padding: '0.5rem 1rem',
                fontSize: '0.9rem',
                fontWeight: 'normal',
                border: '2px solid rgba(0,0,0,0.06)',
                letterSpacing: '0.3px',
                marginBottom: '0.75rem',
              }}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1rem', marginTop: '0.75rem' }}>
            {items.map((item, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: cardColors[index % cardColors.length],
                  padding: '0.5rem',
                  textAlign: 'center',
                  fontWeight: 'normal',
                }}
              >
                <h4 style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{index + 1}.</h4>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    aspectRatio: '5 / 6',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    display: 'block',
                    marginBottom: '0.5rem',
                  }}
                />
                <h4 style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: 'var(--text-dark)' }}>{item.title}</h4>
                <h4 style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: 'var(--text-dark)' }}>{item.subtitle}</h4>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}