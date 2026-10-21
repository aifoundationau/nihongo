import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="seigaiha-band" />
      <div className="container footer-inner">
        <div>
          <div className="brand">
            <span className="hanko">日本語</span>
            <span className="brand-text">
              <strong>NIHONGO</strong>
              <small>KYOUSHITSU · 教室</small>
            </span>
          </div>
          <p className="muted footer-blurb">
            Bite-sized Japanese lessons. One token, one dollar, one lesson. 一期一会 — treasure every encounter.
          </p>
        </div>
        <div className="footer-cols">
          <div>
            <h4>Learn</h4>
            <Link href="/videos">All lessons</Link>
            <Link href="/videos?cat=Grammar">Grammar</Link>
            <Link href="/videos?cat=Travel">Travel phrases</Link>
          </div>
          <div>
            <h4>Teach</h4>
            <Link href="/creators">Become a creator</Link>
            <Link href="/admin">Creator studio</Link>
          </div>
          <div>
            <h4>Founder</h4>
            <span>David Robertson</span>
            <span className="muted">AI Foundation</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Nihongo Kyoushitsu · An AI Foundation project</span>
        <span className="muted">1 token = US$1 · Payments coming soon</span>
      </div>
    </footer>
  );
}
