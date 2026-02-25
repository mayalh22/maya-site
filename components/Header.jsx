import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const starCount = 12; // total stars
  const starColors = ['#FFD700', '#FF69B4', '#00FFFF', '#ADFF2F']; // 4 colors: gold, pink, cyan, lime

  return (
    <header className="site-header">
      {/* Stars */}
      <div className="stars-container">
        {Array.from({ length: starCount }).map((_, i) => (
          <span
            key={i}
            className="star"
            style={{
              top: `${(i / starCount) * 80 + 10}%`, // evenly spaced vertically
              left: i % 2 === 0 ? '5%' : '95%', // checkerboard left/right
              color: starColors[i % starColors.length], // 4 colors alternating
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

      {/* Navigation (side by side) */}
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