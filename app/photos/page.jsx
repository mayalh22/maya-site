import Image from 'next/image';

export const metadata = {
  title: 'Photos - Maya Hazarika',
  description: 'Maya Hazarika\'s favorite photos.',
};

import photosData from '@/lib/content/photos.json';
import Section from '@/components/Section';

export default function PhotosPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Photos</h1>
        <p>{photosData.intro}</p>
      </div>

      {photosData.categories.map((category, index) => {
        const sectionColors = ['var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)', 'var(--yellow)'];
        const cardColors = ['var(--yellow)', 'var(--pink)', 'var(--mint)', 'var(--teal)', 'var(--orange)'];
        return (
          <Section key={index} title={category.category}>
            <div className="photo-grid">
              {category.photos.map((photo, idx) => (
                <div key={idx} className="photo-item" style={{ backgroundColor: cardColors[idx % cardColors.length] }}>
                  <Image src={`/assets/${photo.image}`} alt={photo.caption} width={400} height={300} sizes="(max-width: 768px) 100vw, 33vw" loading="lazy" />
                  <p className="photo-caption">{photo.caption}</p>
                  <p className="photo-date">{photo.date}</p>
                </div>
              ))}
            </div>
          </Section>
        );
      })}
    </main>
  );
}