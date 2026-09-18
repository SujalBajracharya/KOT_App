import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, Bell, LogOut } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { AppHeader, IconButton } from "@/components/common";
import { HomeContentProps } from "./types";
import { createStyles } from "./styles";

export function HomeContent({ state, action }: HomeContentProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const menuItems = [
    {
      index: "01",
      title: "Take order",
      subtitle: "Pick a table, build a KOT",
      onPress: action.onTakeOrder,
      rightContent: <ChevronRight size={22} color={theme.colors.text} />,
    },
    {
      index: "02",
      title: "KOT memo",
      subtitle: "Kitchen notes & reprints",
      onPress: action.onKOTMemo,
      rightContent: <ChevronRight size={22} color={theme.colors.text} />,
    },
    {
      index: "03",
      title: "Split & transfer",
      subtitle: "Move items between tables",
      onPress: action.onSplitTransfer,
      rightContent: <ChevronRight size={22} color={theme.colors.text} />,
    },
    {
      index: "04",
      title: "Sync menu",
      subtitle: `Last synced ${state.lastSynced} · ${state.menuItemCount} items`,
      onPress: action.onSyncMenu,
      rightContent: <Text style={styles.menuSyncAction}>SYNC</Text>,
    },
  ];

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.container}>
        {/* ── Header ── */}
        <AppHeader
          title={state.userName}
          subtitle={`TERMINAL ${state.terminal} · SHIFT ${state.shift}`}
          showBack={false}
          rightComponent={
            <>
              <IconButton
                style={styles.iconButtonRelative}
                onPress={action.onNotifications}
              >
                <Bell size={20} color={theme.colors.text} />
                {state.notificationCount > 0 && (
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>
                      {state.notificationCount}
                    </Text>
                  </View>
                )}
              </IconButton>
              <IconButton
                style={styles.iconButtonRelative}
                onPress={action.onLogOut}
              >
                <LogOut size={20} color={theme.colors.text} />
              </IconButton>
            </>
          }
        />

        {/* ── Stats row ── */}
        <View style={styles.statsRow}>
          <View style={styles.statCell}>
            <Text style={styles.statValue}>{state.tablesOpen}</Text>
            <Text style={styles.statLabel}>{"TABLES\nOPEN"}</Text>
          </View>
          <View style={[styles.statCell, styles.statCellBordered]}>
            <Text style={styles.statValue}>{state.billsWaiting}</Text>
            <Text style={styles.statLabelAlert}>{'BILLS\nWAITING'}</Text>
          </View>
          <View style={[styles.statCell, styles.statCellBordered]}>
            <Text style={styles.statValue}>{state.revenueToday}</Text>
            <Text style={styles.statLabel}>RS TODAY</Text>
          </View>
        </View>

        {/* ── Menu list ── */}
        <ScrollView
          style={styles.menuList}
          showsVerticalScrollIndicator={false}
        >
          {menuItems.map((item) => (
            <Pressable
              key={item.index}
              style={styles.menuItem}
              onPress={item.onPress}
              hitSlop={4}
            >
              <View style={styles.menuIndex}>
                <Text style={styles.menuIndexText}>{item.index}</Text>
              </View>
              <View style={styles.menuTextGroup}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
              </View>
              {item.rightContent}
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Footer ── */}
        <View style={styles.footer}>
          <Pressable
            style={styles.settlementButton}
            onPress={action.onSettlement}
          >
            <Text style={styles.settlementButtonText}>SETTLEMENT</Text>
            <Text style={styles.settlementButtonHint}>end session</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
