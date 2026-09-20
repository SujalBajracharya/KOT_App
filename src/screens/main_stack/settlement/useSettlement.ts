import { useCallback } from 'react';
import navigation from '@/utils/app_navigation';
import { SettlementRow, UseSettlementReturn } from './types';

export function useSettlement(): UseSettlementReturn {
  const rows: SettlementRow[] = [
    { id: '1', label: 'Cash sales', count: '18 bills', amount: 'Rs 24,500' },
    { id: '2', label: 'Card sales', count: '6 bills', amount: 'Rs 11,200' },
    { id: '3', label: 'Fonepay QR', count: '4 bills', amount: 'Rs 5,580' },
  ];

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPrintXReport = useCallback(() => {}, []);
  const onEndSession = useCallback(() => {}, []);

  return {
    state: {
      shiftLabel: 'SHIFT 2 · 14:02 — 22:00',
      totalAmount: 'Rs 41,280',
      totalMeta: '28 bills settled · 3 still open',
      rows,
      warningText: '3 tables still have unsettled bills. Ending the session will leave them on the next shift.',
    },
    action: {
      onBack,
      onPrintXReport,
      onEndSession,
    },
  };
}
