import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";
import { AppHeader } from "@/components/common/Header";
import { ReviewKOTContentProps } from "./types";
import { createStyles } from "./styles";
import { Button } from "@/components/common/Button";
import { LineItem } from "@/components/review_kot/LineItem";
import { OrderFooter } from "@/components/common/OrderFooter";

export function ReviewKOTContent({ state, action }: ReviewKOTContentProps) {
  const { theme } = useTheme();
  const { isLandscape } = useOrientation();
  const styles = createStyles(theme, isLandscape);

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
            <Button onPress={action.onPAXChange} style={{flex: 0}}>
              <Text style={styles.ButtonText}>PAX 4</Text>
            </Button>
          }
        />

        {/* ── Two panel layout in landscape / stacked in portrait ── */}
        <View style={styles.contentRow}>
          <View style={styles.mainContent}>
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
          </View>

          {/* ── Footer / Actions side panel ── */}
          <View style={styles.sidePanel}>
            <OrderFooter
              gross={state.gross}
              discount={state.discount}
              vat={state.vat}
              total={state.total}
              onBill={action.onBill}
              onSendToKitchen={action.onSendToKitchen}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
