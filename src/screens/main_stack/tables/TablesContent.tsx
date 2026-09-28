import React from "react";
import {
  FlatList,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, RefreshCw } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";
import { AppHeader } from "@/components/common/Header";
import { IconButton } from "@/components/common/IconButton";
import { AppText as Text } from "@/components/common/AppText";
import { TableStatus, TablesContentProps } from "./types";
import { createStyles } from "./styles";
import { TableActionPopup } from "@/components/table/TableActionPopup";

export function TablesContent({ state, action }: TablesContentProps) {
  const { theme } = useTheme();
  const { isLandscape } = useOrientation();
  const styles = createStyles(theme, isLandscape);

  function cellStyles(status: TableStatus) {
    switch (status) {
      case "occupied":
        return styles.tableCellOccupied;
      case "reserved":
        return styles.tableCellReserved;
      case "vacated":
        return styles.tableCellVacated;
      default:
        return styles.tableCellFree;
    }
  }

  function isDark(status: TableStatus) {
    return status === "occupied" || status === "reserved";
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.container}>
        {/* ── Stack Header Component ── */}
        <AppHeader
          title="Tables"
          onBack={action.onBack}
          rightComponent={
            <>
              {state.isSearchVisible ? (
                <TextInput
                  autoFocus
                  value={state.searchQuery}
                  onChangeText={action.onSearchChange}
                  placeholder="Search tables"
                  placeholderTextColor={theme.colors.textSecondary}
                  style={styles.searchInput}
                  returnKeyType="search"
                />
              ) : null}
              <IconButton onPress={action.onSearch}>
                <Search size={20} color={theme.colors.text} />
              </IconButton>
              <IconButton onPress={action.onRefresh}>
                <RefreshCw size={20} color={theme.colors.text} />
              </IconButton>
            </>
          }
        />

        {/* ── Floor tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.Tabs}
          contentContainerStyle={{ flexDirection: "row" }}
        >
          {state.floors.map((floor) => (
            <Pressable
              key={floor.id}
              style={[styles.Tab, floor.active && styles.TabActive]}
              onPress={() => action.onFloorSelect(floor.id)}
            >
              <Text
                style={[styles.TabText, floor.active && styles.TabTextActive]}
              >
                {floor.name.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Legend ── */}
        <View style={styles.legend}>
          {[
            { label: "FREE", variant: "free" },
            { label: "OCCUPIED", variant: "occupied" },
            { label: "RESERVED", variant: "reserved" },
            { label: "VACATED", variant: "vacated" },
          ].map(({ label, variant }) => (
            <View key={label} style={styles.legendItem}>
              <View
                style={[
                  styles.legendSwatch,
                  variant === "free" && styles.legendSwatchFree,
                  variant === "occupied" && styles.legendSwatchOccupied,
                  variant === "reserved" && styles.legendSwatchBill,
                  variant === "vacated" && styles.legendSwatchHeld,
                ]}
              />
              <Text style={styles.legendText}>{label}</Text>
            </View>
          ))}
        </View>

        {/* ── Table grid ── */}
        <FlatList
          key={isLandscape ? "landscape" : "portrait"}
          data={state.tables}
          keyExtractor={(t) => t.id}
          numColumns={isLandscape ? 4 : 2}
          style={styles.tableGrid}
          columnWrapperStyle={{ gap: 2 }}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={action.onRefresh}
            />
          }
          renderItem={({ item: t }) => {
            const dark = isDark(t.status);
            return (
              <Pressable
                disabled={t.disabled === true}
                style={({ pressed }) => [
                  styles.tableCell,
                  pressed && styles.CellPressed,
                  styles.tableCell,
                  cellStyles(t.status),
                  t.disabled === true && styles.disabledTable,
                ]}
                onPress={() => action.onTablePress(t.name, t.status)}
              >
                <View style={styles.tableCellHeader}>
                  <Text
                    style={[
                      styles.tableNumber,
                      dark ? styles.tableNumberDark : styles.tableNumberLight,
                    ]}
                  >
                    {t.name}
                  </Text>
                  <Text
                    style={[
                      styles.tableStatus,
                      dark ? styles.tableStatusDark : styles.tableStatusLight,
                    ]}
                  >
                    {t.disabled === true ? "DISABLED" : t.statusLabel}
                  </Text>
                </View>
                <View style={styles.tableCellFooter}>
                  <Text
                    style={[
                      styles.tableMeta,
                      dark ? styles.tableMetaDark : styles.tableMetaLight,
                    ]}
                  >
                    {t.meta}
                  </Text>
                  <Text
                    style={[
                      styles.tableAmount,
                      dark ? styles.tableAmountDark : styles.tableAmountLight,
                    ]}
                  >
                    {t.amount}
                  </Text>
                </View>
              </Pressable>
            );
          }}
        />
        {/* ── Table action popup ── */}
        <TableActionPopup
          visible={!!state.popupTable}
          table={state.popupTable}
          onClose={action.onClosePopup}
          onSetSeated={action.onSetSeated}
          onTransferSeat={action.onTransferSeat}
          onCancelReservation={action.onSetFree}
          onCleanTable={action.onSetFree}
        />
        <Modal
          visible={state.transferTable !== null}
          transparent
          animationType="slide"
          onRequestClose={action.onCancelTransfer}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.45)",
              padding: 24,
            }}
            onPress={action.onCancelTransfer}
          >
            <Pressable
              style={[styles.card, { maxHeight: "80%" }]}
              onPress={() => {}}
            >
              <Text style={styles.headerTitle}>Select Destination Table</Text>

              {state.transferDestinations.length === 0 ? (
                <Text style={[styles.totalLabel, { marginTop: 12 }]}>
                  No free tables available.
                </Text>
              ) : (
                <ScrollView>
                  {state.transferDestinations.map((table) => (
                    <Pressable
                      key={table.id}
                      style={[styles.buttonSecondary, { marginTop: 8 }]}
                      onPress={() => action.onTransferDestination(table.name)}
                    >
                      <Text style={styles.buttonSecondaryText}>
                        {table.name}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
              )}
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
