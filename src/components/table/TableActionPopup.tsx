import { Modal, Pressable, Text, View } from "react-native";
import { useTheme } from "@/theme/ThemeContext";
import { createStyles } from "./styles";
import { TableStatus } from "@/screens/main_stack/tables/types";

// ─────────────────────────────────────────────
//  Types
// ─────────────────────────────────────────────
export interface PopupTable {
  id: string;
  name: string;
  status: TableStatus;
  statusLabel: string;
  meta: string;
  amount: string;
  reservedTime?: string;
}

export interface TableActionPopupProps {
  visible: boolean;
  table: PopupTable | null;
  onClose: () => void;
  // reserved (reserved)
  onSetSeated?: (id: string) => void;
  onTransferSeat?: (id: string) => void;
  onCancelReservation?: (id: string) => void;
  // vacated (free)
  onCleanTable?: (id: string) => void;
}

// ─────────────────────────────────────────────
//  Internal helpers
// ─────────────────────────────────────────────
type Variant = "primary" | "secondary" | "danger";

interface ActionItem {
  label: string;
  variant: Variant;
  onPress: () => void;
  dividerAbove?: boolean;
  keepOpen?: boolean;
}

function getActions(
  table: PopupTable,
  props: TableActionPopupProps,
): ActionItem[] {
  const id = table.id;

  switch (table.status) {
    case "reserved":
      return [
        {
          label: "Seat Customer",
          variant: "primary",
          onPress: () => props.onSetSeated?.(id),
        },
        {
          label: "Transfer Seat",
          variant: "secondary",
          keepOpen: true,
          onPress: () => props.onTransferSeat?.(id),
        },
        {
          label: "Cancel Reservation",
          variant: "danger",
          dividerAbove: true,
          onPress: () => props.onCancelReservation?.(id),
        },
      ];

    case "vacated":
      return [
        {
          label: "Clean Table",
          variant: "primary",
          onPress: () => props.onCleanTable?.(id),
        },
      ];
    default:
      return [];
  }
}

function getContextLabel(status: TableStatus): string {
  switch (status) {
    case "reserved":
      return "RESERVED — CHOOSE AN ACTION";
    case "vacated":
      return "vacated REQUESTED — CHOOSE AN ACTION";
    default:
      return "CHOOSE AN ACTION";
  }
}

// ─────────────────────────────────────────────
//  Component
// ─────────────────────────────────────────────
export function TableActionPopup(props: TableActionPopupProps) {
  const { visible, table, onClose } = props;
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (!table && !visible) return null;

  const actions = table ? getActions(table, props) : [];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable onPress={() => {}} style={styles.sheet}>
          {/* ── Header ── */}
          <View style={styles.sheetHeader}>
            <View style={styles.tableInfo}>
              {/* Table name + status pill */}
              <View style={styles.tableNameRow}>
                <Text style={styles.tableName}>{table?.name ?? ""}</Text>

                {table && (
                  <View
                    style={[
                      styles.statusPill,
                      table.status === "free" && styles.statusPillFree,
                      table.status === "occupied" && styles.statusPillOccupied,
                      table.status === "vacated" && styles.statusPillBill,
                      table.status === "reserved" && styles.statusPillHeld,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        table.status === "occupied"
                          ? styles.statusPillTextOccupied
                          : table.status === "vacated"
                            ? styles.statusPillTextBill
                            : styles.statusPillTextDefault,
                      ]}
                    >
                      {table.statusLabel}
                    </Text>
                  </View>
                )}
              </View>

              {!!table?.meta && (
                <Text style={styles.tableMeta}>{table.meta}</Text>
              )}
              {!!table?.amount && (
                <Text style={styles.tableAmount}>{table.amount}</Text>
              )}
            </View>

            <Pressable style={styles.closeButton} onPress={onClose} hitSlop={8}>
              <Text style={styles.closeButtonText}>✕</Text>
            </Pressable>
          </View>

          {/* ── Context label ── */}
          {table && (
            <Text style={styles.contextLabel}>
              {getContextLabel(table.status)}
            </Text>
          )}

          {/* ── Reserved Time label ── */}
          {!!table?.reservedTime && (
            <Text style={styles.contextLabel}>
              Reserved Time: {table.reservedTime}
            </Text>
          )}

          {/* ── Action buttons ── */}
          <View style={styles.actionsBlock}>
            {actions.map((btn) => (
              <View key={btn.label}>
                {btn.dividerAbove && <View style={styles.divider} />}
                <Pressable
                  style={[
                    styles.actionBtn,
                    btn.variant === "primary" && styles.actionBtnPrimary,
                    btn.variant === "secondary" && styles.actionBtnSecondary,
                    btn.variant === "danger" && styles.actionBtnDanger,
                  ]}
                  onPress={() => {
                    btn.onPress();
                    if (!btn.keepOpen) onClose();
                  }}
                  hitSlop={4}
                >
                  <Text
                    style={[
                      styles.actionBtnText,
                      btn.variant === "primary" && styles.actionBtnTextPrimary,
                      btn.variant === "secondary" &&
                        styles.actionBtnTextSecondary,
                      btn.variant === "danger" && styles.actionBtnTextDanger,
                    ]}
                  >
                    {btn.label}
                  </Text>
                  <Text
                    style={[
                      styles.actionBtnArrow,
                      btn.variant === "primary" && styles.actionBtnArrowPrimary,
                      btn.variant === "secondary" &&
                        styles.actionBtnArrowSecondary,
                      btn.variant === "danger" && styles.actionBtnArrowDanger,
                    ]}
                  >
                    →
                  </Text>
                </Pressable>
              </View>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
