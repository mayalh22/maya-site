import { getSingleton } from '@/lib/db';

export const revalidate = 300;

export default async function Home() {
  const home = await getSingleton('siteContent/home', null);
  const photos = home?.photoUrls || [];

  return (
    <main className="container">
      <div className="about">
        {home ? (
          <>
            {photos.length > 1 ? (
              <div className="profile-carousel">
                <div className="profile-carousel-track">
                  {[...photos, ...photos].map((url, index) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={index} src={url} alt={home.name || ''} loading={index < photos.length ? 'eager' : 'lazy'} />
                  ))}
                </div>
              </div>
            ) : (
              photos[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photos[0]} alt={home.name || ''} className="profile" loading="eager" />
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
