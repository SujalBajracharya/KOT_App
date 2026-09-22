import { useCallback, useMemo, useState } from 'react';
import navigation from '@/utils/app_navigation';
import { mockTableLayoutsResponse } from '@/data/mock/tables';
import { TableItem, TableStatus, UseTablesReturn } from './types';

const tableStatusMap: Record<string, { status: TableStatus; label: string }> = {
  FREE: { status: 'free', label: 'FREE' },
  OCCUPIED: { status: 'occupied', label: 'OCCUPIED' },
  BILL: { status: 'bill', label: 'BILL' },
  HELD: { status: 'held', label: 'HELD' },
};

function formatAmount(amount?: number) {
  return amount === undefined ? '' : `Rs ${amount.toLocaleString()}`;
}

export function useTables(): UseTablesReturn {
  const layouts = mockTableLayoutsResponse.result;

  const [activeFloorId, setActiveFloorId] = useState(
    layouts[0]?.layoutId ?? '',
  );

  const activeLayout =
    layouts.find((layout) => layout.layoutId === activeFloorId) ?? layouts[0];

  const tables = useMemo<TableItem[]>(() => {
    return (activeLayout?.tables ?? []).map((table) => {
      const status = tableStatusMap[table.status] ?? {
        status: 'free',
        label: 'FREE',
      };
      const meta = table.Occupied
        ? `${table.Occupied}/${table.capacity} pax · KOT ${table.kotCount} ·  ${table.KOTTIME ?? 0} m`
        : `${table.capacity} pax`;

      return {
        id: table.tableId,
        name: table.TABLENO,
        status: status.status,
        statusLabel: status.label,
        meta,
        disabled: table.disabled,
        amount: formatAmount(table.QUANTITY),
      };
    });
  }, [activeLayout]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onSearch = useCallback(() => {}, []);
  const onRefresh = useCallback(() => {}, []);
  const onFloorSelect = useCallback((floorId: string) => {
    setActiveFloorId(floorId);
  }, []);

  const onTablePress = useCallback((TABLENO: string) => {
  navigation.navigate("order", {
    TABLENO,
  });
}, [navigation]);

  return {
    state: {
      floors: layouts.map((layout) => ({
        id: layout.layoutId,
        name: layout.layoutName,
        active: layout.layoutId === activeFloorId,
      })),
      tables,
    },
    action: {
      onBack,
      onSearch,
      onRefresh,
      onFloorSelect,
      onTablePress,
    },
  };
}
