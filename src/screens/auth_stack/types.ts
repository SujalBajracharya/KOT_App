import { UserVerificationResponse } from '@/types/auth';

export interface SignInState {
  username: string;
  password: string;
  rememberTerminal: boolean;
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
  usernameError: string | null;
  passwordError: string | null;
}

export interface SignInActions {
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setRememberTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignIn: () => Promise<UserVerificationResponse | null>;
  clearErrors: () => void;
}

export interface UseSignInReturn {
  state: SignInState;
  action: SignInActions;
}

export interface SignInContentProps {
  state: SignInState;
  action: SignInActions;
}
