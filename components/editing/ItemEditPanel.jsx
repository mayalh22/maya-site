'use client';

import { useState } from 'react';
import ImageUrlField from '@/components/admin/ImageUrlField';
import AttachmentsField from '@/components/admin/AttachmentsField';

function selectOptions(f) {
  return f.options.map((opt) => (typeof opt === 'string' ? { value: opt, label: opt } : opt));
}

function emptyForm(fields) {
  return Object.fromEntries(
    fields.map((f) => [f.key, f.type === 'attachments' ? [] : f.type === 'select' ? selectOptions(f)[0]?.value ?? '' : ''])
  );
}

function isValid(form, fields) {
  return fields.every((f) => {
    if (f.type === 'attachments') return !f.required || (Array.isArray(form[f.key]) && form[f.key].length > 0);
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

// A per-item popover form for whatever isn't worth inlining directly on the
// card (links, select/shape fields, attachments) — and, opened from a "+ Add"
// tile with the full field list, the create form for a brand new item.
export default function ItemEditPanel({
  fields,
  initial,
  collectionName,
  itemId,
  triggerLabel = '✎ Edit',
  triggerClassName = 'btn btn-small',
  submitLabel = 'Save',
  onSubmit,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(() => ({ ...emptyForm(fields), ...(initial || {}) }));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  function toggle() {
    if (!open) setForm({ ...emptyForm(fields), ...(initial || {}) });
    setOpen((v) => !v);
    setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isValid(form, fields)) {
      setError('Check the required fields.');
      return;
    }
    setBusy(true);
    setError(null);
    try {
      await onSubmit(form);
      setOpen(false);
    } catch (err) {
      setError(`Save failed: ${err.message}`);
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete() {
    if (!onDelete || !window.confirm('Delete this item?')) return;
    setBusy(true);
    try {
      await onDelete();
      setOpen(false);
    } finally {
      setBusy(false);
    }
  }

  const idBase = `panel-${itemId || 'new'}`;

  return (
    <>
      <button type="button" className={triggerClassName} onClick={toggle}>
        {triggerLabel}
      </button>
      {open && (
        <div className="item-edit-overlay" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div className="item-edit-panel" onClick={(e) => e.stopPropagation()}>
          <form className="admin-form" onSubmit={handleSubmit}>
            {fields.map((f) => (
              <div className="admin-field" key={f.key}>
                <label htmlFor={`${idBase}-${f.key}`}>
                  {f.label}
                  {f.required ? ' *' : ''}
                </label>
                {f.type === 'textarea' ? (
                  <textarea
                    id={`${idBase}-${f.key}`}
                    value={form[f.key] || ''}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  />
                ) : f.type === 'select' ? (
                  <select
                    id={`${idBase}-${f.key}`}
                    value={form[f.key] || ''}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  >
                    {selectOptions(f).map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : f.type === 'url' ? (
                  <ImageUrlField
                    id={`${idBase}-${f.key}`}
                    value={form[f.key] || ''}
                    onChange={(value) => setForm((p) => ({ ...p, [f.key]: value }))}
                  />
                ) : f.type === 'attachments' ? (
                  <AttachmentsField
                    id={`${idBase}-${f.key}`}
                    value={form[f.key] || []}
                    onChange={(value) => setForm((p) => ({ ...p, [f.key]: value }))}
                    collectionName={collectionName}
                    itemId={itemId}
                  />
                ) : f.type === 'datalist' ? (
                  <>
                    <input
                      id={`${idBase}-${f.key}`}
                      type="text"
                      list={`${idBase}-${f.key}-opts`}
                      value={form[f.key] || ''}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    />
                    <datalist id={`${idBase}-${f.key}-opts`}>
                      {(f.suggestions || []).map((opt) => (
                        <option key={opt} value={opt} />
                      ))}
                    </datalist>
                  </>
                ) : (
                  <input
                    id={`${idBase}-${f.key}`}
                    type={f.type === 'month' ? 'month' : f.type === 'link' ? 'url' : 'text'}
                    value={form[f.key] || ''}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  />
                )}
              </div>
            ))}
            <div className="admin-actions">
              <button type="submit" className="btn btn-small" disabled={busy}>
                {busy ? 'Saving…' : submitLabel}
              </button>
              <button type="button" className="btn btn-small btn-secondary" onClick={() => setOpen(false)} disabled={busy}>
                Cancel
              </button>
              {onDelete && (
                <button type="button" className="btn btn-small btn-danger" onClick={handleDelete} disabled={busy}>
                  Delete
                </button>
              )}
            </div>
            {error && <p className="admin-status admin-status-error">{error}</p>}
          </form>
          </div>
        </div>
      )}
    </>
  );
}
