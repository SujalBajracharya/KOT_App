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
      const meta = table.occupancy
        ? `${table.occupancy}/${table.capacity} pax · ${table.elapsedMinutes ?? 0} m`
        : `${table.capacity} pax`;

      return {
        id: table.tableId,
        name: table.tableNumber,
        status: status.status,
        statusLabel: status.label,
        meta,
        amount: formatAmount(table.amountDue),
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

  const onTablePress = useCallback((tableId: string) => {
    navigation.navigate('order');
  }, []);

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
