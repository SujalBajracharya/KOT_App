import { useCallback, useState } from 'react';
import navigation from '@/utils/app_navigation';
import { UseHomeReturn } from './types';

export function useHome(): UseHomeReturn {
  const [userName] = useState('User');
  const [terminal] = useState('04');
  const [shift] = useState(2);
  const [tablesOpen] = useState(7);
  const [billsWaiting] = useState(3);
  const [revenueToday] = useState('41K');
  const [notificationCount] = useState(2);
  const [lastSynced] = useState('Never');
  const [menuItemCount] = useState(0);

  const onTakeOrder = useCallback(() => {
    navigation.navigate('table');
  }, []);

  const onKOTMemo = useCallback(() => {
    navigation.navigate('memo');
  }, []);

  const onSplitTransfer = useCallback(() => {navigation.navigate('splittransfer')}, []);
  const onSyncMenu = useCallback(() => {}, []);
  const onSettlement = useCallback(() => {}, []);
  const onNotifications = useCallback(() => {navigation.navigate('notification')}, []);
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
