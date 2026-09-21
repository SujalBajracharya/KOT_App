import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "./styles";
import { Minus, Plus, X, Check } from "lucide-react-native";
import { useEffect, useRef } from "react";

export const PRESET_REMARKS = [
  "NO CHILLI",
  "EXTRA SPICY",
  "NO ONION",
  "SERVE LAST",
];

export interface QuantitySheetState {
  visible: boolean;
  itemName: string;
  itemMeta: string; // e.g. "MAIN COURSE · CODE 1042 · GM"
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
  const { width, height } = useWindowDimensions();
  const isPortrait = height > width;
  const styles = createStyles(theme, isPortrait);

  const offscreenDistance = isPortrait
    ? height
    : Math.min(width * 0.85, 480);

  const slideAnim = useRef(new Animated.Value(offscreenDistance)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state.visible) {
      slideAnim.setValue(offscreenDistance);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [state.visible, offscreenDistance]);

  const handleCloseWithAnim = (onFinish: () => void) => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: offscreenDistance,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onFinish();
    });
  };

  if (!state.visible) return null;

  const transformStyle = isPortrait
    ? { translateY: slideAnim }
    : { translateX: slideAnim };

  const contentDimensionStyle = isPortrait ? {} : { width: offscreenDistance };

  return (
    <Modal
      visible={state.visible}
      transparent
      animationType="none"
      onRequestClose={() => handleCloseWithAnim(action.onClose)}
    >
      <View style={styles.modalOverlayContainer}>
        {/* ── Dark backdrop overlay ── */}
        <Animated.View style={[styles.backdropOverlay, { opacity: fadeAnim }]}>
          <Pressable
            style={styles.backdropPressable}
            onPress={() => handleCloseWithAnim(action.onClose)}
          />
        </Animated.View>

        {/* ── Sliding modal (Bottom Sheet on Portrait, Side Drawer on Landscape) ── */}
        <Animated.View
          style={[
            styles.modalContent,
            contentDimensionStyle,
            {
              transform: [transformStyle],
            },
          ]}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.sheet}
          >
            <View style={styles.sheetInner}>
              {isPortrait && (
                <View style={styles.dragHandleContainer}>
                  <View style={styles.dragHandle} />
                </View>
              )}
              <ScrollView
                showsVerticalScrollIndicator={true}
                bounces={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.scrollBody}>
                  {/* ── Item header ── */}
                  <View style={styles.sheetHeader}>
                    <View style={styles.itemInfo}>
                      <Text style={styles.itemName}>{state.itemName}</Text>
                      <Text style={styles.itemMeta}>{state.itemMeta}</Text>
                    </View>
                    <Pressable
                      style={styles.closeButton}
                      onPress={() => handleCloseWithAnim(action.onClose)}
                      hitSlop={8}
                    >
                      <X size={18} color={theme.colors.text} />
                    </Pressable>
                  </View>

                  {/* ── Quantity stepper ── */}
                  <View style={styles.stepperRow}>
                    <Pressable
                      style={styles.stepperBtn}
                      onPress={action.onDecrement}
                    >
                      <Minus size={24} color={theme.colors.text} />
                    </Pressable>
                    <View style={styles.stepperValue}>
                      <Text style={styles.stepperValueText}>
                        {state.quantity}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.stepperBtnPlus}
                      onPress={action.onIncrement}
                    >
                      <Plus size={24} color={theme.colors.onPrimary} />
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
                          style={[
                            styles.remarkChip,
                            active && styles.remarkChipActive,
                          ]}
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
                </View>

                {/* ── Actions ── */}
                <View style={styles.actionRow}>
                  <Pressable
                    style={styles.cancelButton}
                    onPress={() => handleCloseWithAnim(action.onCancel)}
                  >
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                  </Pressable>
                  <Pressable
                    style={styles.primaryButton}
                    onPress={action.onAddToKOT}
                  >
                    <Text style={styles.primaryButtonText}>ADD TO KOT</Text>
                    <Check size={20} color={theme.colors.onPrimary} />
                  </Pressable>
                </View>
              </ScrollView>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
}
