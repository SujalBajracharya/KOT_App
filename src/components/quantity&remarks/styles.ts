import { StyleSheet } from "react-native";
import { MIN_TOUCH_TARGET, spacing, typography, fonts } from "@/constants";
import { AppTheme } from "@/theme/ThemeContext";

export const createStyles = (theme: AppTheme, isPortrait: boolean = false) =>
  StyleSheet.create({
    modalOverlayContainer: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: isPortrait ? "stretch" : "flex-end",
      flexDirection: isPortrait ? "column" : "row",
    },
    backdropOverlay: {
      ...StyleSheet.absoluteFill,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    backdropPressable: {
      flex: 1,
    },

    modalContent: {
      backgroundColor: theme.colors.background,
      ...(isPortrait
        ? {
            width: "100%",
            height: "70%",
            maxHeight: "70%",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 1,
            borderTopColor: theme.colors.borderStrong,
            elevation: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.25,
            shadowRadius: 12,
          }
        : {
            height: "100%",
            borderLeftWidth: 1,
            borderLeftColor: theme.colors.borderStrong,
            elevation: 16,
            shadowColor: "#000",
            shadowOffset: { width: -4, height: 0 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
          }),
    },
    dragHandleContainer: {
      alignItems: "center",
      paddingTop: spacing.sm,
      paddingBottom: 2,
    },
    dragHandle: {
      width: 36,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.borderStrong,
      opacity: 0.6,
    },
    sheet: {
      flex: 1,
    },
    sheetInner: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "space-between",
    },
    scrollBody: {
      flexShrink: 0,
    },

    // ── Item header ──
    sheetHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingTop: isPortrait ? spacing.xs : spacing.md,
      paddingBottom: spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    itemInfo: { flex: 1 },
    itemName: {
      ...typography.display,
      fontSize: isPortrait ? 22 : 19,
      lineHeight: isPortrait ? 26 : 23,
      letterSpacing: -0.2,
      color: theme.colors.text,
      marginBottom: 2,
    },
    itemMeta: {
      ...typography.body,
      fontSize: 11,
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
      backgroundColor: theme.colors.surface,
    },

    // ── Quantity stepper ──
    stepperRow: {
      flexDirection: "row",
      alignItems: "stretch",
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      marginHorizontal: spacing.lg,
      marginTop: isPortrait ? spacing.lg : spacing.sm,
      marginBottom: spacing.xs,
    },
    stepperBtn: {
      width: isPortrait ? 72 : 56,
      height: isPortrait ? 72 : 56,
      justifyContent: "center",
      alignItems: "center",
      borderRightWidth: 1,
      borderRightColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
    },
    stepperBtnPlus: {
      width: isPortrait ? 72 : 56,
      height: isPortrait ? 72 : 56,
      justifyContent: "center",
      alignItems: "center",
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.primary,
    },
    stepperValue: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    stepperValueText: {
      ...typography.display,
      fontSize: isPortrait ? 32 : 26,
      letterSpacing: -0.5,
      color: theme.colors.text,
    },

    // ── Quick-add row ──
    quickAddRow: {
      flexDirection: "row",
      gap: spacing.xs,
      marginHorizontal: spacing.lg,
      marginBottom: isPortrait ? spacing.lg : spacing.sm,
    },
    quickAddBtn: {
      flex: 1,
      height: isPortrait ? 48 : 40,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    quickAddText: {
      ...typography.subheading,
      fontSize: 13,
      color: theme.colors.text,
    },

    // ── Remarks section ──
    remarksLabel: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      letterSpacing: 1,
      color: theme.colors.textSecondary,
      marginHorizontal: spacing.lg,
      marginBottom: 6,
    },
    remarksChips: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
      marginHorizontal: spacing.lg,
      marginBottom: spacing.xs,
    },
    remarkChip: {
      height: isPortrait ? MIN_TOUCH_TARGET : 38,
      paddingHorizontal: spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    remarkChipActive: {
      backgroundColor: theme.colors.text,
      borderColor: theme.colors.text,
    },
    remarkChipText: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      fontSize: 11,
      letterSpacing: 0.5,
      color: theme.colors.text,
    },
    remarkChipTextActive: {
      color: theme.colors.background,
    },
    noteInput: {
      height: isPortrait ? 56 : 44,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      marginHorizontal: spacing.lg,
      paddingHorizontal: spacing.md,
      ...typography.body,
      fontSize: 13,
      color: theme.colors.text,
      marginTop: spacing.xs,
      marginBottom: isPortrait ? spacing.lg : spacing.sm,
    },

    // ── Line total ──
    lineTotalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginHorizontal: spacing.lg,
      paddingTop: spacing.xs,
      paddingBottom: spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      marginBottom: spacing.xs,
    },
    lineTotalLabel: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      letterSpacing: 1,
      color: theme.colors.textSecondary,
    },
    lineTotalValue: {
      ...typography.display,
      fontSize: isPortrait ? 24 : 20,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },

    // ── Action buttons ──
    actionRow: {
      flexDirection: "row",
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    cancelButton: {
      flex: 1,
      height: isPortrait ? 56 : 48,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.md,
    },
    cancelButtonText: {
      ...typography.subheading,
      fontSize: 13,
      letterSpacing: 0.6,
      color: theme.colors.text,
    },
    primaryButton: {
      flex: 1.6,
      height: isPortrait ? 56 : 48,
      backgroundColor: theme.colors.primary,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
    },
    primaryButtonText: {
      ...typography.subheading,
      fontSize: 13,
      letterSpacing: 0.6,
      color: theme.colors.onPrimary,
    },
  });
