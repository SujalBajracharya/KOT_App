import { useCallback, useState } from "react";
import { userVerification } from "@/services/auth/auth.service";
import { UserVerificationResponse } from "@/types/auth";
import { UseSignInReturn } from "./types";
import { setServerConfig } from "@/store/slices/server.slice";
import { useDispatch } from "react-redux";
import navigation from "@/utils/app_navigation";

const MOCK_DEVICE_ID = "cb5d237e-db9a-48dc-ac1c-282122aa0545";
const DEFAULT_VERSION = 9999;

export function useSignIn(): UseSignInReturn {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [ip1, setIp1] = useState("103");
  const [ip2, setIp2] = useState("94");
  const [ip3, setIp3] = useState("159");
  const [ip4, setIp4] = useState("121");
  const [port, setPortState] = useState("8080");
  const [portError, setPortError] = useState(false);
  const [division, setDivision] = useState("01");
  const [terminal, setTerminalState] = useState("04");
  const [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );
  const [addOrderFromTop, setAddOrderFromTop] = useState(false);
  const [printBillOnEPayment, setPrintBillOnEPayment] = useState(false);
  const [enableOldApiSettings, setEnableOldApiSettings] = useState(false);

  const dispatch = useDispatch();

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

  const setPort = useCallback((value: string) => {
    setPortState(value);
    setPortError(false);
  }, []);

  const setTerminal = useCallback((value: string) => {
    setTerminalState(value);
  }, []);

  const onClose = useCallback(() => {
    setOpenModal(false);
  }, []);

  const onSaveReconnect = useCallback(() => {
    const portNumber = Number(port);

    const hasInvalidPort =
      !port || Number.isNaN(portNumber) || portNumber < 1 || portNumber > 65535;

    if (hasInvalidPort) {
      setPortError(true);
      return;
    }

    setPortError(false);

    dispatch(
      setServerConfig({
        ip1,
        ip2,
        ip3,
        ip4,
        port,
        division,
        terminal,
        addOrderFromTop,
        printBillOnEPayment,
        enableOldApiSettings,
      }),
    );

    setOpenModal(false);
  }, [
    dispatch,
    ip1,
    ip2,
    ip3,
    ip4,
    port,
    division,
    terminal,
    orientation,
    addOrderFromTop,
    printBillOnEPayment,
    enableOldApiSettings,
  ]);

  const handleSignIn =
    useCallback(async (): Promise<UserVerificationResponse | null> => {
      if (isLoading) return null;

      let hasValidationError = false;
      clearErrors();

      if (!username.trim()) {
        setUsernameError("Username is required");
        hasValidationError = true;
      }

      if (!password.trim()) {
        setPasswordError("Password is required");
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
          navigation.navigate("home");
          return response;
        } else {
          setError(response.message || "Invalid username or password");
          return response;
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during sign in.";
        setError(errorMessage);
        return null;
      } finally {
        setIsLoading(false);
      }
    }, [username, password, isLoading, clearErrors]);

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
      openModal,
      visible: openModal,
      ip1,
      ip2,
      ip3,
      ip4,
      port,
      portError,
      division,
      terminal,
      orientation,
      addOrderFromTop,
      printBillOnEPayment,
      enableOldApiSettings,
    },
    action: {
      setUsername,
      setPassword,
      setRememberTerminal,
      setShowPassword,
      handleSignIn,
      clearErrors,
      setOpenModal,
      setIp1,
      setIp2,
      setIp3,
      setIp4,
      setPort,
      setDivision,
      setTerminal,
      setOrientation,
      setAddOrderFromTop,
      setPrintBillOnEPayment,
      setEnableOldApiSettings,
      onClose,
      onSaveReconnect,
    },
  };
}
