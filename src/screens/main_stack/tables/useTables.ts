import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import navigation from "@/utils/app_navigation";
import { RootState } from "@/store";
import { TableItem, TableStatus, UseTablesReturn } from "./types";

const tableStatusMap: Record<
  string,
  { status: TableStatus; label: string }
> = {
  FREE: { status: "free", label: "FREE" },
  OCCUPIED: { status: "occupied", label: "OCCUPIED" },
  BILL: { status: "bill", label: "BILL" },
  HELD: { status: "held", label: "HELD" },
};

function formatAmount(amount?: number) {
  return amount === undefined
    ? ""
    : `Rs ${amount.toLocaleString()}`;
}

function getElapsedMinutes(kotTime: string | null) {
  if (!kotTime) return 0;

  const startTime = new Date(kotTime).getTime();
  const currentTime = Date.now();

  const elapsedMilliseconds = currentTime - startTime;

  return Math.max(
    0,
    Math.floor(elapsedMilliseconds / (1000 * 60)),
  );
}

export function useTables(): UseTablesReturn {
  const layouts = useSelector(
    (state: RootState) => state.table.layouts,
  );

  const [activeFloorId, setActiveFloorId] = useState(
    layouts[0]?.layoutId ?? "",
  );

  const activeLayout =
    layouts.find(
      (layout) => layout.layoutId === activeFloorId,
    ) ?? layouts[0];

  const tables = useMemo<TableItem[]>(() => {
    return (activeLayout?.tables ?? []).map((table) => {
      const status = tableStatusMap[table.status] ?? {
        status: "free",
        label: "FREE",
      };

      const elapsedMinutes = getElapsedMinutes(table.KOTTIME);

      const meta =
        table.status === "OCCUPIED"
          ? `${table.capacity} pax · ${elapsedMinutes} m`
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