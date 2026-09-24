import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/screens/main_stack/order/useOrder";

export type OrderStatus = "ACTIVE" | "VOIDED";

export interface OrderMeta {
  status: OrderStatus;
  voidedAt: string | null;
}

/** Historical record preserved when an order is voided */
interface VoidedOrder {
  id: string;
  tableNo: string;
  items: CartItem[];
  voidedAt: string;
}

interface OrderState {
  tableNo: string;
  items: CartItem[];

  /** Active orders only — voided orders are removed from here */
  orders: Record<string, CartItem[]>;
  /** Per-table metadata for ACTIVE orders only */
  orderMeta: Record<string, OrderMeta>;

  /** Historical voided orders — never removed during normal void flow */
  voidedOrders: VoidedOrder[];
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
  voidedOrders: [],
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
      state.voidedOrders = [];
    },

    /** Remove a single table's order and metadata (called after settlement) */
    clearTableOrder: (state, action: PayloadAction<string>) => {
      const tableNo = action.payload;
      delete state.orders[tableNo];
      delete state.orderMeta[tableNo];
    },

    /**
     * Void an order:
     *   - Copies the full CartItem list into `voidedOrders` for history.
     *   - Removes the order from active `orders` and `orderMeta`.
     *   - Clears the current selection if the voided table was selected.
     */
    voidOrder: (state, action: PayloadAction<string>) => {
      const tableNo = action.payload;
      const items = state.orders[tableNo];
      const voidedAt = new Date().toISOString();

      // Nothing to void — bail out safely
      if (!items) return;

      // Preserve the full order in the voided history
      state.voidedOrders.push({
        id: `voided-${tableNo}-${voidedAt}`,
        tableNo,
        items: [...items],
        voidedAt,
      });

      // Remove from active orders and metadata
      delete state.orders[tableNo];
      delete state.orderMeta[tableNo];

      // Clear current selection if the voided table was active
      if (state.tableNo === tableNo) {
        state.tableNo = "";
        state.items = [];
      }
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
