import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";
import { fonts } from "@/constants";

export const createStyles = (theme: AppTheme, isLandscape: boolean = false) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    contentRow: {
      flex: 1,
      flexDirection: isLandscape ? "row" : "column",
      justifyContent: "flex-end",
    },
    mainContent: {
      flex: 1,
    },
    sidePanel: {
      width: isLandscape ? 230 : "100%",
      borderLeftWidth: isLandscape ? 1 : 0,
      borderLeftColor: isLandscape ? theme.colors.border : undefined,
      height: isLandscape ? "100%" : 80,
    },
    lineItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      minHeight: 64,
    },
    lineNumber: {
      width: 24,
      fontSize: 12,
      fontFamily: fonts.family.bold,
      color: theme.colors.textSecondary,
    },
    lineName: {
      flex: 1,
      fontSize: 14,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    lineQty: {
      minWidth: 60,
      textAlign: "center",
      fontSize: 13,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    lineAmount: {
      width: 80,
      textAlign: "right",
      fontSize: 14,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      gap: 12,
    },
    discountRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    discountLabel: {
      fontSize: 11,
      fontFamily: fonts.family.bold,
      color: theme.colors.textSecondary,
    },
    discountInput: {
      width: 60,
      height: 36,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 4,
      justifyContent: "center",
      backgroundColor: theme.colors.background,
    },
    discountInputText: {
      fontSize: 13,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    discountTypeToggle: {
      width: 100,
      flexDirection: "row",
      borderWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.text,
      overflow: "hidden",
    },
    discountTypeBtn: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: theme.colors.background,
    },
    discountTypeBtnActive: {
      backgroundColor: theme.colors.primary,
    },
    discountTypeBtnText: {
      fontSize: 12,
      fontFamily: fonts.family.bold,
      color: theme.colors.textSecondary,
      textAlign: "center",
    },
    discountTypeBtnTextActive: {
      color: theme.colors.text,
    },
    discountSpacer: {
      flex: 1,
    },
    applyButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 4,
    },
    applyButtonText: {
      fontSize: 11,
      fontFamily: fonts.family.bold,
      color: theme.colors.onPrimary,
    },
    totalsBlock: {
      gap: 4,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    totalLabel: {
      fontSize: 12,
      color: theme.colors.textSecondary,
    },
    totalValue: {
      fontSize: 12,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    grandTotalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginTop: 4,
    },
    grandTotalLabel: {
      fontSize: 14,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    grandTotalValue: {
      fontSize: fonts.size.xxl,
      fontFamily: fonts.family.bold,
      color: theme.colors.primary,
    },
    paymentMethodLabel: {
      fontSize: 10,
      fontFamily: fonts.family.bold,
      color: theme.colors.textSecondary,
    },
    paymentMethodRow: {
      gap: 10,
      justifyContent: "space-between",
      flexDirection: "row",
    },
    paymentMethodBtn: {
      flex: 1,
      height: 38,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    paymentMethodBtnActive: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary + "15",
    },
    paymentMethodText: {
      fontSize: 11,
      fontFamily: fonts.family.bold,
      color: theme.colors.textSecondary,
    },
    paymentMethodTextActive: {
      color: theme.colors.primary,
    },
    actionRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 4,
    },
    printButton: {
      flex: 1,
      height: 44,
      borderWidth: 1,
      borderColor: theme.colors.borderStrong,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
    },
    printButtonText: {
      fontSize: 13,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    settleButton: {
      flex: 2,
      height: 44,
      backgroundColor: theme.colors.primary,
      borderRadius: 6,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    },
    settleButtonText: {
      fontSize: 13,
      fontFamily: fonts.family.bold,
      color: theme.colors.onPrimary,
    },
  });
};
