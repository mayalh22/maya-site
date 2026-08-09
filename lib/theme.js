export const THEME_DOC_PATH = 'settings/theme';

export const FONT_OPTIONS = [
  { value: 'sans', label: 'Sans-serif (Inter)', fontFamily: 'var(--font-sans, sans-serif)' },
  { value: 'serif', label: 'Serif (Lora)', fontFamily: 'var(--font-serif, Georgia, serif)' },
  { value: 'display', label: 'Display (Space Grotesk)', fontFamily: 'var(--font-display, sans-serif)' },
  { value: 'elegant', label: 'Elegant serif (Playfair Display)', fontFamily: 'var(--font-elegant, Georgia, serif)' },
  { value: 'mono', label: 'Monospace (JetBrains Mono)', fontFamily: 'var(--font-mono, monospace)' },
];

export const DEFAULT_THEME = {
  primary: '#19532b',
  accent: '#ee7302',
  background: '#f3e8cc',
  text: '#202221',
  fieldBackground: '#ffffff',
  fieldText: '#202221',
  borderColor: '#d1c8b1',
  fontChoice: 'sans',
  fontSize: 16,
  borderWidth: 1,
  spinSpeed: 1,
};

export const MIN_FONT_SIZE = 8;
export const MAX_FONT_SIZE = 32;

const CSS_VAR_MAP = {
  primary: '--primary',
  accent: '--accent',
  background: '--bg',
  text: '--text',
  fieldBackground: '--field-bg',
  fieldText: '--field-text',
  borderColor: '--border',
};

export function fontFamilyFor(fontChoice) {
  return FONT_OPTIONS.find((opt) => opt.value === fontChoice)?.fontFamily;
}

export function themeToCss(theme) {
  const merged = { ...DEFAULT_THEME, ...theme };
  const declarations = Object.entries(CSS_VAR_MAP)
    .map(([key, cssVar]) => `${cssVar}:${merged[key]};`)
    .join('');
  const fontSize = Number(merged.fontSize);
  const size = Number.isFinite(fontSize) ? Math.min(MAX_FONT_SIZE, Math.max(MIN_FONT_SIZE, fontSize)) : DEFAULT_THEME.fontSize;
  const borderWidth = Number(merged.borderWidth);
  const spinSpeed = Number(merged.spinSpeed);
  const font = fontFamilyFor(merged.fontChoice) || fontFamilyFor(DEFAULT_THEME.fontChoice);
  return `:root{${declarations}font-size:${size}px;--border-width:${
    Number.isFinite(borderWidth) ? borderWidth : DEFAULT_THEME.borderWidth
  }px;--spin-speed:${
    Number.isFinite(spinSpeed) && spinSpeed > 0 ? spinSpeed : DEFAULT_THEME.spinSpeed
  };--font-heading:${font};--font-body:${font};}`;
}
