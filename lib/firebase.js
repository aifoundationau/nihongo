// Firebase is optional: if the NEXT_PUBLIC_FIREBASE_* env vars are set, the
// site reads/writes Firestore + Storage. Otherwise it runs on local demo data.
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(config.apiKey && config.projectId);

const app = isFirebaseConfigured ? (getApps()[0] || initializeApp(config)) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;

export async function fetchVideos() {
  if (!db) return null;
  const snap = await getDocs(collection(db, 'videos'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function saveVideo(video) {
  if (!db) return;
  await setDoc(doc(db, 'videos', video.id), video, { merge: true });
}

export async function removeVideo(id) {
  if (!db) return;
  await deleteDoc(doc(db, 'videos', id));
}

// Accepts a data: URL from the upload form; returns a public URL.
export async function uploadThumbnail(id, dataUrl) {
  if (!storage || !dataUrl?.startsWith('data:')) return dataUrl;
  const r = ref(storage, `thumbnails/${id}-${Date.now()}`);
  await uploadString(r, dataUrl, 'data_url');
  return getDownloadURL(r);
}
