import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";
import { AppHeader } from "@/components/common/Header";
import { Button } from "@/components/common/Button";
import { QuantitySheet } from "@/components/quantity&remarks/Quantity&Remarks";
import { OrderContentProps } from "./types";
import { createStyles } from "./styles";
import { ExpandableCartReview } from "@/components/order/ExpandableCartReview";
import { MenuItemCard } from "@/components/order/MenuItemCard";

export function OrderContent({ TABLENO, state, action }: OrderContentProps) {
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
          title={TABLENO ? TABLENO : state.tableLabel}
          subtitle={!TABLENO ? state.tableMeta : undefined}
          onBack={action.onBack}
          rightComponent={
            // <Pressable style={styles.newKOTButton} onPress={action.onNewKOT}>
            //   <Text style={styles.newKOTText}>NEW KOT</Text>
            // </Pressable>
            <>
              <Button onPress={action.onNewKOT} style={{ flex: 0 }}>
                <Text style={styles.ButtonText}>NEW KOT</Text>
              </Button>
            </>
          }
        />

        {/* ── Search bar ── */}
        <View style={styles.searchBar}>
          <Search size={20} color={theme.colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={state.searchQuery}
            onChangeText={action.setSearchQuery}
            placeholder="Search item or code"
            placeholderTextColor={theme.colors.textSecondary + "80"}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Pressable onPress={() => action.setSearchMode("name")} hitSlop={6}>
            <Text
              style={
                state.searchMode === "name"
                  ? styles.searchToggleActive
                  : styles.searchToggleInactive
              }
            >
              NAME
            </Text>
          </Pressable>
          <View style={styles.searchDivider} />
          <Pressable onPress={() => action.setSearchMode("code")} hitSlop={6}>
            <Text
              style={
                state.searchMode === "code"
                  ? styles.searchToggleActive
                  : styles.searchToggleInactive
              }
            >
              CODE
            </Text>
          </Pressable>
        </View>

        {/* ── Category tabs ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.Tabs}
          contentContainerStyle={{ flexDirection: "row" }}
        >
          {state.categories.map((cat) => (
            <Pressable
              key={cat.id}
              style={[styles.Tab, cat.active && styles.TabActive]}
              onPress={() => action.onCategorySelect(cat.id)}
            >
              <Text
                style={[styles.TabText, cat.active && styles.TabTextActive]}
              >
                {cat.name.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* ── Item grid ── */}
        <FlatList
          key={isLandscape ? "landscape" : "portrait"}
          data={state.items}
          keyExtractor={(item) => item.id}
          numColumns={isLandscape ? 3 : 2}
          columnWrapperStyle={{ gap: 2 }}
          style={styles.itemGrid}
          renderItem={({ item }) => {
            const isInCart =
              item.inCart ||
              state.savedOrderItems.some(
                (savedItem) => savedItem.id === item.id,
              );

            return (
              <MenuItemCard
                item={item}
                isInCart={isInCart}
                onPress={() => action.onItemPress(item.id)}
                styles={styles}
              />
            );
          }}
        />

        {/* ── Cart bar ── */}
        {(state.cartItemCount > 0 || state.hasExistingOrder) && (
          <ExpandableCartReview
            items={state.existingOrderItems}
            itemCount={state.existingOrderItems.reduce(
              (total, item) => total + item.quantity,
              0,
            )}
            total={state.cartTotal}
            isExpanded={state.isCartExpanded}
            onToggle={() => action.setIsCartExpanded(!state.isCartExpanded)}
            onSendToKitchen={action.onSendToKitchen}
          />
        )}

        {/* ── Quantity & Remarks Modal ── */}
        <QuantitySheet
          state={state.quantitySheet}
          action={action.quantitySheet}
        />
      </View>
    </SafeAreaView>
  );
}
