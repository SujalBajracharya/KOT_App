import { StyleSheet } from "react-native";
import { MIN_TOUCH_TARGET, spacing, typography, fonts } from "@/constants";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

export const createStyles = (theme: AppTheme) => {
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
    scrollContent: {
      flexGrow: 1,
      paddingBottom: spacing.xxl,
    },

    // ── Header ──
    header: {
      height: 64,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.borderStrong,
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
    headerInfo: { flex: 1 },
    headerTitle: {
      ...typography.display,
      fontSize: 20,
      lineHeight: 22,
      letterSpacing: -0.2,
      color: theme.colors.text,
    },
    headerMeta: {
      ...typography.body,
      fontSize: 11,
      letterSpacing: 0.6,
      color: theme.colors.textSecondary,
    },

    // ── Payment method tabs ──
    methodTabs: {
      flexDirection: "row",
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.borderStrong,
    },
    methodTab: {
      flex: 1,
      height: 56,
      justifyContent: "center",
      alignItems: "center",
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
    },
    methodTabFirst: {
      borderLeftWidth: 0,
    },
    methodTabActive: {
      backgroundColor: theme.colors.text,
    },
    methodTabText: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      fontSize: 12,
      letterSpacing: 0.8,
      color: theme.colors.textSecondary,
    },
    methodTabTextActive: {
      color: theme.colors.background,
    },

    // ── Bill summary block ──
    billBlock: {
      paddingHorizontal: spacing.lg,
      paddingTop: spacing.xl,
      paddingBottom: spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    billAmountLabel: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      letterSpacing: 1,
      color: theme.colors.textSecondary,
      marginBottom: 4,
    },
    billAmount: {
      ...typography.display,
      fontSize: 48,
      lineHeight: 50,
      letterSpacing: -1,
      color: theme.colors.primary,
      marginBottom: spacing.xs,
    },
    billReference: {
      ...typography.body,
      fontSize: 13,
      color: theme.colors.textSecondary,
    },

    // ── QR card ──
    qrCard: {
      margin: spacing.lg,
      borderWidth: 2,
      borderColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
      paddingVertical: spacing.xl,
      gap: spacing.lg,
    },
    qrWrapper: {
      padding: spacing.md,
      backgroundColor: "#FFFFFF", // QR codes must always be on white
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    qrInstruction: {
      ...typography.body,
      fontSize: 13,
      textAlign: "center",
      color: theme.colors.textSecondary,
      paddingHorizontal: spacing.lg,
    },
    qrImage: {
      width: 220,
      height: 220,
    },

    // ── Expiry row ──
    expiryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      paddingHorizontal: spacing.lg,
    },
    expiryDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
    expiryText: {
      ...typography.caption,
      fontFamily: fonts.family.bold,
      fontSize: 11,
      letterSpacing: 1,
      color: theme.colors.primary,
    },

    // ── Status banner (waiting / confirmed / failed) ──
    statusBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.md,
      marginHorizontal: spacing.lg,
      padding: spacing.md,
      borderWidth: 1,
    },
    statusBannerWaiting: {
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    statusBannerConfirmed: {
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.text,
    },
    statusBannerFailed: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + "15",
    },
    statusIcon: {
      width: MIN_TOUCH_TARGET,
      height: MIN_TOUCH_TARGET,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      justifyContent: "center",
      alignItems: "center",
    },
    statusIconConfirmed: {
      borderColor: theme.colors.background,
    },
    statusIconFailed: {
      borderColor: theme.colors.primary,
    },
    statusIconText: {
      fontSize: 20,
    },
    statusBody: { flex: 1 },
    statusTitle: {
      ...typography.subheading,
      fontSize: 15,
      color: theme.colors.text,
    },
    statusTitleConfirmed: {
      color: theme.colors.background,
    },
    statusTitleFailed: {
      color: theme.colors.primary,
    },
    statusSubtitle: {
      ...typography.body,
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    statusSubtitleConfirmed: {
      color: theme.colors.background,
      opacity: 0.75,
    },
    statusSubtitleFailed: {
      color: theme.colors.primary,
      opacity: 0.85,
    },

    // ── Help note ──
    helpNote: {
      ...typography.body,
      fontSize: 12,
      lineHeight: 19,
      color: theme.colors.textSecondary,
      marginHorizontal: spacing.lg,
      marginTop: spacing.lg,
    },
  });
};
