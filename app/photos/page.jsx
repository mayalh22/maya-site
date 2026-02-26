import Image from 'next/image';
import photosData from '@/lib/content/photos.json';
import Section from '@/components/Section';
import { getCardColor, getCardClass } from '@/lib/utils';

export const metadata = {
  title: 'Photos',
  description: 'My photography.',
};

export default function PhotosPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Photos</h1>
        <p>{photosData.intro}</p>
      </div>

      {photosData.categories.map((category, index) => (
        <Section key={index} title={category.category}>
          <div className="photo-grid">
            {category.photos.map((photo, idx) => (
              <div
                key={idx}
                className={getCardClass(idx)}
                style={{ backgroundColor: getCardColor(idx) }}
              >
                <Image
                  src={`/assets/${photo.image}`}
                  alt={photo.caption}
                  width={200}
                  height={150}
                  loading="lazy"
                />
                <p className="photo-caption">{photo.caption}</p>
                <p className="photo-date">{photo.date}</p>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </main>
  );
}