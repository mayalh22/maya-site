import Enlarge from './enlarge';
import { listCollection } from '@/lib/db';

export const metadata = {
  title: 'Photos',
  description: 'A photo gallery.',
};

export const revalidate = 300;

export default async function PhotosPage() {
  const photos = await listCollection('photos');
  const categories = Array.from(new Set(photos.map((p) => p.category))).sort();

  return (
    <main className="container">
      <div className="about">
        <h1>Photos</h1>
      </div>

      {photos.length === 0 ? (
        <p className="empty-state">No photos yet.</p>
      ) : (
        <Enlarge categories={categories} photos={photos} />
      )}
    </main>
  );
}
