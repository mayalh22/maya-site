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

  const sectionColors = {
    movie: 'var(--orange)',
    show: 'var(--teal)',
    book: 'var(--mint)',
    album: 'var(--olive)',
  };

  const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];

  return (
    <main style={{ padding: '1rem', fontFamily: 'sans-serif', backgroundColor: 'var(--bg-light)' }}>
      <div className="about" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1>My Favorites</h1>
        <p>{favoritesData.intro}</p>
      </div>

      <div className="starline" style={{ textAlign: 'center', fontSize: '1.5rem', margin: '1rem 0' }}>✦</div>

      {Object.entries(grouped).map(([type, items]) => (
        <section
          key={type}
          style={{
            backgroundColor: sectionColors[type], // full section background
            padding: '1rem',
            borderRadius: '12px',
            marginBottom: '2rem',
          }}
        >
          {/* Section header */}
          <div
            onClick={() => toggleSection(type)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)', // subtle overlay so header text pops
              color: 'var(--text-light)',
              padding: '0.25rem 0.75rem',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'inline-block',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              marginBottom: '0.75rem',
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} ({items.length}) {openSections[type] ? "▼" : "►"}
          </div>

          {openSections[type] && (
            <div
              style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                marginTop: '0.5rem',
              }}
            >
              {/* Carousel track */}
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  animation: 'scroll 20s linear infinite',
                }}
              >
                {[...items, ...items].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      minWidth: '150px',
                      backgroundColor: cardColors[index % cardColors.length],
                      borderRadius: '8px',
                      padding: '0.5rem',
                      textAlign: 'center',
                      flexShrink: 0,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      width="150"
                      style={{ borderRadius: '6px', display: 'block', marginBottom: '0.5rem' }}
                    />
                    <h4 style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--text-dark)' }}>{item.title}</h4>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.7rem' }}>{item.subtitle}</p>
                    <span style={{ fontSize: '0.7rem', fontWeight: 'bold', color: 'var(--text-dark)' }}>{item.type}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      ))}

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </main>
  );
}