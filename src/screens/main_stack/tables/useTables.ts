import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import navigation from "@/utils/app_navigation";
import { RootState } from "@/store";
import { TableItem, TableStatus, UseTablesReturn } from "./types";
import { PopupTable } from "@/components/table/TableActionPopup";
import {
  freeTable,
  occupyTable,
  resetTable,
  transferReservation,
} from "@/store/slices/table.slice";

const tableStatusMap: Record<string, { status: TableStatus; label: string }> = {
  FREE: { status: "free", label: "FREE" },
  OCCUPIED: { status: "occupied", label: "OCCUPIED" },
  RESERVED: { status: "reserved", label: " RESERVED" },
  VACATED: { status: "vacated", label: "VACATED" },
};

function formatAmount(amount?: number) {
  return amount === undefined ? "" : `Rs ${amount.toLocaleString()}`;
}

function getElapsedMinutes(kotTime: string | null, currentTime = Date.now()) {
  if (!kotTime) return 0;

  const startTime = new Date(kotTime).getTime();

  const elapsedMilliseconds = currentTime - startTime;

  return Math.max(0, Math.floor(elapsedMilliseconds / (1000 * 60)));
}

export function useTables(): UseTablesReturn {
  const layouts = useSelector((state: RootState) => state.table.layouts);

  const [activeFloorId, setActiveFloorId] = useState(
    layouts[0]?.layoutId ?? "",
  );
  const [refreshing, setRefreshing] = useState(false);
  const [refreshedAt, setRefreshedAt] = useState(() => Date.now());
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [popupTable, setPopupTable] = useState<PopupTable | null>(null);
  const [transferTable, setTransferTable] = useState<string | null>(null);

  const dispatch = useDispatch();

  const activeLayout =
    layouts.find((layout) => layout.layoutId === activeFloorId) ?? layouts[0];

  const tables = useMemo<TableItem[]>(() => {
    return (activeLayout?.tables ?? []).map((table) => {
      const status = tableStatusMap[table.status] ?? {
        status: "free",
        label: "FREE",
      };

      const elapsedMinutes = getElapsedMinutes(table.KOTTIME, refreshedAt);

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
  }, [activeLayout, refreshedAt]);

  const filteredTables = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) return tables;

    return tables.filter((table) =>
      table.name.trim().toLowerCase().includes(normalizedQuery),
    );
  }, [searchQuery, tables]);

  const transferDestinations = useMemo(
    () =>
      layouts
        .flatMap((layout) => layout.tables)
        .filter(
          (table) => table.status === "FREE" && table.TABLENO !== transferTable,
        )
        .map((table) => ({ id: table.tableId, name: table.TABLENO })),
    [layouts, transferTable],
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onSearch = useCallback(() => {
    setIsSearchVisible((visible) => !visible);
  }, []);

  const onSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshedAt(Date.now());
    setTimeout(() => setRefreshing(false), 2000);
  }, []);

  const onFloorSelect = useCallback((floorId: string) => {
    setActiveFloorId(floorId);
  }, []);

  // const onTablePress = useCallback((TABLENO: string, STATUS: string) => {
  //   console.log("STASTUS", STATUS);
  //   navigation.navigate("order", {
  //     TABLENO,
  //   });
  // }, []);

  const onTablePress = useCallback(
    (TABLENO: string, STATUS: string) => {
      if (STATUS === "occupied" || STATUS === "free") {
        // already has an order — go straight to order/bill
        navigation.navigate("order", { TABLENO });
        return;
      }

      const reservedTime = layouts
        .flatMap((layout) => layout.tables)
        .find((table) => table.TABLENO === TABLENO)?.reservedTime;

      // reserved, free, or anything else — show the popup
      setPopupTable({
        id: TABLENO,
        name: `Table ${TABLENO}`,
        status: STATUS as TableStatus,
        statusLabel: STATUS.toUpperCase(),
        meta: "",
        amount: "",
        reservedTime,
      });
    },
    [layouts],
  );

  const onSetSeated = useCallback(
    (TABLENO: string) => {
      dispatch(occupyTable({ tableNo: TABLENO }));
      setPopupTable(null);
      navigation.navigate("order", { TABLENO });
    },
    [dispatch, navigation],
  );

  const onSetFree = useCallback(
    (TABLENO: string) => {
      dispatch(freeTable({ tableNo: TABLENO }));
      setPopupTable(null);
    },
    [dispatch],
  );

  const onTransferSeat = useCallback((TABLENO: string) => {
    setTransferTable(TABLENO);
  }, []);

  const onTransferDestination = useCallback(
    (destinationTable: string) => {
      if (!transferTable) return;

      dispatch(
        transferReservation({
          sourceTable: transferTable,
          destinationTable,
        }),
      );
      setTransferTable(null);
      setPopupTable(null);
    },
    [dispatch, transferTable],
  );

  const onCancelTransfer = useCallback(() => {
    setTransferTable(null);
  }, []);

  return {
    state: {
      floors: layouts.map((layout) => ({
        id: layout.layoutId,
        name: layout.layoutName,
        active: layout.layoutId === activeFloorId,
      })),
      tables: filteredTables,
      refreshing,
      searchQuery,
      isSearchVisible,
      popupTable,
      transferTable,
      transferDestinations,
    },

    action: {
      onBack,
      onSearch,
      onSearchChange,
      onRefresh,
      onFloorSelect,
      onTablePress,
      onSetSeated,
      onSetFree,
      onTransferSeat,
      onTransferDestination,
      onCancelTransfer,
      onClosePopup: () => setPopupTable(null),
    },
  };
}
