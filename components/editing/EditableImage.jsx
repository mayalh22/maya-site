'use client';

import { useEffect, useRef, useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { persistPatch } from '@/lib/editingPersist';
import CroppedImage from '@/components/CroppedImage';

const DEFAULT_CROP = { zoomX: 1, zoomY: 1, posX: 50, posY: 50, sizeW: 1, sizeH: 1 };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Supersedes the old admin-only ImageCropField for live use: drag-to-reposition
// happens on the real image, and (unlike ImageCropField, which only exposed
// size sliders + a reset button) this adds real zoom X/Y sliders so shrinking
// and zooming are both actually reachable.
export default function EditableImage({
  src,
  alt,
  className,
  style,
  onClick,
  loading = 'lazy',
  zoomX,
  zoomY,
  posX,
  posY,
  sizeW,
  sizeH,
  cropKeyPrefix = 'imageUrl',
  urlKey,
  target,
  revalidateTarget,
  allowRemove = false,
}) {
  const { isOwner } = useAdminUser();
  const [editing, setEditing] = useState(false);
  const [crop, setCrop] = useState({
    zoomX: zoomX ?? DEFAULT_CROP.zoomX,
    zoomY: zoomY ?? DEFAULT_CROP.zoomY,
    posX: posX ?? DEFAULT_CROP.posX,
    posY: posY ?? DEFAULT_CROP.posY,
    sizeW: sizeW ?? DEFAULT_CROP.sizeW,
    sizeH: sizeH ?? DEFAULT_CROP.sizeH,
  });
  const [urlDraft, setUrlDraft] = useState(src || '');
  const dragState = useRef(null);
  const frameRef = useRef(null);
  const saveTimer = useRef(null);
  const uKey = urlKey || cropKeyPrefix || 'imageUrl';

  useEffect(() => {
    if (editing) return;
    setCrop({
      zoomX: zoomX ?? DEFAULT_CROP.zoomX,
      zoomY: zoomY ?? DEFAULT_CROP.zoomY,
      posX: posX ?? DEFAULT_CROP.posX,
      posY: posY ?? DEFAULT_CROP.posY,
      sizeW: sizeW ?? DEFAULT_CROP.sizeW,
      sizeH: sizeH ?? DEFAULT_CROP.sizeH,
    });
    setUrlDraft(src || '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomX, zoomY, posX, posY, sizeW, sizeH, src, editing]);

  if (!isOwner) {
    return <CroppedImage src={src} alt={alt} className={className} style={style} onClick={onClick} loading={loading} {...crop} />;
  }

  function keysFor(patch) {
    const p = cropKeyPrefix || '';
    const map = { zoomX: `${p}ZoomX`, zoomY: `${p}ZoomY`, posX: `${p}PosX`, posY: `${p}PosY`, sizeW: `${p}SizeW`, sizeH: `${p}SizeH` };
    return Object.fromEntries(Object.entries(patch).map(([k, v]) => [map[k] || k, v]));
  }

  function scheduleSave(patch) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      persistPatch(target, keysFor(patch), revalidateTarget);
    }, 400);
  }

  function update(patch) {
    setCrop((prev) => {
      const next = { ...prev, ...patch };
      scheduleSave(next);
      return next;
    });
  }

  function commitUrl() {
    const url = urlDraft.trim();
    if (!url || url === src) return;
    persistPatch(target, { [uKey]: url }, revalidateTarget);
  }

  function handlePointerDown(e) {
    dragState.current = { startX: e.clientX, startY: e.clientY, posX: crop.posX, posY: crop.posY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    if (!dragState.current || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragState.current.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragState.current.startY) / rect.height) * 100;
    update({ posX: clamp(dragState.current.posX - dx, 0, 100), posY: clamp(dragState.current.posY - dy, 0, 100) });
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  function resetCrop() {
    update({ ...DEFAULT_CROP });
  }

  async function handleRemove() {
    setEditing(false);
    await persistPatch(target, null, revalidateTarget);
  }

  return (
    <span className="editable-image-wrap">
      <span
        ref={frameRef}
        className={editing ? 'editable-image-frame editable-image-frame-active' : 'editable-image-frame'}
        onPointerDown={editing ? handlePointerDown : undefined}
        onPointerMove={editing ? handlePointerMove : undefined}
        onPointerUp={editing ? handlePointerUp : undefined}
        onPointerCancel={editing ? handlePointerUp : undefined}
      >
        <CroppedImage src={src} alt={alt} className={className} loading={loading} onClick={editing ? undefined : onClick} {...crop} />
      </span>
      <button type="button" className="editable-image-toggle" onClick={() => setEditing((v) => !v)}>
        {editing ? 'Done' : '✎ Edit image'}
      </button>
      {editing && (
        <span className="editable-image-panel">
          <label>
            Zoom X ({Math.round(crop.zoomX * 100)}%)
            <input type="range" min="0.5" max="3" step="0.05" value={crop.zoomX} onChange={(e) => update({ zoomX: Number(e.target.value) })} />
          </label>
          <label>
            Zoom Y ({Math.round(crop.zoomY * 100)}%)
            <input type="range" min="0.5" max="3" step="0.05" value={crop.zoomY} onChange={(e) => update({ zoomY: Number(e.target.value) })} />
          </label>
          <label>
            Frame width ({Math.round(crop.sizeW * 100)}%)
            <input type="range" min="0.5" max="2" step="0.05" value={crop.sizeW} onChange={(e) => update({ sizeW: Number(e.target.value) })} />
          </label>
          <label>
            Frame height ({Math.round(crop.sizeH * 100)}%)
            <input type="range" min="0.5" max="2" step="0.05" value={crop.sizeH} onChange={(e) => update({ sizeH: Number(e.target.value) })} />
          </label>
          <label>
            Image URL
            <input
              type="url"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onBlur={commitUrl}
            />
          </label>
          <span className="editable-image-actions">
            <button type="button" className="btn btn-small btn-secondary" onClick={resetCrop}>
              Reset
            </button>
            {allowRemove && (
              <button type="button" className="btn btn-small btn-danger" onClick={handleRemove}>
                Remove
              </button>
            )}
          </span>
          <span className="admin-status">Drag the image to reposition it.</span>
        </span>
      )}
    </span>
  );
}
