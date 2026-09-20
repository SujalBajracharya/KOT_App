import { useCallback, useState } from "react";
import navigation from "@/utils/app_navigation";
import {
  SplitLine,
  SplitMode,
  SplitModeItem,
  UseSplitTransferReturn,
} from "./types";

export function useSplitTransfer(): UseSplitTransferReturn {
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

  const [destination] = useState("Table 12 (Floor 2)");

  const lines: SplitLine[] = [
    {
      id: "1",
      name: "Momo Chicken (C)",
      totalQty: "3 pcs",
      stayQty: 1,
      moveQty: 2,
      stayLabel: "STAYS · T4 FLOOR-1",
      moveLabel: "MOVES · T12 FLOOR-2",
    },
    {
      id: "2",
      name: "Coke 500ml",
      totalQty: "2 bottles",
      stayQty: 2,
      moveQty: 0,
      stayLabel: "STAYS · T4 FLOOR-1",
      moveLabel: "MOVES · T12 FLOOR-2",
    },
  ];

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

  const onChangeDestination = useCallback(() => {}, []);

  const onConfirm = useCallback(() => {}, []);

  return {
    state: {
      tableLabel: "Table 4 · Split & Transfer",
      modes,
      destination,
      lines,
      movingSummary: "Moving 1 item · Rs 560",
      stayingSummary: "Staying 2 items · Rs 380",
    },

    action: {
      onBack,
      onModeSelect,
      onChangeDestination,
      onConfirm,
    },
  };
}