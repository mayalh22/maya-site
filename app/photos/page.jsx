import Enlarge from './enlarge';
import { getSingleton, listOrdered } from '@/lib/db';

export const metadata = {
  title: 'Photos',
  description: 'A photo gallery.',
};

export const revalidate = 300;

export default async function PhotosPage() {
  const [photos, content, layout] = await Promise.all([
    listOrdered('photos'),
    getSingleton('siteContent/photos', null),
    getSingleton('settings/layout', {}),
  ]);
  const categories = Array.from(new Set(photos.map((p) => p.category))).sort();

  return (
    <main className="container">
      <div className="about">
        <h1>Photos</h1>
        {content?.message && <p>{content.message}</p>}
      </div>

      {photos.length === 0 ? (
        <p className="empty-state">No photos yet.</p>
      ) : (
        <Enlarge categories={categories} photos={photos} layout={layout} />
      )}

      {content?.closingMessage && (
        <div className="about">
          <p>{content.closingMessage}</p>
        </div>
      )}
    </main>
  );
}
