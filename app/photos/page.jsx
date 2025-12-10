export const metadata = {
  title: 'Photos - Maya Hazarika',
  description: 'Maya Hazarika’s favorite photos .',
};

import Header from '@/components/Header';
import photosData from '@/lib/content/photos.json';

export default function PhotosPage() {
  return (
    <>

      <main className="container">
        {/* Intro */}
        <div className="about">
          <h1>Photos</h1>
          <p>{photosData.intro}</p>
        </div>

        {/* Photo categories */}
        {photosData.categories.map((category, index) => (
          <div key={index} className="section">
            <h2>{category.category}</h2>
            <div className="gallery">
              {category.photos.map((photo, idx) => (
                <div key={idx}>
                  <img src={`/assets/${photo.image}`} alt={photo.caption} />
                  <p><small>{photo.date}</small></p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

    </>
  );
}
