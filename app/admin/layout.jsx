'use client';

import { useAdminUser } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';
import AdminNav from '@/components/admin/AdminNav';

export default function AdminLayout({ children }) {
  const { user, loading, isOwner } = useAdminUser();

  if (loading) {
    return (
      <main className="container">
        <div className="about">
          <p>Loading admin portal…</p>
        </div>
      </main>
    );
  }

  if (!isOwner) {
    return (
      <main className="container">
        <LoginForm wrongAccountEmail={user ? user.email : null} />
      </main>
    );
  }

  return (
    <main className="container admin-shell">
      <AdminNav />
      {children}
    </main>
  );
}
