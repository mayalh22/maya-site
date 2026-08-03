'use client';

import { useRef } from 'react';

const DEFAULT_CROP = { zoom: 1, posX: 50, posY: 50 };

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function ImageCropField({ id, url, zoom, posX, posY, onChange }) {
  const frameRef = useRef(null);
  const dragState = useRef(null);

  const z = zoom || DEFAULT_CROP.zoom;
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
      zoom: z,
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
          style={{ transform: `scale(${z})`, objectPosition: `${x}% ${y}%` }}
        />
      </div>
      <div className="image-crop-controls">
        <label htmlFor={`${id}-zoom`}>Zoom ({Math.round(z * 100)}%)</label>
        <input
          id={`${id}-zoom`}
          type="range"
          min="1"
          max="3"
          step="0.05"
          value={z}
          onChange={(e) => onChange({ zoom: Number(e.target.value), posX: x, posY: y })}
        />
        <button type="button" className="btn btn-small btn-secondary" onClick={() => onChange({ ...DEFAULT_CROP })}>
          Reset crop
        </button>
      </div>
      <p className="admin-status">Drag the image to reposition it, use the slider to zoom in.</p>
    </div>
  );
}
