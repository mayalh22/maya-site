import Link from 'next/link';
import MobileNav from './MobileNav';

const NAV_ITEMS = [
  ['Projects', '/projects'],
  ['Art', '/art'],
  ['Favorites', '/favorites'],
  ['Timeline', '/timeline'],
  ['Contact', '/contact'],
];

const STAR_CHARS = ['᯽', '✦', '☆'];
const HEADER_STARS = [
  [4, 20], [12, 65], [20, 35], [30, 75], [40, 15],
  [60, 25], [70, 70], [80, 40], [88, 60], [95, 20],
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-stars" aria-hidden="true">
        {HEADER_STARS.map(([left, top], i) => (
          <span
            key={i}
            className="header-star"
            style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${(i % 5) * 0.5}s` }}
          >
            {STAR_CHARS[i % STAR_CHARS.length]}
          </span>
        ))}
      </div>
      <div className="container site-header-bar">
        <Link href="/" className="wordmark">
          <span className="wordmark-spin" aria-hidden="true">᯽</span>
          Maya Hazarika
        </Link>
        <MobileNav items={NAV_ITEMS} />
      </div>
    </header>
  );
}
