import Image from 'next/image';
import photosData from '@/lib/content/photos.json';

export const metadata = {
  title: 'Photos - Maya Hazarika',
  description: "Maya Hazarika's favorite photos.",
};

export default function PhotosPage() {
  return (
    <main className="container">
      <div className="about">
        <h1>Photos</h1>
        <p>{photosData.intro}</p>
      </div>

      {photosData.categories.map((category, index) => (
        <div key={index} className="section">
          <h2 className="section-title">{category.category}</h2>
          <div className="photo-grid">
            {category.photos.map((photo, idx) => (
              <div key={idx} className="photo-item">
                <Image
                  src={`/assets/${photo.image}`}
                  alt={photo.caption}
                  width={400}
                  height={300}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                />
                <p className="photo-caption">{photo.caption}</p>
                <p className="photo-date">{photo.date}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
