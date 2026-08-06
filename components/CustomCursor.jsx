'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<span class="custom-cursor-ring"></span><span class="custom-cursor-star">᯽</span>';
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

    const isPressable = (el) =>
      el.closest('a, button, input, textarea, select, .card, .photo-card, .favorites-card, .timeline-item, [role="button"]');

    const onOver = (e) => {
      if (isPressable(e.target)) cursor.classList.add('is-active');
    };
    const onOut = (e) => {
      if (isPressable(e.target) && !(e.relatedTarget && isPressable(e.relatedTarget))) {
        cursor.classList.remove('is-active');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(frame);
      document.body.removeChild(cursor);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  return null;
}
