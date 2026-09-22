import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";

import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";

export interface CartReviewItem {
  id: string;
  name: string;
  quantity: number;
  RATE_A: number;
}

interface CartReviewProps {
  items: CartReviewItem[];
  itemCount: number;
  total: string;
  isExpanded: boolean;
  onToggle: () => void;
  onSendToKitchen: () => void;
}

export function ExpandableCartReview({
  items,
  itemCount,
  total,
  isExpanded,
  onToggle,
  onSendToKitchen,
}: CartReviewProps) {
  const { theme } = useTheme();
  const { isLandscape } = useOrientation();

  return (
    <View
      style={{
        backgroundColor: theme.colors.text,
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
      }}
    >
      {/* Review toggle */}
      <Pressable
        onPress={onToggle}
        style={{
          minHeight: isLandscape ? 52 : 58,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flex: 1,
            marginRight: 12,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              fontWeight: "800",
              color: theme.colors.textSecondary,
              letterSpacing: 0.5,
            }}
          >
            RUNNING KOT
          </Text>

          <Text
            style={{
              marginTop: 2,
              fontSize: 16,
              fontWeight: "800",
              color: theme.colors.background,
            }}
          >
            {itemCount} items · {total}
          </Text>
        </View>

        {isExpanded ? (
          <ChevronDown
            size={20}
            color={theme.colors.background}
          />
        ) : (
          <ChevronUp
            size={20}
            color={theme.colors.background}
          />
        )}
      </Pressable>

      {/* Expanded review */}
      {isExpanded && (
        <View
          style={{
            marginHorizontal: 12,
            marginBottom: 8,
            paddingHorizontal: 12,
            paddingVertical: 4,
            backgroundColor: theme.colors.background,
          }}
        >
          {items.map((item, index) => (
            <View
              key={item.id}
              style={{
                minHeight: 36,
                flexDirection: "row",
                alignItems: "center",
                borderBottomWidth:
                  index === items.length - 1 ? 0 : 1,
                borderBottomColor: theme.colors.border,
              }}
            >
              <Text
                style={{
                  width: 42,
                  fontSize: 12,
                  fontWeight: "800",
                  color: theme.colors.textSecondary,
                }}
              >
                {item.quantity} ×
              </Text>

              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  fontSize: 13,
                  fontWeight: "600",
                  color: theme.colors.text,
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  marginLeft: 12,
                  fontSize: 13,
                  fontWeight: "700",
                  color: theme.colors.text,
                }}
              >
                NPR{" "}
                {(item.RATE_A * item.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      )}

      {/* Send button */}
      <Pressable
        onPress={onSendToKitchen}
        style={{
          marginHorizontal: 12,
          marginBottom: 12,
          minHeight: isLandscape ? 44 : 50,
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.colors.primary,
        }}
      >
        <Text
          style={{
            fontSize: 13,
            fontWeight: "800",
            color: theme.colors.onPrimary,
            letterSpacing: 0.5,
          }}
        >
          SEND TO KITCHEN
        </Text>

        <ArrowRight
          size={20}
          color={theme.colors.onPrimary}
        />
      </Pressable>
    </View>
  );
}