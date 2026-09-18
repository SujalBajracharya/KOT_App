import { StyleSheet } from 'react-native';
import { AppTheme } from '@/theme/ThemeContext';

export const createGlobalStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    flexRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    flexBetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    flexCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 70,
      marginTop: 10,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    headerTitleContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.colors.text,
      letterSpacing: -0.3,
    },
    headerSubtitle: {
      fontSize: 11,
      fontWeight: '600',
      color: theme.colors.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    iconButton: {
      width: 50,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      position: "relative",
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 18,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.colors.textSecondary,
      position: "relative",
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 12,
    },
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
    },
    buttonPrimary: {
      backgroundColor: theme.colors.primary,
      height: 46,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    buttonPrimaryText: {
      color: theme.colors.onPrimary,
      fontSize: 14,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    buttonSecondary: {
      backgroundColor: 'transparent',
      height: 42,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 12,
    },
    buttonSecondaryText: {
      color: theme.colors.text,
      fontSize: 13,
      fontWeight: '600',
    },
    inputWrapper: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 6,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 12,
      height: 44,
      justifyContent: 'center',
    },
    input: {
      fontSize: 14,
      color: theme.colors.text,
    },
    badge: {
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    badgeText: {
      fontSize: 10,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
    Tabs: {
      maxHeight: 48,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    Tab: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor: theme.colors.background,
      borderLeftWidth: 1,
      borderColor: theme.colors.surface,
    },
    TabActive: {
      backgroundColor: theme.colors.text,
    },
    TabText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.text,
    },
    TabTextActive: {
      color: theme.colors.background,
    },
    tableCell: {
      flex: 1,
      borderWidth: 1,
      padding: 12,
      minHeight: 130,
      borderColor: theme.colors.border
    },
    tableCellHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
  });
};
