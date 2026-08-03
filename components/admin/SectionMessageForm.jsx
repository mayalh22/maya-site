'use client';

import { useSingletonDoc } from '@/lib/useSingletonDoc';

const DEFAULTS = { message: '', closingMessage: '' };

export default function SectionMessageForm({ path, revalidateTarget, title = 'Intro & closing message' }) {
  const { data, setField, save, loading, saving, status } = useSingletonDoc(path, DEFAULTS, revalidateTarget);
  const idBase = path.replace(/\//g, '-');

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>{title}</h2>
      </div>
      <div className="section-body">
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
            <div className="admin-field">
              <label htmlFor={`${idBase}-message`}>Opening message</label>
              <textarea
                id={`${idBase}-message`}
                value={data.message}
                onChange={(e) => setField('message', e.target.value)}
              />
            </div>
            <div className="admin-field">
              <label htmlFor={`${idBase}-closingMessage`}>Closing message</label>
              <textarea
                id={`${idBase}-closingMessage`}
                value={data.closingMessage}
                onChange={(e) => setField('closingMessage', e.target.value)}
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
        )}
      </div>
    </div>
  );
}
