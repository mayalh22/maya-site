'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getContentDoc } from '@/lib/firestore';
import { uploadGalleryImage, deleteGalleryImage } from '@/lib/storage';
import { resolveAssetSrc } from '@/lib/images';
import { removeAt } from '@/lib/adminList';
import photosFallback from '@/lib/content/photos.json';

const EMPTY_FORM = { caption: '', date: '' };

export default function PhotosGalleryAdmin() {
  const [data, setData] = useState(null);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [newCategory, setNewCategory] = useState('');
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getContentDoc('content/photos', photosFallback).then((loaded) => {
      if (!cancelled) setData(loaded);
    });
    return () => { cancelled = true; };
  }, []);

  if (!data) return <div className="section-wrapper"><div className="section-body"><p>Loading gallery…</p></div></div>;

  const categories = data.categories || [];
  const category = categories[categoryIndex];

  const persist = async (nextCategories) => {
    const nextData = { ...data, categories: nextCategories };
    await setDoc(doc(db, 'content/photos'), nextData);
    setData(nextData);
  };

  const handleAddCategory = async () => {
    const name = newCategory.trim();
    if (!name) return;
    const nextCategories = [...categories, { category: name, photos: [] }];
    await persist(nextCategories);
    setCategoryIndex(nextCategories.length - 1);
    setNewCategory('');
  };

  const handleRemovePhoto = async (photoIndex) => {
    setBusy(true);
    setStatus(null);
    try {
      const photo = category.photos[photoIndex];
      if (photo.storagePath) await deleteGalleryImage(photo.storagePath);
      const nextCategories = categories.map((c, i) =>
        i === categoryIndex ? { ...c, photos: removeAt(c.photos, photoIndex) } : c
      );
      await persist(nextCategories);
    } catch (err) {
      setStatus({ type: 'error', message: `Remove failed: ${err.message}` });
    } finally {
      setBusy(false);
    }
  };

  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'error', message: 'Choose an image to upload.' });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const { url, storagePath } = await uploadGalleryImage('photos', file);
      const newPhoto = { ...form, image: url, storagePath };
      const nextCategories = categories.map((c, i) =>
        i === categoryIndex ? { ...c, photos: [...c.photos, newPhoto] } : c
      );
      await persist(nextCategories);
      setForm(EMPTY_FORM);
      setFile(null);
      setStatus({ type: 'success', message: 'Added.' });
    } catch (err) {
      setStatus({ type: 'error', message: `Upload failed: ${err.message}` });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="section-wrapper">
      <div className="section-header"><h2>Photos gallery</h2></div>
      <div className="section-body">
        <div className="admin-field-row">
          <div className="admin-field">
            <label>Category</label>
            <select value={categoryIndex} onChange={(e) => setCategoryIndex(Number(e.target.value))}>
              {categories.map((c, i) => (
                <option key={c.category} value={i}>{c.category}</option>
              ))}
            </select>
          </div>
          <div className="admin-field">
            <label>New category</label>
            <div className="admin-color-row">
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="e.g. Travel" />
              <button type="button" className="btn" onClick={handleAddCategory}>Add</button>
            </div>
          </div>
        </div>

        {category && (
          <>
            <div className="admin-gallery-grid">
              {category.photos.map((photo, index) => (
                <div className="admin-gallery-item" key={index}>
                  <button
                    type="button"
                    className="admin-gallery-remove"
                    onClick={() => handleRemovePhoto(index)}
                    disabled={busy}
                    aria-label="Remove photo"
                  >
                    ✕
                  </button>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resolveAssetSrc(photo.image)} alt={photo.caption} style={{ width: '100%', height: 100, objectFit: 'cover' }} />
                  <p className="card-title">{photo.caption}</p>
                </div>
              ))}
            </div>

            <form className="admin-form" onSubmit={handleAddPhoto}>
              <div className="admin-field">
                <label>Caption</label>
                <input type="text" value={form.caption} onChange={(e) => setForm((p) => ({ ...p, caption: e.target.value }))} />
              </div>
              <div className="admin-field">
                <label>Date</label>
                <input type="text" value={form.date} onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))} />
              </div>
              <div className="admin-field">
                <label>Image file</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
              </div>
              <div className="admin-actions">
                <button type="submit" className="btn" disabled={busy}>{busy ? 'Working…' : `Add photo to ${category.category}`}</button>
              </div>
              {status && (
                <p className={status.type === 'error' ? 'admin-status admin-status-error' : 'admin-status admin-status-success'}>
                  {status.message}
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
