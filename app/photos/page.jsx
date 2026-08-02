import photosFallback from '@/lib/content/photos.json';
import Enlarge from './enlarge';
import { getContentDoc } from '@/lib/firestore';

export const metadata = {
  title: 'Photos',
  description: "A collection of photos I've taken.",
};

export const revalidate = 300;

export default async function PhotosPage() {
  const photosData = await getContentDoc('content/photos', photosFallback);

  return (
    <main className="container">
      <div className="about">
        <h1>Photos</h1>
        <p>{photosData.intro}</p>
      </div>

      <Enlarge categories={photosData.categories} />
    </main>
  );
}
