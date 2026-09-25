import { StyleSheet } from "react-native";
import { MIN_TOUCH_TARGET, spacing, typography, fonts } from "@/constants";
import { AppTheme } from "@/theme/ThemeContext";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    // Modal overlay / backdrop
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.4)",
      padding: spacing.md,
    },

    // Sheet container
    sheet: {
      backgroundColor: theme.colors.background,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
      width: "100%",
      maxWidth: 540,
      maxHeight: "90%",
    },

    // Header row: title + close button
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: spacing.xl,
    },
    headerTitle: {
      ...typography.display,
      fontSize: 26,
      lineHeight: 30,
      letterSpacing: -0.3,
      color: theme.colors.text,
    },
    closeButton: {
      width: 36,
      height: 36,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    closeButtonText: {
      ...typography.body,
      fontSize: 16,
      color: theme.colors.text,
      lineHeight: 18,
    },

    // Section label (SERVER IP · PORT, DIVISION, TERMINAL, ORIENTATION)
    sectionLabel: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      letterSpacing: 1,
      color: theme.colors.textSecondary,
      marginBottom: spacing.xs,
    },

    // IP + Port row: 4 octets + port
    ipPortRow: {
      flexDirection: "row",
      gap: spacing.xs,
      marginBottom: spacing.lg,
    },
    ipOctetBox: {
      flex: 1,
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    BoxFocused: {
      borderColor: theme.colors.primary,
    },
    portBox: {
      flex: 1.4,
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    portBoxError: {
      borderColor: theme.colors.primary,
    },
    ipOctetInput: {
      ...typography.body,
      color: theme.colors.text,
      textAlign: "center",
      width: "100%",
      height: "100%",
      paddingVertical: 0,
    },
    portInput: {
      ...typography.body,
      color: theme.colors.text,
      textAlign: "center",
      width: "100%",
      height: "100%",
      paddingVertical: 0,
    },

    // Division + Terminal side-by-side row
    divTermRow: {
      flexDirection: "row",
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    divTermGroup: {
      flex: 1,
      gap: spacing.xs,
    },
    divTermBox: {
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      justifyContent: "center",
      paddingHorizontal: spacing.md,
    },
    divTermInput: {
      ...typography.body,
      color: theme.colors.text,
      height: "100%",
      paddingVertical: 0,
    },

    // Divider
    divider: {
      height: 1,
      backgroundColor: theme.colors.border,
      marginBottom: spacing.lg,
    },

    // Orientation toggle
    orientationGroup: {
      marginBottom: spacing.lg,
    },
    orientationRow: {
      flexDirection: "row",
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      overflow: "hidden",
    },
    orientationOption: {
      flex: 1,
      height: MIN_TOUCH_TARGET,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent",
    },
    orientationOptionActive: {
      backgroundColor: theme.colors.text,
    },
    orientationOptionText: {
      ...typography.labelBold,
      letterSpacing: 1,
      color: theme.colors.textSecondary,
    },
    orientationOptionTextActive: {
      color: theme.colors.background,
    },

    // Checkboxes section
    checkboxesGroup: {
      gap: 0,
    },
    checkboxRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1.5,
      justifyContent: "center",
      alignItems: "center",
      marginRight: spacing.md,
      borderColor: theme.colors.borderStrong,
    },
    checkboxChecked: {
      backgroundColor: theme.colors.text,
      borderColor: theme.colors.text,
    },
    checkboxUnchecked: {
      backgroundColor: "transparent",
    },
    checkmark: {
      fontSize: 12,
      fontFamily: fonts.family.bold,
      lineHeight: 14,
      color: theme.colors.background,
    },
    checkboxLabel: {
      ...typography.body,
      color: theme.colors.text,
    },

    // Save & Reconnect button
    saveButton: {
      height: MIN_TOUCH_TARGET,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.primary,
      marginTop: spacing.xl,
    },
    saveButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    saveButtonText: {
      ...typography.subheading,
      letterSpacing: 1,
      color: theme.colors.onPrimary,
    },
  });