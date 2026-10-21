'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { seedVideos } from '@/lib/videos';
import { WELCOME_TOKENS } from '@/lib/tokens';
import { isFirebaseConfigured, fetchVideos, saveVideo, removeVideo, uploadThumbnail } from '@/lib/firebase';

const AppContext = createContext(null);
const KEY = 'nihongo-kyoushitsu-v1';

export function AppProvider({ children }) {
  const [tokens, setTokens] = useState(WELCOME_TOKENS);
  const [unlocked, setUnlocked] = useState([]);
  const [videos, setVideos] = useState(seedVideos);
  const [storeOpen, setStoreOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [toast, setToast] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (saved) {
        setTokens(saved.tokens ?? WELCOME_TOKENS);
        setUnlocked(saved.unlocked ?? []);
        if (saved.videos?.length) setVideos(saved.videos);
      }
    } catch {}
    if (isFirebaseConfigured) {
      fetchVideos().then((remote) => remote?.length && setVideos(remote)).catch(console.error);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ tokens, unlocked, videos }));
    } catch {}
  }, [tokens, unlocked, videos, ready]);

  const notify = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  }, []);

  const isUnlocked = (id) => unlocked.includes(id);

  const unlock = (video) => {
    if (isUnlocked(video.id)) return true;
    const cost = video.tokenCost ?? 1;
    if (tokens < cost) {
      setStoreOpen(true);
      notify('Not enough tokens — top up to keep learning');
      return false;
    }
    setTokens((t) => t - cost);
    setUnlocked((u) => [...u, video.id]);
    notify(`Unlocked! −${cost} token · 頑張って!`);
    return true;
  };

  const addTokens = (n) => {
    setTokens((t) => t + n);
    notify(`+${n} tokens added to your wallet`);
  };

  const upsertVideo = async (video) => {
    const thumbnailUrl = await uploadThumbnail(video.id, video.thumbnailUrl).catch(() => video.thumbnailUrl);
    const final = { ...video, thumbnailUrl };
    setVideos((list) => {
      const exists = list.some((v) => v.id === final.id);
      return exists ? list.map((v) => (v.id === final.id ? final : v)) : [final, ...list];
    });
    await saveVideo(final).catch(console.error);
  };

  const deleteVideo = async (id) => {
    setVideos((list) => list.filter((v) => v.id !== id));
    await removeVideo(id).catch(console.error);
  };

  const resetDemo = () => {
    setVideos(seedVideos);
    setTokens(WELCOME_TOKENS);
    setUnlocked([]);
    notify('Demo data reset');
  };

  return (
    <AppContext.Provider
      value={{
        tokens, videos, unlocked, isUnlocked, unlock, addTokens,
        storeOpen, setStoreOpen, activeVideo, setActiveVideo,
        upsertVideo, deleteVideo, resetDemo, notify,
      }}
    >
      {children}
      {toast && <div className="toast">{toast}</div>}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
