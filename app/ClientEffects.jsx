'use client';

import { useEffect } from 'react';

export default function ClientEffects() {
useEffect(() => {
  document.body.style.cursor = 'none'; // hide native cursor
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerText = '𖦹';
  document.body.appendChild(cursor);

  let angle = 0;

  const moveCursor = (e) => {
    angle += 8;
    cursor.style.left = `${e.clientX - 20}px`;
    cursor.style.top = `${e.clientY - 20}px`;
    cursor.style.transform = `rotate(${angle}deg)`;
  };

  window.addEventListener('mousemove', moveCursor);

  return () => {
    window.removeEventListener('mousemove', moveCursor);
    document.body.removeChild(cursor);
    document.body.style.cursor = ''; // restore default on unmount
  };
}, []);

  return null;
}