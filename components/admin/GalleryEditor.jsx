'use client';

import { useEffect, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getContentDoc } from '@/lib/firestore';
import { uploadGalleryImage, deleteGalleryImage } from '@/lib/storage';
import { removeAt } from '@/lib/adminList';

const emptyForm = (fields) => Object.fromEntries(fields.map((f) => [f.key, '']));

export default function GalleryEditor({
  docPath,
  arrayField,
  storageFolder,
  fields,
  fallback,
  resolveSrc = (item) => item.image,
  buildItem = (form, url) => ({ ...form, image: url }),
}) {
  const [data, setData] = useState(null);
  const [form, setForm] = useState(() => emptyForm(fields));
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    getContentDoc(docPath, fallback).then((loaded) => {
      if (!cancelled) setData(loaded);
    });
    return () => { cancelled = true; };
  }, [docPath, fallback]);

  if (!data) return <p>Loading gallery…</p>;

  const items = data[arrayField] || [];

  const persist = async (nextItems) => {
    const nextData = { ...data, [arrayField]: nextItems };
    await setDoc(doc(db, docPath), nextData);
    setData(nextData);
  };

  const handleRemove = async (index) => {
    setBusy(true);
    setStatus(null);
    try {
      const item = items[index];
      if (item.storagePath) await deleteGalleryImage(item.storagePath);
      await persist(removeAt(items, index));
    } catch (err) {
      setStatus({ type: 'error', message: `Remove failed: ${err.message}` });
    } finally {
      setBusy(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!file) {
      setStatus({ type: 'error', message: 'Choose an image to upload.' });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      const { url, storagePath } = await uploadGalleryImage(storageFolder, file);
      const newItem = { ...buildItem(form, url), storagePath };
      await persist([...items, newItem]);
      setForm(emptyForm(fields));
      setFile(null);
      setStatus({ type: 'success', message: 'Added.' });
    } catch (err) {
      setStatus({ type: 'error', message: `Upload failed: ${err.message}` });
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <div className="admin-gallery-grid">
        {items.map((item, index) => (
          <div className="admin-gallery-item" key={index}>
            <button
              type="button"
              className="admin-gallery-remove"
              onClick={() => handleRemove(index)}
              disabled={busy}
              aria-label="Remove image"
            >
              ✕
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveSrc(item)}
              alt={item.title || item.caption || ''}
              style={{ width: '100%', height: 100, objectFit: 'cover' }}
            />
            <p className="card-title">{item.title || item.caption}</p>
          </div>
        ))}
      </div>

      <form className="admin-form" onSubmit={handleAdd}>
        {fields.map((f) => (
          <div className="admin-field" key={f.key}>
            <label>{f.label}</label>
            {f.textarea ? (
              <textarea
                value={form[f.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            ) : (
              <input
                type="text"
                value={form[f.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <div className="admin-field">
          <label>Image file</label>
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
        </div>
        <div className="admin-actions">
          <button type="submit" className="btn" disabled={busy}>{busy ? 'Working…' : 'Add image'}</button>
        </div>
        {status && (
          <p className={status.type === 'error' ? 'admin-status admin-status-error' : 'admin-status admin-status-success'}>
            {status.message}
          </p>
        )}
      </form>
    </>
  );
}
