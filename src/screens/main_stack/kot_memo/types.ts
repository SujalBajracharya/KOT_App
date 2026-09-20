export type MemoFilter = "today" | "voided" | "all";

export type MemoStatus = "sent" | "voided" | "printing";

export interface MemoItem {
  id: string;
  kot: string;
  table: string;
  status: MemoStatus;
  statusLabel: string;
  lines: string;
}


export interface KOTMemoState {
  filter: MemoFilter;
  memos: MemoItem[];
  isLoading: boolean;
}

export interface KOTMemoAction {
  onBack: () => void;
  onFilterChange: (filter: MemoFilter) => void;
  onReprint: (memoId: string) => void;
  onOpenTable: (memoId: string) => void;
}

export interface KOTMemoContentProps {
  state: KOTMemoState;
  action: KOTMemoAction;
}