import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";
import { IconButton } from "./IconButton";

export interface AppHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showBack?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function AppHeader({
  title,
  subtitle,
  onBack,
  showBack = true,
  leftComponent,
  rightComponent,
  style,
}: AppHeaderProps) {
  const { theme } = useTheme();
  const globalStyles = createGlobalStyles(theme);

  return (
    <View
      style={[
        globalStyles.header,
        { borderBottomColor: theme.colors.borderStrong, borderBottomWidth: 2 },
        style,
      ]}
    >
      {leftComponent ? (
        leftComponent
      ) : showBack && onBack ? (
        <IconButton onPress={onBack} hitSlop={4}>
          <ArrowLeft size={20} color={theme.colors.text} />
        </IconButton>
      ) : null}

      <View
        style={[
          globalStyles.headerTitleContainer,
          { marginLeft: (showBack && onBack) || leftComponent ? 8 : 0 },
        ]}
      >
        <Text style={globalStyles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={globalStyles.headerSubtitle} numberOfLines={1}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      {rightComponent ? (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          {rightComponent}
        </View>
      ) : null}
    </View>
  );
}

export { AppHeader as Header };
