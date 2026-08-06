'use client';

import { useAdminUser } from '@/lib/auth';

// Replaces AdminNav's sign-out affordance now that there's no separate admin
// dashboard to host it — shown on every page while signed in as owner.
export default function OwnerStrip() {
  const { isOwner, user, signOut } = useAdminUser();
  if (!isOwner) return null;

  return (
    <div className="owner-strip">
      <span>Editing as {user?.email}</span>
      <button type="button" className="btn btn-small btn-secondary" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}
