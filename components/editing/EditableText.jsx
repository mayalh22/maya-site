'use client';

import { useEffect, useRef, useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { persistPatch } from '@/lib/editingPersist';
import { FONT_OPTIONS, fontFamilyFor } from '@/lib/theme';

// Click-to-edit text for the live/preview pages. Non-owners (and the brief
// pre-hydration window before auth resolves) get exactly the plain tag they'd
// have gotten before this component existed, so there's no layout shift or
// hydration mismatch — same guarantee GridLayoutEditor already relies on.
export default function EditableText({
  value,
  font,
  target,
  fieldKey,
  fontKey,
  revalidateTarget,
  as: Tag = 'p',
  multiline = false,
  type = 'text',
  placeholder = 'Click to add text…',
  className,
  allowFont = true,
  formatDisplay,
}) {
  const { isOwner } = useAdminUser();
  const [editing, setEditing] = useState(false);
  const [draftValue, setDraftValue] = useState(value || '');
  const [draftFont, setDraftFont] = useState(font || '');
  const [saving, setSaving] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const fKey = fontKey || `${fieldKey}Font`;

  useEffect(() => {
    if (editing) return;
    setDraftValue(value || '');
    setDraftFont(font || '');
  }, [value, font, editing]);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const display = formatDisplay ? formatDisplay(value) : value;
  const style = fontFamilyFor(font) ? { fontFamily: fontFamilyFor(font) } : undefined;

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
    if (draftValue === (value || '') && draftFont === (font || '')) return;
    setSaving(true);
    try {
      await persistPatch(target, { [fieldKey]: draftValue, [fKey]: draftFont || '' }, revalidateTarget);
    } finally {
      setSaving(false);
    }
  }

  function cancel() {
    setDraftValue(value || '');
    setDraftFont(font || '');
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
          style={fontFamilyFor(draftFont) ? { fontFamily: fontFamilyFor(draftFont) } : undefined}
        />
      ) : (
        <input
          ref={inputRef}
          type={type}
          value={draftValue}
          placeholder={placeholder}
          onChange={(e) => setDraftValue(e.target.value)}
          onKeyDown={handleKeyDown}
          style={fontFamilyFor(draftFont) ? { fontFamily: fontFamilyFor(draftFont) } : undefined}
        />
      )}
      {allowFont && (
        <span className="editable-text-fonts">
          <button
            type="button"
            className={!draftFont ? 'font-chip font-chip-active' : 'font-chip'}
            onClick={() => setDraftFont('')}
          >
            Site default
          </button>
          {FONT_OPTIONS.map((opt) => (
            <button
              type="button"
              key={opt.value}
              className={draftFont === opt.value ? 'font-chip font-chip-active' : 'font-chip'}
              style={{ fontFamily: opt.fontFamily }}
              onClick={() => setDraftFont(opt.value)}
              title={opt.label}
            >
              Aa
            </button>
          ))}
        </span>
      )}
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
