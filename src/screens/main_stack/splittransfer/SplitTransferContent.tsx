import React from "react";
import { FlatList, Modal, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Check } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";
import { AppHeader } from "@/components/common/Header";
import { SplitTransferContentProps } from "./types";
import { createStyles } from "./styles";
import { Button } from "@/components/common/Button";

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
            {/* ── Source ── */}
            <View style={styles.destinationRow}>
              <Text style={styles.destinationLabel}>SOURCE</Text>
              <View style={styles.destinationSpacer} />
              <Button
                onPress={action.onChangeSourceTable}
                style={styles.sourceSelector}
              >
                <Text style={styles.destinationChipText} numberOfLines={1}>
                  {state.sourceTable || "SELECT TABLE"}
                </Text>
              </Button>
            </View>

            {/* ── Destination ── */}
            <View style={styles.destinationRow}>
              <Text style={styles.destinationLabel}>DESTINATION</Text>
              <View style={styles.destinationSpacer} />

              <Button
                onPress={action.onChangeDestination}
                style={styles.sourceSelector}
              >
                <Text style={styles.destinationChipText} numberOfLines={1}>
                  {state.destination || "SELECT TABLE"}
                </Text>
              </Button>
            </View>

            {/* ── Lines ── */}
            <FlatList
              data={state.lines}
              keyExtractor={(l) => l.id}
              style={styles.splitList}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    {state.sourceTable
                      ? "No items on this table."
                      : "Select a source table first."}
                  </Text>
                </View>
              }
              renderItem={({ item: l }) =>
                state.activeMode === "move" ? (
                  <View style={styles.moveItem}>
                    <Text style={styles.splitItemName}>{l.name}</Text>
                    <Text style={styles.splitItemQty}>{l.totalQty}</Text>
                  </View>
                ) : (
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
                        <Text style={styles.splitPartnerValue}>
                          {l.stayQty}
                        </Text>
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
                        <View style={styles.quantityControls}>
                          <Button
                            onPress={() =>
                              action.onMoveQuantityChange(l.id, -1)
                            }
                            disabled={l.moveQty === 0}
                            style={styles.quantityButton}
                            accessibilityLabel={`Move less ${l.name}`}
                          >
                            <Text style={styles.quantityButtonText}>-</Text>
                          </Button>
                          <Text
                            style={[
                              styles.splitPartnerValue,
                              styles.splitPartnerValueDark,
                            ]}
                          >
                            {l.moveQty}
                          </Text>
                          <Button
                            onPress={() =>
                              action.onMoveQuantityChange(l.id, 1)
                            }
                            disabled={l.moveQty >= l.stayQty + l.moveQty}
                            style={styles.quantityButton}
                            accessibilityLabel={`Move more ${l.name}`}
                          >
                            <Text style={styles.quantityButtonText}>+</Text>
                          </Button>
                        </View>
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
                  {state.activeMode === "move"
                    ? `Moving all items from ${state.sourceTable || "source"}`
                    : state.movingSummary}
                </Text>
                <Text style={styles.footerSummaryText}>
                  {state.activeMode === "move"
                    ? "Source will be empty"
                    : state.stayingSummary}
                </Text>
              </View>
              <Button
                onPress={action.onConfirm}
                disabled={!state.sourceTable}
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
                <Text style={styles.confirmButtonText}>
                  {state.activeMode === "move" ? "MOVE TABLE" : "CONFIRM SPLIT"}
                </Text>

                <Check size={20} color={theme.colors.onPrimary} />
              </Button>
            </View>
          </View>
        </View>

        <Modal
          visible={state.isTableSelectorVisible}
          transparent
          animationType="fade"
          onRequestClose={action.onCloseTableSelector}
        >
          <Pressable
            style={styles.modalBackdrop}
            onPress={action.onCloseTableSelector}
          >
            <Pressable
              style={styles.tablePicker}
              onPress={(event) => event.stopPropagation()}
            >
              <Text style={styles.tablePickerTitle}>
                {state.tableSelectionMode === "destination"
                  ? "SELECT DESTINATION TABLE"
                  : "SELECT SOURCE TABLE"}
              </Text>
              <FlatList
                data={
                  state.tableSelectionMode === "destination"
                    ? state.destinationTables
                    : state.sourceTables
                }
                keyExtractor={(tableNo) => tableNo}
                renderItem={({ item: tableNo }) => (
                  <Button
                    onPress={() =>
                      state.tableSelectionMode === "destination"
                        ? action.onSelectDestinationTable(tableNo)
                        : action.onSelectSourceTable(tableNo)
                    }
                    style={styles.tableOption}
                  >
                    <Text style={styles.tableOptionText}>{tableNo}</Text>
                  </Button>
                )}
              />
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
