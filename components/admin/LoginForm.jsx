'use client';

import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { OWNER_EMAIL } from '@/lib/auth';

export default function LoginForm({ wrongAccountEmail }) {
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setPending(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email !== OWNER_EMAIL) {
        await signOut(auth);
        setError('Access denied: this Google account is not authorized for admin access.');
      }
    } catch (err) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        // Temporary verbose logging to diagnose sign-in failures; the full
        // error object often carries detail (e.g. customData) that
        // err.code/err.message alone don't show.
        console.error('Google sign-in error:', {
          code: err?.code,
          message: err?.message,
          name: err?.name,
          customData: err?.customData,
          error: err,
        });
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="about admin-login">
      <h1>Admin Login</h1>
      <p>Sign in with the site owner's Google account to manage content.</p>
      {wrongAccountEmail && (
        <p className="admin-error">
          Signed in as {wrongAccountEmail}, which isn't authorized. Sign out and try a different account.
        </p>
      )}
      {error && <p className="admin-error">{error}</p>}
      <button type="button" className="btn" onClick={handleGoogleLogin} disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in with Google'}
      </button>
    </div>
  );
}
