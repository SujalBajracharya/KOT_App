import React from "react";
import {
  Text as NativeText,
  TextProps,
} from "react-native";

import { fonts } from "@/constants";

export function AppText({ style, ...props }: TextProps) {
  return (
    <NativeText
      {...props}
      style={[{ fontFamily: fonts.family.regular }, style]}
    />
  );
}
