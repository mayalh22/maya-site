'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerText = '᯽';
    document.body.appendChild(cursor);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let frame;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      x += (targetX - x) * 0.25;
      y += (targetY - y) * 0.25;
      cursor.style.left = `${x}px`;
      cursor.style.top = `${y}px`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(frame);
      document.body.removeChild(cursor);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return null;
}
