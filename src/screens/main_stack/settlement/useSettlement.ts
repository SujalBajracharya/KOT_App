import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import navigation from '@/utils/app_navigation';
import { SettlementRow, UseSettlementReturn } from './types';
import type { PaymentMethod } from '@/store/slices/settlements.slice';

/** Maps internal PaymentMethod keys to human-readable display labels */
const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  CASH: 'Cash sales',
  CARD: 'Card sales',
  QR: 'Fonepay QR',
  CREDIT: 'Credit',
};

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

function formatCurrency(amount: number): string {
  return `Rs ${amount.toLocaleString()}`;
}

export function useSettlement(): UseSettlementReturn {
  const settlements = useSelector(
    (state: RootState) => state.settlement.settlements,
  );

  // ── Derived values ─────────────────────────────────────────────────────────

  const settledSettlements = useMemo(
    () => settlements.filter((s) => s.status === 'SETTLED'),
    [settlements],
  );

  /** Today's settled bill total (Rs Today on Home screen is also sourced here) */
  const todaySettledTotal = useMemo(
    () =>
      settledSettlements
        .filter((s) => isToday(s.settledAt))
        .reduce((sum, s) => sum + s.billTotal, 0),
    [settledSettlements],
  );

  /** Count of unsettled (PENDING) bills */
  const openBillCount = useMemo(
    () => settlements.filter((s) => s.status === 'PENDING').length,
    [settlements],
  );

  /**
   * Breakdown rows — one row per payment method that has been used.
   * Counts bills (settlements) and sums amounts per method.
   */
  const rows = useMemo<SettlementRow[]>(() => {
    const methodMap = new Map<
      PaymentMethod,
      { count: number; total: number }
    >();

    for (const settlement of settledSettlements) {
      for (const payment of settlement.payments) {
        const existing = methodMap.get(payment.paymentMethod) ?? {
          count: 0,
          total: 0,
        };
        methodMap.set(payment.paymentMethod, {
          // Each settlement with this payment method counts as 1 bill
          count: existing.count + 1,
          total: existing.total + payment.amount,
        });
      }
    }

    return Array.from(methodMap.entries()).map(([method, { count, total }]) => ({
      id: method,
      label: PAYMENT_LABELS[method] ?? method,
      count: `${count} ${count === 1 ? 'bill' : 'bills'}`,
      amount: formatCurrency(total),
    }));
  }, [settledSettlements]);

  const totalAmount = useMemo(
    () => formatCurrency(todaySettledTotal),
    [todaySettledTotal],
  );

  const totalMeta = useMemo(() => {
    const settled = settledSettlements.length;
    const open = openBillCount;
    const settledPart = `${settled} ${settled === 1 ? 'bill' : 'bills'} settled`;
    const openPart =
      open > 0 ? ` · ${open} still open` : '';
    return `${settledPart}${openPart}`;
  }, [settledSettlements.length, openBillCount]);

  const warningText = useMemo(() => {
    if (openBillCount === 0) return undefined;
    return `${openBillCount} ${openBillCount === 1 ? 'table has an' : 'tables have'} unsettled ${openBillCount === 1 ? 'bill' : 'bills'}. Ending the session will leave ${openBillCount === 1 ? 'it' : 'them'} on the next shift.`;
  }, [openBillCount]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPrintXReport = useCallback(() => {}, []);
  const onEndSession = useCallback(() => {}, []);

  return {
    state: {
      shiftLabel: `SETTLEMENT · ${new Date().toLocaleDateString()}`,
      totalAmount,
      totalMeta,
      rows,
      warningText,
    },
    action: {
      onBack,
      onPrintXReport,
      onEndSession,
    },
  };
}
