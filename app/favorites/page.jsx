'use client';
import { useState } from "react";
import favoritesData from '@/lib/content/favorites.json';

export default function FavoritesPage() {
  const [openSections, setOpenSections] = useState({
    movie: true,
    show: true,
    book: true,
    album: true,
  });

  const toggleSection = (type) => {
    setOpenSections(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const grouped = favoritesData.top.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // Define colors for sections
  const sectionColors = {
    movie: 'var(--orange)',
    show: 'var(--teal)',
    book: 'var(--mint)',
    album: 'var(--olive)',
  };

  // Define colors for cards (cycling through)
  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];

  return (
    <main className="container">
      <div className="about">
        <h1>My Favorites</h1>
        <p>{favoritesData.intro}</p>
      </div>

      <div className="starline">✦</div>

      {Object.entries(grouped).map(([type, items]) => (
        <section
          key={type}
          className="section"
          style={{ backgroundColor: sectionColors[type], padding: '1rem', borderRadius: '12px', marginBottom: '2rem' }}
        >
          <h2
            className="section-title"
            style={{ cursor: "pointer", color: 'var(--text-light)' }}
            onClick={() => toggleSection(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} ({items.length}){" "}
            {openSections[type] ? "▼" : "►"}
          </h2>

          {openSections[type] && (
            <div className="grid-cards" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              {items.map((item, index) => (
                <div
                  key={index}
                  className="card-mini"
                  style={{
                    backgroundColor: cardColors[index % cardColors.length],
                    padding: '0.5rem',
                    borderRadius: '8px',
                    width: '150px',
                    textAlign: 'center',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                >
                  <img src={item.image} alt={item.title} width="150" style={{ borderRadius: '6px' }} />
                  <h4 style={{ margin: '0.5rem 0 0 0', color: 'var(--text-dark)' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.8rem', margin: '0.25rem 0' }}>{item.subtitle}</p>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{item.type}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </main>
  );
}