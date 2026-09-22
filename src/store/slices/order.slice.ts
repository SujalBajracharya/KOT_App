import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItem } from "@/screens/main_stack/order/useOrder";

interface OrderState {
  tableNo: string;
  items: CartItem[];
  orders: Record<string, CartItem[]>;
}

const initialState: OrderState = {
  tableNo: "",
  items: [],
  orders: {},
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
      state.tableNo = action.payload.tableNo;
      state.items = action.payload.items;
      state.orders[action.payload.tableNo] = action.payload.items;
    },

    clearOrder: (state) => {
      state.tableNo = "";
      state.items = [];
      state.orders = {};
    },
  },
});

export const {
  saveOrder,
  clearOrder,
} = orderSlice.actions;

export default orderSlice.reducer;