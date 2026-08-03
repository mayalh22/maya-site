'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav({ items }) {
  const pathname = usePathname();

  return (
    <nav className="site-nav">
      <ul>
        {items.map(([label, href]) => (
          <li key={href}>
            <Link href={href} className={pathname === href ? 'nav-link nav-link-active' : 'nav-link'}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
