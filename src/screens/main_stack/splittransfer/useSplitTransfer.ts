import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import navigation from "@/utils/app_navigation";
import { RootState } from "@/store";
import {
  saveOrder,
  splitAndTransferOrder,
} from "@/store/slices/order.slice";
import {
  resetTable,
  updateTableAfterKOT,
} from "@/store/slices/table.slice";
import {
  SplitLine,
  SplitMode,
  SplitModeItem,
  TableSelectionMode,
  UseSplitTransferReturn,
} from "./types";

function getOrderTotal(items: { RATE_A: number; quantity: number }[]) {
  return items.reduce((total, item) => total + item.RATE_A * item.quantity, 0);
}

export function useSplitTransfer(): UseSplitTransferReturn {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.order.orders);
  const layouts = useSelector((state: RootState) => state.table.layouts);
  const [sourceTable, setSourceTable] = useState("");
  const [destination, setDestination] = useState("");
  const [tableSelectionMode, setTableSelectionMode] =
    useState<TableSelectionMode | null>(null);

  const [modes, setModes] = useState<SplitModeItem[]>([
    {
      id: "split",
      name: "SPLIT ITEMS",
      active: true,
    },
    {
      id: "move",
      name: "MOVE TABLE",
      active: false,
    },
  ]);

  const tableNumbers = useMemo(
    () =>
      layouts
        .flatMap((layout) => layout.tables)
        .filter((table) => !table.disabled)
        .map((table) => table.TABLENO),
    [layouts],
  );

  const sourceTables = useMemo(
    () => tableNumbers.filter((tableNo) => tableNo !== destination),
    [destination, tableNumbers],
  );
  const destinationTables = useMemo(
    () => tableNumbers.filter((tableNo) => tableNo !== sourceTable),
    [sourceTable, tableNumbers],
  );

  const sourceItems = useMemo(
    () => orders[sourceTable] ?? [],
    [orders, sourceTable],
  );
  const [temporarySplit, setTemporarySplit] = useState<{
    sourceTable: string;
    moveQuantities: Record<string, number>;
  }>({ sourceTable: "", moveQuantities: {} });

  const lines = useMemo<SplitLine[]>(
    () => {
      const moveQuantities =
        temporarySplit.sourceTable === sourceTable
          ? temporarySplit.moveQuantities
          : {};

      return sourceItems.map((item) => {
        const moveQty = Math.min(
          item.quantity,
          Math.max(0, moveQuantities[item.id] ?? 0),
        );

        return {
          id: item.id,
          name: item.name,
          totalQty: `${item.quantity} ${item.unit}`,
          stayQty: item.quantity - moveQty,
          moveQty,
          stayLabel: `STAYS · ${sourceTable}`,
          moveLabel: `MOVES · ${destination || "DESTINATION"}`,
        };
      });
    },
    [destination, sourceItems, sourceTable, temporarySplit],
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onModeSelect = useCallback((id: SplitMode) => {
    setModes((currentModes) =>
      currentModes.map((mode) => ({
        ...mode,
        active: mode.id === id,
      }))
    );
  }, []);

  const onChangeSourceTable = useCallback(() => {
    setTableSelectionMode("source");
  }, []);

  const onSelectSourceTable = useCallback((tableNo: string) => {
    setSourceTable(tableNo);
    setTableSelectionMode(null);
  }, []);

  const onChangeDestination = useCallback(() => {
    setTableSelectionMode("destination");
  }, []);

  const onSelectDestinationTable = useCallback((tableNo: string) => {
    setDestination(tableNo);
    setTableSelectionMode(null);
  }, []);

  const onCloseTableSelector = useCallback(() => {
    setTableSelectionMode(null);
  }, []);

  const onMoveQuantityChange = useCallback(
    (id: string, delta: number) => {
      const item = sourceItems.find((sourceItem) => sourceItem.id === id);
      if (!item) return;

      setTemporarySplit((current) => {
        const currentQuantities =
          current.sourceTable === sourceTable ? current.moveQuantities : {};
        const moveQty = Math.min(
          item.quantity,
          Math.max(0, (currentQuantities[id] ?? 0) + delta),
        );

        return {
          sourceTable,
          moveQuantities: { ...currentQuantities, [id]: moveQty },
        };
      });
    },
    [sourceItems, sourceTable],
  );

  const onConfirm = useCallback(() => {
    if (!sourceTable) {
      Alert.alert("Source required", "Please select a source table.");
      return;
    }

    if (!destination) {
      Alert.alert("Destination required", "Please select a destination table.");
      return;
    }

    if (sourceTable === destination) {
      Alert.alert(
        "Invalid transfer",
        "Source and destination tables must be different.",
      );
      return;
    }

    const transfers = lines
      .filter((line) => line.moveQty > 0)
      .map((line) => ({ itemId: line.id, quantity: line.moveQty }));

    if (transfers.length === 0) {
      Alert.alert(
        "No items selected",
        "Please select at least one item to transfer.",
      );
      return;
    }

    const destinationItems = orders[destination] ?? [];
    const destinationById = new Map(
      destinationItems.map((item) => [item.id, item]),
    );

    for (const line of lines) {
      if (line.moveQty === 0) continue;

      const sourceItem = sourceItems.find((item) => item.id === line.id);
      if (!sourceItem) continue;

      const movedItem = {
        ...sourceItem,
        quantity: line.moveQty,
      };
      const existingItem = destinationById.get(movedItem.id);

      destinationById.set(
        movedItem.id,
        existingItem
          ? {
              ...existingItem,
              quantity: existingItem.quantity + movedItem.quantity,
            }
          : movedItem,
      );
    }

    const remainingSourceItems = sourceItems
      .map((item) => {
        const line = lines.find((currentLine) => currentLine.id === item.id);
        return {
          ...item,
          quantity: line?.stayQty ?? item.quantity,
        };
      })
      .filter((item) => item.quantity > 0);
    const updatedDestinationItems = Array.from(destinationById.values());
    const kotTime = new Date().toISOString();

    dispatch(
      splitAndTransferOrder({
        sourceTable,
        destinationTable: destination,
        transfers,
      }),
    );
    dispatch(
      saveOrder({
        tableNo: destination,
        items: updatedDestinationItems,
      }),
    );
    if (remainingSourceItems.length > 0) {
      dispatch(
        updateTableAfterKOT({
          tableNo: sourceTable,
          quantity: getOrderTotal(remainingSourceItems),
          kotTime,
        }),
      );
    } else {
      dispatch(resetTable({ tableNo: sourceTable }));
    }
    dispatch(
      updateTableAfterKOT({
        tableNo: destination,
        quantity: getOrderTotal(updatedDestinationItems),
        kotTime,
      }),
    );
    setTemporarySplit({ sourceTable, moveQuantities: {} });
    Alert.alert("Transfer complete", `Items moved to ${destination}.`);
  }, [
    destination,
    dispatch,
    lines,
    orders,
    sourceItems,
    sourceTable,
  ]);

  const movingQuantity = lines.reduce((sum, line) => sum + line.moveQty, 0);
  const stayingQuantity = lines.reduce((sum, line) => sum + line.stayQty, 0);

  return {
    state: {
      tableLabel: sourceTable
        ? `Table ${sourceTable} · Split & Transfer`
        : "Split & Transfer",
      modes,
      sourceTable,
      sourceTables,
      destinationTables,
      isTableSelectorVisible: tableSelectionMode !== null,
      tableSelectionMode,
      destination,
      lines,
      movingSummary: `Moving ${movingQuantity} item${movingQuantity === 1 ? "" : "s"}`,
      stayingSummary: `Staying ${stayingQuantity} item${stayingQuantity === 1 ? "" : "s"}`,
    },

    action: {
      onBack,
      onModeSelect,
      onChangeSourceTable,
      onSelectSourceTable,
      onChangeDestination,
      onSelectDestinationTable,
      onCloseTableSelector,
      onMoveQuantityChange,
      onConfirm,
    },
  };
}