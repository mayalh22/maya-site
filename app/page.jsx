import { getSingleton } from '@/lib/db';
import CroppedImage from '@/components/CroppedImage';

export const revalidate = 300;

function asPhoto(entry) {
  return typeof entry === 'string' ? { url: entry } : entry;
}

export default async function Home() {
  const home = await getSingleton('siteContent/home', null);
  const photos = (home?.photoUrls || []).map(asPhoto);

  return (
    <main className="container">
      <div className="about">
        {home ? (
          <>
            {photos.length > 1 ? (
              <div className="profile-carousel">
                <div className="profile-carousel-track">
                  {[...photos, ...photos].map((photo, index) => (
                    <CroppedImage
                      key={index}
                      src={photo.url}
                      alt={home.name || ''}
                      className="profile-carousel-frame"
                      loading={index < photos.length ? 'eager' : 'lazy'}
                      zoom={photo.zoom}
                      posX={photo.posX}
                      posY={photo.posY}
                    />
                  ))}
                </div>
              </div>
            ) : (
              photos[0] && (
                <CroppedImage
                  src={photos[0].url}
                  alt={home.name || ''}
                  className="profile"
                  loading="eager"
                  zoom={photos[0].zoom}
                  posX={photos[0].posX}
                  posY={photos[0].posY}
                />
              )
            )}
            <h1>{home.name || 'Welcome'}</h1>
            {home.tagline && <h3>{home.tagline}</h3>}
            {home.bio && <p>{home.bio}</p>}
          </>
        ) : (
          <p className="empty-state">No profile info yet.</p>
        )}
      </div>
    </main>
  );
}
