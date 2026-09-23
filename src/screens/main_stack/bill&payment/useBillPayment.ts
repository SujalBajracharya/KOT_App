import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import navigation from "@/utils/app_navigation";
import {
  BillLine,
  DiscountType,
  PaymentMethod,
  UseBillPaymentReturn,
} from "./types";
import { addPayment, createSettlement, settleSettlement } from "@/store/slices/settlements.slice";

export function useBillPayment(TABLENO?: string): UseBillPaymentReturn {
  const [discountValue, setDiscountValue] = useState("");
  const [appliedDiscountValue, setAppliedDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<DiscountType>("flat");
  const [selectedPayment, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.order.orders);
  const items = TABLENO ? (orders[TABLENO] ?? []) : [];

  const lines: BillLine[] = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id,
      n: String(index + 1),
      name: item.name,
      qty: item.quantity,
      amount: item.RATE_A * item.quantity,
      rate: item.RATE_A,
    }));
  }, [items]);

  const calculations = useMemo(() => {
    const gross = lines.reduce((total, line) => total + line.amount, 0);

    const discount =
      discountType === "percent"
        ? (gross * appliedDiscountValue) / 100
        : appliedDiscountValue;

    const taxableAmount = gross - discount;

    const vat = taxableAmount * 0.13;

    const total = Math.round(taxableAmount + vat);

    return {
      gross,
      discount,
      vat,
      total,
    };
  }, [lines, appliedDiscountValue, discountType]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPrint = useCallback(() => {}, []);

  const onApplyDiscount = useCallback(() => {
    const value = Number(discountValue) || 0;

    setAppliedDiscountValue(value);
  }, [discountValue]);

  const onSettle = useCallback(() => {
    if (!TABLENO) {
      console.error("TABLENO is missing");
      return;
    }
    const settlementId = `SET-${Date.now()}`;

    dispatch(
      createSettlement({
        settlementId,
        TABLENO,
        billTotal: calculations.total,
      }),
    );

    dispatch(
      addPayment({
        settlementId,
        paymentMethod: selectedPayment,
        amount: calculations.total,
      }),
    );

    dispatch(settleSettlement(settlementId));
  }, [dispatch, TABLENO, calculations.total, selectedPayment]);

  return {
    state: {
      tableLabel: TABLENO ? TABLENO : "Table 4",
      billMeta: "BILL NO 2140 · 14:38",
      lines,
      discountValue,
      discountType,
      gross: calculations.gross,
      discount: calculations.discount,
      vat: calculations.vat,
      total: calculations.total,
      totalDue: calculations.total,
      selectedPayment,
    },

    action: {
      onBack,
      onPrint,
      setDiscountValue,
      setDiscountType,
      onApplyDiscount,
      setPaymentMethod,
      onSettle,
    },
  };
}
