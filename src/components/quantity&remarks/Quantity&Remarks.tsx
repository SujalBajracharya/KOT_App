import { Modal, Pressable, Text, TextInput, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "./styles";
import { Minus, Plus, X, Check } from "lucide-react-native";

export const PRESET_REMARKS = ["NO CHILLI", "EXTRA SPICY", "NO ONION", "SERVE LAST"];

export interface QuantitySheetState {
  visible: boolean;
  itemName: string;
  itemMeta: string;   // e.g. "MAIN COURSE · CODE 1042 · GM"
  quantity: number;
  activeRemarks: string[];
  customNote: string;
  lineTotal: string;
}

export interface QuantitySheetAction {
  onClose: () => void;
  onDecrement: () => void;
  onIncrement: () => void;
  onQuickAdd: (n: number) => void;
  onToggleRemark: (remark: string) => void;
  setCustomNote: (text: string) => void;
  onCancel: () => void;
  onAddToKOT: () => void;
}

export interface QuantitySheetProps {
  state: QuantitySheetState;
  action: QuantitySheetAction;
}

export function QuantitySheet({ state, action }: QuantitySheetProps) {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Modal
      visible={state.visible}
      transparent
      animationType="slide"
      onRequestClose={action.onClose}
    >
      <Pressable style={styles.overlay} onPress={action.onClose}>
        <Pressable onPress={() => {}} style={styles.sheet}>

          {/* ── Item header ── */}
          <View style={styles.sheetHeader}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{state.itemName}</Text>
              <Text style={styles.itemMeta}>{state.itemMeta}</Text>
            </View>
            <Pressable style={styles.closeButton} onPress={action.onClose} hitSlop={8}>
              <X size={18} color={theme.colors.text} />
            </Pressable>
          </View>

          {/* ── Quantity stepper ── */}
          <View style={styles.stepperRow}>
            <Pressable style={styles.stepperBtn} onPress={action.onDecrement}>
              <Minus size={26} color={theme.colors.text} />
            </Pressable>
            <View style={styles.stepperValue}>
              <Text style={styles.stepperValueText}>{state.quantity}</Text>
            </View>
            <Pressable style={styles.stepperBtnPlus} onPress={action.onIncrement}>
              <Plus size={26} color={theme.colors.background} />
            </Pressable>
          </View>

          {/* ── Quick-add row ── */}
          <View style={styles.quickAddRow}>
            {[1, 2, 5, 10].map((n) => (
              <Pressable
                key={n}
                style={styles.quickAddBtn}
                onPress={() => action.onQuickAdd(n)}
              >
                <Text style={styles.quickAddText}>+{n}</Text>
              </Pressable>
            ))}
          </View>

          {/* ── Kitchen remarks ── */}
          <Text style={styles.remarksLabel}>KITCHEN REMARKS</Text>
          <View style={styles.remarksChips}>
            {PRESET_REMARKS.map((r) => {
              const active = state.activeRemarks.includes(r);
              return (
                <Pressable
                  key={r}
                  style={[styles.remarkChip, active && styles.remarkChipActive]}
                  onPress={() => action.onToggleRemark(r)}
                >
                  <Text
                    style={[
                      styles.remarkChipText,
                      active && styles.remarkChipTextActive,
                    ]}
                  >
                    {r}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <TextInput
            style={styles.noteInput}
            value={state.customNote}
            onChangeText={action.setCustomNote}
            placeholder="Type a note for the kitchen…"
            placeholderTextColor={theme.colors.textSecondary + "70"}
            multiline={false}
          />

          {/* ── Line total ── */}
          <View style={styles.lineTotalRow}>
            <Text style={styles.lineTotalLabel}>LINE TOTAL</Text>
            <Text style={styles.lineTotalValue}>{state.lineTotal}</Text>
          </View>

          {/* ── Actions ── */}
          <View style={styles.actionRow}>
            <Pressable style={styles.cancelButton} onPress={action.onCancel}>
              <Text style={styles.cancelButtonText}>CANCEL</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={action.onAddToKOT}>
              <Text style={styles.addButtonText}>ADD TO KOT</Text>
              <Check size={20} color={theme.colors.onPrimary} />
            </Pressable>
          </View>

        </Pressable>
      </Pressable>
    </Modal>
  );
}