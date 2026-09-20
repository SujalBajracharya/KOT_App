import { useCallback, useMemo, useState } from "react";
import navigation from "@/utils/app_navigation";
import {
  BillLine,
  DiscountType,
  PaymentMethod,
  UseBillPaymentReturn,
} from "./types";

export function useBillPayment(): UseBillPaymentReturn {
  const [discountValue, setDiscountValue] = useState("");
  const [appliedDiscountValue, setAppliedDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<DiscountType>("flat");
  const [selectedPayment, setPaymentMethod] = useState<PaymentMethod>("cash");

  const lines: BillLine[] = [
    {
      id: "1",
      n: "1",
      name: "Momo Chicken (C)",
      qty: 4,
      amount: 420,
    },
    {
      id: "2",
      n: "2",
      name: "Coke 500ml",
      qty: 2,
      amount: 100,
    },
  ];

  const calculations = useMemo(() => {
    const gross = lines.reduce(
      (total, line) => total + line.qty * line.amount,
      0,
    );

    const discount =
      discountType === "percent"
        ? (gross * appliedDiscountValue) / 100
        : appliedDiscountValue;

    const taxableAmount = gross - discount;

    const vat = taxableAmount * 0.13;

    // const total = taxableAmount + vat;
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

  const onSettle = useCallback(() => {}, []);

  return {
    state: {
      tableLabel: "Table 4",
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
