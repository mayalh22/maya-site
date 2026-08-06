'use client';

import { useAdminUser } from '@/lib/auth';

// Mirrors the old `{content?.closingMessage && <div className="about">...}`
// pattern: visitors and pre-hydration renders get nothing at all (no empty
// wrapper div) when there's no value, but the owner still sees the wrapper
// (with an "Add…" placeholder inside) so they have somewhere to click to add one.
export default function OptionalSection({ className, value, children }) {
  const { isOwner } = useAdminUser();
  if (!isOwner && !value) return null;
  return <div className={className}>{children}</div>;
}
