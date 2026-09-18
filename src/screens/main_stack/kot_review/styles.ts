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
    footer: {
      padding: 16,
      borderTopWidth: 2,
      borderTopColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      gap: 12,
    },
    totalsBlock: {
      gap: 4,
      paddingBottom: 8,
    },
    totalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    totalLabel: {
      fontSize: 13,
      color: theme.colors.textSecondary,
    },
    totalValue: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.colors.text,
    },
    grandTotalRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    grandTotalLabel: {
      fontSize: 14,
      fontWeight: '800',
      color: theme.colors.text,
    },
    grandTotalValue: {
      fontSize: 24,
      fontWeight: '800',
      color: theme.colors.primary,
    },
    actionRow: {
      flexDirection: 'row',
      gap: 10,
    },
    billButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: 'center',
      paddingHorizontal: 16,
      alignItems: 'flex-start',
      paddingVertical: 18,
    },
    billButtonText: {
      fontSize: 14,
      fontWeight: '800',
      color: theme.colors.text,
    },
    sendButton: {
      flex: 2,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 18,
      paddingHorizontal: 16,
    },
    sendButtonText: {
      width: 75,
      fontSize: 14,
      fontWeight: '800',
      color: theme.colors.onPrimary,
    },
  });
};