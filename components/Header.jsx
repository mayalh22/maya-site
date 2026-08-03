import Link from 'next/link';
import MobileNav from './MobileNav';

const NAV_ITEMS = [
  ['Projects', '/projects'],
  ['Art', '/art'],
  ['Photos', '/photos'],
  ['Favorites', '/favorites'],
  ['Timeline', '/timeline'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-bar">
        <Link href="/" className="wordmark">Maya Hazarika</Link>
        <MobileNav items={NAV_ITEMS} />
      </div>
    </header>
  );
}
