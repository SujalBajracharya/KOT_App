import { useWindowDimensions } from 'react-native';

/**
 * Tablet breakpoint — matches the KOT redesign spec.
 * Screens/components branch on `isTablet` to choose layouts:
 *
 * @example
 * const { isTablet } = useResponsive();
 * return isTablet ? <TabletLayout /> : <PhoneLayout />;
 */
export const TABLET_BREAKPOINT = 900;

export interface ResponsiveState {
  /** true when device width >= 900 */
  isTablet: boolean;
  /** true when width > height */
  isLandscape: boolean;
  width: number;
  height: number;
}

/**
 * Lightweight responsive hook — no framework, just geometry.
 *
 * Re-renders automatically when device rotates or window resizes.
 */
export function useResponsive(): ResponsiveState {
  const { width, height } = useWindowDimensions();

  return {
    isTablet: width >= TABLET_BREAKPOINT,
    isLandscape: width > height,
    width,
    height,
  };
}
