import { StyleSheet } from "react-native";
import { MIN_TOUCH_TARGET, spacing, typography } from "@/constants";
import { AppTheme } from "@/theme/ThemeContext";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(0,0,0,0.45)",
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopWidth: 2,
      borderTopColor: theme.colors.text,
    },

    // ── Header ──
    sheetHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      padding: spacing.lg,
      paddingBottom: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    tableInfo: {
      flex: 1,
      gap: 3,
    },
    tableNameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    tableName: {
      ...typography.display,
      fontSize: 26,
      lineHeight: 28,
      letterSpacing: -0.3,
      color: theme.colors.text,
    },
    statusPill: {
      paddingHorizontal: spacing.sm,
      paddingVertical: 3,
      borderWidth: 1,
    },
    statusPillFree:     { borderColor: theme.colors.borderStrong },
    statusPillOccupied: { borderColor: theme.colors.text, backgroundColor: theme.colors.text },
    statusPillBill:     { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary + "18" },
    statusPillHeld:     { borderColor: theme.colors.borderStrong },
    statusPillText: {
      ...typography.caption,
      fontWeight: "800",
      fontSize: 10,
      letterSpacing: 1,
    },
    statusPillTextDefault:  { color: theme.colors.textSecondary },
    statusPillTextOccupied: { color: theme.colors.background },
    statusPillTextBill:     { color: theme.colors.primary },

    tableMeta: {
      ...typography.body,
      fontSize: 12.5,
      color: theme.colors.textSecondary,
    },
    tableAmount: {
      ...typography.subheading,
      fontSize: 18,
      color: theme.colors.text,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
    },
    closeButtonText: {
      ...typography.body,
      fontSize: 16,
      lineHeight: 18,
      color: theme.colors.text,
    },

    // ── Context label ──
    contextLabel: {
      ...typography.caption,
      fontWeight: "800",
      fontSize: 11,
      letterSpacing: 1,
      color: theme.colors.textSecondary,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.md,
      paddingBottom: spacing.xs,
    },

    // ── Actions ──
    actionsBlock: {
      marginTop: 10,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xxl,
      gap: spacing.xs,
    },
    actionBtn: {
      height: MIN_TOUCH_TARGET,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      borderWidth: 1,
    },
    actionBtnPrimary:   { borderColor: theme.colors.text, backgroundColor: theme.colors.text },
    actionBtnSecondary: { borderColor: theme.colors.borderStrong, backgroundColor: "transparent" },
    actionBtnDanger:    { borderColor: theme.colors.primary, backgroundColor: theme.colors.primary + "12" },

    actionBtnText: {
      ...typography.subheading,
      fontSize: 15,
      letterSpacing: 0.4,
    },
    actionBtnTextPrimary:   { color: theme.colors.background },
    actionBtnTextSecondary: { color: theme.colors.text },
    actionBtnTextDanger:    { color: theme.colors.primary },

    actionBtnArrow: { fontSize: 20, fontWeight: "bold" },
    actionBtnArrowPrimary:   { color: theme.colors.background },
    actionBtnArrowSecondary: { color: theme.colors.textSecondary },
    actionBtnArrowDanger:    { color: theme.colors.primary },

    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginVertical: spacing.xs,
    },
  });