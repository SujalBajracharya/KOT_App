import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Minus, Plus, ArrowRight } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { AppHeader } from "@/components/common/Header";
import { ReviewKOTContentProps } from "./types";
import { createStyles } from "./styles";
import { Button } from "@/components/common/Button";
import { LineItem } from "@/components/review_kot/LineItem";
import { Divider } from "@/components/common/Divider";

export function ReviewKOTContent({ state, action }: ReviewKOTContentProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.container}>
        {/* ── Header ── */}
        <AppHeader
          title={state.kotLabel}
          subtitle={state.kotMeta}
          onBack={action.onBack}
          rightComponent={
            // <Pressable style={styles.paxButton} onPress={action.onPAXChange}>
            //   <Text style={styles.paxButtonText}>PAX {state.paxCount}</Text>
            // </Pressable>
            <Button onPress={action.onPAXChange}>
              <Text style={styles.ButtonText}>PAX 4</Text>
            </Button>
          }
        />

        {/* ── Line items ── */}
        <FlatList
          data={state.lines}
          keyExtractor={(l) => l.id}
          renderItem={({ item: l }) => (
            <LineItem
              id={l.id}
              qty={l.qty}
              name={l.name}
              unit={l.unit}
              note={l.note}
              quantity={l.quantity}
              amount={l.amount}
              onDecrement={action.onDecrement}
              onIncrement={action.onIncrement}
            />
          )}
        />

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <View style={styles.totalsBlock}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Gross</Text>
              <Text style={styles.totalValue}>{state.gross}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Discount 5%</Text>
              <Text style={styles.totalValue}>{state.discount}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>VAT 13%</Text>
              <Text style={styles.totalValue}>{state.vat}</Text>
            </View>
            <Divider />
            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>TOTAL</Text>
              <Text style={styles.grandTotalValue}>{state.total}</Text>
            </View>
          </View>
          <View style={styles.actionRow}>
            <Pressable style={styles.billButton} onPress={action.onBill}>
              <Text style={styles.billButtonText}>BILL</Text>
            </Pressable>
            <Pressable
              style={styles.sendButton}
              onPress={action.onSendToKitchen}
            >
              <Text style={styles.sendButtonText}>SEND TO KITCHEN</Text>
              <ArrowRight size={20} color={theme.colors.onPrimary} />
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
