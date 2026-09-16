import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useColorScheme } from 'react-native';
import { AppTheme, lightTheme, darkTheme, resolveTheme } from './index';

// ── Context value interface ──────────────────────────────────────────────────

interface ThemeContextValue {
  /** The currently active theme (light or dark) */
  theme: AppTheme;
  /** The active color scheme identifier */
  colorScheme: 'light' | 'dark';
  /**
   * Override the color scheme manually.
   * Pass `null` to revert to system detection.
   */
  setColorScheme: (scheme: 'light' | 'dark' | null) => void;
}

// ── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue>({
  theme: lightTheme,
  colorScheme: 'light',
  setColorScheme: () => undefined,
});

// ── Provider ─────────────────────────────────────────────────────────────────

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useColorScheme();

  /**
   * `null` means "follow the system". A non-null value overrides it.
   * This allows a future settings screen to persist user preference
   * without touching any screen components.
   */
  const [overrideScheme, setOverrideScheme] = useState<
    'light' | 'dark' | null
  >(null);

  const setColorScheme = useCallback(
    (scheme: 'light' | 'dark' | null) => {
      setOverrideScheme(scheme);
    },
    [],
  );

  const activeScheme: 'light' | 'dark' =
    overrideScheme ?? (systemColorScheme === 'dark' ? 'dark' : 'light');

  const theme = resolveTheme(activeScheme);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, colorScheme: activeScheme, setColorScheme }),
    [theme, activeScheme, setColorScheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Access the current theme in any component.
 *
 * @example
 * const { theme } = useTheme();
 * <View style={{ backgroundColor: theme.colors.background }} />
 */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme() must be used inside <ThemeProvider>');
  }
  return ctx;
}

// ── Convenience exports ───────────────────────────────────────────────────────

export { lightTheme, darkTheme };
export type { AppTheme, ThemeContextValue };
