// Shared card color array and utility

export const CARD_COLORS = [
  'var(--yellow)',
  'var(--salmon-pink)',
  'var(--orange)',
  'var(--blue)'
];

export function getCardColor(index) {
  return CARD_COLORS[index % CARD_COLORS.length];
}
