'use client';

import { useState } from 'react';

// Extracted from the old CollectionEditor's drag-to-reorder handlers so any
// grid can reorder in place. Callers gate `dragHandlers` behind an owner-only
// "Rearrange" toggle so it never hijacks normal clicks/scroll otherwise.
export function useDragReorder(items, onReorder) {
  const [dragIndex, setDragIndex] = useState(null);

  function dragHandlers(index) {
    return {
      draggable: true,
      onDragStart: () => setDragIndex(index),
      onDragOver: (e) => e.preventDefault(),
      onDrop: () => {
        if (dragIndex === null || dragIndex === index) {
          setDragIndex(null);
          return;
        }
        const next = [...items];
        const [moved] = next.splice(dragIndex, 1);
        next.splice(index, 0, moved);
        setDragIndex(null);
        onReorder(next);
      },
      onDragEnd: () => setDragIndex(null),
    };
  }

  return { dragHandlers, dragIndex };
}
