'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from './firebase';

export const OWNER_EMAIL = 'maya.l.hazarika@gmail.com';

export function useAdminUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isOwner = !!user && user.email === OWNER_EMAIL && user.emailVerified;

  return { user, loading, isOwner, signOut: () => firebaseSignOut(auth) };
}
