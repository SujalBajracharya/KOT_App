export type SplitMode = "split" | "move";

export interface SplitModeItem {
  id: SplitMode;
  name: string;
  active: boolean;
}

export interface SplitLine {
  id: string;
  name: string;
  totalQty: string;
  stayQty: number;
  moveQty: number;
  stayLabel: string;
  moveLabel: string;
}

export interface SplitTransferState {
  tableLabel: string;
  modes: SplitModeItem[];
  destination: string;
  lines: SplitLine[];
  movingSummary: string;
  stayingSummary: string;
}

export interface SplitTransferAction {
  onBack: () => void;
  onModeSelect: (id: SplitMode) => void;
  onChangeDestination: () => void;
  onConfirm: () => void;
}

export interface UseSplitTransferReturn {
  state: SplitTransferState;
  action: SplitTransferAction;
}

export interface SplitTransferContentProps {
  state: SplitTransferState;
  action: SplitTransferAction;
}