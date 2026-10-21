'use client';

import { useApp } from './AppProvider';
import { ytEmbed } from '@/lib/videos';

export default function VideoModal() {
  const { activeVideo: v, setActiveVideo, isUnlocked, unlock, tokens, setStoreOpen } = useApp();
  if (!v) return null;
  const open = isUnlocked(v.id);
  const cost = v.tokenCost ?? 1;
  const close = () => setActiveVideo(null);

  return (
    <div className="backdrop" onClick={close}>
      <div className="modal video-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={close} aria-label="Close">×</button>

        <div className="player">
          {open ? (
            <iframe
              src={ytEmbed(v.youtubeId)}
              title={v.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="locked">
              <img src={v.thumbnailUrl} alt="" />
              <div className="locked-inner">
                <span className="lock-seal">鍵</span>
                <p>This lesson is locked</p>
              </div>
            </div>
          )}
        </div>

        <div className="video-info">
          <div className="card-meta">
            <span className="tag">{v.category}</span>
            <span className="tag tag-soft">{v.level}</span>
          </div>
          <span className="video-jp">{v.jp}</span>
          <h2>{v.title}</h2>
          <p className="muted">{v.description}</p>
          <p className="card-creator">先生 · {v.creator}</p>

          {open ? (
            <div className="unlocked-note">✓ Yours forever — rewatch any time. お疲れ様!</div>
          ) : (
            <div className="unlock-box">
              <div>
                <strong>{cost} token</strong>
                <span className="muted"> = US${cost}</span>
                <div className="muted small">Wallet: {tokens} tokens</div>
              </div>
              {tokens >= cost ? (
                <button className="btn btn-shu" onClick={() => unlock(v)}>Unlock lesson</button>
              ) : (
                <button className="btn btn-shu" onClick={() => setStoreOpen(true)}>Get tokens</button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
