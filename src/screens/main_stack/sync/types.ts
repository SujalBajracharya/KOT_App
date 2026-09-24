export interface SyncState {
  username: string;
  password: string;
  showPassword: boolean;
  usernameError: string | null;
  passwordError: string | null;
  lastSyncedAt: string;
  isLoading: boolean;
}

export interface SyncAction {
  onBack: () => void;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setShowPassword: (fn: (prev: boolean) => boolean) => void;
  onProceedToSync: () => void;
}

export interface SyncContentProps {
  state: SyncState;
  action: SyncAction;
}
