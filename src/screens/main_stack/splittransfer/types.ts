export type SplitMode = "split" | "move";
export type TableSelectionMode = "source" | "destination";

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
  activeMode: SplitMode;
  sourceTable: string;
  sourceTables: string[];
  destinationTables: string[];
  isTableSelectorVisible: boolean;
  tableSelectionMode: TableSelectionMode | null;
  destination: string;
  lines: SplitLine[];
  movingSummary: string;
  stayingSummary: string;
}

export interface SplitTransferAction {
  onBack: () => void;
  onModeSelect: (id: SplitMode) => void;
  onChangeSourceTable: () => void;
  onSelectSourceTable: (tableNo: string) => void;
  onChangeDestination: () => void;
  onSelectDestinationTable: (tableNo: string) => void;
  onCloseTableSelector: () => void;
  onMoveQuantityChange: (id: string, delta: number) => void;
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