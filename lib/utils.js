export const CARD_COLORS = [
  'var(--orange)',
  'var(--yellow)',
  'var(--salmon)',
  'var(--blue)',
];

const DARK_INDEXES = new Set([3]); 

export const getCardColor = (index) => CARD_COLORS[index % CARD_COLORS.length];

export const getCardClass = (index) =>
  DARK_INDEXES.has(index % CARD_COLORS.length) ? 'card card-dark' : 'card';