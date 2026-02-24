"use client";
import { useState } from 'react';

export default function Section({
  title,
  subtitle,
  defaultOpen = true,
  children,
  id
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="section-wrapper" id={id}>
      <div className="section-header" onClick={() => setOpen(!open)}>
        <div>
          <h2>{title}</h2>
          {subtitle && <small>{subtitle}</small>}
        </div>
        <div className="section-toggle">{open ? '▼' : '►'}</div>
      </div>

      {open && (
        <div className="section-body">
          {children}
        </div>
      )}
    </section>
  );
}