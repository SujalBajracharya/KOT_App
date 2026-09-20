export type DiscountType = "flat" | "percent";
export type PaymentMethod = "cash" | "card" | "qr" | "credit";

export interface BillLine {
  id: string;
  n: string;
  name: string;
  qty: number;
  amount: number;
}

export interface BillState {
  tableLabel: string;
  billMeta: string;    // e.g. "BILL NO 2140 · 14:38"
  lines: BillLine[];
  discountValue: string;
  discountType: DiscountType;
  gross: number;
  discount: number;
  vat: number;
  total: number;
  totalDue: number;
  selectedPayment: PaymentMethod;
}

export interface BillAction {
  onBack: () => void;
  onPrint: () => void;
  setDiscountValue: (v: string) => void;
  setDiscountType: (t: DiscountType) => void;
  onApplyDiscount: () => void;
  setPaymentMethod: (m: PaymentMethod) => void;
  onSettle: () => void;
}

export interface UseBillPaymentReturn {
  state: BillState;
  action: BillAction;
}

export interface BillContentProps {
  state: BillState;
  action: BillAction;
}
