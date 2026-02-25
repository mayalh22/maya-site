import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const starCount = 12; // total stars
  const colors = ['#FFD700', '#FF69B4']; // alternate colors: gold & pink

  return (
    <header className="site-header">
      {/* Stars Container */}
      <div className="stars-container">
        {Array.from({ length: starCount }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: `${Math.random() * 80 + 10}%`, // random vertical
              left: `${i % 2 === 0 ? Math.random() * 20 : 80 + Math.random() * 20}%`, // checker left/right
              color: colors[i % colors.length], // alternating colors
              fontSize: `${Math.random() * 1.2 + 0.8}rem`, // random sizes
            }}
          >
            ★
          </span>
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

      {/* Navigation (stacked) */}
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