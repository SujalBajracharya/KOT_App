import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "./styles";
import { QRContentProps, QRPaymentMethod, QRPaymentStatus } from "./types";
import { AppHeader } from "@/components/common/Header";

//  Constants
const METHOD_TABS: { key: QRPaymentMethod; label: string }[] = [
  { key: "esewa", label: "eSewa" },
  { key: "khalti", label: "Khalti" },
  { key: "fonepay", label: "ConnectIPS" },
];

//  Content
export function QRContent({ state, action }: QRContentProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const expiryLabel = `Scan the below QR`;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "bottom", "left", "right"]}
    >
      <View style={styles.container}>
        {/* ── Header ── */}
        <AppHeader
          title={state.tableLabel}
          subtitle={state.reference}
          onBack={action.onBack}
        />

        {/* ── Payment method tabs ── */}
        <View style={styles.methodTabs}>
          {METHOD_TABS.map((tab, i) => (
            <Pressable
              key={tab.key}
              style={[
                styles.Tab,
                i === 0 && styles.methodTabFirst,
                state.paymentMethod === tab.key && styles.TabActive,
              ]}
              onPress={() => action.onChangeMethod(tab.key)}
            >
              <Text
                style={[
                  styles.TabText,
                  state.paymentMethod === tab.key && styles.TabTextActive,
                ]}
              >
                {tab.label.toUpperCase()}
              </Text>
            </Pressable>
          ))}
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* ── Bill summary ── */}
          <View style={styles.billBlock}>
            <Text style={styles.billAmountLabel}>AMOUNT DUE</Text>
            <Text style={styles.billAmount}>{state.amount}</Text>
            <Text style={styles.billReference}>{state.reference}</Text>
          </View>

          {/* ── QR card ── */}
          <View style={styles.qrCard}>
            {/* Expiry indicator */}
            <View style={styles.expiryRow}>
              <View style={styles.expiryDot} />
              <Text style={styles.expiryText}>{expiryLabel}</Text>
            </View>

            {/* QR code — always on white background */}
            <View style={styles.qrWrapper}>
              <Image
                source={require("../../../../assets/QR/qrcode.png")}
                style={styles.qrImage}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.qrInstruction}>
              Open{" "}
              {state.paymentMethod === "esewa"
                ? "eSewa"
                : state.paymentMethod === "khalti"
                  ? "Khalti"
                  : "your bank app"}{" "}
              and scan the QR code to complete payment
            </Text>
          </View>

          {/* ── Help note ── */}
          <Text style={styles.helpNote}>
            If the customer's app does not recognise the QR, ask them to use the
            "Scan any QR" option in their payment app or switch to a different
            payment method above.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
