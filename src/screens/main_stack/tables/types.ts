import { PopupTable } from "@/components/table/TableActionPopup";

export type TableStatus = "free" | "occupied" | "reserved" | "vacated";

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
  searchQuery: string;
  isSearchVisible: boolean;
  popupTable: PopupTable | null;
}

export interface TablesAction {
  onBack: () => void;
  onSearch: () => void;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
  onFloorSelect: (floorId: string) => void;
  onTablePress: (TABLENO: string, STATUS: string) => void;
  onSetSeated: (TABLENO: string) => void;
  onSetFree: (TABLENO: string) => void;
  onClosePopup: () => void;
}

export interface UseTablesReturn {
  state: TablesState;
  action: TablesAction;
}

export interface TablesContentProps {
  state: TablesState;
  action: TablesAction;
}
