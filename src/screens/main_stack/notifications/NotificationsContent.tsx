import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeContext";
import { AppHeader } from "@/components/common/Header";
import { NotificationsContentProps } from "./types";
import { createStyles } from "./styles";
import { NotificationItem } from "@/components/notification/NotificationItem";

export function NotificationsContent({
  state,
  action,
}: NotificationsContentProps) {
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
          title="Requests"
          onBack={action.onBack}
          rightComponent={
            <Pressable onPress={action.onClearAll} hitSlop={8}>
              <Text style={styles.clearAllText}>CLEAR ALL</Text>
            </Pressable>
          }
        />

        {/* ── Notification list ── */}
        <FlatList
          data={state.notifications}
          keyExtractor={(n) => n.id}
          style={styles.notifList}
          renderItem={({ item }) => (
            <NotificationItem
              notification={item}
              onAction={action.onNotifAction}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
