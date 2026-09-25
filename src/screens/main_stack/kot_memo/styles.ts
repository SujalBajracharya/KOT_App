import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";
import { MIN_TOUCH_TARGET, spacing, typography, fonts } from "@/constants";

export const createStyles = (theme: AppTheme, isLandscape: boolean = false) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
    },

    // ── Header ──
    header: {
      height: 64,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    iconButton: {
      width: MIN_TOUCH_TARGET,
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
    },
    headerTitle: {
      ...typography.display,
      flex: 1,
      fontSize: 22,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },

    // ── Filter tabs: TODAY / VOIDED / ALL ──
    filterTabFirst: {
      borderLeftWidth: 0,
    },


    // ── Memo list ──
    memoList: {
      flex: 1,
    },

    // ── Memo card ──
    memoCard: {
      flex: isLandscape ? 1 : undefined,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    memoCardTop: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 10,
      marginBottom: 6,
    },
    memoKOT: {
      ...typography.subheading,
      fontSize: 17,
      color: theme.colors.text,
    },
    memoTable: {
      ...typography.body,
      fontSize: 12.5,
      color: theme.colors.textSecondary,
    },
    memoSpacer: {
      flex: 1,
    },
    memoStatus: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      fontSize: 10,
      letterSpacing: 1,
    },
    memoStatusSent: {
      color: theme.colors.textSecondary,
    },
    memoStatusVoided: {
      color: theme.colors.primary,
    },
    memoStatusPrinting: {
      color: theme.colors.text,
    },
    memoVoidedAt: {
      ...typography.caption,
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
    memoLines: {
      ...typography.body,
      fontSize: 13.5,
      lineHeight: 21,
      color: theme.colors.textSecondary,
    },

    // ── Card action row ──
    memoActions: {
      flexDirection: "row",
      gap: spacing.xs,
      marginTop: spacing.md,
    },
    memoActionBtn: {
      height: MIN_TOUCH_TARGET,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
    },
    memoActionText: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      fontSize: 11,
      letterSpacing: 0.8,
      color: theme.colors.text,
    },

    // ── Empty state ──
    emptyContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: spacing.sm,
      paddingHorizontal: spacing.xl,
    },
    emptyText: {
      ...typography.subheading,
      fontSize: 16,
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
  });
};
