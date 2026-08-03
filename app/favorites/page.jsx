import Section from '@/components/Section';
import Enlarge from './enlarge';
import { listCollection } from '@/lib/db';

export const metadata = {
  title: 'Favorites',
  description: 'Favorite movies, shows, books, and albums.',
};

export const revalidate = 300;

const TYPES = ['Movie', 'Show', 'Book', 'Album'];

export default async function FavoritesPage() {
  const favorites = await listCollection('favorites');

  return (
    <main className="container">
      <div className="about">
        <h1>Favorites</h1>
      </div>
      <Section title="Top picks">
        {favorites.length === 0 ? (
          <p className="empty-state">No favorites yet.</p>
        ) : (
          TYPES.map((type) => {
            const items = favorites.filter((item) => item.type === type);
            if (items.length === 0) return null;
            return (
              <section key={type} className="favorites-section">
                <div className="favorites-type-label">{type}s</div>
                <Enlarge items={items} />
              </section>
            );
          })
        )}
      </Section>
    </main>
  );
}
