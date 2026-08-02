import favoritesFallback from '@/lib/content/favorites.json';
import Section from '@/components/Section';
import Enlarge from './enlarge';
import { getContentDoc } from '@/lib/firestore';

export const metadata = {
  title: 'Favorites',
  description: 'My favorite movies, shows, books, and albums.',
};

export const revalidate = 300;

export default async function FavoritesPage() {
  const favoritesData = await getContentDoc('content/favorites', favoritesFallback);

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
        {Object.entries(grouped).map(([type, items]) => (
          <section key={type} className="favorites-section">
            <div className="favorites-type-label" style={{ textAlign: 'center', width: '100%' }}>
              {type.charAt(0).toUpperCase() + type.slice(1)}s
            </div>
            <Enlarge items={items} />
          </section>
        ))}
      </Section>
    </main>
  );
}
