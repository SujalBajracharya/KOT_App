export interface NotificationItem {
  id: string;
  time: string;
  title: string;
  body: string;
  actionLabel: string;
  unread: boolean;
}

export interface NotificationsState {
  notifications: NotificationItem[];
}

export interface NotificationsAction {
  onBack: () => void;
  onClearAll: () => void;
  onNotifAction: (id: string) => void;
}

export interface UseNotificationsReturn {
  state: NotificationsState;
  action: NotificationsAction;
}

export interface NotificationsContentProps {
  state: NotificationsState;
  action: NotificationsAction;
}
