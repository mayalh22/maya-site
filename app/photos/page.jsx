import Image from 'next/image';
import photosData from '@/lib/content/photos.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';
import Enlarge from './enlarge';

export default function PhotosPage() {
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