'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useApp } from '@/components/AppProvider';
import CreatorPanel from '@/components/CreatorPanel';
import { CREATOR_SHARE } from '@/lib/tokens';

export default function CreatorsPage() {
  const { notify } = useApp();
  const [unlocks, setUnlocks] = useState(500);
  const [sent, setSent] = useState(false);
  const earnings = (unlocks * CREATOR_SHARE).toFixed(2);

  return (
    <>
      <section className="section page-top">
        <div className="container creators-intro">
          <div>
            <span className="eyebrow">クリエイター · For creators</span>
            <h2>Your Japanese lessons, your income</h2>
            <p className="lead">
              Already teaching Japanese on YouTube? Add your Shorts and lessons to Nihongo Kyoushitsu and get
              paid every time a learner unlocks one. No exclusivity — keep your channel, add a new revenue stream.
            </p>
            <ul className="checks">
              <li>{Math.round(CREATOR_SHARE * 100)}% of every US$1 token goes to you</li>
              <li>Simple studio: YouTube link, title, description, thumbnail</li>
              <li>Monthly payouts (Stripe Connect — coming soon)</li>
              <li>Live stats on unlocks and earnings</li>
            </ul>
            <Link href="/admin" className="btn btn-shu">Open creator studio</Link>
          </div>

          <div className="calc">
            <span className="eyebrow">収入計算 · Earnings calculator</span>
            <label>
              Monthly unlocks: <strong>{unlocks.toLocaleString()}</strong>
              <input type="range" min="50" max="10000" step="50" value={unlocks}
                onChange={(e) => setUnlocks(Number(e.target.value))} />
            </label>
            <div className="calc-out">
              <span>You earn</span>
              <strong>US${Number(earnings).toLocaleString()}</strong>
              <small>per month</small>
            </div>
          </div>
        </div>
      </section>

      <CreatorPanel />

      <section className="section">
        <div className="container narrow">
          <div className="section-head center-head">
            <span className="eyebrow">申し込み · Apply</span>
            <h2>Join as a creator</h2>
          </div>
          {sent ? (
            <div className="panel center">
              <span className="hanko hanko-lg">合格</span>
              <h3>ありがとうございます!</h3>
              <p className="muted">Application received. We will be in touch soon.</p>
            </div>
          ) : (
            <form
              className="panel form"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                notify('Application sent · 送信しました');
              }}
            >
              <label>Name<input required placeholder="Tanaka Sensei" /></label>
              <label>Email<input required type="email" placeholder="you@example.com" /></label>
              <label>YouTube channel<input required placeholder="https://youtube.com/@yourchannel" /></label>
              <label>What do you teach?<textarea rows="3" placeholder="JLPT grammar, travel phrases, kanji…" /></label>
              <button className="btn btn-shu">Send application</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
