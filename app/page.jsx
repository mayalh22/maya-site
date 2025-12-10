export const metadata = {
  title: 'Maya Hazarika',
  description: "Maya Hazarika's personal website.",
};

import aboutData from '@/lib/content/about.json';

export default function Home() {
  return (
    <section id="about-section" className="about">
      <img src={`/assets/${aboutData.photo}`} width={280} height={200} alt="Maya" className="profile" />
      <h1>{aboutData.name}</h1>
      <h3>{aboutData.tagline}</h3>
      <p>{aboutData.bio}</p>
    </section>
  );
}
