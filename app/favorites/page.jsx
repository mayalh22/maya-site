import Enlarge from './enlarge';
import { getSingleton, listOrdered } from '@/lib/db';
import EditableText from '@/components/editing/EditableText';
import OptionalSection from '@/components/editing/OptionalSection';

export const metadata = {
  title: 'Favorites',
  description: 'Favorite movies, shows, books, and albums.',
};

export const revalidate = 300;

const CONTENT_PATH = 'siteContent/favorites';

export default async function FavoritesPage() {
  const [favorites, content, layout] = await Promise.all([
    listOrdered('favorites'),
    getSingleton(CONTENT_PATH, null),
    getSingleton('settings/layout', {}),
  ]);

  return (
    <main className="container">
      <div className="about">
        <h1>Favorites</h1>
        <EditableText
          value={content?.message}
          align={content?.messageAlign}
          fieldKey="message"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/favorites"
          placeholder="Add an intro message…"
        />
      </div>

      <Enlarge favorites={favorites} layout={layout} />

      <OptionalSection className="about" value={content?.closingMessage}>
        <EditableText
          value={content?.closingMessage}
          align={content?.closingMessageAlign}
          fieldKey="closingMessage"
          target={{ type: 'singleton', path: CONTENT_PATH }}
          revalidateTarget="/favorites"
          placeholder="Add a closing message…"
        />
      </OptionalSection>
    </main>
  );
}
