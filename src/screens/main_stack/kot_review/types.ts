export interface KOTLine {
  id: string;
  qty: string;     // e.g. "2×"
  name: string;
  unit: string;    // e.g. "gm"
  note?: string;   // e.g. "NO CHILLI"
  quantity: number;
  amount: string;  // e.g. "Rs 840"
}

export interface ReviewKOTState {
  kotLabel: string;    // e.g. "KOT 4 · 1 floor-1"
  kotMeta: string;     // e.g. "UNSENT · 4 LINES"
  paxCount: number;
  lines: KOTLine[];
  gross: string;
  discount: string;
  vat: string;
  total: string;
}

export interface ReviewKOTAction {
  onBack: () => void;
  onPAXChange: () => void;
  onDecrement: (lineId: string) => void;
  onIncrement: (lineId: string) => void;
  onBill: () => void;
  onSendToKitchen: () => void;
}

export interface UseKotReturn {
  state: ReviewKOTState;
  action: ReviewKOTAction;
}

export interface ReviewKOTContentProps {
  state: ReviewKOTState;
  action: ReviewKOTAction;
}
