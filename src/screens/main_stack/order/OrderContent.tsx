import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Search, ArrowRight } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { AppHeader } from "@/components/common";
import { Button } from "@/components/common/Button";
import { QuantitySheet } from "@/components/quantity&remarks/Quantity&Remarks";
import { OrderContentProps } from "./types";
import { createStyles } from "./styles";

export function OrderContent({ state, action }: OrderContentProps) {
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
          title={state.tableLabel}
          subtitle={state.tableMeta}
          onBack={action.onBack}
          rightComponent={
            // <Pressable style={styles.newKOTButton} onPress={action.onNewKOT}>
            //   <Text style={styles.newKOTText}>NEW KOT</Text>
            // </Pressable>
            <>
              <Button onPress={action.onNewKOT}>
                <Text style={styles.newKOTText}>NEW KOT</Text>
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
          data={state.items}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={styles.itemGrid}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.itemCell, item.inCart && styles.itemCellInCart]}
              onPress={() => action.onItemPress(item.id)}
            >
              <View style={styles.itemTop}>
                <Text
                  style={[
                    styles.itemName,
                    item.inCart && styles.itemNameInCart,
                  ]}
                  numberOfLines={3}
                >
                  {item.name}
                </Text>
                <View style={styles.itemThumb}>
                  <Image
                    source={require("../../../../assets/placeholderimage.jpg")}
                    style={styles.itemThumbImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View>
                <View style={styles.itemBottom}>
                  <Text style={styles.itemUnit}>{item.unit}</Text>
                  <Text
                    style={[
                      styles.itemPrice,
                      item.inCart && styles.itemPriceInCart,
                    ]}
                  >
                    {item.price}
                  </Text>
                </View>
                {item.badge ? (
                  <Text style={styles.itemBadge}>{item.badge}</Text>
                ) : null}
              </View>
            </Pressable>
          )}
        />

        {/* ── Cart bar ── */}
        {state.cartItemCount > 0 && (
          <View style={styles.cartBar}>
            <View style={styles.cartInfo}>
              <Text style={styles.cartLabel}>RUNNING KOT</Text>
              <Text style={styles.cartSummary}>
                {state.cartItemCount} items · {state.cartTotal}
              </Text>
            </View>
            <Pressable style={styles.reviewButton} onPress={action.onReviewKOT}>
              <Text style={styles.reviewButtonText}>REVIEW</Text>
              <ArrowRight size={20} color={theme.colors.onPrimary} />
            </Pressable>
          </View>
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

