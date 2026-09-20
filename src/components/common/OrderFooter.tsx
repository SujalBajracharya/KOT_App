import { Pressable, Text, View } from "react-native";
import { ArrowRight } from "lucide-react-native";

import { Divider } from "./Divider";
import { useTheme } from "@/theme/ThemeContext";
import { createGlobalStyles } from "@/styles/globalStyles";

interface OrderFooterProps {
  gross: number | string;
  discount: number | string;
  vat: number | string;
  total: number | string;

  onBill: () => void;
  onSendToKitchen: () => void;
}

export function OrderFooter({
  gross,
  discount,
  vat,
  total,
  onBill,
  onSendToKitchen,
}: OrderFooterProps) {
  const { theme } = useTheme();
  const styles = createGlobalStyles(theme);

  return (
    <View style={styles.footer}>
      <View style={styles.totalsBlock}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Gross</Text>
          <Text style={styles.totalValue}>{gross}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Discount 5%</Text>
          <Text style={styles.totalValue}>- {discount}</Text>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>VAT 13%</Text>
          <Text style={styles.totalValue}>{vat}</Text>
        </View>

        <Divider />

        <View style={styles.grandTotalRow}>
          <Text style={styles.grandTotalLabel}>TOTAL</Text>
          <Text style={styles.grandTotalValue}>{total}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <Pressable style={styles.billButton} onPress={onBill}>
          <Text style={styles.billButtonText}>BILL</Text>
        </Pressable>

        <Pressable
          style={styles.sendButton}
          onPress={onSendToKitchen}
        >
          <Text style={styles.sendButtonText}>SEND TO KITCHEN</Text>

          <ArrowRight
            size={20}
            color={theme.colors.onPrimary}
          />
        </Pressable>
      </View>
    </View>
  );
}