'use client';

import Link from 'next/link';
import { useApp } from '@/components/AppProvider';
import VideoCard from '@/components/VideoCard';
import CreatorPanel from '@/components/CreatorPanel';
import Founder from '@/components/Founder';
import Sakura from '@/components/Sakura';
import { CREATOR_SHARE } from '@/lib/tokens';

export default function Home() {
  const { videos, setStoreOpen } = useApp();

  return (
    <>
      <section className="hero">
        <Sakura />
        <div className="hero-sun" />
        <svg className="torii" viewBox="0 0 200 160" aria-hidden>
          <path d="M8 22 Q100 2 192 22 L190 34 Q100 16 10 34 Z" />
          <rect x="22" y="44" width="156" height="10" />
          <rect x="44" y="30" width="14" height="130" />
          <rect x="142" y="30" width="14" height="130" />
          <rect x="94" y="34" width="12" height="20" />
        </svg>

        <div className="container hero-inner">
          <div className="hero-vertical" aria-hidden>日本語教室</div>
          <div className="hero-copy">
            <span className="eyebrow">ようこそ · Welcome to class</span>
            <h1>
              NIHONGO
              <br />
              <span>KYOUSHITSU</span>
            </h1>
            <p className="lead">
              Short, joyful Japanese lessons from real teachers. No subscriptions —
              every video is just <strong>1 token (US$1)</strong>. Unlock it once, keep it forever.
            </p>
            <div className="row">
              <Link href="/videos" className="btn btn-shu">Browse lessons</Link>
              <button className="btn btn-ghost" onClick={() => setStoreOpen(true)}>Get tokens</button>
            </div>
            <p className="muted small">🎁 New students start with 3 free tokens.</p>
          </div>
        </div>
        <div className="seigaiha-band" />
      </section>

      <section className="stats">
        <div className="container stats-grid">
          <div><strong>{videos.length}</strong><span>Lessons · 授業</span></div>
          <div><strong>US$1</strong><span>Per video · 一本</span></div>
          <div><strong>{Math.round(CREATOR_SHARE * 100)}%</strong><span>To creators · 先生</span></div>
          <div><strong>∞</strong><span>Rewatches · 何度でも</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">今日の授業 · Featured lessons</span>
              <h2>Start learning today</h2>
            </div>
            <Link href="/videos" className="link-arrow">View all lessons →</Link>
          </div>
          <div className="grid">
            {videos.slice(0, 6).map((v) => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head center-head">
            <span className="eyebrow">使い方 · How tokens work</span>
            <h2>Pay per lesson, not per month</h2>
          </div>
          <div className="steps">
            <div className="step">
              <span className="step-kanji">買</span>
              <h3>Buy tokens</h3>
              <p>Pick a pack — Ume, Take, Matsu or Sakura. Each token is worth US$1.</p>
            </div>
            <div className="step">
              <span className="step-kanji">選</span>
              <h3>Choose a lesson</h3>
              <p>Browse grammar, vocabulary, travel phrases and culture from our sensei.</p>
            </div>
            <div className="step">
              <span className="step-kanji">学</span>
              <h3>Learn forever</h3>
              <p>Spend 1 token to unlock a video. It stays in your library — rewatch any time.</p>
            </div>
          </div>
        </div>
      </section>

      <CreatorPanel />
      <Founder />
    </>
  );
}
