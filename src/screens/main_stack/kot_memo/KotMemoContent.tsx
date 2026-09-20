import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "./styles";
import { KOTMemoContentProps, MemoFilter, MemoItem, MemoStatus } from "./types";
import { AppHeader } from "@/components/common/Header";

// ─────────────────────────────────────────────
//  Constants
// ─────────────────────────────────────────────
const FILTERS: { key: MemoFilter; label: string }[] = [
  { key: "today", label: "TODAY" },
  { key: "voided", label: "VOIDED" },
  { key: "all", label: "ALL" },
];

// ─────────────────────────────────────────────
//  Sub-components
// ─────────────────────────────────────────────
function MemoCard({
  item,
  onReprint,
  onOpenTable,
  styles,
}: {
  item: MemoItem;
  onReprint: (id: string) => void;
  onOpenTable: (id: string) => void;
  styles: ReturnType<typeof createStyles>;
}) {
  function statusStyle(status: MemoStatus) {
    switch (status) {
      case "voided":
        return styles.memoStatusVoided;
      case "printing":
        return styles.memoStatusPrinting;
      default:
        return styles.memoStatusSent;
    }
  }

  return (
    <View style={styles.memoCard}>
      {/* KOT label · table · status */}
      <View style={styles.memoCardTop}>
        <Text style={styles.memoKOT}>{item.kot}</Text>
        <Text style={styles.memoTable}>{item.table}</Text>
        <View style={styles.memoSpacer} />
        <Text style={[styles.memoStatus, statusStyle(item.status)]}>
          {item.statusLabel}
        </Text>
      </View>

      {/* Line summary */}
      <Text style={styles.memoLines}>{item.lines}</Text>

      {/* Actions */}
      <View style={styles.memoActions}>
        <Pressable
          style={styles.memoActionBtn}
          onPress={() => onReprint(item.id)}
          hitSlop={4}
        >
          <Text style={styles.memoActionText}>REPRINT</Text>
        </Pressable>
        <Pressable
          style={styles.memoActionBtn}
          onPress={() => onOpenTable(item.id)}
          hitSlop={4}
        >
          <Text style={styles.memoActionText}>OPEN TABLE</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────
//  Content (pure — no hooks except theme/styles)
// ─────────────────────────────────────────────
export function KOTMemoContent({ state, action }: KOTMemoContentProps) {
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
          title="KOT Memo"
          onBack={action.onBack}
        />

        {/* ── Filter tabs ── */}
        <View style={styles.SplitTabs}>
          {FILTERS.map((f, i) => (
            <Pressable
              key={f.key}
              style={[
                styles.Tab,
                i === 0 && styles.filterTabFirst,
                state.filter === f.key && styles.TabActive,
              ]}
              onPress={() => action.onFilterChange(f.key)}
              disabled={state.isLoading}
            >
              <Text
                style={[
                  styles.TabText,
                  state.filter === f.key && styles.TabTextActive,
                ]}
              >
                {f.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Memo list ── */}
        {state.memos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No KOTs for this filter.</Text>
          </View>
        ) : (
          <FlatList
            data={state.memos}
            keyExtractor={(m) => m.id}
            style={styles.memoList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MemoCard
                item={item}
                onReprint={action.onReprint}
                onOpenTable={action.onOpenTable}
                styles={styles}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
