'use client';

import { useEffect, useRef, useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { persistPatch } from '@/lib/editingPersist';
import CroppedImage from '@/components/CroppedImage';

const DEFAULT_CROP = { zoomX: 1, zoomY: 1, posX: 50, posY: 50, sizeW: 1, sizeH: 1 };
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const MIN_SIZE = 0.5;
const MAX_SIZE = 2;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Corner/edge handles: id, CSS position, cursor, and which axes + direction
// each one drags. dxSign/dySign are +1 when dragging away from the frame
// center grows that axis, -1 when dragging away shrinks it.
const HANDLES = [
  { id: 'nw', top: 0, left: 0, cursor: 'nwse-resize', dxSign: -1, dySign: -1 },
  { id: 'n', top: 0, left: 50, cursor: 'ns-resize', dySign: -1 },
  { id: 'ne', top: 0, left: 100, cursor: 'nesw-resize', dxSign: 1, dySign: -1 },
  { id: 'e', top: 50, left: 100, cursor: 'ew-resize', dxSign: 1 },
  { id: 'se', top: 100, left: 100, cursor: 'nwse-resize', dxSign: 1, dySign: 1 },
  { id: 's', top: 100, left: 50, cursor: 'ns-resize', dySign: 1 },
  { id: 'sw', top: 100, left: 0, cursor: 'nesw-resize', dxSign: -1, dySign: 1 },
  { id: 'w', top: 50, left: 0, cursor: 'ew-resize', dxSign: -1 },
];

// Supersedes the old slider-panel crop editor: dragging the image
// repositions it, dragging the frame's corner/edge handles crops it larger
// or smaller, and scrolling over it zooms — all directly on the image
// itself, the way Google Docs' image crop works, instead of through
// separate numeric controls.
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
  const [showUrlField, setShowUrlField] = useState(false);
  const dragState = useRef(null);
  const resizeState = useRef(null);
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

  function handleWheel(e) {
    if (!editing) return;
    e.preventDefault();
    const delta = -e.deltaY * 0.0015;
    update({
      zoomX: clamp(crop.zoomX + delta, MIN_ZOOM, MAX_ZOOM),
      zoomY: clamp(crop.zoomY + delta, MIN_ZOOM, MAX_ZOOM),
    });
  }

  function handleHandlePointerDown(handle, e) {
    e.stopPropagation();
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    resizeState.current = {
      handle,
      startX: e.clientX,
      startY: e.clientY,
      sizeW: crop.sizeW,
      sizeH: crop.sizeH,
      unitW: rect.width / crop.sizeW,
      unitH: rect.height / crop.sizeH,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handleHandlePointerMove(e) {
    const state = resizeState.current;
    if (!state) return;
    const dx = e.clientX - state.startX;
    const dy = e.clientY - state.startY;
    const patch = {};
    if (state.handle.dxSign) {
      patch.sizeW = clamp(state.sizeW + (dx * state.handle.dxSign) / state.unitW, MIN_SIZE, MAX_SIZE);
    }
    if (state.handle.dySign) {
      patch.sizeH = clamp(state.sizeH + (dy * state.handle.dySign) / state.unitH, MIN_SIZE, MAX_SIZE);
    }
    update(patch);
  }
  function handleHandlePointerUp() {
    resizeState.current = null;
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
        onPointerMove={editing ? (e) => { handlePointerMove(e); handleHandlePointerMove(e); } : undefined}
        onPointerUp={editing ? (e) => { handlePointerUp(e); handleHandlePointerUp(e); } : undefined}
        onPointerCancel={editing ? (e) => { handlePointerUp(e); handleHandlePointerUp(e); } : undefined}
        onWheel={editing ? handleWheel : undefined}
      >
        <CroppedImage src={src} alt={alt} className={className} loading={loading} onClick={editing ? undefined : onClick} {...crop} />
        {editing &&
          HANDLES.map((handle) => (
            <span
              key={handle.id}
              className="crop-handle"
              style={{ top: `${handle.top}%`, left: `${handle.left}%`, cursor: handle.cursor }}
              onPointerDown={(e) => handleHandlePointerDown(handle, e)}
            />
          ))}
      </span>
      <button type="button" className="editable-image-toggle" onClick={() => setEditing((v) => !v)}>
        {editing ? 'Done' : 'Edit image'}
      </button>
      {editing && (
        <span className="editable-image-toolbar">
          <span className="admin-status">Drag to reposition. Drag a handle to crop. Scroll to zoom.</span>
          <span className="editable-image-actions">
            <button type="button" className="btn btn-small btn-secondary" onClick={resetCrop}>
              Reset
            </button>
            <button type="button" className="btn btn-small btn-secondary" onClick={() => setShowUrlField((v) => !v)}>
              Change URL
            </button>
            {allowRemove && (
              <button type="button" className="btn btn-small btn-danger" onClick={handleRemove}>
                Remove
              </button>
            )}
          </span>
          {showUrlField && (
            <input
              type="url"
              className="editable-image-url-input"
              value={urlDraft}
              onChange={(e) => setUrlDraft(e.target.value)}
              onBlur={commitUrl}
              placeholder="Image URL"
            />
          )}
        </span>
      )}
    </span>
  );
}
