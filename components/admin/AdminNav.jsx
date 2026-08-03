'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminUser } from '@/lib/auth';

const ADMIN_LINKS = [
  ['Dashboard', '/admin'],
  ['Home', '/admin/home'],
  ['Contact', '/admin/contact'],
  ['Theme', '/admin/theme'],
  ['Projects', '/admin/projects'],
  ['Art', '/admin/art'],
  ['Photos', '/admin/photos'],
  ['Favorites', '/admin/favorites'],
  ['Timeline', '/admin/timeline'],
  ['Blog', '/admin/blog'],
];

export default function AdminNav() {
  const pathname = usePathname();
  const { user, signOut } = useAdminUser();

  return (
    <nav className="admin-nav">
      <div className="admin-nav-links">
        {ADMIN_LINKS.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? 'admin-nav-link admin-nav-link-active' : 'admin-nav-link'}
          >
            {label}
          </Link>
        ))}
      </div>
      <div className="admin-nav-user">
        <span>{user?.email}</span>
        <button type="button" className="btn" onClick={signOut}>Sign out</button>
      </div>
    </nav>
  );
}
