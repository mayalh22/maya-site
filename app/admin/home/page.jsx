'use client';

import { useState } from 'react';
import { useSingletonDoc } from '@/lib/useSingletonDoc';
import ImageUrlField from '@/components/admin/ImageUrlField';

const DEFAULTS = { name: '', tagline: '', bio: '', photoUrls: [] };

export default function HomeAdminPage() {
  const { data, setField, save, loading, saving, status } = useSingletonDoc('siteContent/home', DEFAULTS, '/');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  if (loading) return <p className="admin-loading">Loading…</p>;

  const photoUrls = data.photoUrls || [];

  function addPhoto() {
    const url = newPhotoUrl.trim();
    if (!url) return;
    setField('photoUrls', [...photoUrls, url]);
    setNewPhotoUrl('');
  }

  function removePhoto(index) {
    setField('photoUrls', photoUrls.filter((_, i) => i !== index));
  }

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
            <label>Profile photos</label>
            {photoUrls.length > 0 && (
              <div className="admin-list">
                {photoUrls.map((url, index) => (
                  <div className="admin-list-item" key={`${url}-${index}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="admin-list-thumb" src={url} alt="" loading="lazy" />
                    <div className="admin-list-info">
                      <p className="admin-list-detail">{url}</p>
                    </div>
                    <div className="admin-list-actions">
                      <button type="button" className="btn btn-small btn-danger" onClick={() => removePhoto(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <ImageUrlField id="newPhotoUrl" value={newPhotoUrl} onChange={setNewPhotoUrl} />
            <div className="admin-actions">
              <button type="button" className="btn btn-secondary" onClick={addPhoto}>
                Add photo
              </button>
            </div>
            {photoUrls.length > 1 && (
              <p className="admin-status">Two or more photos scroll automatically on the home page.</p>
            )}
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
