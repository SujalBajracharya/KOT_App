import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

export const createStyles = (theme: AppTheme) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    newKOTButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 4,
    },
    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      gap: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: theme.colors.text,
      paddingVertical: 4,
    },
    searchToggleActive: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.colors.primary,
    },
    searchToggleInactive: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.colors.textSecondary,
    },
    searchDivider: {
      width: 1,
      height: 14,
      backgroundColor: theme.colors.border,
    },
    categoryTabs: {
      maxHeight: 44,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    categoryTab: {
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    categoryTabActive: {
      borderBottomColor: theme.colors.primary,
    },
    categoryTabText: {
      fontSize: 11,
      fontWeight: "700",
      color: theme.colors.textSecondary,
    },
    categoryTabTextActive: {
      color: theme.colors.primary,
    },
    itemGrid: {
      flex: 1,
    },
    itemGridContent: {
      padding: 10,
    },
    itemCell: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      padding: 12,
      minHeight: 130,
      justifyContent: "space-between",
    },
    itemCellInCart: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + "10",
    },
    itemTop: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: 8,
    },
    itemName: {
      flex: 1,
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.text,
    },
    itemNameInCart: {
      color: theme.colors.primary,
    },
    itemThumb: {
      backgroundColor: theme.colors.background,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
      height: 100,
      width: 100,
    },
    itemThumbImage: {
      width: "100%",
      height: "100%",
    },
    itemThumbCode: {
      fontSize: 10,
      fontWeight: "800",
      color: theme.colors.textSecondary,
    },
    itemBottom: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 8,
    },
    itemUnit: {
      fontSize: 11,
      color: theme.colors.textSecondary,
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: "800",
      color: theme.colors.text,
    },
    itemPriceInCart: {
      color: theme.colors.primary,
    },
    itemBadge: {
      fontSize: 9,
      fontWeight: "800",
      color: theme.colors.primary,
      marginTop: 4,
    },
    cartBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.colors.text,
      paddingHorizontal: 18,
      paddingVertical: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      height: 90,
    },
    cartInfo: {
      flex: 1,
    },
    cartLabel: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.textSecondary,
    },
    cartSummary: {
      fontSize: 18,
      fontWeight: "800",
      color: theme.colors.background,
      marginTop: 2,
    },
    reviewButton: {
      backgroundColor: theme.colors.primary,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      height: "100%",
      gap: 8,
    },
    reviewButtonText: {
      fontSize: 13,
      fontWeight: "800",
      color: theme.colors.onPrimary,
      letterSpacing: 0.5,
    },
  });
};
