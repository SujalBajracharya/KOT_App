export interface HomeState {
  userName: string;
  terminal: string;
  shift: string;
  tablesOpen: number;
  billsWaiting: number;
  revenueToday: string;
  notificationCount: number;
  lastSynced: string;
  menuItemCount: number;
}

export interface HomeAction {
  onTakeOrder: () => void;
  onKOTMemo: () => void;
  onSplitTransfer: () => void;
  onSyncMenu: () => void;
  onSettlement: () => void;
  onNotifications: () => void;
  onLogOut: () => void;
}

export interface UseHomeReturn {
  state: HomeState;
  action: HomeAction;
}

export interface HomeContentProps {
  state: HomeState;
  action: HomeAction;
}
