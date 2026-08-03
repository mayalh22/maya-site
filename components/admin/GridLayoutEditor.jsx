'use client';

import { useRef, useState } from 'react';
import { useAdminUser } from '@/lib/auth';
import { getSingleton, setSingleton } from '@/lib/db';
import { revalidatePublicPath } from '@/lib/revalidate';

const LAYOUT_DOC = 'settings/layout';

// Lets the signed-in owner nudge a grid's gap/item-width while looking at
// the real public page. Initial values come from the server (siblings to
// siteContent messages) so there's no client fetch and no flash on load;
// edits are only ever performed and visible to the owner.
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

  function persist(nextGap, nextItemWidth) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(async () => {
      const all = (await getSingleton(LAYOUT_DOC, {})) || {};
      await setSingleton(LAYOUT_DOC, { ...all, [sectionKey]: { gap: nextGap, itemWidth: nextItemWidth } });
      await revalidatePublicPath(revalidateTarget);
    }, 500);
  }

  function handleGap(value) {
    setGap(value);
    persist(value, itemWidth);
  }

  function handleItemWidth(value) {
    setItemWidth(value);
    persist(gap, value);
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
            <div className="layout-editor-controls">
              <label>
                Gap
                <input type="range" min="0" max="48" value={gap} onChange={(e) => handleGap(Number(e.target.value))} />
              </label>
              <label>
                Item width
                <input
                  type="range"
                  min="100"
                  max="480"
                  value={itemWidth}
                  onChange={(e) => handleItemWidth(Number(e.target.value))}
                />
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
