import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import navigation from "@/utils/app_navigation";
import { UseHomeReturn } from "./types";

/** Returns true if an ISO timestamp string is from today (local date) */
function isToday(isoString: string | null): boolean {
  if (!isoString) return false;
  const d = new Date(isoString);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function formatRevenue(amount: number): string {
  if (amount >= 1000) {
    const k = amount / 1000;
    // Show one decimal only when needed (e.g. 1.5K, not 1.0K)
    return `${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
  }
  return String(amount);
}

export function useHome(): UseHomeReturn {
  const [userName] = useState("User");
  const [terminal] = useState("04");
  const [shift] = useState(2);
  const [notificationCount] = useState(2);
  const [lastSynced] = useState("Never");
  const [menuItemCount] = useState(0);

  // ── Redux selectors ─────────────────────────────────────────────────────────

  const layouts = useSelector((state: RootState) => state.table.layouts);
  const orders = useSelector((state: RootState) => state.order.orders);
  const settlements = useSelector(
    (state: RootState) => state.settlement.settlements,
  );

  // ── Tables Open ─────────────────────────────────────────────────────────────
  // Count of non-disabled tables with status "FREE"
  const tablesOpen = useMemo(() => {
    let count = 0;
    for (const layout of layouts) {
      for (const table of layout.tables) {
        if (!table.disabled && table.status === "FREE") {
          count++;
        }
      }
    }
    return count;
  }, [layouts]);

  // ── Bills Waiting ────────────────────────────────────────────────────────────
  // Orders in `orders` are always ACTIVE — voided orders are moved to voidedOrders
  const billsWaiting = useMemo(() => {
    const settledTableNos = new Set(
      settlements.filter((s) => s.status === "SETTLED").map((s) => s.TABLENO),
    );

    let count = 0;
    for (const tableNo of Object.keys(orders)) {
      if (!settledTableNos.has(tableNo)) {
        count++;
      }
    }
    return count;
  }, [orders, settlements]);

  // ── Rs Today ─────────────────────────────────────────────────────────────────
  // Sum of billTotal for settlements settled today
  const revenueToday = useMemo(() => {
    const total = settlements
      .filter((s) => s.status === "SETTLED" && isToday(s.settledAt))
      .reduce((sum, s) => sum + s.billTotal, 0);
    return formatRevenue(total);
  }, [settlements]);

  // ── Actions ──────────────────────────────────────────────────────────────────

  const onTakeOrder = useCallback(() => {
    navigation.navigate("table");
  }, []);

  const onKOTMemo = useCallback(() => {
    navigation.navigate("memo");
  }, []);

  const onSplitTransfer = useCallback(() => {
    navigation.navigate("splittransfer");
  }, []);

  const onSyncMenu = useCallback(() => {
    navigation.navigate("sync");
  }, []);

  const onSettlement = useCallback(() => {
    navigation.navigate("settlement");
  }, []);

  const onLogOut = useCallback(() => {
    navigation.resetToSignIn();
  }, []);

  return {
    state: {
      userName,
      terminal,
      shift,
      tablesOpen,
      billsWaiting,
      revenueToday,
      notificationCount,
      lastSynced,
      menuItemCount,
    },
    action: {
      onTakeOrder,
      onKOTMemo,
      onSplitTransfer,
      onSyncMenu,
      onSettlement,
      onNotifications,
      onLogOut,
    },
  };
}
