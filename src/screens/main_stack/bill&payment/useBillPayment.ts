import { useCallback, useMemo, useState } from "react";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import navigation from "@/utils/app_navigation";
import {
  BillLine,
  DiscountType,
  PaymentMethod,
  UseBillPaymentReturn,
} from "./types";
import {
  addPayment,
  createSettlement,
  settleSettlement,
} from "@/store/slices/settlements.slice";
import { resetTable } from "@/store/slices/table.slice";
import { clearTableOrder } from "@/store/slices/order.slice";

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

  /** Perform the actual settlement — called only after user confirms the Alert */
  const performSettle = useCallback(() => {
    if (!TABLENO) {
      console.error("TABLENO is missing");
      return;
    }

    const settlementId = `SET-${Date.now()}`;

    // 1. Create the settlement record
    dispatch(
      createSettlement({
        settlementId,
        TABLENO,
        billTotal: calculations.total,
      }),
    );

    // 2. Record the payment (one entry for the selected method + full total)
    dispatch(
      addPayment({
        settlementId,
        paymentMethod: selectedPayment,
        amount: calculations.total,
      }),
    );

    // 3. Mark as SETTLED (sets settledAt timestamp)
    dispatch(settleSettlement(settlementId));

    // 4. Free the table
    dispatch(resetTable({ tableNo: TABLENO }));

    // 5. Clear the order so it no longer shows in KOT Memo active list
    dispatch(clearTableOrder(TABLENO));

    // 6. Return to previous screen
    navigation.goBack();
  }, [dispatch, TABLENO, calculations.total, selectedPayment]);

  const onSettle = useCallback(() => {
    Alert.alert(
      "Confirm Settlement",
      "Are you sure you want to settle this bill?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: performSettle,
        },
      ],
    );
  }, [performSettle]);

  const onQRPress = useCallback(() => {
    if (!TABLENO) return;

    navigation.navigate("qr", {
      amount: `Rs ${calculations.total.toLocaleString()}`,
      reference: `BILL · ${TABLENO}`,
      tableLabel: TABLENO,
    });
  }, [TABLENO, calculations.total]);

  return {
    state: {
      tableLabel: TABLENO ? TABLENO : "Table",
      billMeta: `BILL · ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
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
      onQRPress,
    },
  };
}
