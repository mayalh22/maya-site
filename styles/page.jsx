import favoritesData from '@/lib/content/favorites.json';
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

      <div className="starline">᯽</div>

      {Object.entries(grouped).map(([type, items]) => (
        <section key={type} className="favorites-section">
          <div className="favorites-type-label">
            {type.charAt(0).toUpperCase() + type.slice(1)}s
          </div>

          <div className="favorites-grid">
            {items.map((item, index) => (
              <div key={index} className="favorites-card" style={{ backgroundColor: getCardColor(index) }}>
                <span className="favorites-rank">{index + 1}.</span>
                <img src={item.image} alt={item.title} className="favorites-img" />
                <p className="favorites-title">{item.title}</p>
                <p className="favorites-sub">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}