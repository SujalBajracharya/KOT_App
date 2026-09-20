import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export const createStyles = (theme: AppTheme) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    paxButton: {
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 4,
    },
  });
};