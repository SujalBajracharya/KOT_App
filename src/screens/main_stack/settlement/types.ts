export interface SettlementRow {
  id: string;
  label: string;
  count: string;
  amount: string;
}

export interface SettlementState {
  shiftLabel: string;   // e.g. "SHIFT 2 · 14:02 — 22:00"
  totalAmount: string;  // e.g. "Rs 41,280"
  totalMeta: string;    // e.g. "28 bills settled · 3 still open"
  rows: SettlementRow[];
  warningText?: string;
}

export interface SettlementAction {
  onBack: () => void;
  onPrintXReport: () => void;
  onEndSession: () => void;
}

export interface UseSettlementReturn {
  state: SettlementState;
  action: SettlementAction;
}

export interface SettlementContentProps {
  state: SettlementState;
  action: SettlementAction;
}
