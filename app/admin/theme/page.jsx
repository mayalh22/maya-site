'use client';

import { useSingletonDoc } from '@/lib/useSingletonDoc';
import { THEME_DOC_PATH, DEFAULT_THEME, FONT_OPTIONS } from '@/lib/theme';

const COLOR_FIELDS = [
  ['primary', 'Primary'],
  ['accent', 'Accent'],
  ['background', 'Background'],
  ['text', 'Text'],
  ['fieldBackground', 'Text box background'],
  ['fieldText', 'Text box text'],
];

export default function ThemeAdminPage() {
  const { data, setField, save, loading, saving, status } = useSingletonDoc(THEME_DOC_PATH, DEFAULT_THEME, '/', {
    layout: true,
  });

  if (loading) return <p className="admin-loading">Loading…</p>;

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Theme and typography</h2>
      </div>
      <div className="section-body">
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
                <input type="color" id={key} value={data[key]} onChange={(e) => setField(key, e.target.value)} />
                <label htmlFor={key}>{label}</label>
              </div>
            ))}
          </div>
          <p className="admin-status">Text box colors apply to the input and textarea boxes here in the admin dashboard.</p>

          <div className="admin-field">
            <label htmlFor="fontChoice">Font</label>
            <select id="fontChoice" value={data.fontChoice} onChange={(e) => setField('fontChoice', e.target.value)}>
              {FONT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-field">
            <label htmlFor="textScale">Text size ({data.textScale}%)</label>
            <input
              id="textScale"
              type="range"
              min="85"
              max="125"
              step="5"
              value={data.textScale}
              onChange={(e) => setField('textScale', Number(e.target.value))}
            />
          </div>

          <div className="admin-actions">
            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
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
