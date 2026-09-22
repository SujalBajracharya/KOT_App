/**
 * KOT App — API Type Definitions
 *
 * Types are derived from the existing SOAP API documentation,
 * translated into clean JSON/domain shapes.
 *
 * These types describe what the future REST API will return.
 * The mock layer uses the same shapes — so switching to REST
 * only requires replacing the service implementation, not screen code.
 */

// ── Generic response wrapper ──────────────────────────────────────────────────

/**
 * All REST responses are wrapped in this envelope.
 *
 * @example
 * ApiResponse<MenuItem[]>
 * ApiResponse<UserVerificationResult>
 */
export interface ApiResponse<T> {
  status: "ok" | "error";
  result: T;
  message: string;
  success: boolean;
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface UserVerificationResult {
  userId: string;
  username: string;
  displayName: string;
  token: string;
  expiresAt: string;
}

export interface UserAccessResult {
  userId: string;
  permissions: string[];
  outlets: OutletSummary[];
}

export interface OutletSummary {
  outletId: string;
  outletName: string;
}

// ── Menu ──────────────────────────────────────────────────────────────────────

export type MenuCategory =
  | "STARTER"
  | "MAIN COURSE"
  | "DESSERT"
  | "BEVERAGE"
  | "SPECIAL";

export interface MenuItem {
  TYPE: MenuCategory;
  currency: string;
  isAvailable: boolean;
  taxPercent?: number;
  MCODE: string;
  MENUCODE: string;
  DESCA: string;
  PARENT: string;
  PTYPE: number;
  BASEUNIT: string;
  RATE_A: number;
  IsBarItem: number;
  MGROUP: string;
  IsUnknown: number;
  MCAT1: string;
}

export interface ChoiceItem {
  choiceId: string;
  choiceName: string;
  additionalPrice: number;
}

// ── Orders / KOT ─────────────────────────────────────────────────────────────

export interface OrderItem {
  orderItemId: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  choiceId?: string;
  choiceName?: string;
  notes?: string;
}

export interface Order {
  orderId: string;
  tableId: string;

  createdAt: string;

  updatedAt: string;
  items: OrderItem[];
  kotCount: number;
  status: OrderStatus;
}

export type OrderStatus = "OPEN" | "KOT_SENT" | "BILLED" | "CANCELLED";

export interface KOT {
  kotId: string;
  kotNumber: number;
  orderId: string;
  tableId: string;
  items: OrderItem[];

  sentAt: string;
  status: KOTStatus;
}

export type KOTStatus = "PENDING" | "PREPARING" | "READY" | "SERVED";

// ── Tables ────────────────────────────────────────────────────────────────────

export type TableStatus = "FREE" | "OCCUPIED" | "BILL" | "HELD";

export interface Table {
  tableId: string;
  TABLENO: string;
  LayoutName: string;
  capacity: number;
  TRNDATE: string;
  PREBILL_STATUS: number;
  status: TableStatus;
  KOTR: number;
  /** If OCCUPIED / BILL / HELD — occupancy head count */
  Occupied?: number;
  /** If OCCUPIED / BILL / HELD — active order id */
  orderId?: string;
  /** If OCCUPIED — number of KOTs sent */
  kotCount?: number;
  /** If OCCUPIED — elapsed time in minutes since first order */
  KOTTIME?: null | number;
  /** If BILL / HELD — amount due */
  QUANTITY?: number;
  disabled: boolean;
}

export interface TableLayout {
  layoutId: string;
  layoutName: string;
  tables: Table[];
}

// ── Billing & Payment ─────────────────────────────────────────────────────────

export interface Bill {
  billId: string;
  orderId: string;
  tableId: string;
  subtotal: number;
  taxAmount: number;
  serviceCharge: number;
  discount: number;
  totalAmount: number;
  currency: string;

  generatedAt: string;
  items: BillLineItem[];
}

export interface BillLineItem {
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PaymentOption {
  paymentOptionId: string;
  name: string;
  type: "CASH" | "CARD" | "QR" | "CREDIT";
}

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";

export interface Payment {
  paymentId: string;
  billId: string;
  orderId: string;
  paymentOptionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;

  paidAt?: string;
  referenceCode?: string;
}
