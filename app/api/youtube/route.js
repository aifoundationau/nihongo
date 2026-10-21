import { NextResponse } from 'next/server';
import { extractYouTubeId, ytThumb } from '@/lib/videos';

// GET /api/youtube?url=... → { id, title, author, thumbnailUrl } via YouTube oEmbed (no API key needed).
export async function GET(req) {
  const url = req.nextUrl.searchParams.get('url') || '';
  const id = extractYouTubeId(url);
  if (!id) return NextResponse.json({ error: 'Invalid YouTube link' }, { status: 400 });

  try {
    const res = await fetch(
      `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(`https://www.youtube.com/watch?v=${id}`)}`
    );
    if (!res.ok) throw new Error();
    const data = await res.json();
    return NextResponse.json({ id, title: data.title, author: data.author_name, thumbnailUrl: ytThumb(id) });
  } catch {
    return NextResponse.json({ error: 'Video not found or private' }, { status: 404 });
  }
}
