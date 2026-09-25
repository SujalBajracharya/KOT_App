export type TableStatus = "free" | "occupied" | "bill" | "held";

export interface TableItem {
  id: string;
  name: string;
  status: TableStatus;
  statusLabel: string;
  meta: string;   // e.g. "4 pax · 42 m"
  amount: string; // e.g. "Rs 2,000" or ""
  disabled: boolean;
}

export interface Floor {
  id: string;
  name: string;
  active: boolean;
}

export interface TablesState {
  floors: Floor[];
  tables: TableItem[];
  refreshing: boolean;
}

export interface TablesAction {
  onBack: () => void;
  onSearch: () => void;
  onRefresh: () => void;
  onFloorSelect: (floorId: string) => void;
  onTablePress: (TABLENO: string) => void;
}

export interface UseTablesReturn {
  state: TablesState;
  action: TablesAction;
}

export interface TablesContentProps {
  state: TablesState;
  action: TablesAction;
}
