import { NextResponse } from 'next/server';
import { seedVideos } from '@/lib/videos';

// GET /api/videos — public lesson catalogue (seed data; swap for Firestore Admin SDK later).
export async function GET() {
  return NextResponse.json({ videos: seedVideos, count: seedVideos.length });
}
