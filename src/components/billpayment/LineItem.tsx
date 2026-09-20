import { Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "./styles";

export interface LineItemData {
  id: string;
  n: number;
  name: string;
  qty: number;
  amount: number | string;
}

interface LineItemProps {
  item: LineItemData;
}

export function LineItem({ item }: LineItemProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.lineItem}>
      <Text style={styles.lineNumber}>{item.n}</Text>
      <Text style={styles.lineName}>{item.name}</Text>
      <Text style={styles.lineQty}>{item.qty}</Text>
      <Text style={styles.lineAmount}>{item.amount}</Text>
    </View>
  );
}