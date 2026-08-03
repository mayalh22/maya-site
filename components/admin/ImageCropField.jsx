'use client';

import { useRef } from 'react';

const DEFAULT_CROP = { zoomX: 1, zoomY: 1, posX: 50, posY: 50 };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function ImageCropField({ id, url, zoom, zoomX, zoomY, posX, posY, onChange }) {
  const frameRef = useRef(null);
  const dragState = useRef(null);

  const zx = zoomX ?? zoom ?? DEFAULT_CROP.zoomX;
  const zy = zoomY ?? zoom ?? DEFAULT_CROP.zoomY;
  const x = posX ?? DEFAULT_CROP.posX;
  const y = posY ?? DEFAULT_CROP.posY;

  function handlePointerDown(e) {
    if (!url) return;
    dragState.current = { startX: e.clientX, startY: e.clientY, posX: x, posY: y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e) {
    if (!dragState.current || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragState.current.startX) / rect.width) * 100;
    const dy = ((e.clientY - dragState.current.startY) / rect.height) * 100;
    onChange({
      zoomX: zx,
      zoomY: zy,
      posX: clamp(dragState.current.posX - dx, 0, 100),
      posY: clamp(dragState.current.posY - dy, 0, 100),
    });
  }

  function handlePointerUp() {
    dragState.current = null;
  }

  if (!url) {
    return <p className="admin-status">Add an image above to resize and crop it.</p>;
  }

  return (
    <div className="image-crop-field">
      <div
        className="image-crop-frame"
        ref={frameRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={url}
          alt=""
          draggable={false}
          style={{ transform: `scale(${zx}, ${zy})`, objectPosition: `${x}% ${y}%` }}
        />
      </div>
      <div className="image-crop-controls">
        <div className="image-crop-slider">
          <label htmlFor={`${id}-zoomX`}>Width ({Math.round(zx * 100)}%)</label>
          <input
            id={`${id}-zoomX`}
            type="range"
            min="1"
            max="3"
            step="0.05"
            value={zx}
            onChange={(e) => onChange({ zoomX: Number(e.target.value), zoomY: zy, posX: x, posY: y })}
          />
        </div>
        <div className="image-crop-slider">
          <label htmlFor={`${id}-zoomY`}>Height ({Math.round(zy * 100)}%)</label>
          <input
            id={`${id}-zoomY`}
            type="range"
            min="1"
            max="3"
            step="0.05"
            value={zy}
            onChange={(e) => onChange({ zoomX: zx, zoomY: Number(e.target.value), posX: x, posY: y })}
          />
        </div>
        <button type="button" className="btn btn-small btn-secondary" onClick={() => onChange({ ...DEFAULT_CROP })}>
          Reset crop
        </button>
      </div>
      <p className="admin-status">Drag the image to reposition it, use the sliders to adjust width and height independently.</p>
    </div>
  );
}
