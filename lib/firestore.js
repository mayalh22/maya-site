import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

export async function getContentDoc(path, fallback) {
  try {
    const snap = await getDoc(doc(db, path));
    return snap.exists() ? snap.data() : fallback;
  } catch {
    return fallback;
  }
}
