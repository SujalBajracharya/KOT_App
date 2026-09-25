import React from "react";
import { Image, Pressable, View } from "react-native";
import { AppText as Text } from '@/components/common/AppText';

import { MenuItem } from "@/screens/main_stack/order/types";

interface MenuItemCardProps {
  item: MenuItem;
  isInCart: boolean;
  onPress: () => void;
  styles: any;
}

export function MenuItemCard({
  item,
  isInCart,
  onPress,
  styles,
}: MenuItemCardProps) {
  return (
    <Pressable
      style={[
        styles.itemCell,
        { marginBottom: 2 },
        isInCart && styles.itemCellInCart,
      ]}
      onPress={onPress}
    >
      <View style={styles.itemTop}>
        <Text
          style={[styles.itemName, isInCart && styles.itemNameInCart]}
          numberOfLines={2}
        >
          {item.name}
        </Text>

        <View style={styles.itemThumb}>
          <Image
            source={item.image}
            style={styles.itemThumbImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <View>
        <View style={styles.itemBottom}>
          <Text style={styles.itemUnit}>{item.unit}</Text>

          <Text style={[styles.itemPrice, isInCart && styles.itemPriceInCart]}>
            {item.price}
          </Text>
        </View>

        {item.badge ? <Text style={styles.itemBadge}>{item.badge}</Text> : null}
      </View>
    </Pressable>
  );
}
