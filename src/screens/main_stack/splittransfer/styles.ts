import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

export const createStyles = (theme: AppTheme, isLandscape: boolean = false) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    contentRow: {
      flex: 1,
      flexDirection: isLandscape ? "row" : "column",
    },
    mainContent: {
      flex: 1,
    },
    sidePanel: {
      width: isLandscape ? 340 : "100%",
      borderLeftWidth: isLandscape ? 1 : 0,
      borderLeftColor: isLandscape ? theme.colors.border : undefined,
    },
    modeTabs: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    modeTab: {
      flex: 1,
      paddingVertical: 14,
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },
    modeTabFirst: {
      borderRightWidth: 1,
      borderRightColor: theme.colors.border,
    },
    modeTabActive: {
      borderBottomColor: theme.colors.primary,
    },
    modeTabText: {
      fontSize: 12,
      fontWeight: "800",
      color: theme.colors.textSecondary,
      letterSpacing: 0.5,
    },
    modeTabTextActive: {
      color: theme.colors.primary,
    },
    destinationRow: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    destinationSpacer: {
      flex: 0.2,
    },
    sourceSelector: {
      marginRight: 8,
      backgroundColor: theme.colors.text,
      flex: 1,
    },
    destinationLabel: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.colors.textSecondary,
      letterSpacing: 2,
    },
    spacer: {
      flex: 1,
    },
    destinationChip: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 4,
      marginRight: 8,
    },
    destinationChipText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.surface,
    },
    changeButton: {
      paddingHorizontal: 8,
      paddingVertical: 4,
    },
    changeButtonText: {
      fontSize: 11,
      fontWeight: "800",
      color: theme.colors.text,
    },
    splitList: {
      flex: 1,
    },
    emptyState: {
      padding: 24,
      alignItems: "center",
    },
    emptyStateText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.textSecondary,
    },
    splitItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    moveItem: {
      padding: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    splitItemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    splitItemName: {
      fontSize: 15,
      fontWeight: "700",
      color: theme.colors.text,
    },
    splitItemQty: {
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.textSecondary,
    },
    splitPartners: {
      flexDirection: "row",
      overflow: "hidden",
    },
    splitPartnerStay: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: theme.colors.background,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    splitPartnerMove: {
      flex: 1,
      paddingHorizontal: 12,
      paddingVertical: 10,
      backgroundColor: theme.colors.text,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginRight: 8,
      borderWidth: 1,
      borderColor: theme.colors.text,
      borderLeftWidth: 1,
    },
    splitPartnerLabel: {
      fontSize: 10,
      fontWeight: "800",
      color: theme.colors.textSecondary,
    },
    splitPartnerLabelDark: {
      color: theme.colors.background,
    },
    splitPartnerValue: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.colors.text,
    },
    splitPartnerValueDark: {
      color: theme.colors.background,
    },
    quantityControls: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    quantityButton: {
      minWidth: 28,
      minHeight: 28,
      marginHorizontal: 8,
      paddingHorizontal: 6,
      paddingVertical: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    quantityButtonText: {
      fontSize: 17,
      fontWeight: "800",
      color: theme.colors.onPrimary,
    },
    modalBackdrop: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.45)",
      justifyContent: "center",
      padding: 24,
    },
    tablePicker: {
      maxHeight: "80%",
      backgroundColor: theme.colors.surface,
      borderRadius: 6,
      paddingVertical: 8,
    },
    tablePickerTitle: {
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 13,
      fontWeight: "800",
      color: theme.colors.text,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    tableOption: {
      minHeight: 48,
      paddingHorizontal: 16,
      justifyContent: "center",
      alignItems: "flex-start",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    tableOptionText: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.colors.text,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      gap: 12,
    },
    footerSummary: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    footerSummaryText: {
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.textSecondary,
    },
    confirmButtonText: {
      fontSize: 14,
      fontWeight: "800",
      color: theme.colors.onPrimary,
      letterSpacing: 0.5,
    },
  });
};
