import Enlarge from './enlarge';
import { getSingleton, listOrdered } from '@/lib/db';
import GridLayoutEditor from '@/components/admin/GridLayoutEditor';

export const metadata = {
  title: 'Favorites',
  description: 'Favorite movies, shows, books, and albums.',
};

export const revalidate = 300;

const TYPES = ['Movie', 'Show', 'Book', 'Album'];

export default async function FavoritesPage() {
  const [favorites, content, layout] = await Promise.all([
    listOrdered('favorites'),
    getSingleton('siteContent/favorites', null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Favorites</h1>
        {content?.message && <p>{content.message}</p>}
      </div>
      {favorites.length === 0 ? (
        <p className="empty-state">No favorites yet.</p>
      ) : (
        TYPES.map((type) => {
          const items = favorites.filter((item) => item.type === type);
          if (items.length === 0) return null;
          return (
            <section key={type} className="favorites-section">
              <div className="favorites-type-label">{type}s</div>
              <GridLayoutEditor
                sectionKey={`favorites-${type}`}
                defaultGap={16}
                defaultItemWidth={140}
                initial={layout?.[`favorites-${type}`]}
                revalidateTarget="/favorites"
              >
                <Enlarge items={items} />
              </GridLayoutEditor>
            </section>
          );
        })
      )}

      {content?.closingMessage && (
        <div className="about">
          <p>{content.closingMessage}</p>
        </div>
      )}
    </main>
  );
}
