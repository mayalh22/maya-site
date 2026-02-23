import favoritesData from '@/lib/content/favorites.json';

export const metadata = {
  title: 'Favorites',
  description: "My favorite books, music, and movies.",
};

export default function FavoritesPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>My Favorites</h1>
        <p>{favoritesData.intro}</p>
      </div>

      <div className="starline">✦</div>

      <section className="section">
        <h2 className="section-title">Top 8</h2>
        <div className="grid-cards">
          {favoritesData.top.map((item, index) => (
            <div key={index} className="card-mini">
              <img src={item.image} alt={item.title} width="150" />
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
              <span>{item.type}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}