'use client';

import { useApp } from './AppProvider';

export default function VideoCard({ video }) {
  const { isUnlocked, setActiveVideo } = useApp();
  const open = isUnlocked(video.id);

  return (
    <button className="card" onClick={() => setActiveVideo(video)}>
      <div className="card-thumb">
        <img src={video.thumbnailUrl} alt={video.title} loading="lazy" />
        <span className="card-jp">{video.jp}</span>
        <span className={`card-badge ${open ? 'open' : ''}`}>
          {open ? '✓ Unlocked' : `${video.tokenCost ?? 1} token · US$${video.tokenCost ?? 1}`}
        </span>
        <span className="play">{open ? '▶' : '🔒'}</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="tag">{video.category}</span>
          <span className="tag tag-soft">{video.level}</span>
        </div>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <span className="card-creator">先生 · {video.creator}</span>
      </div>
    </button>
  );
}
