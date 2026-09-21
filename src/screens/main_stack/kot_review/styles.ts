import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export const createStyles = (theme: AppTheme, isLandscape: boolean = false) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    contentRow: {
      flex: 1,
      flexDirection: isLandscape ? "row" : "column",
    },
    mainContent: {
      flex: 1,
    },
    sidePanel: {
      width: isLandscape ? 360 : "100%",
      borderLeftWidth: isLandscape ? 1 : 0,
      borderLeftColor: isLandscape ? theme.colors.border : undefined,
    },
    paxButton: {
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 4,
    },
  });
};