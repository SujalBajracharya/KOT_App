/**
 * Font definitions for the KOT redesign.
 *
 * The redesign uses Archivo exclusively in two weights:
 *   - 400 Regular
 *   - 800 ExtraBold (treated as "bold" throughout the app)
 *
 * Family names here MUST match the expo-google-fonts export keys,
 * which are the strings React Native uses as `fontFamily` values.
 *
 * Do NOT import these family name strings directly in components —
 * use the `typography` presets or reference `fonts.family.*`.
 */
export const fonts = {
  family: {
    regular: 'Archivo_400Regular',
    bold: 'Archivo_800ExtraBold',
  },

  weight: {
    regular: '400' as const,
    bold: '800' as const,
  },

  size: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 21,
    xxl: 28,
    display: 36,
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export type FontSizeKey = keyof typeof fonts.size;

/**
 * Semantic typography presets.
 *
 * Use these in StyleSheet.create() to avoid repeating font attributes.
 *
 * @example
 * import { typography } from '@/constants';
 * const styles = StyleSheet.create({
 *   title: { ...typography.heading },
 * });
 */
export const typography = {
  display: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.display,
  },
  heading: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.xl,
  },
  subheading: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.lg,
  },
  body: {
    fontFamily: fonts.family.regular,
    fontWeight: fonts.weight.regular,
    fontSize: fonts.size.md,
  },
  label: {
    fontFamily: fonts.family.regular,
    fontWeight: fonts.weight.regular,
    fontSize: fonts.size.sm,
  },
  caption: {
    fontFamily: fonts.family.regular,
    fontWeight: fonts.weight.regular,
    fontSize: fonts.size.xs,
  },
  /** Bold variant of body — for emphasis within body text */
  bodyBold: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.md,
  },
  /** Bold label — e.g. status badges, tab labels */
  labelBold: {
    fontFamily: fonts.family.bold,
    fontSize: fonts.size.sm,
  },
} as const;
