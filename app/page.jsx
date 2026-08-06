import { getSingleton } from '@/lib/db';
import HomeProfile from './HomeProfile';

export const revalidate = 300;

export default async function Home() {
  const home = await getSingleton('siteContent/home', null);

  return (
    <main className="container">
      <div className="about">
        <HomeProfile home={home} />
      </div>
    </main>
  );
}
