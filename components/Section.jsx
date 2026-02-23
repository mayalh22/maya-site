"use client";
import { useState } from 'react';

export default function Section({
  title,
  subtitle,
  colorVar = 'var(--yellow)',
  defaultOpen = true,
  children,
  id
}) {
  const [open, setOpen] = useState(defaultOpen);

  // simple rule: treat --teal as dark => use light text, others use dark text
  const darkBgVars = ['var(--teal)'];
  const textClass = darkBgVars.includes(colorVar) ? 'section-text-light' : 'section-text-dark';

  return (
    <section className="section-wrapper" id={id} style={{ backgroundColor: colorVar, padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
      <div className={`section-header ${textClass}`} onClick={() => setOpen(!open)} style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.25rem 0.5rem' }}>
        <div>
          <h2 style={{ margin: 0 }}>{title}</h2>
          {subtitle && <small style={{ opacity: 0.9 }}>{subtitle}</small>}
        </div>
        <div style={{ fontSize: '1.1rem', fontWeight: '700' }}>{open ? '▼' : '►'}</div>
      </div>

      {open && (
        <div className="section-body" style={{ marginTop: '0.75rem' }}>
          {children}
        </div>
      )}
    </section>
  );
}
