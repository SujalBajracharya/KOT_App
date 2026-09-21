import React from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";
import { AppHeader } from "@/components/common/Header";
import { NotificationsContentProps } from "./types";
import { createStyles } from "./styles";
import { NotificationItem } from "@/components/notification/NotificationItem";

export function NotificationsContent({
  state,
  action,
}: NotificationsContentProps) {
  const { theme } = useTheme();
  const { isLandscape } = useOrientation();
  const styles = createStyles(theme, isLandscape);

  const handleClearAll = () => {
    Alert.alert(
      "Clear Notifications",
      "Are you sure you want to clear all notifications?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          style: "destructive",
          onPress: action.onClearAll,
        },
      ],
    );
  };

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
            <Pressable onPress={handleClearAll} hitSlop={8}>
              <Text style={styles.clearAllText}>CLEAR ALL</Text>
            </Pressable>
          }
        />

        {/* ── Notification list ── */}
        <FlatList
          key={isLandscape ? "landscape" : "portrait"}
          data={state.notifications}
          keyExtractor={(n) => n.id}
          numColumns={isLandscape ? 2 : 1}
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
