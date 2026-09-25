export type QRPaymentStatus = "waiting" | "confirmed" | "failed";

export type QRPaymentMethod = "esewa" | "khalti" | "fonepay";

export interface QRState {
  amount: string;
  reference: string;
  tableLabel: string;
  paymentMethod: QRPaymentMethod;
  status: QRPaymentStatus;
  expiresInSeconds: number;
}

export interface QRAction {
  onBack: () => void;
  onChangeMethod: (method: QRPaymentMethod) => void;
}

export interface QRContentProps {
  state: QRState;
  action: QRAction;
}
