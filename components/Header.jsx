import Link from 'next/link';
import Image from 'next/image';

const starColors = ['var(--orange)', 'var(--olive)', 'var(--yellow)', 'var(--pink)'];

const STAR_COUNT = 24;

export default function Header() {
  return (
    <header
      className="site-header"
      style={{ backgroundColor: 'var(--primary)', position: 'relative', overflow: 'hidden', padding: '2rem 0', minHeight: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Spinning stars */}
      <style>{`
        @keyframes spinCW {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .star-item {
          position: absolute;
          font-size: 1.5rem;
          line-height: 1;
          display: inline-block;
          animation: spinCW 0.8s linear infinite;
          cursor: default;
          transition: transform 0.2s ease;
        }
        .star-item:hover {
          animation-play-state: paused;
          transform: scale(2) rotate(0deg);
        }
        .image-nav ul {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          list-style: none;
          padding: 0;
          margin: 0;
          justify-content: center;
          flex-wrap: wrap;
        }
        .image-nav li {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.25rem;
        }
        .image-nav li span {
          color: white;
          font-size: 0.8rem;
          font-family: Inter, sans-serif;
        }
        .image-nav li img {
          transition: transform 0.2s ease;
          transform: scale(1);
        }
        .image-nav li:hover img {
          transform: scale(1.2);
        }
      `}</style>

      <div className="stars-container" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {Array.from({ length: STAR_COUNT }).map((_, i) => {
          // Evenly distribute left-to-right across the full width
const leftPct = i < 12
  ? ((i + 0.5) / 12) * 40           // left 40% of screen
  : 60 + ((i - 12 + 0.5) / 12) * 40; // right 40% of screen
const topPct = i % 3 === 0 ? 10 : i % 3 === 1 ? 45 : 75;
          return (
            <span
              key={i}
              className="star-item"
              style={{
                top: `${topPct}%`,
                left: `${leftPct}%`,
                color: starColors[i % starColors.length],
                pointerEvents: 'auto',
              }}
            >
              ★
            </span>
          );
        })}
      </div>

      {/* Logo */}
      <div className="logo-wrapper" style={{ zIndex: 1, marginBottom: '1rem' }}>
        <Link href="/">
          <Image src="/assets/name-title.png" alt="Maya Hazarika" width={280} height={80} priority />
        </Link>
      </div>

      {/* Nav */}
<nav className="image-nav" style={{ zIndex: 1, width: '100%', paddingBottom: 0, marginBottom: 0 }}>
<ul style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '0 1rem', margin: 0, listStyle: 'none', boxSizing: 'border-box', gap: '0.5rem', paddingBottom: 0, marginBottom: 0 }}>          {[
            ['Art',      '/art',            '/assets/art-button.png'],
            ['Code',     '/code-projects',  '/assets/code-projects-button.png'],
            ['Contact',  '/contact',        '/assets/contact-button.png'],
            ['Favorites','/favorites',      '/assets/favorites-button.png'],
            ['Photos',   '/photos',         '/assets/photos-button.png'],
            ['Timeline', '/timeline',       '/assets/timeline-button.png'],
            ['Writing',  '/writing',        '/assets/writing-button.png'],
          ].map(([name, href, src]) => (
            <li key={href}>
              <Link href={href}>
                <Image src={src} alt={name} width={60} height={60} />
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}