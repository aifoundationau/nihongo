import Link from 'next/link';
import { CREATOR_SHARE } from '@/lib/tokens';

export default function CreatorPanel() {
  const pct = Math.round(CREATOR_SHARE * 100);
  return (
    <section className="creator-panel">
      <div className="container creator-grid">
        <div>
          <span className="eyebrow light">先生になろう · Become a Sensei</span>
          <h2>Teach Japanese. Get paid for every view.</h2>
          <p>
            Creators can add their own lessons to Nihongo Kyoushitsu. Every time a learner spends a token
            to unlock your video, you earn — {pct}% of each US$1 goes straight to you.
          </p>
          <div className="row">
            <Link href="/creators" className="btn btn-gold">Apply as a creator</Link>
            <Link href="/admin" className="btn btn-outline-light">Open creator studio</Link>
          </div>
        </div>
        <ul className="creator-steps">
          <li><span>一</span><div><strong>Upload</strong><p>Paste your YouTube link, title, description and thumbnail.</p></div></li>
          <li><span>二</span><div><strong>Publish</strong><p>Your lesson appears in the library, priced at 1 token.</p></div></li>
          <li><span>三</span><div><strong>Earn</strong><p>US${(CREATOR_SHARE).toFixed(2)} per unlock, paid out to your account.</p></div></li>
        </ul>
      </div>
    </section>
  );
}
