import {
  QuantitySheetAction,
  QuantitySheetState,
} from "@/components/quantity&remarks/Quantity&Remarks";
import { CartItem } from "./useOrder";

export interface Category {
  id: string;
  name: string;
  active: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  unit: string;
  price: string;
  thumbCode: string;
  badge?: string;
  inCart: boolean;
}

export interface OrderState {
  tableLabel: string;   
  tableMeta: string;     
  searchQuery: string;
  searchMode: "name" | "code";
  categories: Category[];
  items: MenuItem[];
  cartItemCount: number;
  cartTotal: string;
  quantitySheet: QuantitySheetState;
  isCartExpanded: boolean;
  cartItems: CartItem[];
}

export interface OrderAction {
  onBack: () => void;
  onNewKOT: () => void;
  setSearchQuery: (q: string) => void;
  setSearchMode: (mode: "name" | "code") => void;
  onCategorySelect: (id: string) => void;
  onItemPress: (id: string) => void;
  onSendToKitchen: () => void;
  setIsCartExpanded: (isCartExpanded: boolean) => void;
  quantitySheet: QuantitySheetAction;
}

export interface UseOrderReturn {
  state: OrderState;
  action: OrderAction;
}

export interface OrderContentProps {
  TABLENO: string;
  state: OrderState;
  action: OrderAction;
}

