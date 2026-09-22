import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

export const createStyles = (theme: AppTheme, isLandscape: boolean = false) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    legend: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-around",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    legendItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    legendSwatch: {
      width: 12,
      height: 12,
    },
    legendSwatchFree: {
      backgroundColor: theme.colors.statusFree,
    },
    legendSwatchOccupied: {
      backgroundColor: theme.colors.statusOccupied,
    },
    legendSwatchBill: {
      backgroundColor: theme.colors.statusBill,
    },
    legendSwatchHeld: {
      backgroundColor: theme.colors.statusHeld,
    },
    legendText: {
      fontSize: 10,
      fontWeight: "700",
      color: theme.colors.textSecondary,
    },
    tableGrid: {
      flex: 1,
    },
    disabledTable: {
      opacity: 0.2,
    },
    tableCell: {
      aspectRatio: 1 / 1,
      marginBottom: 2,
      flex: 1,
      borderWidth: 1,
      padding: 12,
      justifyContent: "space-between",
      // maxHeight: isLandscape ? 100 : 130,
    },
    tableCellHeld: {
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border,
    },
    tableCellOccupied: {
      backgroundColor: theme.colors.statusOccupied,
      borderColor: theme.colors.statusOccupied,
    },
    tableCellBill: {
      backgroundColor: theme.colors.statusBill,
      borderColor: theme.colors.statusBill,
    },
    tableCellFree: {
      backgroundColor: theme.colors.statusFree,
      borderColor: theme.colors.statusFree,
    },
    tableCellHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    tableCellFooter: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    tableNumber: {
      fontSize: 18,
      fontWeight: "800",
    },
    tableNumberLight: {
      color: theme.colors.text,
    },
    tableNumberDark: {
      color: theme.colors.onPrimary,
    },
    tableStatus: {
      fontSize: 10,
      fontWeight: "800",
    },
    tableStatusLight: {
      color: theme.colors.textSecondary,
    },
    tableStatusDark: {
      color: theme.colors.onPrimary,
      opacity: 0.9,
    },
    tableMeta: {
      fontSize: 11,
      fontWeight: "600",
      marginTop: isLandscape ? 16 : 40,
    },
    tableMetaLight: {
      color: theme.colors.textSecondary,
    },
    tableMetaDark: {
      color: theme.colors.onPrimary,
      opacity: 0.85,
    },
    tableAmount: {
      fontSize: 14,
      fontWeight: "800",
      marginTop: 8,
    },
    tableAmountLight: {
      color: theme.colors.text,
    },
    tableAmountDark: {
      color: theme.colors.onPrimary,
    },
  });
};
