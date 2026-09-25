import { useCallback, useState } from "react";
import { QRAction, QRPaymentMethod, QRState } from "./types";

const MOCK_EXPIRES_IN = 300; // 5 minutes, static

export interface UseQRParams {
  /** Pre-filled from the bill screen */
  amount: string;
  reference: string;
  tableLabel: string;
  onBack: () => void;
}

export interface UseQRReturn {
  state: QRState;
  action: QRAction;
}

export function useQR({
  amount,
  reference,
  tableLabel,
  onBack,
}: UseQRParams): UseQRReturn {
  const [paymentMethod, setPaymentMethod] =
    useState<QRPaymentMethod>("esewa");

  const handleChangeMethod = useCallback((method: QRPaymentMethod) => {
    console.log(`[QR] Payment method changed → ${method}`);
    setPaymentMethod(method);
  }, []);

  return {
    state: {
      amount,
      reference,
      tableLabel,
      paymentMethod,
      status: "waiting",
      expiresInSeconds: MOCK_EXPIRES_IN,
    },
    action: {
      onBack,
      onChangeMethod: handleChangeMethod,
    },
  };
}
