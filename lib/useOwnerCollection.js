'use client';

import { useEffect, useState } from 'react';
import { listCollection, listOrdered, addItem, updateItem, removeItem } from './db';
import { revalidatePublicPath } from './revalidate';

// Lets a page manage a Firestore collection directly from the live view,
// seeded from server-fetched `initialItems` so there's no extra client fetch
// or flash on load (same idea as GridLayoutEditor's `initial` prop).
export function useOwnerCollection(
  collectionName,
  {
    initialItems = null,
    reorderable = false,
    orderByField = 'createdAt',
    direction = 'desc',
    revalidateTarget,
    deriveId,
  } = {}
) {
  const [items, setItems] = useState(initialItems);
  const [busy, setBusy] = useState(false);

  async function load() {
    const list = reorderable
      ? await listOrdered(collectionName)
      : await listCollection(collectionName, { orderByField, direction });
    setItems(list);
  }

  useEffect(() => {
    if (initialItems) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  async function revalidate() {
    if (revalidateTarget) await revalidatePublicPath(revalidateTarget);
  }

  function patchItem(id, patch) {
    setItems((prev) => prev?.map((it) => (it.id === id ? { ...it, ...patch } : it)) ?? prev);
    return updateItem(collectionName, id, patch).then(revalidate);
  }

  async function createItem(data) {
    setBusy(true);
    try {
      const payload = reorderable ? { ...data, order: items?.length ?? 0 } : data;
      const explicitId = deriveId ? await deriveId(data) : null;
      const id = await addItem(collectionName, payload, explicitId);
      await revalidate();
      await load();
      return id;
    } finally {
      setBusy(false);
    }
  }

  async function deleteItem(id) {
    setBusy(true);
    try {
      setItems((prev) => prev?.filter((it) => it.id !== id) ?? prev);
      await removeItem(collectionName, id);
      await revalidate();
    } finally {
      setBusy(false);
    }
  }

  async function reorder(nextList) {
    setItems(nextList);
    setBusy(true);
    try {
      await Promise.all(nextList.map((item, i) => updateItem(collectionName, item.id, { order: i })));
      await revalidate();
    } finally {
      setBusy(false);
    }
  }

  async function clearAll() {
    setBusy(true);
    try {
      const current = items ?? (await listCollection(collectionName));
      await Promise.all(current.map((item) => removeItem(collectionName, item.id)));
      setItems([]);
      await revalidate();
    } finally {
      setBusy(false);
    }
  }

  return { items, busy, patchItem, createItem, deleteItem, reorder, clearAll, reload: load };
}
