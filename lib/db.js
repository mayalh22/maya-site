import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from './firebase';

export async function getSingleton(path, fallback = null) {
  try {
    const snap = await getDoc(doc(db, path));
    return snap.exists() ? snap.data() : fallback;
  } catch {
    return fallback;
  }
}

export async function setSingleton(path, data) {
  await setDoc(doc(db, path), data);
}

export async function listCollection(name, { orderByField = 'createdAt', direction = 'desc' } = {}) {
  try {
    const snap = await getDocs(query(collection(db, name), orderBy(orderByField, direction)));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

// Sorts by a manually-assigned `order` field, client-side. Firestore's
// orderBy() silently drops documents missing the field, so items without an
// `order` yet (created before manual reordering existed) fall back to their
// createdAt-based position instead of disappearing.
export async function listOrdered(name) {
  const items = await listCollection(name, { orderByField: 'createdAt', direction: 'asc' });
  return items
    .map((item, index) => ({ item, sortKey: typeof item.order === 'number' ? item.order : index + items.length }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ item }) => item);
}

export async function addItem(name, data, id = null) {
  const payload = { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() };
  if (id) {
    await setDoc(doc(db, name, id), payload);
    return id;
  }
  const ref = await addDoc(collection(db, name), payload);
  return ref.id;
}

export async function updateItem(name, id, data) {
  await updateDoc(doc(db, name, id), { ...data, updatedAt: serverTimestamp() });
}

export async function removeItem(name, id) {
  await deleteDoc(doc(db, name, id));
}
