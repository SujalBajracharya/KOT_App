import { UserVerificationResponse } from '@/types/auth';

export interface SignInState {
  username: string;
  password: string;
  rememberTerminal: boolean;
  openModal: boolean;
  visible: boolean;
  showPassword: boolean;
  isLoading: boolean;
  error: string | null;
  usernameError: string | null;
  passwordError: string | null;

  ip1: string;
  ip2: string;
  ip3: string;
  ip4: string;
  port: string;
  portError: boolean;
  division: string;
  terminal: string;
  orientation: "portrait" | "landscape";
  addOrderFromTop: boolean;
  printBillOnEPayment: boolean;
  enableOldApiSettings: boolean;
}

export interface SignInActions {
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setRememberTerminal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSignIn: () => Promise<UserVerificationResponse | null>;
  clearErrors: () => void;

  setIp1: (value: string) => void;
  setIp2: (value: string) => void;
  setIp3: (value: string) => void;
  setIp4: (value: string) => void;
  setPort: (value: string) => void;
  setDivision: (value: string) => void;
  setTerminal: (value: string) => void;
  setOrientation: (value: "portrait" | "landscape") => void;
  setAddOrderFromTop: React.Dispatch<React.SetStateAction<boolean>>;
  setPrintBillOnEPayment: React.Dispatch<React.SetStateAction<boolean>>;
  setEnableOldApiSettings: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  onSaveReconnect: () => void;
}

export interface UseSignInReturn {
  state: SignInState;
  action: SignInActions;
}

export interface SignInContentProps {
  state: SignInState;
  action: SignInActions;
}
