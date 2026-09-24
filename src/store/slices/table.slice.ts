import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TableStatus = "FREE" | "OCCUPIED" | "BILL" | "HELD";

export interface TableState {
  // Static table information
  tableId: string;
  TABLENO: string;
  capacity: number;
  disabled: boolean;

  // Dynamic table information
  status: TableStatus;
  QUANTITY: number;
  KOTTIME: string | null;
}

export interface TableLayoutState {
  layoutId: string;
  layoutName: string;
  tables: TableState[];
}

interface TablesState {
  layouts: TableLayoutState[];
}

interface UpdateTableAfterKOTPayload {
  tableNo: string;
  quantity: number;
  kotTime: string;
}

const initialState: TablesState = {
  layouts: [
    {
      layoutId: "layout-floor1",
      layoutName: "1st Floor",
      tables: [
        {
          tableId: "f1-t1",
          TABLENO: "1 floor-1",
          capacity: 4,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
        {
          tableId: "f1-t2",
          TABLENO: "2 floor-1",
          capacity: 2,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
        {
          tableId: "f1-t3",
          TABLENO: "3 floor-1",
          capacity: 6,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
        {
          tableId: "f1-t4",
          TABLENO: "4 floor-1",
          capacity: 4,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
      ],
    },

    {
      layoutId: "layout-floor2",
      layoutName: "2nd Floor",
      tables: [
        {
          tableId: "f2-t1",
          TABLENO: "1 floor-2",
          capacity: 4,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
        {
          tableId: "f2-t2",
          TABLENO: "2 floor-2",
          capacity: 4,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
        {
          tableId: "f2-t3",
          TABLENO: "3 floor-2",
          capacity: 6,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
      ],
    },

    {
      layoutId: "layout-coffee-terrace",
      layoutName: "Coffee Terrace",
      tables: [
        {
          tableId: "ct-01",
          TABLENO: "CT 01",
          capacity: 2,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
        {
          tableId: "ct-02",
          TABLENO: "CT 02",
          capacity: 4,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
      ],
    },

    {
      layoutId: "layout-dining",
      layoutName: "Dining",
      tables: [
        {
          tableId: "dt-01",
          TABLENO: "DT 01",
          capacity: 10,
          disabled: false,
          status: "FREE",
          QUANTITY: 0,
          KOTTIME: null,
        },
      ],
    },
  ],
};

const tableSlice = createSlice({
  name: "tables",
  initialState,

  reducers: {
    updateTableAfterKOT: (
      state,
      action: PayloadAction<UpdateTableAfterKOTPayload>,
    ) => {
      const { tableNo, quantity, kotTime } = action.payload;

      for (const layout of state.layouts) {
        const table = layout.tables.find(
          (table) => table.TABLENO === tableNo,
        );

        if (!table) continue;

        table.status = "OCCUPIED";
        table.QUANTITY = quantity;
        table.KOTTIME = kotTime;

        break;
      }
    },

    updateTableStatus: (
      state,
      action: PayloadAction<{
        tableNo: string;
        status: TableStatus;
      }>,
    ) => {
      const { tableNo, status } = action.payload;

      for (const layout of state.layouts) {
        const table = layout.tables.find(
          (table) => table.TABLENO === tableNo,
        );

        if (!table) continue;

        table.status = status;

        break;
      }
    },

    updateTableQuantity: (
      state,
      action: PayloadAction<{
        tableNo: string;
        quantity: number;
      }>,
    ) => {
      const { tableNo, quantity } = action.payload;

      for (const layout of state.layouts) {
        const table = layout.tables.find(
          (table) => table.TABLENO === tableNo,
        );

        if (!table) continue;

        table.QUANTITY = quantity;

        break;
      }
    },

    updateTableKOTTime: (
      state,
      action: PayloadAction<{
        tableNo: string;
        kotTime: string | null;
      }>,
    ) => {
      const { tableNo, kotTime } = action.payload;

      for (const layout of state.layouts) {
        const table = layout.tables.find(
          (table) => table.TABLENO === tableNo,
        );

        if (!table) continue;

        table.KOTTIME = kotTime;

        break;
      }
    },

    resetTable: (
      state,
      action: PayloadAction<{ tableNo: string }>,
    ) => {
      const { tableNo } = action.payload;

      for (const layout of state.layouts) {
        const table = layout.tables.find(
          (table) => table.TABLENO === tableNo,
        );

        if (!table) continue;

        table.status = "FREE";
        table.QUANTITY = 0;
        table.KOTTIME = null;

        break;
      }
    },
  },
});

export const {
  updateTableAfterKOT,
  updateTableStatus,
  updateTableQuantity,
  updateTableKOTTime,
  resetTable,
} = tableSlice.actions;

export default tableSlice.reducer;