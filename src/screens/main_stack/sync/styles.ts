import { StyleSheet } from "react-native";
import { MIN_TOUCH_TARGET, spacing, typography } from "@/constants";
import { AppTheme } from "@/theme/ThemeContext";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: "space-between",
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
    },

    // ── Main section ──
    mainSection: {
      flex: 1,
    },

    // ── Last synced info block ──
    syncInfoBlock: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: spacing.md,
      marginBottom: spacing.xl,
    },
    syncInfoLabel: {
      ...typography.caption,
      fontWeight: "800",
      letterSpacing: 1,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    syncInfoValue: {
      ...typography.subheading,
      fontSize: 15,
      color: theme.colors.text,
      letterSpacing: 0.2,
    },

    // ── Section divider ──
    topDivider: {
      height: 2,
      marginBottom: spacing.xl,
      backgroundColor: theme.colors.borderStrong,
    },

    // ── Credential form ──
    formGroup: {
      gap: spacing.lg,
    },
    inputContainer: {
      gap: spacing.xs,
    },
    fieldLabel: {
      ...typography.caption,
      fontWeight: "800",
      letterSpacing: 1,
      color: theme.colors.textSecondary,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.colors.surface,
    },
    inputWrapperNormal: {
      borderColor: theme.colors.borderStrong,
    },
    inputWrapperError: {
      borderColor: theme.colors.primary,
    },
    input: {
      flex: 1,
      height: "100%",
      ...typography.body,
      paddingVertical: 0,
      color: theme.colors.text,
    },
    showToggle: {
      paddingLeft: spacing.sm,
      justifyContent: "center",
      height: "100%",
    },
    showToggleText: {
      ...typography.labelBold,
      letterSpacing: 0.5,
      color: theme.colors.primary,
    },
    fieldErrorText: {
      ...typography.caption,
      marginTop: 2,
      color: theme.colors.primary,
    },

    // ── Warning notice ──
    warningText: {
      ...typography.body,
      fontSize: 13,
      lineHeight: 20,
      color: theme.colors.primary,
      marginTop: spacing.xl,
      textAlign: "center",
    },
    warningAsterisk: {
      fontWeight: "800",
    },

    // ── Bottom section ──
    bottomSection: {
      marginTop: spacing.xxl,
      gap: spacing.lg,
    },
    bottomDivider: {
      height: 2,
      marginBottom: spacing.xs,
      backgroundColor: theme.colors.border,
    },

    // ── Proceed button ──
    proceedButton: {
      height: MIN_TOUCH_TARGET,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      backgroundColor: theme.colors.primary,
    },
    proceedButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    buttonInner: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    proceedButtonText: {
      ...typography.subheading,
      letterSpacing: 1,
      color: theme.colors.onPrimary,
    },
    buttonArrow: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.colors.onPrimary,
    },
  });
