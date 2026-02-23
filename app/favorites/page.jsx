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
  const [hoveredSection, setHoveredSection] = useState(null);

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
    album: 'var(--pink)',
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
            backgroundColor: sectionColors[type],
            padding: '1rem',
            borderRadius: '0px',
            marginBottom: '2rem',
          }}
        >
          <div
            onClick={() => toggleSection(type)}
            style={{
              backgroundColor: 'rgba(0,0,0,0.15)',
              color: 'var(--text-light)',
              padding: '0.5rem 1rem',
              cursor: 'pointer',
              display: 'inline-block',
              fontSize: '0.9rem',
              fontWeight: 'normal',
              marginBottom: '0.75rem',
              border: '2px solid rgba(255,255,255,0.3)',
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.3px',
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}s ({items.length}) {openSections[type] ? "▼" : "►"}
          </div>

          {openSections[type] && (
            <div
              style={{
                overflow: 'hidden',
                position: 'relative',
                width: '100%',
                marginTop: '0.5rem',
              }}
              onMouseEnter={() => setHoveredSection(type)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  animation: hoveredSection === type
                    ? 'scroll 6s linear infinite'
                    : 'none',
                }}
              >
                {[...items, ...items].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      minWidth: '150px',
                      backgroundColor: cardColors[index % cardColors.length],
                      padding: '0.5rem',
                      textAlign: 'center',
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--yellow)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = cardColors[index % cardColors.length])}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      width="150"
                      style={{ borderRadius: '6px', display: 'block', marginBottom: '0.5rem' }}
                    />
                    <h4 style={{ margin: '0.25rem 0', fontSize: '0.85rem', color: 'var(--text-dark)' }}>{item.title}</h4>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.7rem', color: 'var(--text-dark)' }}>{item.subtitle}</p>
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