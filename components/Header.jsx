import Link from 'next/link';

export default function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <h1 className="logo">Maya Hazarika</h1>
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/art">Art</Link></li>
          <li><Link href="/code-projects">Code Projects</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/favorites">Favorites</Link></li>
          <li><Link href="/photos">Photos</Link></li>
          <li><Link href="/timeline">Timeline</Link></li>
          <li><Link href="/writing">Writing</Link></li>
        </ul>
      </nav>
    </header>
  );
}