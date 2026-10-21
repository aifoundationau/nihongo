'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/components/AppProvider';
import VideoCard from '@/components/VideoCard';
import { CATEGORIES } from '@/lib/videos';

function Library() {
  const { videos, isUnlocked } = useApp();
  const params = useSearchParams();
  const [cat, setCat] = useState(params.get('cat') || 'All');
  const [q, setQ] = useState('');
  const [mine, setMine] = useState(false);

  const list = useMemo(() => {
    const term = q.toLowerCase();
    return videos.filter(
      (v) =>
        (cat === 'All' || v.category === cat) &&
        (!mine || isUnlocked(v.id)) &&
        (!term || `${v.title} ${v.jp} ${v.description}`.toLowerCase().includes(term))
    );
  }, [videos, cat, q, mine, isUnlocked]);

  return (
    <section className="section page-top">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">授業一覧 · Lesson library</span>
            <h2>All lessons</h2>
            <p className="muted">Every lesson unlocks for 1 token (US$1) and is yours to rewatch.</p>
          </div>
          <input
            className="search"
            placeholder="Search · 検索…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="chips">
          {CATEGORIES.map((c) => (
            <button key={c} className={`chip ${cat === c ? 'active' : ''}`} onClick={() => setCat(c)}>
              {c}
            </button>
          ))}
          <button className={`chip chip-mine ${mine ? 'active' : ''}`} onClick={() => setMine(!mine)}>
            ✓ My unlocked
          </button>
        </div>

        {list.length ? (
          <div className="grid">{list.map((v) => <VideoCard key={v.id} video={v} />)}</div>
        ) : (
          <div className="empty">
            <span>空</span>
            <p>No lessons match — try another filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default function VideosPage() {
  return (
    <Suspense>
      <Library />
    </Suspense>
  );
}
