import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="site-header">
      <Image 
        src="/assets/name-title.png" 
        alt="Maya Hazarika" 
        width={280} 
        height={80}
        className="name-title"
        priority
      />
      
      <nav className="image-nav">
        <ul>
          <li>
            <Link href="/art">
              <Image src="/assets/art-button.png" alt="Art" width={60} height={60} />
              <span>Art</span>
            </Link>
          </li>
          <li>
            <Link href="/code-projects">
              <Image src="/assets/code-projects-button.png" alt="Code Projects" width={60} height={60} />
              <span>Code</span>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <Image src="/assets/contact-button.png" alt="Contact" width={60} height={60} />
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link href="/favorites">
              <Image src="/assets/favorites-button.png" alt="Favorites" width={60} height={60} />
              <span>Favorites</span>
            </Link>
          </li>
          <li>
            <Link href="/photos">
              <Image src="/assets/photos-button.png" alt="Photos" width={60} height={60} />
              <span>Photos</span>
            </Link>
          </li>
          <li>
            <Link href="/timeline">
              <Image src="/assets/timeline-button.png" alt="Timeline" width={60} height={60} />
              <span>Timeline</span>
            </Link>
          </li>
          <li>
            <Link href="/writing">
              <Image src="/assets/writing-button.png" alt="Writing" width={60} height={60} />
              <span>Writing</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

