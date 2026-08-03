'use client';

import { useState } from 'react';
import { useSingletonDoc } from '@/lib/useSingletonDoc';
import ImageUrlField from '@/components/admin/ImageUrlField';

const DEFAULTS = { name: '', tagline: '', bio: '', photoUrls: [] };

function asPhoto(entry) {
  return typeof entry === 'string' ? { url: entry, width: '', height: '' } : entry;
}

export default function HomeAdminPage() {
  const { data, setField, save, loading, saving, status } = useSingletonDoc('siteContent/home', DEFAULTS, '/');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  if (loading) return <p className="admin-loading">Loading…</p>;

  const photos = (data.photoUrls || []).map(asPhoto);

  function updatePhotos(next) {
    setField('photoUrls', next);
  }

  function addPhoto() {
    const url = newPhotoUrl.trim();
    if (!url) return;
    updatePhotos([...photos, { url, width: '', height: '' }]);
    setNewPhotoUrl('');
  }

  function removePhoto(index) {
    updatePhotos(photos.filter((_, i) => i !== index));
  }

  function updatePhotoDimension(index, key, value) {
    updatePhotos(photos.map((p, i) => (i === index ? { ...p, [key]: value === '' ? '' : Number(value) } : p)));
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
            {photos.length > 0 && (
              <div className="admin-list">
                {photos.map((photo, index) => (
                  <div className="admin-list-item" key={`${photo.url}-${index}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="admin-list-thumb" src={photo.url} alt="" loading="lazy" />
                    <div className="admin-list-info">
                      <p className="admin-list-detail">{photo.url}</p>
                      <div className="image-dimension-row">
                        <label htmlFor={`photo-${index}-width`}>Width (px)</label>
                        <input
                          id={`photo-${index}-width`}
                          type="number"
                          min="0"
                          placeholder="auto"
                          value={photo.width || ''}
                          onChange={(e) => updatePhotoDimension(index, 'width', e.target.value)}
                        />
                        <label htmlFor={`photo-${index}-height`}>Height (px)</label>
                        <input
                          id={`photo-${index}-height`}
                          type="number"
                          min="0"
                          placeholder="auto"
                          value={photo.height || ''}
                          onChange={(e) => updatePhotoDimension(index, 'height', e.target.value)}
                        />
                      </div>
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
            {photos.length > 1 && (
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
