import React from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";
import { AppHeader } from "@/components/common/Header";
import { SplitMode, SplitTransferContentProps } from "./types";
import { createStyles } from "./styles";
import { Button } from "@/components/common/Button";
import { PrimaryButton } from "@/components/common/PrimaryButton";

export function SplitTransferContent({
  state,
  action,
}: SplitTransferContentProps) {
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
        <AppHeader title={state.tableLabel} onBack={action.onBack} />

        {/* ── Mode tabs ── */}
        <View style={styles.SplitTabs}>
          {state.modes.map((mode) => (
            <Pressable
              key={mode.id}
              style={[styles.SplitTab, mode.active && styles.TabActive]}
              onPress={() => action.onModeSelect(mode.id)}
            >
              <Text
                style={[styles.TabText, mode.active && styles.TabTextActive]}
              >
                {mode.name}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Two-panel layout in landscape / stacked in portrait ── */}
        <View style={styles.contentRow}>
          <View style={styles.mainContent}>
            {/* ── Destination ── */}
            <View style={styles.destinationRow}>
              <Text style={styles.destinationLabel}>DESTINATION</Text>
              <View style={{flex: 0.2}} />

              <Button
                style={{ marginRight: 8, backgroundColor: theme.colors.text, flex: 1 }}
              >
                <Text style={styles.destinationChipText}
                numberOfLines={1}>
                  {state.destination}
                </Text>
              </Button>
              <Button onPress={action.onChangeDestination} style={{flex: 0.2}}>
                <Text style={styles.changeButtonText}>CHANGE</Text>
              </Button>
            </View>

            {/* ── Lines ── */}
            <FlatList
              data={state.lines}
              keyExtractor={(l) => l.id}
              style={styles.splitList}
              renderItem={({ item: l }) => (
                <View style={styles.splitItem}>
                  <View style={styles.splitItemHeader}>
                    <Text style={styles.splitItemName}>{l.name}</Text>
                    <Text style={styles.splitItemQty}>{l.totalQty}</Text>
                  </View>
                  <View style={styles.splitPartners}>
                    <View style={styles.splitPartnerStay}>
                      <Text style={styles.splitPartnerLabel}>
                        {l.stayLabel}
                      </Text>
                      <Text style={styles.splitPartnerValue}>{l.stayQty}</Text>
                    </View>
                    <View style={styles.splitPartnerMove}>
                      <Text
                        style={[
                          styles.splitPartnerLabel,
                          styles.splitPartnerLabelDark,
                        ]}
                      >
                        {l.moveLabel}
                      </Text>
                      <Text
                        style={[
                          styles.splitPartnerValue,
                          styles.splitPartnerValueDark,
                        ]}
                      >
                        {l.moveQty}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>

          {/* ── Footer / Actions side panel ── */}
          <View style={styles.sidePanel}>
            <View style={styles.footer}>
              <View style={styles.footerSummary}>
                <Text style={styles.footerSummaryText}>
                  {state.movingSummary}
                </Text>
                <Text style={styles.footerSummaryText}>
                  {state.stayingSummary}
                </Text>
              </View>
              <Button
                onPress={action.onConfirm}
                style={{
                  flex: 0,
                  height: 64,
                  backgroundColor: theme.colors.primary,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  borderColor: theme.colors.primary,
                }}
              >
                <Text style={styles.confirmButtonText}>CONFIRM SPLIT</Text>

                <Check size={20} color={theme.colors.onPrimary} />
              </Button>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
