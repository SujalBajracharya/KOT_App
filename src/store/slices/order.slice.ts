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
  },
});

export const {
  saveOrder,
  clearOrder,
  clearTableOrder,
  voidOrder,
} = orderSlice.actions;

export default orderSlice.reducer;