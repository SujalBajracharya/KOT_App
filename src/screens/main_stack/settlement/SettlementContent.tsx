import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeContext";
import { AppHeader } from "@/components/common/Header";
import { SettlementContentProps } from "./types";
import { createStyles } from "./styles";
import { Button } from "@/components/common/Button";
import { PrimaryButton } from "@/components/common/PrimaryButton";

export function SettlementContent({ state, action }: SettlementContentProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.container}>
        {/* ── Header ── */}
        <AppHeader title="Settlement" onBack={action.onBack} />

        {/* ── Content ── */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.shiftLabel}>{state.shiftLabel}</Text>
          <Text style={styles.totalAmount}>{state.totalAmount}</Text>
          <Text style={styles.totalMeta}>{state.totalMeta}</Text>

          {/* Breakdown rows */}
          <View style={styles.breakdownTable}>
            {state.rows.map((row) => (
              <View key={row.id} style={styles.breakdownRow}>
                <Text style={styles.breakdownLabel}>{row.label}</Text>
                <Text style={styles.breakdownCount}>{row.count}</Text>
                <Text style={styles.breakdownAmount}>{row.amount}</Text>
              </View>
            ))}
          </View>

          {/* Warning banner */}
          {state.warningText ? (
            <View style={styles.warningBanner}>
              <Text style={styles.warningIcon}>!</Text>
              <Text style={styles.warningText}>{state.warningText}</Text>
            </View>
          ) : null}
        </ScrollView>

        {/* ── Footer ── */}
        {/* <View style={styles.footer}>
          <Pressable style={styles.printButton} onPress={action.onPrintXReport}>
            <Text style={styles.printButtonText}>PRINT X-REPORT</Text>
          </Pressable>
          <Pressable style={styles.endButton} onPress={action.onEndSession}>
            <Text style={styles.endButtonText}>END SESSION</Text>
          </Pressable>
        </View> */}
        <View style={styles.footer}>
          <Button onPress={action.onPrintXReport} style={{ flex: 1 }}>
            <Text style={styles.printButtonText}>PRINT</Text>
          </Button>
          <PrimaryButton
            onPress={action.onEndSession}
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              flex: 1,
              height: 46,
            }}
          >
            <Text style={styles.primaryButtonText}>END SESSION</Text>
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
