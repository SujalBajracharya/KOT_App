import { lightColors, darkColors } from './colors';
export type { ThemeColors } from './colors';

/**
 * Full application theme object.
 *
 * `mode` lets components/contexts know which theme is active,
 * but they should NOT branch on `mode` to pick colors —
 * they should use `theme.colors.*` directly.
 */
export interface AppTheme {
  mode: 'light' | 'dark';
  colors: import('./colors').ThemeColors;
}

export const lightTheme: AppTheme = {
  mode: 'light',
  colors: lightColors,
};

export const darkTheme: AppTheme = {
  mode: 'dark',
  colors: darkColors,
};

/** Resolve an AppTheme from a color scheme string. */
export function resolveTheme(
  colorScheme: 'light' | 'dark' | null | undefined,
): AppTheme {
  return colorScheme === 'dark' ? darkTheme : lightTheme;
}

export { lightColors, darkColors };
