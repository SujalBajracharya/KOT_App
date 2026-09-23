import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PaymentMethod = "CASH" | "CARD" | "QR" | "CREDIT";

export type SettlementStatus = "PENDING" | "SETTLED" | "VOIDED";

export interface SettlementPayment {
  paymentMethod: PaymentMethod;
  amount: number;
}

export interface Settlement {
  settlementId: string;
  TABLENO: string;
  billTotal: number;
  payments: SettlementPayment[];
  status: SettlementStatus;
}

interface SettlementState {
  settlements: Settlement[];
}

const initialState: SettlementState = {
  settlements: [],
};

const settlementSlice = createSlice({
  name: "settlement",
  initialState,

  reducers: {
    createSettlement: (
      state,
      action: PayloadAction<{
        settlementId: string;
        TABLENO: string;
        billTotal: number;
      }>,
    ) => {
      state.settlements.push({
        settlementId: action.payload.settlementId,
        TABLENO: action.payload.TABLENO,
        billTotal: action.payload.billTotal,
        payments: [],
        status: "PENDING",
      });
    },

    addPayment: (
      state,
      action: PayloadAction<{
        settlementId: string;
        paymentMethod: PaymentMethod;
        amount: number;
      }>,
    ) => {
      const settlement = state.settlements.find(
        (s) => s.settlementId === action.payload.settlementId,
      );

      if (!settlement) return;

      settlement.payments.push({
        paymentMethod: action.payload.paymentMethod,
        amount: action.payload.amount,
      });
    },

    settleSettlement: (state, action: PayloadAction<string>) => {
      const settlement = state.settlements.find(
        (s) => s.settlementId === action.payload,
      );

      if (!settlement) return;

      settlement.status = "SETTLED";
    },

    voidSettlement: (state, action: PayloadAction<string>) => {
      const settlement = state.settlements.find(
        (s) => s.settlementId === action.payload,
      );

      if (!settlement) return;

      settlement.status = "VOIDED";
    },

    removeSettlement: (state, action: PayloadAction<string>) => {
      state.settlements = state.settlements.filter(
        (s) => s.settlementId !== action.payload,
      );
    },
  },
});

export const {
  createSettlement,
  addPayment,
  settleSettlement,
  voidSettlement,
  removeSettlement,
} = settlementSlice.actions;

export default settlementSlice.reducer;
