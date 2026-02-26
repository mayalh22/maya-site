"use client";
import favoritesData from '@/lib/content/favorites.json';
import Section from '@/components/Section';
import { getCardColor } from '@/lib/utils';

export default function FavoritesPage() {
  const grouped = favoritesData.top.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  return (
    <main className="container">
      <div className="about">
        <h1>My Favorites</h1>
        <p>{favoritesData.intro}</p>
      </div>
      <Section title="Top Picks">
        <div className="starline">᯽</div>
        {Object.entries(grouped).map(([type, items]) => (
          <section key={type} className="favorites-section section-dark-green">
            <div className="favorites-type">
              <h4>{type.charAt(0).toUpperCase() + type.slice(1)}s</h4>
            </div>
            <div className="favorites-grid">
              {items.map((item, index) => (
                <div key={index} className="favorites-card" style={{ backgroundColor: getCardColor(index) }}>
                  <h4 className="favorites-rank">{index + 1}.</h4>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="favorites-img"
                  />
                  <h4 className="favorites-title">{item.title}</h4>
                  <h4 className="favorites-subtitle">{item.subtitle}</h4>
                </div>
              ))}
            </div>
          </section>
        ))}
      </Section>
    </main>
  );
}