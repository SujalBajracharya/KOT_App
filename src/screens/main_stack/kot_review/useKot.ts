import { useCallback, useState } from 'react';
import navigation from '@/utils/app_navigation';
import { KOTLine, UseKotReturn } from './types';

export function useKot(): UseKotReturn {
  const [paxCount, setPaxCount] = useState(4);
  const [lines, setLines] = useState<KOTLine[]>([
    {
      id: '1',
      qty: '2×',
      name: 'Momo Chicken (C)',
      unit: 'plate',
      note: 'NO CHILLI',
      quantity: 2,
      amount: 'Rs 560',
    },
    {
      id: '2',
      qty: '1×',
      name: 'Coke 500ml',
      unit: 'bottle',
      quantity: 1,
      amount: 'Rs 100',
    },
  ]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPAXChange = useCallback(() => {
    setPaxCount((prev) => (prev % 10) + 1);
  }, []);

  const onDecrement = useCallback((lineId: string) => {
    setLines((prev) =>
      prev
        .map((l) =>
          l.id === lineId ? { ...l, quantity: Math.max(0, l.quantity - 1) } : l,
        )
        .filter((l) => l.quantity > 0),
    );
  }, []);

  const onIncrement = useCallback((lineId: string) => {
    setLines((prev) =>
      prev.map((l) => (l.id === lineId ? { ...l, quantity: l.quantity + 1 } : l)),
    );
  }, []);

  const onBill = useCallback(() => {navigation.navigate("bill")
  }, []);
  const onSendToKitchen = useCallback(() => {}, []);

  return {
    state: {
      kotLabel: 'KOT 4 · 1 floor-1',
      kotMeta: 'UNSENT · 2 LINES',
      paxCount,
      lines,
      gross: 'Rs 660',
      discount: 'Rs 33',
      vat: 'Rs 81.51',
      total: 'Rs 708.51',
    },
    action: {
      onBack,
      onPAXChange,
      onDecrement,
      onIncrement,
      onBill,
      onSendToKitchen,
    },
  };
}
