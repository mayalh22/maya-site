'use client';

import { useRef } from 'react';

const DEFAULT_CROP = { zoomX: 1, zoomY: 1, posX: 50, posY: 50, sizeW: 1, sizeH: 1 };
const FRAME_RATIO_W = 4;
const FRAME_RATIO_H = 3;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function ImageCropField({
  id,
  url,
  zoom,
  zoomX,
  zoomY,
  posX,
  posY,
  sizeW,
  sizeH,
  allowResize = true,
  onChange,
}) {
  const frameRef = useRef(null);
  const dragState = useRef(null);

  const zx = zoomX ?? zoom ?? DEFAULT_CROP.zoomX;
  const zy = zoomY ?? zoom ?? DEFAULT_CROP.zoomY;
  const x = posX ?? DEFAULT_CROP.posX;
  const y = posY ?? DEFAULT_CROP.posY;
  const sw = sizeW ?? DEFAULT_CROP.sizeW;
  const sh = sizeH ?? DEFAULT_CROP.sizeH;

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
      sizeW: sw,
      sizeH: sh,
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
        style={allowResize ? { aspectRatio: `${FRAME_RATIO_W * sw} / ${FRAME_RATIO_H * sh}` } : undefined}
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
        {allowResize && (
          <>
            <div className="image-crop-slider">
              <label htmlFor={`${id}-sizeW`}>Frame width ({Math.round(sw * 100)}%)</label>
              <input
                id={`${id}-sizeW`}
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={sw}
                onChange={(e) =>
                  onChange({ zoomX: zx, zoomY: zy, posX: x, posY: y, sizeW: Number(e.target.value), sizeH: sh })
                }
              />
            </div>
            <div className="image-crop-slider">
              <label htmlFor={`${id}-sizeH`}>Frame height ({Math.round(sh * 100)}%)</label>
              <input
                id={`${id}-sizeH`}
                type="range"
                min="0.5"
                max="2"
                step="0.05"
                value={sh}
                onChange={(e) =>
                  onChange({ zoomX: zx, zoomY: zy, posX: x, posY: y, sizeW: sw, sizeH: Number(e.target.value) })
                }
              />
            </div>
          </>
        )}
        <button type="button" className="btn btn-small btn-secondary" onClick={() => onChange({ ...DEFAULT_CROP })}>
          Reset crop
        </button>
      </div>
      <p className="admin-status">
        {allowResize
          ? 'Drag the image to reposition it. Frame width/height reshapes the box itself.'
          : 'Drag the image to reposition it.'}
      </p>
    </div>
  );
}
