import { StyleSheet } from 'react-native';

/**
 * Spacing scale — 4-pt rhythm matching the KOT redesign.
 *
 * Use these tokens everywhere instead of magic numbers.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export type SpacingKey = keyof typeof spacing;

/**
 * Minimum interactive hit target for restaurant staff interactions.
 * All pressable elements must meet this height/width minimum.
 */
export const MIN_TOUCH_TARGET = 56;

/**
 * Border radii — this redesign intentionally avoids rounded cards.
 * Default is 0. Do NOT introduce arbitrary radii.
 */
export const radius = {
  none: 0,
} as const;

/**
 * Border widths — use hairlineWidth for standard dividers,
 * BORDER_STRONG for major section separators.
 */
export const borderWidth = {
  /** Standard row / divider (platform hairline) */
  hairline: StyleSheet.hairlineWidth,
  /** Strong section separator — 2 px */
  strong: 2,
} as const;
