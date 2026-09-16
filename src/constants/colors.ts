/**
 * Raw color palette — source of truth for KOT redesign primitives.
 *
 * Do NOT use these values directly in components or screens.
 * Import from `src/theme` to get semantic, mode-aware colors.
 */
export const colors = {
  // ── Light-mode primitives ─────────────────────────────────────────────────
  /** Primary text / foreground in light mode */
  ink: '#201e1d',
  /** Primary background in light mode */
  paper: '#f3f2f2',
  /** Accent — active actions, warnings, important status */
  accent: '#ec3013',
  /** Slightly raised surface (cards/rows) in light mode */
  surface: '#eae9e9',

  // ── Dark-mode primitives ──────────────────────────────────────────────────
  /** Primary text / foreground in dark mode */
  darkInk: '#f8f4f4',
  /** Primary background in dark mode */
  darkPaper: '#201e1d',
  /** Accent in dark mode — slightly brighter for legibility */
  darkAccent: '#ff563c',
  /** Slightly raised surface in dark mode */
  darkSurface: '#2d2b2b',

  // ── Neutral / border tones ────────────────────────────────────────────────
  /** Hairline-weight dividers, light mode */
  borderLight: '#d6d4d4',
  /** Strong 2-px section rules, light mode */
  borderStrongLight: '#b5b2b2',
  /** Hairline-weight dividers, dark mode */
  borderDark: '#3a3837',
  /** Strong 2-px section rules, dark mode */
  borderStrongDark: '#524f4f',

  // ── Secondary / dimmed text ───────────────────────────────────────────────
  /** Secondary / supporting text, light mode */
  textSecondaryLight: '#6b6766',
  /** Secondary / supporting text, dark mode */
  textSecondaryDark: '#9e9a9a',

  // ── Disabled state ────────────────────────────────────────────────────────
  disabledLight: '#c2c0bf',
  disabledDark: '#4a4847',

  // ── Utilities ─────────────────────────────────────────────────────────────
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
