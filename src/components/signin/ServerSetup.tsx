import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "./styles";
import { useState } from "react";

export interface ServerSetupState {
  // IP octets + port stored as strings for easy TextInput binding
  ip1: string;
  ip2: string;
  ip3: string;
  ip4: string;
  port: string;
  portError: boolean;

  division: string;
  terminal: string;

  addOrderFromTop: boolean;
  printBillOnEPayment: boolean;
  enableOldApiSettings: boolean;

  isLoading: boolean;
  visible: boolean;
}

export interface ServerSetupAction {
  setIp1: (v: string) => void;
  setIp2: (v: string) => void;
  setIp3: (v: string) => void;
  setIp4: (v: string) => void;
  setPort: (v: string) => void;

  setDivision: (v: string) => void;
  setTerminal: (v: string) => void;

  setAddOrderFromTop: (fn: (prev: boolean) => boolean) => void;
  setPrintBillOnEPayment: (fn: (prev: boolean) => boolean) => void;
  setEnableOldApiSettings: (fn: (prev: boolean) => boolean) => void;

  onClose: () => void;
  onSaveReconnect: () => void;
}

export interface ServerSetupProps {
  state: ServerSetupState;
  action: ServerSetupAction;
}
type FocusedField =
  | "ip1"
  | "ip2"
  | "ip3"
  | "ip4"
  | "port"
  | "division"
  | "terminal"
  | null;

export function ServerSetup({ state, action }: ServerSetupProps) {
  const [focusedField, setFocusedField] = useState<FocusedField>(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const checkboxItems: {
    label: string;
    value: boolean;
    onToggle: () => void;
  }[] = [
    {
      label: "Add order from top",
      value: state.addOrderFromTop,
      onToggle: () => action.setAddOrderFromTop((prev) => !prev),
    },
    {
      label: "Print bill on e-payment",
      value: state.printBillOnEPayment,
      onToggle: () => action.setPrintBillOnEPayment((prev) => !prev),
    },
    {
      label: "Enable old API settings",
      value: state.enableOldApiSettings,
      onToggle: () => action.setEnableOldApiSettings((prev) => !prev),
    },
  ];

  return (
    <Modal
      visible={state.visible}
      transparent
      animationType="slide"
      onRequestClose={action.onClose}
    >
      <Pressable style={styles.overlay} onPress={action.onClose}>
        {/* Stop tap-through on the sheet itself */}
        <Pressable onPress={() => {}} style={styles.sheet}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {/* ── Header ── */}
            <View style={styles.headerRow}>
              <Text style={styles.headerTitle}>Server setup</Text>
              <Pressable
                style={styles.closeButton}
                onPress={action.onClose}
                hitSlop={8}
                disabled={state.isLoading}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
            </View>

            {/* ── SERVER IP · PORT ── */}
            <Text style={styles.sectionLabel}>SERVER IP · PORT</Text>
            <View style={styles.ipPortRow}>
              {(
                [
                  { name: "ip1", value: state.ip1, onChange: action.setIp1 },
                  { name: "ip2", value: state.ip2, onChange: action.setIp2 },
                  { name: "ip3", value: state.ip3, onChange: action.setIp3 },
                  { name: "ip4", value: state.ip4, onChange: action.setIp4 },
                ] as const
              ).map((octet) => (
                <View
                  key={octet.name}
                  style={[
                    styles.ipOctetBox,
                    focusedField === octet.name && styles.BoxFocused,
                  ]}
                >
                  <TextInput
                    style={styles.ipOctetInput}
                    value={octet.value}
                    onChangeText={octet.onChange}
                    keyboardType="number-pad"
                    maxLength={3}
                    selectTextOnFocus
                    editable={!state.isLoading}
                    onFocus={() => setFocusedField(octet.name)}
                    onBlur={() => setFocusedField(null)}
                    placeholderTextColor={theme.colors.textSecondary + "80"}
                  />
                </View>
              ))}

              {/* Port — highlighted with error border when invalid */}
              <View
                style={[
                  styles.portBox,
                  state.portError && styles.portBoxError,
                  focusedField === "port" && styles.BoxFocused,
                ]}
              >
                <TextInput
                  style={styles.portInput}
                  value={state.port}
                  onChangeText={action.setPort}
                  keyboardType="number-pad"
                  maxLength={5}
                  selectTextOnFocus
                  editable={!state.isLoading}
                  onFocus={() => setFocusedField("port")}
                  onBlur={() => setFocusedField(null)}
                  placeholderTextColor={theme.colors.textSecondary + "80"}
                />
              </View>
            </View>

            {/* ── DIVISION + TERMINAL ── */}
            <View style={styles.divTermRow}>
              <View style={styles.divTermGroup}>
                <Text style={styles.sectionLabel}>DIVISION</Text>
                <View
                  style={[
                    styles.divTermBox,
                    focusedField === "division" && styles.BoxFocused,
                  ]}
                >
                  <TextInput
                    style={styles.divTermInput}
                    value={state.division}
                    onChangeText={action.setDivision}
                    keyboardType="number-pad"
                    maxLength={4}
                    editable={!state.isLoading}
                    onFocus={() => setFocusedField("division")}
                    onBlur={() => setFocusedField(null)}
                    placeholderTextColor={theme.colors.textSecondary + "80"}
                  />
                </View>
              </View>

              <View style={styles.divTermGroup}>
                <Text style={styles.sectionLabel}>TERMINAL</Text>
                <View
                  style={[
                    styles.divTermBox,
                    focusedField === "terminal" && styles.BoxFocused,
                  ]}
                >
                  <TextInput
                    style={styles.divTermInput}
                    value={state.terminal}
                    onChangeText={action.setTerminal}
                    keyboardType="number-pad"
                    maxLength={4}
                    editable={!state.isLoading}
                    onFocus={() => setFocusedField("terminal")}
                    onBlur={() => setFocusedField(null)}
                    placeholderTextColor={theme.colors.textSecondary + "80"}
                  />
                </View>
              </View>
            </View>

            {/* ── Divider ── */}
            <View style={styles.divider} />

            {/* ── Checkboxes ── */}
            <View style={styles.checkboxesGroup}>
              {checkboxItems.map((item) => (
                <Pressable
                  key={item.label}
                  style={styles.checkboxRow}
                  onPress={item.onToggle}
                  disabled={state.isLoading}
                  hitSlop={4}
                >
                  <View
                    style={[
                      styles.checkbox,
                      item.value
                        ? styles.checkboxChecked
                        : styles.checkboxUnchecked,
                    ]}
                  >
                    {item.value && <Text style={styles.checkmark}>✓</Text>}
                  </View>
                  <Text style={styles.checkboxLabel}>{item.label}</Text>
                </Pressable>
              ))}
            </View>

            {/* ── Save & Reconnect ── */}
            <Pressable
              style={[
                styles.saveButton,
                state.isLoading && styles.saveButtonDisabled,
              ]}
              onPress={action.onSaveReconnect}
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <ActivityIndicator
                  color={theme.colors.onPrimary}
                  size="small"
                />
              ) : (
                <Text style={styles.saveButtonText}>SAVE & RECONNECT</Text>
              )}
            </Pressable>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
