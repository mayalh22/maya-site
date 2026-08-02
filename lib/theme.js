export const THEME_DOC_PATH = 'siteConfig/theme';

export const DEFAULT_THEME = {
  primary: '#19532b',
  secondary: '#ee7302',
  accent: '#9abc04',
  highlight: '#ee7302',
  background: '#f3e8cc',
  textDark: '#202221',
  textLight: '#fafafa',
  cursorColor: '#ee7302',
  textScale: 100,
};

const CSS_VAR_MAP = {
  primary: '--primary',
  secondary: '--secondary',
  accent: '--accent',
  highlight: '--highlight',
  background: '--bg',
  textDark: '--text-dark',
  textLight: '--text-light',
  cursorColor: '--cursor-color',
};

export function themeToCss(theme) {
  const merged = { ...DEFAULT_THEME, ...theme };
  const declarations = Object.entries(CSS_VAR_MAP)
    .map(([key, cssVar]) => `${cssVar}:${merged[key]};`)
    .join('');
  const scale = Number(merged.textScale) || 100;
  return `:root{${declarations}font-size:${scale}%;}`;
}
