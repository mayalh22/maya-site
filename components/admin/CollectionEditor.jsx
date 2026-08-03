'use client';

import { useEffect, useState } from 'react';
import { listCollection, listOrdered, addItem, updateItem, removeItem } from '@/lib/db';
import { revalidatePublicPath } from '@/lib/revalidate';
import ImageUrlField from './ImageUrlField';
import AttachmentsField from './AttachmentsField';
import ImageCropField from './ImageCropField';

function formKeys(fields) {
  return fields.flatMap((f) => (f.type === 'url' ? [f.key, `${f.key}Zoom`, `${f.key}PosX`, `${f.key}PosY`] : [f.key]));
}

function selectOptions(f) {
  return f.options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));
}

// Crop companion keys (<key>Zoom / <key>PosX / <key>PosY) aren't in `fields`
// themselves, so their defaults are inferred from the key's suffix.
function defaultFor(key, fields) {
  const f = fields.find((field) => field.key === key);
  if (!f) {
    if (key.endsWith('Zoom')) return 1;
    if (key.endsWith('PosX') || key.endsWith('PosY')) return 50;
    return '';
  }
  if (f.type === 'select') return selectOptions(f)[0]?.value ?? '';
  if (f.type === 'attachments') return [];
  return '';
}

function emptyForm(fields) {
  return Object.fromEntries(formKeys(fields).map((key) => [key, defaultFor(key, fields)]));
}

function isValid(form, fields) {
  return fields.every((f) => {
    if (f.type === 'attachments') {
      return !f.required || (Array.isArray(form[f.key]) && form[f.key].length > 0);
    }
    const value = String(form[f.key] || '').trim();
    if (f.required && !value) return false;
    if ((f.type === 'url' || f.type === 'link') && value) {
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
  reorderable = false,
}) {
  const [items, setItems] = useState(null);
  const [form, setForm] = useState(() => emptyForm(fields));
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(null);
  const [dragIndex, setDragIndex] = useState(null);

  const imageField = fields.find((f) => f.type === 'url');

  async function load() {
    const list = reorderable
      ? await listOrdered(collectionName)
      : await listCollection(collectionName, { orderByField, direction });
    setItems(list);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  function startEdit(item) {
    setEditingId(item.id);
    setForm(Object.fromEntries(formKeys(fields).map((key) => [key, item[key] ?? defaultFor(key, fields)])));
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
        const payload = reorderable ? { ...form, order: items?.length ?? 0 } : form;
        await addItem(collectionName, payload, id);
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

  async function persistOrder(list) {
    setBusy(true);
    try {
      await Promise.all(list.map((item, i) => updateItem(collectionName, item.id, { order: i })));
      await revalidatePublicPath(revalidateTarget);
    } catch (err) {
      setStatus({ type: 'error', message: `Reorder failed: ${err.message}` });
    } finally {
      setBusy(false);
    }
  }

  function handleDrop(index) {
    if (dragIndex === null || dragIndex === index) {
      setDragIndex(null);
      return;
    }
    const reordered = [...items];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(index, 0, moved);
    setItems(reordered);
    setDragIndex(null);
    persistOrder(reordered);
  }

  if (items === null) return <p className="admin-loading">Loading…</p>;

  return (
    <>
      <div className="admin-list">
        {items.length === 0 && <p className="admin-empty">{emptyMessage}</p>}
        {items.map((item, index) => (
          <div
            className={reorderable ? 'admin-list-item admin-list-item-draggable' : 'admin-list-item'}
            key={item.id}
            draggable={reorderable}
            onDragStart={() => setDragIndex(index)}
            onDragOver={(e) => reorderable && e.preventDefault()}
            onDrop={() => reorderable && handleDrop(index)}
            onDragEnd={() => setDragIndex(null)}
          >
            {reorderable && <span className="admin-drag-handle" aria-hidden="true">⠿</span>}
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
                {selectOptions(f).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : f.type === 'url' ? (
              <>
                <ImageUrlField
                  id={`field-${f.key}`}
                  value={form[f.key] || ''}
                  onChange={(value) => setForm((prev) => ({ ...prev, [f.key]: value }))}
                />
                <ImageCropField
                  id={`field-${f.key}`}
                  url={form[f.key]}
                  zoom={form[`${f.key}Zoom`]}
                  posX={form[`${f.key}PosX`]}
                  posY={form[`${f.key}PosY`]}
                  onChange={({ zoom, posX, posY }) =>
                    setForm((prev) => ({ ...prev, [`${f.key}Zoom`]: zoom, [`${f.key}PosX`]: posX, [`${f.key}PosY`]: posY }))
                  }
                />
              </>
            ) : f.type === 'attachments' ? (
              <AttachmentsField
                id={`field-${f.key}`}
                value={form[f.key] || []}
                onChange={(value) => setForm((prev) => ({ ...prev, [f.key]: value }))}
                collectionName={collectionName}
                itemId={editingId}
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
                type={f.type === 'month' ? 'month' : f.type === 'link' ? 'url' : 'text'}
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
