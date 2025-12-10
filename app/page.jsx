export const metadata = {
  title: 'Maya Hazarika',
  description: 'Maya Hazarika’s personal website.',
};

import Header from '@/components/Header';
import aboutData from '@/lib/content/about.json';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section id="about-section" className="about">
          <img src={`/assets/${aboutData.photo}`} alt="Maya" className="profile" />
          <h1>{aboutData.name}</h1>
          <h3>{aboutData.tagline}</h3>
          <p>{aboutData.bio}</p>
        </section>

        <footer>
          <p>&copy; 2025 Maya Hazarika</p>
        </footer>
      </main>
    </>
  );
}
