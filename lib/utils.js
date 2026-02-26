export const CARD_COLORS = [
  'var(--orange)',
  'var(--yellow)',
  'var(--salmon)',
  'var(--blue)',
];

// dark bg indexes — any color in CARD_COLORS that needs light text
const DARK_INDEXES = new Set([3]); // --blue is at index 3

export const getCardColor = (index) => CARD_COLORS[index % CARD_COLORS.length];

export const getCardClass = (index) =>
  DARK_INDEXES.has(index % CARD_COLORS.length) ? 'card card-dark' : 'card';