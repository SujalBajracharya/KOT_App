import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/screens/main_stack/order/useOrder";

export type OrderStatus = "ACTIVE" | "VOIDED";

export interface OrderMeta {
  status: OrderStatus;
  voidedAt: string | null;
}

interface OrderState {
  tableNo: string;
  items: CartItem[];
  orders: Record<string, CartItem[]>;
  /** Per-table metadata — status and void timestamp */
  orderMeta: Record<string, OrderMeta>;
}

interface SplitAndTransferPayload {
  sourceTable: string;
  destinationTable: string;
  transfers: {
    itemId: string;
    quantity: number;
  }[];
}

const initialState: OrderState = {
  tableNo: "",
  items: [],
  orders: {},
  orderMeta: {},
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    saveOrder: (
      state,
      action: PayloadAction<{
        tableNo: string;
        items: CartItem[];
      }>,
    ) => {
      const { tableNo, items } = action.payload;
      state.tableNo = tableNo;
      state.items = items;
      state.orders[tableNo] = items;
      // Mark/reset order as ACTIVE when a new KOT is saved
      state.orderMeta[tableNo] = { status: "ACTIVE", voidedAt: null };
    },

    clearOrder: (state) => {
      state.tableNo = "";
      state.items = [];
      state.orders = {};
      state.orderMeta = {};
    },

    /** Remove a single table's order and metadata (called after settlement) */
    clearTableOrder: (state, action: PayloadAction<string>) => {
      const tableNo = action.payload;
      delete state.orders[tableNo];
      delete state.orderMeta[tableNo];
    },

    /** Mark an order as VOIDED — does NOT delete it so Voided tab can show it */
    voidOrder: (state, action: PayloadAction<string>) => {
      const tableNo = action.payload;
      state.orderMeta[tableNo] = {
        status: "VOIDED",
        voidedAt: new Date().toISOString(),
      };
    },

    splitAndTransferOrder: (
      state,
      action: PayloadAction<SplitAndTransferPayload>,
    ) => {
      const { sourceTable, destinationTable, transfers } = action.payload;

      if (sourceTable === destinationTable) return;

      const sourceItems = state.orders[sourceTable] ?? [];
      const destinationItems = state.orders[destinationTable] ?? [];
      const transferById = new Map(
        transfers
          .filter(({ quantity }) => Number.isInteger(quantity) && quantity > 0)
          .map(({ itemId, quantity }) => [itemId, quantity]),
      );

      if (transferById.size === 0) return;

      const remainingItems: CartItem[] = [];
      const movedItems: CartItem[] = [];

      for (const item of sourceItems) {
        const moveQuantity = Math.min(
          item.quantity,
          transferById.get(item.id) ?? 0,
        );
        const remainingQuantity = item.quantity - moveQuantity;

        if (remainingQuantity > 0) {
          remainingItems.push({ ...item, quantity: remainingQuantity });
        }

        if (moveQuantity > 0) {
          movedItems.push({ ...item, quantity: moveQuantity });
        }
      }

      if (movedItems.length === 0) return;

      const destinationById = new Map(
        destinationItems.map((item) => [item.id, item]),
      );

      for (const movedItem of movedItems) {
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

      state.orders[sourceTable] = remainingItems;
      state.orders[destinationTable] = Array.from(destinationById.values());
      state.orderMeta[destinationTable] = {
        status: "ACTIVE",
        voidedAt: null,
      };

      if (state.tableNo === sourceTable) {
        state.items = remainingItems;
      }
    },

  },
});

export const {
  saveOrder,
  clearOrder,
  clearTableOrder,
  voidOrder,
  splitAndTransferOrder,
} = orderSlice.actions;

export default orderSlice.reducer;