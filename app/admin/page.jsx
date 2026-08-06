'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminUser } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

// The admin dashboard and its per-collection CRUD forms are gone — editing
// now happens directly on the live pages (see components/editing/). This is
// just the sign-in gateway; once signed in as owner it bounces back to /.
export default function AdminSignInPage() {
  const { user, loading, isOwner } = useAdminUser();
  const router = useRouter();

  useEffect(() => {
    if (isOwner) router.replace('/');
  }, [isOwner, router]);

  if (loading || isOwner) {
    return (
      <main className="container">
        <div className="about">
          <p>Loading…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <LoginForm wrongAccountEmail={user ? user.email : null} />
    </main>
  );
}
