import { View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";

export function Divider() {
  const { theme } = useTheme();

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: theme.colors.borderStrong,
        marginVertical: 10,
      }}
    ></View>
  );
}
