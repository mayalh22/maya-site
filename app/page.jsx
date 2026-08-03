import { getSingleton } from '@/lib/db';

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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={index}
                      src={photo.url}
                      alt={home.name || ''}
                      loading={index < photos.length ? 'eager' : 'lazy'}
                      style={{
                        ...(photo.width ? { width: photo.width } : {}),
                        ...(photo.height ? { height: photo.height } : {}),
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : (
              photos[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photos[0].url}
                  alt={home.name || ''}
                  className="profile"
                  loading="eager"
                  style={{
                    ...(photos[0].width ? { width: photos[0].width } : {}),
                    ...(photos[0].height ? { height: photos[0].height } : {}),
                  }}
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
