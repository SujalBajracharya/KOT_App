import { Pressable, Text, View } from "react-native";

import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "@/screens/main_stack/notifications/styles";
import { Button } from "../common/Button";

export interface Notification {
  id: string;
  time: string;
  title: string;
  body: string;
  actionLabel: string;
  unread: boolean;
}

interface NotificationItemProps {
  notification: Notification;
  onAction: (id: string) => void;
}

export function NotificationItem({
  notification,
  onAction,
}: NotificationItemProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const n = notification;

  return (
    <View
      style={[
        styles.notifRow,
        n.unread && styles.notifRowUnread,
      ]}
    >
      <Text
        style={[
          styles.notifTime,
          n.unread && styles.notifTimeUnread,
        ]}
      >
        {n.time}
      </Text>

      <View style={styles.notifBody}>
        <Text
          style={[
            styles.notifTitle,
            n.unread && styles.notifTitleUnread,
          ]}
        >
          {n.title}
        </Text>

        <Text
          style={[
            styles.notifText,
            n.unread && styles.notifTextUnread,
          ]}
        >
          {n.body}
        </Text>
      </View>

      <Pressable
        style={[
          styles.notifAction,
          n.unread && styles.notifActionUnread,
        ]}
        onPress={() => onAction(n.id)}
      >
        <Text
          style={[
            styles.notifActionText,
            n.unread && styles.notifActionTextUnread,
          ]}
        >
          {n.actionLabel}
        </Text>
      </Pressable>
    </View>
  );
}