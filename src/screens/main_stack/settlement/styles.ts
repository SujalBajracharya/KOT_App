import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export const createStyles = (theme: AppTheme) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    content: {
      flex: 1,
      padding: 16,
    },
    shiftLabel: {
      fontSize: 11,
      fontWeight: '800',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    totalAmount: {
      fontSize: 32,
      fontWeight: '800',
      color: theme.colors.text,
      marginTop: 4,
    },
    totalMeta: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    breakdownTable: {
      marginTop: 24,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      overflow: 'hidden',
    },
    breakdownRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    breakdownLabel: {
      flex: 1,
      fontSize: 14,
      fontWeight: '600',
      color: theme.colors.text,
    },
    breakdownCount: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginRight: 16,
    },
    breakdownAmount: {
      fontSize: 14,
      fontWeight: '800',
      color: theme.colors.text,
    },
    warningBanner: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 10,
      backgroundColor: theme.colors.primary + '15',
      borderWidth: 1,
      borderColor: theme.colors.primary,
      padding: 12,
      marginTop: 20,
    },
    warningIcon: {
      fontSize: 14,
      fontWeight: '800',
      color: theme.colors.primary,
    },
    warningText: {
      flex: 1,
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.textSecondary,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      flexDirection: 'row',
      gap: 10,
    },
    printButton: {
      flex: 1,
      height: 44,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    printButtonText: {
      fontSize: 13,
      fontWeight: '800',
      color: theme.colors.text,
    },
    endButton: {
      flex: 1,
      height: 44,
      backgroundColor: theme.colors.primary,
      borderRadius: 6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    endButtonText: {
      fontSize: 13,
      fontWeight: '800',
      color: theme.colors.onPrimary,
    },
  });
};