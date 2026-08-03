'use client';

import { useSingletonDoc } from '@/lib/useSingletonDoc';
import ImageUrlField from '@/components/admin/ImageUrlField';

const DEFAULTS = { name: '', tagline: '', bio: '', photoUrl: '' };

export default function HomeAdminPage() {
  const { data, setField, save, loading, saving, status } = useSingletonDoc('siteContent/home', DEFAULTS, '/');

  if (loading) return <p className="admin-loading">Loading…</p>;

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <h2>Home</h2>
      </div>
      <div className="section-body">
        <form
          className="admin-form"
          onSubmit={(e) => {
            e.preventDefault();
            save();
          }}
        >
          <div className="admin-field">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={data.name} onChange={(e) => setField('name', e.target.value)} />
          </div>
          <div className="admin-field">
            <label htmlFor="tagline">Tagline</label>
            <input id="tagline" type="text" value={data.tagline} onChange={(e) => setField('tagline', e.target.value)} />
          </div>
          <div className="admin-field">
            <label htmlFor="bio">Bio</label>
            <textarea id="bio" value={data.bio} onChange={(e) => setField('bio', e.target.value)} />
          </div>
          <div className="admin-field">
            <label htmlFor="photoUrl">Photo URL</label>
            <ImageUrlField id="photoUrl" value={data.photoUrl} onChange={(value) => setField('photoUrl', value)} />
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
