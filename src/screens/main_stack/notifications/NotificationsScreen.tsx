import React from 'react';
import { NotificationsContent } from './NotificationsContent';
import { useNotifications } from './useNotifications';

export default function NotificationsScreen() {
  const { state, action } = useNotifications();

  return <NotificationsContent state={state} action={action} />;
}
