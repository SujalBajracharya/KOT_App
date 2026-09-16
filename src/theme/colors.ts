import { colors } from '../constants/colors';

/**
 * Semantic color interface shared by both themes.
 *
 * Components and screens consume this interface through `useTheme()`.
 * They never branch on `dark ? '#...' : '#...'`.
 */
export interface ThemeColors {
  /** Main page/screen background */
  background: string;
  /** Elevated row / panel background */
  surface: string;
  /** Primary body text */
  text: string;
  /** Supporting / secondary text (timestamps, metadata) */
  textSecondary: string;
  /** Accent — primary actions, important status, selection */
  primary: string;
  /** Text/icon on top of primary-colored backgrounds */
  onPrimary: string;
  /** Hairline divider color */
  border: string;
  /** 2-px strong section separator */
  borderStrong: string;
  /** Disabled controls, inactive states */
  disabled: string;

  // ── Table status colors ──────────────────────────────────────────────────
  statusOccupied: string;
  statusFree: string;
  statusBill: string;
  statusHeld: string;
}

export const lightColors: ThemeColors = {
  background: colors.paper,
  surface: colors.surface,
  text: colors.ink,
  textSecondary: colors.textSecondaryLight,
  primary: colors.accent,
  onPrimary: colors.white,
  border: colors.borderLight,
  borderStrong: colors.borderStrongLight,
  disabled: colors.disabledLight,

  // Table statuses — intentional use of accent red + neutral tones
  statusOccupied: colors.accent,
  statusFree: '#2a8a4a',
  statusBill: '#c67c00',
  statusHeld: colors.borderStrongLight,
};

export const darkColors: ThemeColors = {
  background: colors.darkPaper,
  surface: colors.darkSurface,
  text: colors.darkInk,
  textSecondary: colors.textSecondaryDark,
  primary: colors.darkAccent,
  onPrimary: colors.white,
  border: colors.borderDark,
  borderStrong: colors.borderStrongDark,
  disabled: colors.disabledDark,

  statusOccupied: colors.darkAccent,
  statusFree: '#3daf5e',
  statusBill: '#e09a1a',
  statusHeld: colors.borderStrongDark,
};
