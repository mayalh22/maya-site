'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdminUser } from '@/lib/auth';

const ADMIN_LINKS = [
  ['Dashboard', '/admin'],
  ['Theme', '/admin/theme'],
  ['Timeline', '/admin/timeline'],
  ['Writing', '/admin/writing'],
  ['Art', '/admin/galleries/art'],
  ['Photos', '/admin/galleries/photos'],
  ['Favorites', '/admin/galleries/favorites'],
  ['Projects', '/admin/galleries/projects'],
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
