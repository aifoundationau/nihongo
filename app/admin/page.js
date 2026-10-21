'use client';

import { useState } from 'react';
import { useApp } from '@/components/AppProvider';
import { CATEGORIES, LEVELS, extractYouTubeId, ytThumb } from '@/lib/videos';
import { isFirebaseConfigured } from '@/lib/firebase';

const empty = {
  youtubeUrl: '', title: '', jp: '', description: '', category: 'Vocabulary',
  level: 'Beginner', creator: '', tokenCost: 1, thumbnailUrl: '',
};

export default function AdminPage() {
  const { videos, upsertVideo, deleteVideo, resetDemo, notify } = useApp();
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const id = extractYouTubeId(form.youtubeUrl);

  const fetchFromYouTube = async () => {
    if (!id) return notify('Paste a valid YouTube link first');
    setBusy(true);
    try {
      const res = await fetch(`/api/youtube?url=${encodeURIComponent(form.youtubeUrl)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm((f) => ({
        ...f,
        title: f.title || data.title,
        creator: f.creator || data.author,
        thumbnailUrl: f.thumbnailUrl || data.thumbnailUrl,
      }));
      notify('Fetched details from YouTube');
    } catch (err) {
      notify(err.message || 'Could not fetch from YouTube');
    } finally {
      setBusy(false);
    }
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, thumbnailUrl: reader.result }));
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!id) return notify('A valid YouTube link is required');
    setBusy(true);
    await upsertVideo({
      ...form,
      id: editing || id,
      youtubeId: id,
      tokenCost: Number(form.tokenCost) || 1,
      thumbnailUrl: form.thumbnailUrl || ytThumb(id),
      creator: form.creator || 'Nihongo Kyoushitsu',
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setBusy(false);
    notify(editing ? 'Lesson updated' : 'Lesson published · 公開しました');
    setForm(empty);
    setEditing(null);
  };

  const edit = (v) => {
    setEditing(v.id);
    setForm({ ...empty, ...v });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="section page-top">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">管理 · Creator studio</span>
            <h2>Upload a lesson</h2>
            <p className="muted">
              Storage: <strong>{isFirebaseConfigured ? 'Firebase (Firestore + Storage)' : 'Local demo (this browser)'}</strong>
            </p>
          </div>
          <button className="btn btn-ghost" onClick={() => confirm('Reset all demo data?') && resetDemo()}>
            Reset demo data
          </button>
        </div>

        <div className="studio">
          <form className="panel form" onSubmit={submit}>
            <label>
              YouTube link *
              <div className="input-row">
                <input required value={form.youtubeUrl} onChange={set('youtubeUrl')}
                  placeholder="https://www.youtube.com/shorts/…" />
                <button type="button" className="btn btn-ghost" onClick={fetchFromYouTube} disabled={busy}>
                  Auto-fill
                </button>
              </div>
            </label>
            <label>Title *<input required value={form.title} onChange={set('title')} placeholder="Ordering Food in Japanese" /></label>
            <label>Japanese label<input value={form.jp} onChange={set('jp')} placeholder="注文" /></label>
            <label>Description<textarea rows="4" value={form.description} onChange={set('description')}
              placeholder="What will learners take away from this lesson?" /></label>
            <div className="form-row">
              <label>Category
                <select value={form.category} onChange={set('category')}>
                  {CATEGORIES.filter((c) => c !== 'All').map((c) => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label>Level
                <select value={form.level} onChange={set('level')}>
                  {LEVELS.map((l) => <option key={l}>{l}</option>)}
                </select>
              </label>
              <label>Tokens
                <input type="number" min="1" value={form.tokenCost} onChange={set('tokenCost')} />
              </label>
            </div>
            <label>Creator name<input value={form.creator} onChange={set('creator')} placeholder="Nihongo Kyoushitsu" /></label>
            <label>
              Thumbnail
              <input type="file" accept="image/*" onChange={onFile} />
              <small className="muted">Upload an image, or leave empty to use the YouTube thumbnail.</small>
            </label>
            <div className="row">
              <button className="btn btn-shu" disabled={busy}>{editing ? 'Save changes' : 'Publish lesson'}</button>
              {editing && (
                <button type="button" className="btn btn-ghost" onClick={() => { setEditing(null); setForm(empty); }}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="preview">
            <span className="eyebrow">プレビュー · Preview</span>
            <div className="card static">
              <div className="card-thumb">
                {form.thumbnailUrl || id ? (
                  <img src={form.thumbnailUrl || ytThumb(id)} alt="" />
                ) : (
                  <div className="thumb-empty">画像</div>
                )}
                {form.jp && <span className="card-jp">{form.jp}</span>}
                <span className="card-badge">{form.tokenCost || 1} token · US${form.tokenCost || 1}</span>
              </div>
              <div className="card-body">
                <div className="card-meta">
                  <span className="tag">{form.category}</span>
                  <span className="tag tag-soft">{form.level}</span>
                </div>
                <h3>{form.title || 'Your lesson title'}</h3>
                <p>{form.description || 'Your description appears here.'}</p>
              </div>
            </div>
          </div>
        </div>

        <h3 className="table-title">Published lessons ({videos.length})</h3>
        <div className="table">
          {videos.map((v) => (
            <div key={v.id} className="table-row">
              <img src={v.thumbnailUrl} alt="" />
              <div className="table-main">
                <strong>{v.title}</strong>
                <span className="muted small">{v.category} · {v.level} · {v.tokenCost} token · {v.creator}</span>
              </div>
              <div className="row">
                <button className="btn btn-ghost btn-sm" onClick={() => edit(v)}>Edit</button>
                <button className="btn btn-danger btn-sm"
                  onClick={() => confirm(`Delete "${v.title}"?`) && deleteVideo(v.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
