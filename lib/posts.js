import { collection, doc, getDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export const POSTS_COLLECTION = 'posts';

export function slugify(title) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return base || 'post';
}

export async function getAllPosts() {
  try {
    const snap = await getDocs(query(collection(db, POSTS_COLLECTION), orderBy('createdAt', 'desc')));
    return snap.docs.map((d) => ({ slug: d.id, ...d.data() }));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const snap = await getDoc(doc(db, POSTS_COLLECTION, slug));
    return snap.exists() ? { slug: snap.id, ...snap.data() } : null;
  } catch {
    return null;
  }
}

export async function getUniqueSlug(title) {
  const base = slugify(title);
  let candidate = base;
  let attempt = 2;
  while (attempt < 50) {
    const snap = await getDoc(doc(db, POSTS_COLLECTION, candidate));
    if (!snap.exists()) return candidate;
    candidate = `${base}-${attempt}`;
    attempt += 1;
  }
  return `${base}-${Date.now()}`;
}
