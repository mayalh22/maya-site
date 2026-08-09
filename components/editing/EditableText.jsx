'use client';

import { useEffect, useRef, useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { persistPatch } from '@/lib/editingPersist';

const ALIGN_OPTIONS = [
  { value: 'left', label: 'Align left', glyph: '⟸' },
  { value: 'center', label: 'Align center', glyph: '≡' },
  { value: 'right', label: 'Align right', glyph: '⟹' },
];

// Click-to-edit text for the live/preview pages. Non-owners (and the brief
// pre-hydration window before auth resolves) get exactly the plain tag they'd
// have gotten before this component existed, so there's no layout shift or
// hydration mismatch — same guarantee GridLayoutEditor already relies on.
// Typography (font family) is theme-controlled only; the one per-element
// override this component owns is text alignment.
export default function EditableText({
  value,
  align,
  target,
  fieldKey,
  alignKey,
  revalidateTarget,
  as: Tag = 'p',
  multiline = false,
  type = 'text',
  placeholder = 'Click to add text…',
  className,
  formatDisplay,
}) {
  const { isOwner } = useAdminUser();
  const [editing, setEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value || '');
  const [draftAlign, setDraftAlign] = useState(align || '');
  const [saving, setSaving] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const aKey = alignKey || `${fieldKey}Align`;

  useEffect(() => {
    if (editing) return;
    setDraftValue(value || '');
    setDraftAlign(align || '');
  }, [value, align, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const display = formatDisplay ? formatDisplay(value) : value;
  const style = align ? { textAlign: align } : undefined;

  if (!isOwner) {
    if (!value) return null;
    return (
      <Tag className={className} style={style}>
        {display}
      </Tag>
    );
  }

  async function commit() {
    setEditing(false);
    if (draftValue === (value || '') && draftAlign === (align || '')) return;
    setSaving(true);
    try {
      await persistPatch(target, { [fieldKey]: draftValue, [aKey]: draftAlign || '' }, revalidateTarget);
    } finally {
      setSaving(false);
    }
  }

  function cancel() {
    setDraftValue(value || '');
    setDraftAlign(align || '');
    setEditing(false);
  }

  function handleBlur(e) {
    if (containerRef.current && e.relatedTarget && containerRef.current.contains(e.relatedTarget)) return;
    commit();
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    } else if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      commit();
    }
  }

  if (!editing) {
    return (
      <Tag
        className={`editable-text ${className || ''}`.trim()}
        style={style}
        onClick={() => setEditing(true)}
        tabIndex={0}
        role="button"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setEditing(true);
          }
        }}
      >
        {value ? display : <span className="editable-text-placeholder">{placeholder}</span>}
        <span className="editable-text-pencil" aria-hidden="true">✎</span>
      </Tag>
    );
  }

  return (
    <span className="editable-text-editing" ref={containerRef} onBlur={handleBlur}>
      {multiline ? (
        <textarea
          ref={inputRef}
          value={draftValue}
          placeholder={placeholder}
          onChange={(e) => setDraftValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={style}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          value={draftValue}
          placeholder={placeholder}
          onChange={(e) => setDraftValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={style}
        />
      )}
      <span className="editable-text-align" role="group" aria-label="Text alignment">
        {ALIGN_OPTIONS.map((opt) => (
          <button
            type="button"
            key={opt.value}
            className={draftAlign === opt.value ? 'align-chip align-chip-active' : 'align-chip'}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setDraftAlign(draftAlign === opt.value ? '' : opt.value)}
            title={opt.label}
            aria-pressed={draftAlign === opt.value}
          >
            {opt.glyph}
          </button>
        ))}
      </span>
      <span className="editable-text-actions">
        <button type="button" className="btn btn-small" onMouseDown={(e) => e.preventDefault()} onClick={commit} disabled={saving}>
          {saving ? 'Saving…' : 'Done'}
        </button>
        <button
          type="button"
          className="btn btn-small btn-secondary"
          onMouseDown={(e) => e.preventDefault()}
          onClick={cancel}
          disabled={saving}
        >
          Cancel
        </button>
      </span>
    </span>
  );
}
