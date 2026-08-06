import { getSingleton, setSingleton, updateItem } from './db';
import { revalidatePublicPath } from './revalidate';

// Shared write path for every inline-editing component. `target` says where a
// field lives; `patch` is the set of keys to merge in (or `null` to remove a
// homePhoto entry entirely). Collection items merge via Firestore's own
// updateDoc; singleton docs are read-modify-write since setDoc replaces the
// whole document.
export async function persistPatch(target, patch, revalidateTarget) {
  if (!target) return;

  if (target.type === 'item') {
    await updateItem(target.collection, target.id, patch);
  } else if (target.type === 'singleton') {
    const current = (await getSingleton(target.path, {})) || {};
    await setSingleton(target.path, { ...current, ...patch });
  } else if (target.type === 'homePhoto') {
    const current = (await getSingleton(target.path, {})) || {};
    const photos = Array.isArray(current.photoUrls) ? [...current.photoUrls] : [];
    if (patch === null) {
      photos.splice(target.index, 1);
    } else {
      const existing = typeof photos[target.index] === 'string' ? { url: photos[target.index] } : photos[target.index] || {};
      photos[target.index] = { ...existing, ...patch };
    }
    await setSingleton(target.path, { ...current, photoUrls: photos });
  }

  if (revalidateTarget) await revalidatePublicPath(revalidateTarget);
}
