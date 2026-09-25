import React, { useCallback, useEffect } from "react";
import {
  NavigationContainer,
  Theme as NavTheme,
} from "@react-navigation/native";
import {
  Archivo_400Regular,
  Archivo_800ExtraBold,
} from "@expo-google-fonts/archivo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View } from "react-native";

import { ThemeProvider, useTheme } from "@/theme/ThemeContext";
import AppNavigation from "@/navigation";
import { Provider } from "react-redux";
import store from "@/store";
import { useOrientation } from "@/hooks/useOrientation";
import { navigationRef } from "@/utils/app_navigation";
import Toast from "react-native-toast-message";
import toastConfig from "@/utils/toastConfig";
import { fonts } from "@/constants";

// Prevent the splash screen from auto-hiding before fonts are ready.
SplashScreen.preventAutoHideAsync();

function AppRoot() {
  useOrientation();
  const { theme, colorScheme } = useTheme();

  const [fontsLoaded, fontError] = useFonts({
    Archivo_400Regular,
    Archivo_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If fonts failed to load, hide splash and fall back to system fonts gracefully.
  useEffect(() => {
    if (fontError) {
      console.warn("[KOT] Font loading failed:", fontError);
      SplashScreen.hideAsync();
    }
  }, [fontError]);

  if (!fontsLoaded && !fontError) {
    // Splash is still visible — render nothing until fonts are ready.
    return null;
  }

  /**
   * Map AppTheme → React Navigation Theme so navigation chrome
   * (headers, bottom tabs, drawers) automatically match our design system.
   */
  const navTheme: NavTheme = {
    dark: colorScheme === "dark",
    colors: {
      primary: theme.colors.primary,
      background: theme.colors.background,
      card: theme.colors.surface,
      text: theme.colors.text,
      border: theme.colors.border,
      notification: theme.colors.primary,
    },
    fonts: {
      regular: {
        fontFamily: fonts.family.regular,
        fontWeight: "400",
      },
      medium: {
        fontFamily: fonts.family.regular,
        fontWeight: "500",
      },
      bold: {
        fontFamily: fonts.family.bold,
        fontWeight: "800",
      },
      heavy: {
        fontFamily: fonts.family.bold,
        fontWeight: "800",
      },
    },
  };

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <SafeAreaProvider>
        <View
          style={{ flex: 1, backgroundColor: theme.colors.background }}
          onLayout={onLayoutRootView}
        >
          <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
          <AppNavigation />
        </View>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

// ── Public root ───────────────────────────────────────────────────────────────

/**
 * App.tsx — composition root.
 *
 * Establishes:
 *   ThemeProvider  → system-aware light/dark theme + manual override support
 *   Font loading   → Archivo 400 + 800, splash hidden after fonts ready
 *   NavigationContainer → mapped from AppTheme
 *   SafeAreaProvider
 *   StatusBar
 *   AppNavigation  → existing auth/root stack structure preserved
 *
 */
export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRoot />
        <Toast config={toastConfig} />
      </ThemeProvider>
    </Provider>
  );
}
