'use client';
import Image from 'next/image';
import aboutData from '@/lib/content/about.json';

export const metadata = {
  title: 'Maya Hazarika',
  description: "My personal site.",
};

export default function Home() {
  return (
    <section id="about-section" className="about striped-section">
      <Image
        src={`/assets/${aboutData.photo}`}
        width={280}
        height={200}
        alt="Maya"
        className="profile"
        onClick={e => {
          const el = e.target;
          if (el.style.animationPlayState === 'paused') {
            el.style.animationPlayState = 'running';
          } else {
            el.style.animationPlayState = 'paused';
          }
        }}
      />
      <h1>{aboutData.name}</h1>
      <h3>{aboutData.tagline}</h3>
      <p>{aboutData.bio}</p>
      <p style={{marginTop: '1.2rem', fontSize: '1.2rem', color: 'var(--primary)', fontFamily: 'Inter, sans-serif'}}>Click the tabs above to learn more.</p>
    </section>
  );
}
