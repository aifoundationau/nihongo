// Seed lesson library — Nihongo Kyoushitsu YouTube Shorts.
// Every lesson costs 1 token (US$1) to unlock.

export const CATEGORIES = ['All', 'Vocabulary', 'Grammar', 'Phrases', 'Numbers', 'Culture', 'Travel'];
export const LEVELS = ['Beginner', 'Elementary', 'Intermediate'];

export const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
export const ytEmbed = (id) => `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;

export function extractYouTubeId(url = '') {
  const m = String(url).match(/(?:shorts\/|youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(url.trim()) ? url.trim() : null;
}

const CREATOR = 'Nihongo Kyoushitsu';

const seed = [
  {
    youtubeId: '1ap3m7YgLkg',
    title: 'Suwaru (座る) vs Sawaru (触る)',
    jp: '座る・触る',
    category: 'Vocabulary',
    level: 'Beginner',
    description: 'Two words, one vowel apart — "to sit" and "to touch". Learn to hear and say the difference so you never ask someone to touch the chair.',
  },
  {
    youtubeId: '06jBUKiq73E',
    title: 'Japanese Numbers: Ichi (1) to Ichi Man (10,000)',
    jp: '数字',
    category: 'Numbers',
    level: 'Beginner',
    description: 'Count from ichi to ichi-man. Covers the 10s, 100s and 1,000s patterns plus the special readings that trip up beginners.',
  },
  {
    youtubeId: 'lwiOXTan6Q4',
    title: 'What Does 大丈夫ですか？ Mean?',
    jp: '大丈夫ですか',
    category: 'Phrases',
    level: 'Beginner',
    description: '"Daijoubu desu ka?" — are you okay? Learn when natives use it, how to answer it, and the polite "no thank you" meaning.',
  },
  {
    youtubeId: 'w-WttD0ESy0',
    title: 'Sumimasen, Tasukete Kudasai — Asking for Help',
    jp: 'すみません、助けてください',
    category: 'Travel',
    level: 'Beginner',
    description: 'The polite, essential phrase for asking for help in Japan. Perfect for travellers and first-week residents.',
  },
  {
    youtubeId: '9yni61LV78k',
    title: 'Using "Ni Ikimasu" — Going Places',
    jp: '〜に行きます',
    category: 'Grammar',
    level: 'Elementary',
    description: 'Point at a destination with に and move with 行きます. Build sentences like "I go to Tokyo" and "I go to school".',
  },
  {
    youtubeId: 'yjJ5EOXF_A8',
    title: 'Ordering Food in Japanese',
    jp: '注文',
    category: 'Travel',
    level: 'Beginner',
    description: 'From sushi bars to ramen shops — the key phrases to order, ask for recommendations and pay politely.',
  },
  {
    youtubeId: 'hnozsfnH_ys',
    title: 'Otsukare-sama — The Magic Word for Hard Work',
    jp: 'お疲れ様',
    category: 'Culture',
    level: 'Elementary',
    description: 'The phrase you will hear in every Japanese workplace. What it really means and when to say it to friends and colleagues.',
  },
  {
    youtubeId: 'jZXKGnLpAlE',
    title: '"Desu" Explained — The Key to Politeness',
    jp: 'です',
    category: 'Grammar',
    level: 'Beginner',
    description: 'です is everywhere. Learn what it does, why it makes you sound polite, and how it is pronounced in natural speech.',
  },
  {
    youtubeId: 'UeNdBM7sTNM',
    title: 'Talking About Rain in Japanese',
    jp: '雨',
    category: 'Vocabulary',
    level: 'Elementary',
    description: 'When the sky says "nope!" — rain vocabulary, weather small talk and the umbrella phrases every Japan resident needs.',
  },
  {
    youtubeId: 'w4yaPMsgyyk',
    title: 'で — The Tiny Particle With Big Powers',
    jp: 'で',
    category: 'Grammar',
    level: 'Intermediate',
    description: 'Place of action, means, materials and more. Unlock the many jobs of the particle で with simple examples.',
  },
  {
    youtubeId: '4x9BOxh7AiQ',
    title: 'Using です (Desu) in Sentences',
    jp: 'です文',
    category: 'Grammar',
    level: 'Beginner',
    description: 'Put です to work: introduce yourself, describe things and ask simple questions in full, polite sentences.',
  },
];

export const seedVideos = seed.map((v) => ({
  id: v.youtubeId,
  ...v,
  youtubeUrl: `https://www.youtube.com/shorts/${v.youtubeId}`,
  thumbnailUrl: ytThumb(v.youtubeId),
  creator: CREATOR,
  tokenCost: 1,
  createdAt: '2026-10-01',
}));
