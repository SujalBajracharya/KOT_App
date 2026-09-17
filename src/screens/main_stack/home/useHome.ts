import { useCallback, useState } from 'react';
import navigation from '@/utils/app_navigation';
import { UseHomeReturn } from './types';

export function useHome(): UseHomeReturn {
  const [userName] = useState('User');
  const [terminal] = useState('04');
  const [shift] = useState('DAY');
  const [tablesOpen] = useState(0);
  const [billsWaiting] = useState(0);
  const [revenueToday] = useState('0');
  const [notificationCount] = useState(0);
  const [lastSynced] = useState('Never');
  const [menuItemCount] = useState(0);

  const onTakeOrder = useCallback(() => {
    navigation.navigate('table');
  }, []);

  const onKOTMemo = useCallback(() => {
    navigation.navigate('order');
  }, []);

  const onSplitTransfer = useCallback(() => {}, []);
  const onSyncMenu = useCallback(() => {}, []);
  const onSettlement = useCallback(() => {}, []);
  const onNotifications = useCallback(() => {}, []);
  const onLogOut = useCallback(() => {}, []);

  return {
    state: {
      userName,
      terminal,
      shift,
      tablesOpen,
      billsWaiting,
      revenueToday,
      notificationCount,
      lastSynced,
      menuItemCount,
    },
    action: {
      onTakeOrder,
      onKOTMemo,
      onSplitTransfer,
      onSyncMenu,
      onSettlement,
      onNotifications,
      onLogOut,
    },
  };
}
