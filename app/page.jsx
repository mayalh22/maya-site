import { getSingleton } from '@/lib/db';

export const revalidate = 300;

export default async function Home() {
  const home = await getSingleton('siteContent/home', null);

  return (
    <main className="container">
      <div className="about">
        {home ? (
          <>
            {home.photoUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={home.photoUrl} alt={home.name || ''} className="profile" loading="eager" />
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
