import aboutData from '@/lib/content/about.json';
import HomeAbout from './HomeAbout';

export const metadata = {
  title: 'Maya Hazarika',
  description: aboutData.bio,
};

export default function Home() {
  return (
    <main className="container">
      <HomeAbout aboutData={aboutData} />
    </main>
  );
}