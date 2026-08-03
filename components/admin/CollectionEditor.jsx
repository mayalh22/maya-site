'use client';

import { useEffect, useState } from 'react';
import { listCollection, addItem, updateItem, removeItem } from '@/lib/db';
import { revalidatePublicPath } from '@/lib/revalidate';
import ImageUrlField from './ImageUrlField';

function emptyForm(fields) {
  return Object.fromEntries(fields.map((f) => [f.key, f.type === 'select' ? (f.options?.[0] ?? '') : '']));
}

function isValid(form, fields) {
  return fields.every((f) => {
    const value = String(form[f.key] || '').trim();
    if (f.required && !value) return false;
    if (f.type === 'url' && value) {
      try {
        new URL(value);
      } catch {
        return false;
      }
    }
    return true;
  });
}

export default function CollectionEditor({
  collectionName,
  fields,
  itemLabel,
  itemDetail,
  emptyMessage,
  orderByField = 'createdAt',
  direction = 'desc',
  deriveId,
  revalidatePath: revalidateTarget,
}) {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(() => emptyForm(fields));
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);

  const imageField = fields.find((f) => f.type === 'url');

  async function load() {
    const list = await listCollection(collectionName, { orderByField, direction });
    setItems(list);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  function startEdit(item) {
    setEditingId(item.id);
    setForm(Object.fromEntries(fields.map((f) => [f.key, item[f.key] ?? ''])));
    setStatus(null);
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm(fields));
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid(form, fields)) {
      setStatus({ type: 'error', message: 'Check the required fields and image URL.' });
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      if (editingId) {
        await updateItem(collectionName, editingId, form);
      } else {
        const id = deriveId ? await deriveId(form) : null;
        await addItem(collectionName, form, id);
      }
      await revalidatePublicPath(revalidateTarget);
      await load();
      startCreate();
      setStatus({ type: 'success', message: editingId ? 'Updated.' : 'Added.' });
    } catch (err) {
      setStatus({ type: 'error', message: `Save failed: ${err.message}` });
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(id) {
    setBusy(true);
    setStatus(null);
    try {
      await removeItem(collectionName, id);
      await revalidatePublicPath(revalidateTarget);
      await load();
      if (editingId === id) startCreate();
      setStatus({ type: 'success', message: 'Deleted.' });
    } catch (err) {
      setStatus({ type: 'error', message: `Delete failed: ${err.message}` });
    } finally {
      setBusy(false);
    }
  }

  if (items === null) return <p className="admin-loading">Loading…</p>;

  return (
    <>
      <div className="admin-list">
        {items.length === 0 && <p className="admin-empty">{emptyMessage}</p>}
        {items.map((item) => (
          <div className="admin-list-item" key={item.id}>
            {imageField && item[imageField.key] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="admin-list-thumb" src={item[imageField.key]} alt="" loading="lazy" />
            )}
            <div className="admin-list-info">
              <p className="admin-list-title">{itemLabel(item)}</p>
              {itemDetail && <p className="admin-list-detail">{itemDetail(item)}</p>}
            </div>
            <div className="admin-list-actions">
              <button type="button" className="btn btn-small" onClick={() => startEdit(item)} disabled={busy}>
                Edit
              </button>
              <button
                type="button"
                className="btn btn-small btn-danger"
                onClick={() => handleDelete(item.id)}
                disabled={busy}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <h3>{editingId ? 'Edit item' : 'Add item'}</h3>
        {fields.map((f) => (
          <div className="admin-field" key={f.key}>
            <label htmlFor={`field-${f.key}`}>
              {f.label}
              {f.required ? ' *' : ''}
            </label>
            {f.type === 'textarea' ? (
              <textarea
                id={`field-${f.key}`}
                value={form[f.key] || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            ) : f.type === 'select' ? (
              <select
                id={`field-${f.key}`}
                value={form[f.key] || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              >
                {f.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : f.type === 'url' ? (
              <ImageUrlField
                id={`field-${f.key}`}
                value={form[f.key] || ''}
                onChange={(value) => setForm((prev) => ({ ...prev, [f.key]: value }))}
              />
            ) : f.type === 'datalist' ? (
              <>
                <input
                  id={`field-${f.key}`}
                  type="text"
                  list={`field-${f.key}-options`}
                  value={form[f.key] || ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                />
                <datalist id={`field-${f.key}-options`}>
                  {Array.from(new Set(items.map((item) => item[f.key]).filter(Boolean))).map((opt) => (
                    <option key={opt} value={opt} />
                  ))}
                </datalist>
              </>
            ) : (
              <input
                id={`field-${f.key}`}
                type={f.type === 'month' ? 'month' : 'text'}
                value={form[f.key] || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            )}
          </div>
        ))}
        <div className="admin-actions">
          <button type="submit" className="btn" disabled={busy}>
            {busy ? 'Saving…' : editingId ? 'Save changes' : 'Add'}
          </button>
          {editingId && (
            <button type="button" className="btn btn-secondary" onClick={startCreate} disabled={busy}>
              Cancel
            </button>
          )}
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
