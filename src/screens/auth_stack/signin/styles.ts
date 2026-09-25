import { StyleSheet } from "react-native";
import { MIN_TOUCH_TARGET, spacing, typography, fonts } from "@/constants";
import { AppTheme } from "@/theme/ThemeContext";

export const createStyles = (theme: AppTheme, isLandscape: boolean = false) =>
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
      alignItems: isLandscape ? "center" : undefined,
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.lg,
      paddingBottom: spacing.lg,
    },
    mainSection: {
      flex: 1,
      width: "100%",
      maxWidth: isLandscape ? 560 : undefined,
    },
    brandTag: {
      ...typography.labelBold,
      letterSpacing: 1,
      marginBottom: spacing.xs,
      color: theme.colors.primary,
    },
    topDivider: {
      height: 2,
      marginBottom: spacing.xl,
      backgroundColor: theme.colors.borderStrong,
    },
    title: {
      ...typography.display,
      color: theme.colors.text,
      fontSize: 42,
      lineHeight: 46,
      letterSpacing: -0.5,
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.label,
      lineHeight: 18,
      marginBottom: spacing.xxl,
      color: theme.colors.textSecondary,
    },
    errorBanner: {
      backgroundColor: theme.colors.primary + "15",
      borderColor: theme.colors.primary,
      padding: spacing.md,
      borderWidth: 1,
      marginBottom: spacing.lg,
    },
    errorBannerText: {
      ...typography.labelBold,
      color: theme.colors.primary,
    },
    formGroup: {
      gap: spacing.lg,
    },
    inputContainer: {
      gap: spacing.xs,
    },
    fieldLabel: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      letterSpacing: 1,
      color: theme.colors.textSecondary,
    },
    // inputWrapper: {
    //   flexDirection: "row",
    //   alignItems: "center",
    //   height: MIN_TOUCH_TARGET,
    //   borderWidth: 1,
    //   paddingHorizontal: spacing.md,
    // },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.colors.surface,
    },

    inputWrapperError: {
      borderColor: theme.colors.primary,
    },

    inputWrapperNormal: {
      borderColor: theme.colors.borderStrong,
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
    checkboxRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.xs,
      minHeight: 32,
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
    },

    checkboxUnchecked: {
      backgroundColor: "transparent",
    },
    checkmark: {
      fontSize: 13,
      fontFamily: fonts.family.bold,
      lineHeight: 15,
      color: theme.colors.background,
    },
    checkboxLabel: {
      ...typography.body,
      color: theme.colors.text,
    },
    bottomSection: {
      marginTop: spacing.xxl,
      gap: spacing.lg,
      width: "100%",
      maxWidth: isLandscape ? 560 : undefined,
    },
    bottomDivider: {
      height: 2,
      marginBottom: spacing.xs,
      backgroundColor: theme.colors.border,
    },
    submitButton: {
      height: MIN_TOUCH_TARGET,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacing.lg,
      backgroundColor: theme.colors.primary,
    },

    submitButtonDisabled: {
      backgroundColor: theme.colors.disabled,
    },
    buttonInner: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    submitButtonText: {
      ...typography.subheading,
      letterSpacing: 1,
      color: theme.colors.onPrimary,
    },
    buttonArrow: {
      fontSize: 22,
      fontFamily: fonts.family.bold,
      color: theme.colors.onPrimary,
    },
    footerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    serverSetupText: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      letterSpacing: 1,
      color: theme.colors.primary,
    },
    versionText: {
      ...typography.caption,
      color: theme.colors.textSecondary,
    },
  });
