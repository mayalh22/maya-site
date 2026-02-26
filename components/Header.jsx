import Link from 'next/link';
import Image from 'next/image';

const STAR_CHARS  = ['᯽', '✦', '☆'];
const STAR_COLORS = ['var(--orange)', 'var(--salmon)', 'var(--yellow)', 'var(--blue)'];

const LEFT_STARS = [
  [3, 8],  [13, 8],  [23, 8],
  [8, 23], [18, 23], [28, 23],
  [5, 38], [15, 38], [25, 38],
  [10, 53],[20, 53], [30, 53],
];
const RIGHT_STARS = [
  [97, 8],  [87, 8],  [77, 8],
  [92, 23], [82, 23], [72, 23],
  [95, 38], [85, 38], [75, 38],
  [90, 53], [80, 53], [70, 53],
];
const ALL_STARS = [...LEFT_STARS, ...RIGHT_STARS];

const NAV_ITEMS = [
  ['Art',       '/art',           '/assets/art-button.png'],
  ['Code',      '/code-projects', '/assets/code-projects-button.png'],
  ['Contact',   '/contact',       '/assets/contact-button.png'],
  ['Favorites', '/favorites',     '/assets/favorites-button.png'],
  ['Photos',    '/photos',        '/assets/photos-button.png'],
  ['Timeline',  '/timeline',      '/assets/timeline-button.png'],
  ['Writing',   '/writing',       '/assets/writing-button.png'],
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="stars-container">
        {ALL_STARS.map(([left, top], i) => (
          <span
            key={i}
            className="star-item"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              color: STAR_COLORS[i % STAR_COLORS.length],
            }}
          >
            {STAR_CHARS[i % STAR_CHARS.length]}
          </span>
        ))}
      </div>

      <div className="logo-wrapper">
        <Link href="/">
          <Image
            src="/assets/name-title.png"
            alt="Maya Hazarika"
            width={300}
            height={80}
            className="logo-img"
            priority
          />
        </Link>
      </div>

      <nav className="image-nav">
        <ul>
          {NAV_ITEMS.map(([name, href, src]) => (
            <li key={href}>
              <Link href={href}>
                <Image src={src} alt={name} width={55} height={55} className="nav-img" />
                <span className="nav-label">{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}