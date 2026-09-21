import React from "react";
import { FlatList, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Printer, Check } from "lucide-react-native";
import { useTheme } from "@/theme/ThemeContext";
import { useOrientation } from "@/hooks/useOrientation";
import { AppHeader } from "@/components/common/Header";
import { IconButton } from "@/components/common/IconButton";
import { BillContentProps, DiscountType, PaymentMethod } from "./types";
import { createStyles } from "./styles";
import { InputField } from "@/components/common/InputField";
import { Button } from "@/components/common/Button";
import { PrimaryButton } from "@/components/common/PrimaryButton";

const PAYMENT_METHODS: { key: PaymentMethod; label: string }[] = [
  { key: "cash", label: "CASH" },
  { key: "card", label: "CARD" },
  { key: "qr", label: "QR" },
  { key: "credit", label: "CREDIT" },
];

export function BillPaymentContent({ state, action }: BillContentProps) {
  const { theme } = useTheme();
  const { isLandscape } = useOrientation();
  const styles = createStyles(theme, isLandscape);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.container}>
        {/* ── Header ── */}
        <AppHeader
          title={state.tableLabel}
          subtitle={state.billMeta}
          onBack={action.onBack}
          rightComponent={
            <IconButton onPress={action.onPrint}>
              <Printer size={20} color={theme.colors.text} />
            </IconButton>
          }
        />

        {/* ── Content row ── */}
        <View style={styles.contentRow}>
          <View style={styles.mainContent}>
            {/* ── Bill lines ── */}
            <FlatList
              data={state.lines}
              keyExtractor={(l) => l.id}
              renderItem={({ item: l }) => (
                <View style={styles.lineItem}>
                  <Text style={styles.lineNumber}>{l.n}</Text>
                  <Text style={styles.lineName}>{l.name}</Text>
                  <Text style={styles.lineQty}>
                    {l.qty}*{l.amount}
                  </Text>
                  <Text style={styles.lineAmount}>{l.amount * l.qty}</Text>
                </View>
              )}
            />
          </View>

          {/* ── Footer / Payment Panel ── */}
          <ScrollView
            style={styles.sidePanel}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <View style={styles.footer}>
              {/* Discount row */}
              <View style={styles.discountRow}>
                <Text style={styles.discountLabel}>DISCOUNT</Text>
                <InputField
                  style={{ flex: 1 }}
                  value={state.discountValue}
                  onChangeText={action.setDiscountValue}
                  keyboardType="number-pad"
                  textAlign="center"
                />

                <View style={styles.discountTypeToggle}>
                  {(["flat", "percent"] as DiscountType[]).map((t) => (
                    <Pressable
                      key={t}
                      style={[
                        styles.DiscountTab,
                        state.discountType === t && styles.TabActive,
                      ]}
                      onPress={() => action.setDiscountType(t)}
                    >
                      <Text
                        style={[
                          styles.discountTypeBtnText,
                          state.discountType === t &&
                            styles.TabTextActive,
                        ]}
                      >
                        {t === "flat" ? "Rs" : "%"}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <Button onPress={action.onApplyDiscount} style={{height: 46, flex: 3}}>
                  <Text style={styles.TabText}>APPLY</Text>
                </Button>
              </View>

              {/* Totals */}
              <View style={styles.totalsBlock}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Gross</Text>
                  <Text style={styles.totalValue}>{state.gross}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Discount</Text>
                  <Text style={styles.totalValue}>- {state.discount}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>VAT 13%</Text>
                  <Text style={styles.totalValue}>{state.vat}</Text>
                </View>
                <View style={styles.grandTotalRow}>
                  <Text style={styles.grandTotalLabel}>TOTAL DUE</Text>
                  <Text style={styles.grandTotalValue}>
                    Rs{state.totalDue.toLocaleString()}
                  </Text>
                </View>
              </View>

              {/* Payment method */}
              <Text style={styles.paymentMethodLabel}>PAYMENT METHOD</Text>
              <View style={styles.paymentMethodRow}>
                {PAYMENT_METHODS.map((m) => (
                  <Pressable
                    key={m.key}
                    style={[
                      styles.button,
                      { width: 85, height: 46 },
                      state.selectedPayment === m.key && styles.TabActive,
                    ]}
                    onPress={() => action.setPaymentMethod(m.key)}
                  >
                    <Text
                      style={[
                        styles.TabText,
                        state.selectedPayment === m.key && styles.TabTextActive,
                      ]}
                    >
                      {m.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* Actions */}
              <View style={styles.actionRow}>
                <Button onPress={action.onPrint} style={{ flex: 1 }}>
                  <Text style={styles.printButtonText}>PRINT</Text>
                </Button>
                <PrimaryButton
                  onPress={action.onSettle}
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    flex: 3,
                    height: 46,
                  }}
                >
                  <Text style={styles.settleButtonText}>
                    SETTLE Rs {state.totalDue.toLocaleString()}
                  </Text>
                  <Check size={20} color={theme.colors.onPrimary} />
                </PrimaryButton>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}
