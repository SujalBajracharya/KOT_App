import { StyleSheet } from "react-native";
import { MIN_TOUCH_TARGET, spacing, typography } from "@/constants";
import { AppTheme } from "@/theme/ThemeContext";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(45,43,43,0.5)",
    },
    sheet: {
      backgroundColor: theme.colors.background,
      borderTopWidth: 2,
      borderTopColor: theme.colors.text,
    },

    // ── Item header ──
    sheetHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: spacing.md,
      padding: spacing.lg,
      paddingBottom: 0,
    },
    itemInfo: { flex: 1 },
    itemName: {
      ...typography.display,
      fontSize: 25,
      lineHeight: 27,
      letterSpacing: -0.2,
      color: theme.colors.text,
      marginBottom: 2,
    },
    itemMeta: {
      ...typography.body,
      fontSize: 12,
      letterSpacing: 0.6,
      color: theme.colors.textSecondary,
    },
    closeButton: {
      width: MIN_TOUCH_TARGET,
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
    },

    // ── Quantity stepper ──
    stepperRow: {
      flexDirection: "row",
      alignItems: "stretch",
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
      marginBottom: spacing.xs,
    },
    stepperBtn: {
      width: 76,
      height: 76,
      justifyContent: "center",
      alignItems: "center",
      borderRightWidth: 1,
      borderRightColor: theme.colors.borderStrong,
    },
    stepperBtnPlus: {
      width: 76,
      height: 76,
      justifyContent: "center",
      alignItems: "center",
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.text,
    },
    stepperValue: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    stepperValueText: {
      ...typography.display,
      fontSize: 34,
      letterSpacing: -0.5,
      color: theme.colors.text,
    },

    // ── Quick-add row ──
    quickAddRow: {
      flexDirection: "row",
      gap: spacing.xs,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.lg,
    },
    quickAddBtn: {
      flex: 1,
      height: 52,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
    },
    quickAddText: {
      ...typography.subheading,
      fontSize: 14,
      color: theme.colors.text,
    },

    // ── Remarks section ──
    remarksLabel: {
      ...typography.caption,
      fontWeight: "800",
      letterSpacing: 1,
      color: theme.colors.textSecondary,
      marginHorizontal: spacing.lg,
      marginBottom: 10,
    },
    remarksChips: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.md,
    },
    remarkChip: {
      height: MIN_TOUCH_TARGET,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
    },
    remarkChipActive: {
      backgroundColor: theme.colors.text,
      borderColor: theme.colors.text,
    },
    remarkChipText: {
      ...typography.caption,
      fontWeight: "800",
      fontSize: 12,
      letterSpacing: 0.5,
      color: theme.colors.text,
    },
    remarkChipTextActive: {
      color: theme.colors.background,
    },
    noteInput: {
      height: 60,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      marginHorizontal: spacing.lg,
      paddingHorizontal: spacing.md,
      ...typography.body,
      fontSize: 15,
      color: theme.colors.text,
      marginBottom: spacing.lg,
    },

    // ── Line total ──
    lineTotalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginHorizontal: spacing.lg,
      paddingBottom: spacing.md,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.borderStrong,
      marginBottom: spacing.md,
    },
    lineTotalLabel: {
      ...typography.caption,
      fontWeight: "800",
      letterSpacing: 1,
      color: theme.colors.textSecondary,
    },
    lineTotalValue: {
      ...typography.display,
      fontSize: 25,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },

    // ── Action buttons ──
    actionRow: {
      flexDirection: "row",
      gap: spacing.xs,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.xl,
    },
    cancelButton: {
      flex: 1,
      height: 64,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
    },
    cancelButtonText: {
      ...typography.subheading,
      fontSize: 14,
      letterSpacing: 0.6,
      color: theme.colors.text,
    },
    addButton: {
      flex: 1.6,
      height: 64,
      backgroundColor: theme.colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
    },
    addButtonText: {
      ...typography.subheading,
      fontSize: 14,
      letterSpacing: 0.6,
      color: theme.colors.onPrimary,
    },
  });