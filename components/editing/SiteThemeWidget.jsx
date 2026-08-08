'use client';

import { useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { useSingletonDoc } from '@/lib/useSingletonDoc';
import { THEME_DOC_PATH, DEFAULT_THEME, FONT_OPTIONS, themeToCss } from '@/lib/theme';

const COLOR_FIELDS = [
  ['primary', 'Primary'],
  ['accent', 'Accent'],
  ['background', 'Background'],
  ['text', 'Text'],
  ['fieldBackground', 'Text box background'],
  ['fieldText', 'Text box text'],
  ['borderColor', 'Line color'],
];

// Floating owner-only replacement for the old /admin/theme page — the sitewide
// theme controls (colors, default font, text scale, border, spin speed) are
// now reachable from any page instead of a separate admin route.
export default function SiteThemeWidget() {
  const { isOwner } = useAdminUser();
  const [open, setOpen] = useState(false);
  const { data, setField, save, loading, saving, status } = useSingletonDoc(THEME_DOC_PATH, DEFAULT_THEME, '/', {
    layout: true,
  });

  if (!isOwner) return null;

  return (
    <>
      {open && !loading && <style dangerouslySetInnerHTML={{ __html: themeToCss(data) }} />}
      <button type="button" className="site-theme-toggle" onClick={() => setOpen((v) => !v)} title="Site theme">
        Theme
      </button>
      {open && (
        <div className="site-theme-panel">
          {loading ? (
            <p className="admin-loading">Loading…</p>
          ) : (
            <form
              className="admin-form"
              onSubmit={(e) => {
                e.preventDefault();
                save();
              }}
            >
              <div className="admin-color-grid">
                {COLOR_FIELDS.map(([key, label]) => (
                  <div className="admin-color-row" key={key}>
                    <input
                      type="color"
                      id={`theme-${key}`}
                      value={data[key]}
                      onChange={(e) => setField(key, e.target.value)}
                    />
                    <label htmlFor={`theme-${key}`}>{label}</label>
                  </div>
                ))}
              </div>

              <div className="admin-field">
                <label>Font</label>
                <div className="font-option-grid">
                  {FONT_OPTIONS.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      className={data.fontChoice === option.value ? 'font-option font-option-active' : 'font-option'}
                      style={{ fontFamily: option.fontFamily }}
                      aria-pressed={data.fontChoice === option.value}
                      onClick={() => setField('fontChoice', option.value)}
                    >
                      <span className="font-option-sample">Aa Bb Cc</span>
                      <span className="font-option-label">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-field">
                <label htmlFor="theme-textScale">Text size ({data.textScale}%)</label>
                <input
                  id="theme-textScale"
                  type="range"
                  min="85"
                  max="125"
                  step="5"
                  value={data.textScale}
                  onChange={(e) => setField('textScale', Number(e.target.value))}
                />
              </div>

              <div className="admin-field">
                <label htmlFor="theme-borderWidth">Line thickness ({data.borderWidth}px)</label>
                <input
                  id="theme-borderWidth"
                  type="range"
                  min="0"
                  max="6"
                  step="1"
                  value={data.borderWidth}
                  onChange={(e) => setField('borderWidth', Number(e.target.value))}
                />
              </div>

              <div className="admin-field">
                <label htmlFor="theme-spinSpeed">Spin speed ({data.spinSpeed}×)</label>
                <input
                  id="theme-spinSpeed"
                  type="range"
                  min="0.25"
                  max="3"
                  step="0.25"
                  value={data.spinSpeed}
                  onChange={(e) => setField('spinSpeed', Number(e.target.value))}
                />
              </div>

              <div className="admin-actions">
                <button type="submit" className="btn" disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                  Close
                </button>
              </div>
              {status && (
                <p className={status.type === 'error' ? 'admin-status admin-status-error' : 'admin-status admin-status-success'}>
                  {status.message}
                </p>
              )}
            </form>
          )}
        </div>
      )}
    </>
  );
}
