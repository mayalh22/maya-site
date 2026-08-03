'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function MobileNav({ items }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="sr-only">Menu</span>
        <span className="nav-toggle-icon" aria-hidden="true" />
      </button>
      <nav id="site-nav" className={open ? 'site-nav site-nav-open' : 'site-nav'}>
        <ul>
          {items.map(([label, href]) => (
            <li key={href}>
              <Link
                href={href}
                className={pathname === href ? 'nav-link nav-link-active' : 'nav-link'}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
