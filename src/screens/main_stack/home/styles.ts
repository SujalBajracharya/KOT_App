import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export const createStyles = (theme: AppTheme) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    iconButtonRelative: {
      position: 'relative',
    },
    notificationBadge: {
      position: 'absolute',
      top: 4,
      right: 4,
      backgroundColor: theme.colors.primary,
      borderRadius: 8,
      minWidth: 16,
      height: 16,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 3,
    },
    notificationBadgeText: {
      color: theme.colors.onPrimary,
      fontSize: 9,
      fontWeight: '800',
    },
    statsRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    statCell: {
      flex: 1,
      paddingVertical: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    statCellBordered: {
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
    },
    statValue: {
      fontSize: 22,
      fontWeight: '800',
      color: theme.colors.text,
    },
    statLabel: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    statLabelAlert: {
      fontSize: 10,
      fontWeight: '700',
      color: theme.colors.primary,
      marginTop: 2,
    },
    menuList: {
      flex: 1,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuIndex: {
      width: 32,
      height: 32,
      borderRadius: 4,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 14,
    },
    menuIndexText: {
      fontSize: 12,
      fontWeight: '800',
      color: theme.colors.textSecondary,
    },
    menuTextGroup: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: theme.colors.text,
    },
    menuSubtitle: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    menuSyncAction: {
      fontSize: 12,
      fontWeight: '800',
      color: theme.colors.primary,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    },
    settlementButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      borderRadius: 6,
      height: 48,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    settlementButtonText: {
      fontSize: 14,
      fontWeight: '800',
      color: theme.colors.text,
      letterSpacing: 0.5,
    },
    settlementButtonHint: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });
};
