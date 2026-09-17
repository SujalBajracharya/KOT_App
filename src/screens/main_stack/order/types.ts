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
}

export interface OrderAction {
  onBack: () => void;
  onNewKOT: () => void;
  setSearchQuery: (q: string) => void;
  setSearchMode: (mode: "name" | "code") => void;
  onCategorySelect: (id: string) => void;
  onItemPress: (id: string) => void;
  onReviewKOT: () => void;
}

export interface UseOrderReturn {
  state: OrderState;
  action: OrderAction;
}

export interface OrderContentProps {
  state: OrderState;
  action: OrderAction;
}
