import { useCallback, useState } from 'react';
import navigation from '@/utils/app_navigation';
import { NotificationItem, UseNotificationsReturn } from './types';

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      time: '14:32',
      title: 'Table 4 requested bill',
      body: 'Waiter 02 requested printed invoice',
      actionLabel: 'VIEW',
      unread: true,
    },
    {
      id: '2',
      time: '14:15',
      title: 'Kitchen alert: Out of Chicken',
      body: 'Item #104 marked unavailable by kitchen',
      actionLabel: 'DISMISS',
      unread: false,
    },
  ]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onClearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const onNotifAction = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  return {
    state: {
      notifications,
    },
    action: {
      onBack,
      onClearAll,
      onNotifAction,
    },
  };
}
