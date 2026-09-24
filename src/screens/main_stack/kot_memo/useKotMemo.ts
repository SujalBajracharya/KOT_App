import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { voidOrder } from "@/store/slices/order.slice";
import type { VoidedOrder } from "@/store/slices/order.slice";
import { resetTable } from "@/store/slices/table.slice";
import { KOTMemoAction, KOTMemoState, MemoFilter, MemoItem } from "./types";

export interface UseKOTMemoParams {
  /** Called when the user presses the back button */
  onBack: () => void;
  /** Called when OPEN TABLE is pressed — navigate to that table's order screen */
  onOpenTable: (memoId: string, tableLabel: string) => void;
  /** Called when BILL is pressed — navigate to bill screen for that table */
  onBill?: (memoId: string, tableLabel: string) => void;
  /** API / service call to trigger a reprint job */
  reprintKOT: (memoId: string) => Promise<void>;
  /** Initial memo list, e.g. from a parent loader or route params */
  initialMemos?: MemoItem[];
}

export interface UseKOTMemoReturn {
  state: KOTMemoState;
  action: KOTMemoAction;
}

//  Filter helpers

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

//  Hook
export function useKOTMemo({
  onBack,
  onOpenTable,
  onBill,
  reprintKOT,
}: UseKOTMemoParams): UseKOTMemoReturn {
  const dispatch = useDispatch();
  const savedOrders = useSelector((state: RootState) => state.order.orders);
  const voidedOrders = useSelector(
    (state: RootState) => state.order.voidedOrders,
  );
  const [filter, setFilter] = useState<MemoFilter>("today");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Build the full memo list:
   *   - TODAY entries come exclusively from `orders` (active only).
   *   - VOIDED entries come exclusively from `voidedOrders` (historical).
   */
  const allMemos = useMemo<MemoItem[]>(() => {
    const activeMemos: MemoItem[] = Object.entries(savedOrders).map(
      ([tableNo, items]) => ({
        id: tableNo,
        kot: tableNo,
        table: tableNo,
        status: "sent" as const,
        statusLabel: "SENT",
        voidedAt: undefined,
        lines: items
          .map((item) => `${item.quantity} × ${item.name}`)
          .join(", "),
      }),
    );

    const voidedMemos: MemoItem[] = Object.entries(
      voidedOrders as Record<string, VoidedOrder>,
    ).map(([tableNo, voided]) => {
      const voidedTime = new Date(voided.voidedAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        id: tableNo,
        kot: tableNo,
        table: tableNo,
        status: "voided" as const,
        statusLabel: "VOIDED",
        voidedAt: voidedTime,
        lines: voided.items
          .map((item) => `${item.quantity} × ${item.name}`)
          .join(", "),
      };
    });

    return [...activeMemos, ...voidedMemos];
  }, [savedOrders, voidedOrders]);

  // Derived: memos filtered by active tab
  const memos = useMemo(
    () => applyFilter(allMemos, filter),
    [allMemos, filter],
  );

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
    [reprintKOT],
  );

  const handleBill = useCallback(
    (memoId: string) => {
      const memo = allMemos.find((m) => m.id === memoId);
      if (!memo) return;
      onBill?.(memoId, memo.table);
    },
    [allMemos, onBill],
  );

  const handleOpenTable = useCallback(
    (memoId: string) => {
      const memo = allMemos.find((m) => m.id === memoId);
      if (!memo) return;
      onOpenTable(memoId, memo.table);
    },
    [allMemos, onOpenTable],
  );

  const handleCancel = useCallback(
    (memoId: string) => {
      const memo = allMemos.find((m) => m.id === memoId);
      if (!memo) return;

      // Already voided — nothing to do
      if (memo.status === "voided") return;

      Alert.alert(
        "Cancel Order?",
        "Are you sure you want to cancel this order?",
        [
          { text: "No", style: "cancel" },
          {
            text: "Yes",
            style: "destructive",
            onPress: () => {
              // Mark order as VOIDED (keeps data so Voided tab can display it)
              dispatch(voidOrder(memo.table));
              // Free the table
              dispatch(resetTable({ tableNo: memo.table }));
            },
          },
        ],
      );
    },
    [allMemos, dispatch],
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
      onBill: handleBill,
      onOpenTable: handleOpenTable,
      onCancel: handleCancel,
    },
  };
}
