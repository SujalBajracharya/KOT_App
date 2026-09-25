import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { fonts } from "@/constants";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    lineItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      minHeight: 80,
      gap: 2,
    },
    lineQtyCol: {
      width: 32,
    },
    lineQty: {
      fontSize: 14,
      fontFamily: fonts.family.bold,
      color: theme.colors.primary,
    },
    lineBody: {
      flex: 1,
    },
    lineName: {
      fontSize: 16,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    lineUnit: {
      fontSize: 11,
      color: theme.colors.textSecondary,
      marginTop: 2,
    },
    lineNote: {
      fontSize: 10,
      fontFamily: fonts.family.bold,
      color: theme.colors.primary,
      marginTop: 2,
    },
    lineQtyStepper: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
      overflow: "hidden",
      marginRight: 12,
    },
    lineAmount: {
      width: 70,
      textAlign: "right",
      fontSize: 17,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
    stepperBtn: {
      width: 42,
      height: 42,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
    },
    stepperBtnRight: {
      width: 42,
      height: 42,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.surface,
    },
    stepperQty: {
      width: 42,
      height: 42,
      justifyContent: "center",
      alignItems: "center",
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    },
    stepperQtyText: {
      fontSize: 13,
      fontFamily: fonts.family.bold,
      color: theme.colors.text,
    },
  });
