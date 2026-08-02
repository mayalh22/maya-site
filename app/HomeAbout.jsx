'use client';

import Image from 'next/image';

export default function HomeAbout({ aboutData }) {
  const toggleSpin = (e) => {
    const el = e.target;
    el.style.animationPlayState =
      el.style.animationPlayState === 'paused' ? 'running' : 'paused';
  };

  return (
    <div className="about">
      <Image
        src={`/assets/${aboutData.photo}`}
        width={280}
        height={200}
        alt="Maya"
        className="profile"
        onClick={toggleSpin}
      />
      <h1>{aboutData.name}</h1>
      <h3>{aboutData.tagline}</h3>
      <p>{aboutData.bio}</p>
      <p className="home-hint">
        Click the tabs above to learn more. Click the image to pause it!
      </p>
    </div>
  );
}
