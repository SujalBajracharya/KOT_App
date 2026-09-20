import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme/ThemeContext';
import { createGlobalStyles } from '@/styles/globalStyles';

export const createStyles = (theme: AppTheme) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    clearAllText: {
      fontSize: 11,
      fontWeight: '800',
      color: theme.colors.primary,
      letterSpacing: 0.5,
    },
    notifList: {
      flex: 1,
    },
    notifRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      minHeight: 80,
    },
    notifRowUnread: {
      backgroundColor: theme.colors.primary,
    },
    notifTime: {
      width: 44,
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    notifTimeUnread: {
      fontWeight: '800',
      color: theme.colors.surface,
    },
    notifBody: {
      flex: 1,
      paddingRight: 12,
    },
    notifTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.colors.text,
    },
    notifTitleUnread: {
      fontWeight: '800',
      color: theme.colors.surface,
    },
    notifText: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    notifTextUnread: {
      color: theme.colors.surface,
    },
    notifAction: {
      borderColor: theme.colors.border,
      paddingVertical: 12,
      paddingHorizontal: 18,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      position: "relative",
    },
    notifActionUnread: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.surface,
    },
    notifActionText: {
      fontSize: 10,
      fontWeight: '800',
      color: theme.colors.textSecondary,
    },
    notifActionTextUnread: {
      color: theme.colors.surface,
    },
  });
};