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
const MIN_WIDTH = 80;
const MAX_WIDTH = 480;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

// Lets the signed-in owner adjust a grid's row-wrap count, item width, and
// gap directly on the real public page — same direct-manipulation feel as
// EditableImage's crop handles, instead of a slider panel. Initial values
// come from the server (siblings to siteContent messages) so there's no
// client fetch and no flash on load; edits are only ever performed and
// visible to the owner. itemsPerRow sets the grid's column count (so a new
// row starts every itemsPerRow items), while width and gap independently
// size --item-width and --grid-gap.
export default function GridLayoutEditor({
  sectionKey,
  defaultGap = 16,
  defaultItemsPerRow = 4,
  defaultWidth = 240,
  initial,
  revalidateTarget,
  children,
}) {
  const { isOwner } = useAdminUser();
  const [editing, setEditing] = useState(false);
  const [gap, setGap] = useState(initial?.gap ?? defaultGap);
  const [itemsPerRow, setItemsPerRow] = useState(initial?.itemsPerRow ?? defaultItemsPerRow);
  const [width, setWidth] = useState(initial?.width ?? defaultWidth);
  const saveTimer = useRef(null);
  const dragState = useRef(null);

  function persist(nextGap, nextItemsPerRow, nextWidth) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const all = (await getSingleton(LAYOUT_DOC, {})) || {};
      await setSingleton(LAYOUT_DOC, {
        ...all,
        [sectionKey]: { gap: nextGap, itemsPerRow: nextItemsPerRow, width: nextWidth },
      });
      await revalidatePublicPath(revalidateTarget);
    }, 500);
  }

  function update(nextGap, nextItemsPerRow, nextWidth) {
    setGap(nextGap);
    setItemsPerRow(nextItemsPerRow);
    setWidth(nextWidth);
    persist(nextGap, nextItemsPerRow, nextWidth);
  }

  function handlePointerDown(kind, e) {
    e.stopPropagation();
    dragState.current = { kind, startX: e.clientX, gap, width };
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function handlePointerMove(e) {
    const state = dragState.current;
    if (!state) return;
    const dx = e.clientX - state.startX;
    if (state.kind === 'width') {
      update(gap, itemsPerRow, clamp(Math.round(state.width + dx), MIN_WIDTH, MAX_WIDTH));
    } else {
      update(clamp(Math.round(state.gap + dx), MIN_GAP, MAX_GAP), itemsPerRow, width);
    }
  }
  function handlePointerUp() {
    dragState.current = null;
  }

  function changeItemsPerRow(delta) {
    update(gap, clamp(itemsPerRow + delta, MIN_ITEMS_PER_ROW, MAX_ITEMS_PER_ROW), width);
  }

  const style = {
    '--grid-gap': `${gap}px`,
    '--item-width': `${width}px`,
    '--items-per-row': itemsPerRow,
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
              <span className="layout-handle layout-stepper" title="Items before a new row starts">
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
                title={`Width: ${width}px — drag to resize`}
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
