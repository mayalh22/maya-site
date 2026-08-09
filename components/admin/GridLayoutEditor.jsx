'use client';

import { useRef, useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { getSingleton, setSingleton } from '@/lib/db';
import { revalidatePublicPath } from '@/lib/revalidate';

const LAYOUT_DOC = 'settings/layout';

const MIN_GAP = 0;
const MAX_GAP = 48;
const MIN_ITEMS_PER_ROW = 1;
const MAX_ITEMS_PER_ROW = 8;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Lets the signed-in owner drag a grid's gap and step its items-per-row
// directly on the real public page — same direct-manipulation feel as
// EditableImage's crop handles, instead of a slider panel. Initial values
// come from the server (siblings to siteContent messages) so there's no
// client fetch and no flash on load; edits are only ever performed and
// visible to the owner. The strips stay horizontally scrollable — setting
// itemsPerRow controls how many cards fit the visible width before that
// scrolling kicks in, by sizing --item-width as a fraction of the row.
export default function GridLayoutEditor({
  sectionKey,
  defaultGap = 16,
  defaultItemsPerRow = 4,
  initial,
  revalidateTarget,
  children,
}) {
  const { isOwner } = useAdminUser();
  const [editing, setEditing] = useState(false);
  const [gap, setGap] = useState(initial?.gap ?? defaultGap);
  const [itemsPerRow, setItemsPerRow] = useState(initial?.itemsPerRow ?? defaultItemsPerRow);
  const saveTimer = useRef(null);
  const dragState = useRef(null);

  function persist(nextGap, nextItemsPerRow) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const all = (await getSingleton(LAYOUT_DOC, {})) || {};
      await setSingleton(LAYOUT_DOC, { ...all, [sectionKey]: { gap: nextGap, itemsPerRow: nextItemsPerRow } });
      await revalidatePublicPath(revalidateTarget);
    }, 500);
  }

  function update(nextGap, nextItemsPerRow) {
    setGap(nextGap);
    setItemsPerRow(nextItemsPerRow);
    persist(nextGap, nextItemsPerRow);
  }

  function handlePointerDown(e) {
    e.stopPropagation();
    dragState.current = { startX: e.clientX, gap };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    const state = dragState.current;
    if (!state) return;
    const dx = e.clientX - state.startX;
    update(clamp(Math.round(state.gap + dx), MIN_GAP, MAX_GAP), itemsPerRow);
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  function changeItemsPerRow(delta) {
    update(gap, clamp(itemsPerRow + delta, MIN_ITEMS_PER_ROW, MAX_ITEMS_PER_ROW));
  }

  const style = {
    '--grid-gap': `${gap}px`,
    '--item-width': `calc((100% - ${gap * (itemsPerRow - 1)}px) / ${itemsPerRow})`,
  };

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
              <span className="layout-handle layout-stepper" title="Items visible per row">
                <button
                  type="button"
                  onClick={() => changeItemsPerRow(-1)}
                  disabled={itemsPerRow <= MIN_ITEMS_PER_ROW}
                  aria-label="Fewer items per row"
                >
                  −
                </button>
                {itemsPerRow} per row
                <button
                  type="button"
                  onClick={() => changeItemsPerRow(1)}
                  disabled={itemsPerRow >= MAX_ITEMS_PER_ROW}
                  aria-label="More items per row"
                >
                  +
                </button>
              </span>
              <span
                className="layout-handle"
                title={`Gap: ${gap}px — drag to resize`}
                onPointerDown={handlePointerDown}
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
