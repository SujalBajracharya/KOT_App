import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

export const createStyles = (theme: AppTheme, isLandscape: boolean = false) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    body: {
      flex: 1,
      flexDirection: isLandscape ? "row" : "column",
    },
    sidePanel: {
      width: isLandscape ? 230 : "100%",
      borderRightWidth: isLandscape ? 1 : 0,
      borderRightColor: isLandscape ? theme.colors.border : undefined,
      justifyContent: isLandscape ? "space-between" : undefined,
    },
    iconButtonRelative: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    notificationBadge: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      minWidth: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 0,
    },
    notificationBadgeText: {
      color: theme.colors.onPrimary,
      fontSize: 10,
      fontWeight: "800",
    },
    statsRow: {
      flexDirection: isLandscape ? "column" : "row",
      flex: isLandscape ? 1 : undefined,
      maxHeight: isLandscape ? undefined : 80,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.borderStrong,
      backgroundColor: theme.colors.surface,
    },
    statCell: {
      flex: 1,
      paddingVertical: 14,
      paddingHorizontal: 20,
      alignItems: "flex-start",
      justifyContent: "center",
    },
    statCellBordered: {
      borderLeftWidth: 1,
      borderLeftColor: theme.colors.border,
    },
    statValue: {
      fontSize: 28,
      fontWeight: "800",
      color: theme.colors.text,
    },
    statLabel: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    statLabelAlert: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.colors.primary,
      marginTop: 2,
    },
    menuList: {
      flex: 1,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    menuIndex: {
      width: 42,
      height: 42,
      color: theme.colors.text,
      backgroundColor: theme.colors.text,
      borderWidth: 1,
      borderColor: theme.colors.border,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 14,
    },
    menuIndexText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.colors.surface,
    },
    menuTextGroup: {
      flex: 1,
    },
    menuTitle: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.colors.text,
    },
    menuSubtitle: {
      fontSize: 12,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    menuSyncAction: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.primary,
    },
    footer: {
      padding: 16,
      borderTopWidth: 2,
      borderTopColor: theme.colors.borderStrong,
    },
    settlementButton: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      height: 48,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
    },
    settlementButtonText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.colors.text,
      letterSpacing: 0.5,
    },
    settlementButtonHint: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
  });
};
