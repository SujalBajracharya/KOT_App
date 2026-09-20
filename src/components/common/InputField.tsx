import React from "react";
import {
  TextInput,
  TextInputProps,
  StyleProp,
  TextStyle,
} from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

export interface FieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export function InputField({ style, ...props }: FieldProps) {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  return (
    <TextInput
      style={[globalStyles.field, style]}
      {...props}
    />
  );
}