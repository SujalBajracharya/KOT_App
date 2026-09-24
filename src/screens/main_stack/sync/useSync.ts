import { useCallback, useState } from "react";
import { SyncAction, SyncState } from "./types";
import navigation from "@/utils/app_navigation";
import Toast from "react-native-toast-message";

export const MOCK_AUTH_CREDENTIALS = {
  userName: "admin",
  password: "Ims@1234",
} as const;

const LAST_SYNCED_AT = "2025-07-18 14:32:01";

export interface UseSyncParams {
  /** Called by the screen after the hook wires navigation */
  onSyncSuccess?: () => void;
}

export interface UseSyncReturn {
  state: SyncState;
  action: SyncAction;
}

function validateUsername(value: string): string | null {
  if (!value.trim()) return "Username is required";
  if (value.trim() !== MOCK_AUTH_CREDENTIALS.userName)
    return "Username does not match";
  return null;
}

function validatePassword(value: string): string | null {
  if (!value) return "Password is required";
  if (value !== MOCK_AUTH_CREDENTIALS.password)
    return "Password does not match";
  return null;
}

export function useSync({ onSyncSuccess }: UseSyncParams = {}): UseSyncReturn {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Clear field error on change
  const handleSetUsername = useCallback(
    (value: string) => {
      setUsername(value);
      if (usernameError) setUsernameError(null);
    },
    [usernameError],
  );

  const handleSetPassword = useCallback(
    (value: string) => {
      setPassword(value);
      if (passwordError) setPasswordError(null);
    },
    [passwordError],
  );

  const handleProceedToSync = useCallback(() => {
  const userErr = validateUsername(username);
  const pwdErr = validatePassword(password);

  setUsernameError(userErr);
  setPasswordError(pwdErr);

  if (userErr || pwdErr) {
    Toast.show({
      type: "error",
      text1: "Validation Failed",
      text2: "Please enter valid username and password.",
    });

    return;
  }

  setIsLoading(true);

  Toast.show({
    type: "info",
    text1: "Syncing",
    text2: "Syncing today's activity...",
  });

  setTimeout(() => {
    setIsLoading(false);

    Toast.show({
      type: "success",
      text1: "Sync Complete",
      text2: "Today's activity was successfully synced.",
    });

    onSyncSuccess?.();
  }, 4000);
}, [username, password, onSyncSuccess]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  return {
    state: {
      username,
      password,
      showPassword,
      usernameError,
      passwordError,
      lastSyncedAt: LAST_SYNCED_AT,
      isLoading,
    },
    action: {
      onBack,
      setUsername: handleSetUsername,
      setPassword: handleSetPassword,
      setShowPassword,
      onProceedToSync: handleProceedToSync,
    },
  };
}
