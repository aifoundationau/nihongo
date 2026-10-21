'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useApp } from './AppProvider';

const links = [
  { href: '/', label: 'Home', jp: 'ホーム' },
  { href: '/videos', label: 'Lessons', jp: '授業' },
  { href: '/creators', label: 'Creators', jp: '先生' },
  { href: '/admin', label: 'Studio', jp: '管理' },
];

export default function Header() {
  const { tokens, setStoreOpen } = useApp();
  const path = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="hanko">日本語</span>
          <span className="brand-text">
            <strong>NIHONGO</strong>
            <small>KYOUSHITSU · 教室</small>
          </span>
        </Link>

        <nav className={`nav ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={path === l.href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              <span className="nav-jp">{l.jp}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <button className="wallet" onClick={() => setStoreOpen(true)} title="Token wallet">
            <span className="coin">円</span>
            <span>{tokens}</span>
            <small>tokens</small>
          </button>
          <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
