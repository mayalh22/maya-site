'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getContentDoc } from '@/lib/firestore';
import { THEME_DOC_PATH, DEFAULT_THEME } from '@/lib/theme';

const COLOR_FIELDS = [
  ['primary', 'Primary (headers, nav, cards)'],
  ['secondary', 'Secondary (nav bar, buttons)'],
  ['accent', 'Accent (highlights, hovers)'],
  ['highlight', 'Highlight'],
  ['background', 'Page background'],
  ['textDark', 'Dark text'],
  ['textLight', 'Light text (on dark backgrounds)'],
  ['cursorColor', 'Custom cursor color'],
];

export default function ThemeAdminPage() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message }
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getContentDoc(THEME_DOC_PATH, DEFAULT_THEME).then((data) => {
      if (!cancelled) {
        setTheme({ ...DEFAULT_THEME, ...data });
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const updateField = (key, value) => setTheme((prev) => ({ ...prev, [key]: value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);
    try {
      await setDoc(doc(db, THEME_DOC_PATH), theme);
      setStatus({ type: 'success', message: 'Saved. Changes may take a few minutes to appear on the live site.' });
    } catch (err) {
      setStatus({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => setTheme(DEFAULT_THEME);

  if (loading) {
    return (
      <div className="section-wrapper">
        <div className="section-header"><h2>Theme</h2></div>
        <div className="section-body"><p>Loading current theme…</p></div>
      </div>
    );
  }

  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Theme</h2></div>
      <div className="section-body">
        <form className="admin-form" onSubmit={handleSave}>
          <div className="admin-color-grid">
            {COLOR_FIELDS.map(([key, label]) => (
              <div className="admin-field" key={key}>
                <label htmlFor={key}>{label}</label>
                <div className="admin-color-row">
                  <input
                    id={key}
                    type="color"
                    value={theme[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                  />
                  <input
                    type="text"
                    value={theme[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="admin-field">
            <label htmlFor="textScale">Text size ({theme.textScale}%)</label>
            <input
              id="textScale"
              type="range"
              min="85"
              max="125"
              step="5"
              value={theme.textScale}
              onChange={(e) => updateField('textScale', Number(e.target.value))}
            />
          </div>

          <div className="admin-actions">
            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save theme'}
            </button>
            <button type="button" className="btn" onClick={handleReset} disabled={saving}>
              Reset to defaults
            </button>
          </div>

          {status && (
            <p className={status.type === 'error' ? 'admin-status admin-status-error' : 'admin-status admin-status-success'}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
