import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { userVerification } from '@/services/auth/auth.service';
import { UserVerificationResponse } from '@/types/auth';
import { UseSignInReturn } from './types';

const MOCK_DEVICE_ID = 'cb5d237e-db9a-48dc-ac1c-282122aa0545';
const DEFAULT_VERSION = 9999;

export function useSignIn(): UseSignInReturn {
  const navigation = useNavigation();

  const [username, setUsernameState] = useState('');
  const [password, setPasswordState] = useState('');
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const clearErrors = useCallback(() => {
    setError(null);
    setUsernameError(null);
    setPasswordError(null);
  }, []);

  const setUsername = useCallback((value: string) => {
    setUsernameState(value);
    setUsernameError(null);
    setError(null);
  }, []);

  const setPassword = useCallback((value: string) => {
    setPasswordState(value);
    setPasswordError(null);
    setError(null);
  }, []);

  const handleSignIn = useCallback(async (): Promise<UserVerificationResponse | null> => {
    if (isLoading) return null;

    let hasValidationError = false;
    clearErrors();

    if (!username.trim()) {
      setUsernameError('Username is required');
      hasValidationError = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasValidationError = true;
    }

    if (hasValidationError) {
      return null;
    }

    setIsLoading(true);

    try {
      const response = await userVerification({
        userName: username.trim(),
        password,
        deviceId: MOCK_DEVICE_ID,
        version: DEFAULT_VERSION,
      });

      if (response.success) {
        setError(null);
        // Navigate directly to root_stack after successful authentication
        navigation.navigate('root_stack' as never);
        return response;
      } else {
        setError(response.message || 'Invalid username or password');
        return response;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred during sign in.';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [username, password, isLoading, clearErrors, navigation]);

  return {
    state: {
      username,
      password,
      rememberTerminal,
      showPassword,
      isLoading,
      error,
      usernameError,
      passwordError,
    },
    action: {
      setUsername,
      setPassword,
      setRememberTerminal,
      setShowPassword,
      handleSignIn,
      clearErrors,
    },
  };
}
