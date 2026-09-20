import { useCallback, useMemo, useState } from "react";
import { KOTMemoAction, KOTMemoState, MemoFilter, MemoItem } from "./types";

// ─────────────────────────────────────────────
//  Hook params — injected by the Screen so the
//  hook stays decoupled from navigation.
// ─────────────────────────────────────────────
export interface UseKOTMemoParams {
  /** Called when the user presses the back button */
  onBack: () => void;
  /** Called when OPEN TABLE is pressed — navigate to that table's order screen */
  onOpenTable: (memoId: string, tableLabel: string) => void;
  /** API / service call to trigger a reprint job */
  reprintKOT: (memoId: string) => Promise<void>;
  /** Initial memo list, e.g. from a parent loader or route params */
  initialMemos?: MemoItem[];
}

export interface UseKOTMemoReturn {
  state: KOTMemoState;
  action: KOTMemoAction;
}

// ─────────────────────────────────────────────
//  Filter helpers
// ─────────────────────────────────────────────
function applyFilter(memos: MemoItem[], filter: MemoFilter): MemoItem[] {
  switch (filter) {
    case "voided":
      return memos.filter((m) => m.status === "voided");
    case "today":
      // "today" keeps sent + printing — anything not voided
      return memos.filter((m) => m.status !== "voided");
    case "all":
    default:
      return memos;
  }
}

// ─────────────────────────────────────────────
//  Hook
// ─────────────────────────────────────────────
export function useKOTMemo({
  onBack,
  onOpenTable,
  reprintKOT,
  initialMemos = [],
}: UseKOTMemoParams): UseKOTMemoReturn {
  const [allMemos] = useState<MemoItem[]>(initialMemos);
  const [filter, setFilter] = useState<MemoFilter>("today");
  const [isLoading, setIsLoading] = useState(false);

  // Derived: memos filtered by active tab
  const memos = useMemo(() => applyFilter(allMemos, filter), [allMemos, filter]);

  // ── Actions ──

  const handleFilterChange = useCallback((f: MemoFilter) => {
    setFilter(f);
  }, []);

  const handleReprint = useCallback(
    async (memoId: string) => {
      setIsLoading(true);
      try {
        await reprintKOT(memoId);
      } finally {
        setIsLoading(false);
      }
    },
    [reprintKOT]
  );

  const handleOpenTable = useCallback(
    (memoId: string) => {
      const memo = allMemos.find((m) => m.id === memoId);
      if (!memo) return;
      onOpenTable(memoId, memo.table);
    },
    [allMemos, onOpenTable]
  );

  return {
    state: {
      filter,
      memos,
      isLoading,
    },
    action: {
      onBack,
      onFilterChange: handleFilterChange,
      onReprint: handleReprint,
      onOpenTable: handleOpenTable,
    },
  };
}