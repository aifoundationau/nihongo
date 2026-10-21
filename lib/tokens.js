// 1 token = US$1. Every lesson costs 1 token.
export const TOKEN_USD = 1;
export const WELCOME_TOKENS = 3;
export const CREATOR_SHARE = 0.5;

export const tokenPackages = [
  { id: 'ume', name: 'Ume', jp: '梅', tokens: 5, bonus: 0, price: 5, blurb: 'Try a handful of lessons' },
  { id: 'take', name: 'Take', jp: '竹', tokens: 20, bonus: 2, price: 20, blurb: 'A steady weekly habit', popular: true },
  { id: 'matsu', name: 'Matsu', jp: '松', tokens: 50, bonus: 8, price: 50, blurb: 'Serious study season' },
  { id: 'sakura', name: 'Sakura', jp: '桜', tokens: 100, bonus: 20, price: 100, blurb: 'Full immersion' },
];
