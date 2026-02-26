'use client';

import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    document.body.style.cursor = 'none';

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerText = '𖦹';
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX - 20}px`;
      cursor.style.top = `${e.clientY - 20}px`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.body.removeChild(cursor);
      document.body.style.cursor = '';
    };
  }, []);

  return null;
}