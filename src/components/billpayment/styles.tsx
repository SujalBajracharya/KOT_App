import { StyleSheet } from "react-native";
import { AppTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

export const createStyles = (theme: AppTheme) => {
  const global = createGlobalStyles(theme);

  return StyleSheet.create({
    ...global,
    lineItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    lineNumber: {
      width: 24,
      fontSize: 12,
      fontWeight: "700",
      color: theme.colors.textSecondary,
    },
    lineName: {
      flex: 1,
      fontSize: 14,
      fontWeight: "600",
      color: theme.colors.text,
    },
    lineQty: {
      width: 40,
      textAlign: "center",
      fontSize: 13,
      fontWeight: "700",
      color: theme.colors.text,
    },
    lineAmount: {
      width: 80,
      textAlign: "right",
      fontSize: 14,
      fontWeight: "800",
      color: theme.colors.text,
    },
  });
};
