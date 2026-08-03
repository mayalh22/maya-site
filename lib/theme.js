export const THEME_DOC_PATH = 'settings/theme';

export const FONT_OPTIONS = [
  { value: 'sans', label: 'Sans-serif (Inter)' },
  { value: 'serif', label: 'Serif (Lora)' },
  { value: 'display', label: 'Display (Space Grotesk)' },
  { value: 'elegant', label: 'Elegant serif (Playfair Display)' },
  { value: 'handwritten', label: 'Handwritten (Caveat)' },
  { value: 'mono', label: 'Monospace (JetBrains Mono)' },
];

export const DEFAULT_THEME = {
  primary: '#19532b',
  accent: '#ee7302',
  background: '#f3e8cc',
  text: '#202221',
  fieldBackground: '#ffffff',
  fieldText: '#202221',
  fontChoice: 'sans',
  textScale: 100,
  borderWidth: 1,
  spinSpeed: 1,
};

const CSS_VAR_MAP = {
  primary: '--primary',
  accent: '--accent',
  background: '--bg',
  text: '--text',
  fieldBackground: '--field-bg',
  fieldText: '--field-text',
};

export function themeToCss(theme) {
  const merged = { ...DEFAULT_THEME, ...theme };
  const declarations = Object.entries(CSS_VAR_MAP)
    .map(([key, cssVar]) => `${cssVar}:${merged[key]};`)
    .join('');
  const scale = Number(merged.textScale) || DEFAULT_THEME.textScale;
  const borderWidth = Number(merged.borderWidth);
  const spinSpeed = Number(merged.spinSpeed);
  return `:root{${declarations}font-size:${scale}%;--border-width:${
    Number.isFinite(borderWidth) ? borderWidth : DEFAULT_THEME.borderWidth
  }px;--spin-speed:${Number.isFinite(spinSpeed) && spinSpeed > 0 ? spinSpeed : DEFAULT_THEME.spinSpeed};}`;
}
