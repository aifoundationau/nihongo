'use client';

import { useState } from 'react';
import { useApp } from './AppProvider';
import { tokenPackages } from '@/lib/tokens';

export default function TokenStore() {
  const { storeOpen, setStoreOpen, addTokens, tokens } = useApp();
  const [selected, setSelected] = useState(tokenPackages[1]);
  if (!storeOpen) return null;
  const close = () => setStoreOpen(false);

  return (
    <div className="backdrop" onClick={close}>
      <div className="modal store" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={close} aria-label="Close">×</button>
        <div className="store-head">
          <span className="eyebrow">トークン · Token Wallet</span>
          <h2>Top up your tokens</h2>
          <p className="muted">
            1 token = US$1 and unlocks one lesson forever. Current balance: <strong>{tokens} tokens</strong>.
          </p>
        </div>

        <div className="packs">
          {tokenPackages.map((p) => (
            <button
              key={p.id}
              className={`pack ${selected.id === p.id ? 'selected' : ''}`}
              onClick={() => setSelected(p)}
            >
              {p.popular && <span className="pack-ribbon">人気</span>}
              <span className="pack-kanji">{p.jp}</span>
              <span className="pack-name">{p.name}</span>
              <span className="pack-tokens">{p.tokens}<small> tokens</small></span>
              {p.bonus > 0 && <span className="pack-bonus">+{p.bonus} bonus</span>}
              <span className="pack-price">US${p.price}</span>
              <span className="muted small">{p.blurb}</span>
            </button>
          ))}
        </div>

        <div className="store-actions">
          <button className="btn btn-ghost" disabled title="Stripe checkout will be connected later">
            Pay with Stripe · coming soon
          </button>
          <button
            className="btn btn-shu"
            onClick={() => {
              addTokens(selected.tokens + selected.bonus);
              close();
            }}
          >
            Demo: add {selected.tokens + selected.bonus} tokens
          </button>
        </div>
        <p className="muted small center">Preview mode — no real payment is taken.</p>
      </div>
    </div>
  );
}
