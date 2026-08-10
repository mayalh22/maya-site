'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

// Renders owner-only editing controls (grid spacing, rearrange, etc.) into
// the fixed top-left stack in the root layout instead of wherever they'd
// otherwise sit in the page flow, so they're always reachable without
// scrolling and never overlap the content they control.
export default function OwnerControlsPortal({ children }) {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    setTarget(document.getElementById('owner-controls-stack'));
  }, []);

  if (!target) return null;
  return createPortal(children, target);
}
