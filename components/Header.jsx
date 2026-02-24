import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const starCount = 10; // stars per side

  return (
    <header className="site-header">
      {/* Left Stars */}
      <div className="stars-left">
        {Array.from({ length: starCount }).map((_, i) => (
          <span key={i} className="star" style={{ top: `${i * 10}%` }}>★</span>
        ))}
      </div>

      {/* Logo */}
      <div className="logo-wrapper">
        <Link href="/">
          <Image
            src="/assets/name-title.png"
            alt="Maya Hazarika"
            width={280}
            height={80}
            priority
          />
        </Link>
      </div>

      {/* Right Stars */}
      <div className="stars-right">
        {Array.from({ length: starCount }).map((_, i) => (
          <span key={i} className="star" style={{ top: `${i * 10}%` }}>★</span>
        ))}
      </div>

      {/* Navigation */}
      <nav className="image-nav">
        <ul>
          {[
            ['Art', '/art', '/assets/art-button.png'],
            ['Code', '/code-projects', '/assets/code-projects-button.png'],
            ['Contact', '/contact', '/assets/contact-button.png'],
            ['Favorites', '/favorites', '/assets/favorites-button.png'],
            ['Photos', '/photos', '/assets/photos-button.png'],
            ['Timeline', '/timeline', '/assets/timeline-button.png'],
            ['Writing', '/writing', '/assets/writing-button.png'],
          ].map(([name, href, src], idx) => (
            <li key={idx}>
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