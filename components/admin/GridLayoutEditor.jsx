'use client';

import { useRef, useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { getSingleton, setSingleton } from '@/lib/db';
import { revalidatePublicPath } from '@/lib/revalidate';

const LAYOUT_DOC = 'settings/layout';

const MIN_GAP = 0;
const MAX_GAP = 48;
const MIN_ITEM_WIDTH = 100;
const MAX_ITEM_WIDTH = 480;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Lets the signed-in owner drag a grid's gap/item-width directly on the real
// public page — same direct-manipulation feel as EditableImage's crop
// handles, instead of a slider panel. Initial values come from the server
// (siblings to siteContent messages) so there's no client fetch and no
// flash on load; edits are only ever performed and visible to the owner.
export default function GridLayoutEditor({
  sectionKey,
  defaultGap = 16,
  defaultItemWidth = 240,
  initial,
  revalidateTarget,
  children,
}) {
  const { isOwner } = useAdminUser();
  const [editing, setEditing] = useState(false);
  const [gap, setGap] = useState(initial?.gap ?? defaultGap);
  const [itemWidth, setItemWidth] = useState(initial?.itemWidth ?? defaultItemWidth);
  const saveTimer = useRef(null);
  const dragState = useRef(null);

  function persist(nextGap, nextItemWidth) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const all = (await getSingleton(LAYOUT_DOC, {})) || {};
      await setSingleton(LAYOUT_DOC, { ...all, [sectionKey]: { gap: nextGap, itemWidth: nextItemWidth } });
      await revalidatePublicPath(revalidateTarget);
    }, 500);
  }

  function update(nextGap, nextItemWidth) {
    setGap(nextGap);
    setItemWidth(nextItemWidth);
    persist(nextGap, nextItemWidth);
  }

  function handlePointerDown(kind, e) {
    e.stopPropagation();
    dragState.current = { kind, startX: e.clientX, gap, itemWidth };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    const state = dragState.current;
    if (!state) return;
    const dx = e.clientX - state.startX;
    if (state.kind === 'gap') {
      update(clamp(Math.round(state.gap + dx), MIN_GAP, MAX_GAP), itemWidth);
    } else {
      update(gap, clamp(Math.round(state.itemWidth + dx), MIN_ITEM_WIDTH, MAX_ITEM_WIDTH));
    }
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  const style = { '--grid-gap': `${gap}px`, '--item-width': `${itemWidth}px` };

  return (
    <div className="layout-editable" style={style}>
      {children}
      {isOwner && (
        <div className="layout-editor">
          <button type="button" className="layout-editor-toggle" onClick={() => setEditing((v) => !v)}>
            {editing ? 'Done spacing' : 'Edit spacing'}
          </button>
          {editing && (
            <div className="layout-editor-handles">
              <span
                className="layout-handle"
                title={`Item width: ${itemWidth}px — drag to resize`}
                onPointerDown={(e) => handlePointerDown('width', e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                ↔ Width
              </span>
              <span
                className="layout-handle"
                title={`Gap: ${gap}px — drag to resize`}
                onPointerDown={(e) => handlePointerDown('gap', e)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                ↔ Gap
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
