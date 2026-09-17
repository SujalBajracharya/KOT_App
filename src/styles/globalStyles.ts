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
      height: 52,
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
      width: 38,
      height: 38,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
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
  });
};
