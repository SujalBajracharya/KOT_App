import { useCallback, useMemo, useState } from "react";
import navigation from "@/utils/app_navigation";
import { mockMenuResponse } from "@/data/mock/menu";
import { MenuItem, UseOrderReturn } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { clearTableOrder, saveOrder } from "@/store/slices/order.slice";
import { Alert } from "react-native";
import { RootState } from "@/store";
import { resetTable, updateTableAfterKOT } from "@/store/slices/table.slice";

export interface CartItem {
  id: string;
  name: string;
  category: string;
  code: string;
  unit: string;
  RATE_A: number;
  quantity: number;
  activeRemarks: string[];
  customNote: string;
}

export function useOrder(TABLENO: string): UseOrderReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMode, setSearchMode] = useState<"name" | "code">("name");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isCartExpanded, setIsCartExpanded] = useState(false);

  // Cart state
  const [cartItemsByTable, setCartItemsByTable] = useState<
    Record<string, CartItem[]>
  >({});
  const dispatch = useDispatch();

  // Quantity sheet state
  const [selectedItem, setSelectedItem] = useState<{
    id: string;
    name: string;
    category: string;
    code: string;
    unit: string;
    RATE_A: number;
  } | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeRemarks, setActiveRemarks] = useState<string[]>([]);
  const [customNote, setCustomNote] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const savedOrder = useSelector((state: RootState) => state.order);

  const savedOrderItems = useMemo(
    () => savedOrder.orders[TABLENO] ?? [],
    [savedOrder.orders, TABLENO],
  );
  const cartItems = useMemo(() => {
    const localCartItems = cartItemsByTable[TABLENO] ?? [];
    const itemsById = new Map(savedOrderItems.map((item) => [item.id, item]));

    localCartItems.forEach((item) => {
      itemsById.set(item.id, item);
    });

    return Array.from(itemsById.values());
  }, [cartItemsByTable, savedOrderItems, TABLENO]);

  const hasExistingOrder = savedOrderItems.length > 0;

  const categories = useMemo(() => {
    return [
      { id: "ALL", name: "All", active: activeCategory === "ALL" },
      ...Array.from(
        new Set(mockMenuResponse.result.map((item) => item.TYPE)),
      ).map((category) => ({
        id: category,
        name: category,
        active: activeCategory === category,
      })),
    ];
  }, [activeCategory]);

  const items = useMemo<MenuItem[]>(() => {
    const query = searchQuery.trim().toLowerCase();

    return mockMenuResponse.result
      .filter(
        (item) => activeCategory === "ALL" || item.TYPE === activeCategory,
      )
      .filter((item) => {
        if (!query) return true;
        const searchableValue = searchMode === "name" ? item.DESCA : item.MCODE;
        return searchableValue.toLowerCase().includes(query);
      })
      .map((item) => {
        const cartItem = cartItems.find((ci) => ci.id === item.MCODE);
        return {
          id: item.MCODE,
          name: item.DESCA,
          unit: item.BASEUNIT,
          price: `NPR ${item.RATE_A.toLocaleString()}`,
          thumbCode: item.MCODE,
          badge: item.isAvailable ? undefined : "UNAVAILABLE",
          inCart: Boolean(cartItem && cartItem.quantity > 0),
          image: item.image,
        };
      });
  }, [activeCategory, cartItems, searchMode, searchQuery]);

  const cartItemCount = useMemo(() => {
    return cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    const total = cartItems.reduce(
      (sum, ci) => sum + ci.RATE_A * ci.quantity,
      0,
    );
    return `NPR ${total.toLocaleString()}`;
  }, [cartItems]);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onNewKOT = useCallback(() => {
    Alert.alert(
      "Start New KOT?",
      "This will remove the current active orders for this table.",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            dispatch(clearTableOrder(TABLENO));
            dispatch(resetTable({ tableNo: TABLENO }));
            setCartItemsByTable((prevByTable) => {
              const next = { ...prevByTable };
              delete next[TABLENO];
              return next;
            });
            setIsCartExpanded(false);
            setIsModalVisible(false);
          },
        },
      ],
    );
  }, [dispatch, TABLENO]);

  const onItemPress = useCallback(
    (id: string) => {
      const menuItem = mockMenuResponse.result.find((m) => m.MCODE === id);
      if (!menuItem) return;

      const existingCartItem = cartItems.find((ci) => ci.id === id);

      setSelectedItem({
        id: menuItem.MCODE,
        name: menuItem.DESCA,
        category: menuItem.TYPE,
        code: menuItem.MCODE,
        unit: "plate",
        RATE_A: menuItem.RATE_A,
      });

      if (existingCartItem) {
        setQuantity(existingCartItem.quantity);
        setActiveRemarks(existingCartItem.activeRemarks);
        setCustomNote(existingCartItem.customNote);
      } else {
        setQuantity(1);
        setActiveRemarks([]);
        setCustomNote("");
      }

      setIsModalVisible(true);
    },
    [cartItems],
  );

  // const onReviewKOT = useCallback(() => {
  //   navigation.navigate("review");
  // }, []);

  const onSendToKitchen = useCallback(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.RATE_A * item.quantity,
      0,
    );

    const kotTime = new Date().toISOString();

    const orderData = {
      tableNo: TABLENO,
      items: cartItems,
    };

    console.log("Saving order to Redux:", JSON.stringify(orderData, null, 2));

    // Save food items to order slice
    dispatch(saveOrder(orderData));

    // Update table state
    dispatch(
      updateTableAfterKOT({
        tableNo: TABLENO,
        quantity: total,
        kotTime,
      }),
    );

    console.log("Order dispatched successfully:", {
      orderData,
      tableUpdate: {
        tableNo: TABLENO,
        quantity: total,
        kotTime,
        status: "OCCUPIED",
      },
    });

    Alert.alert(
      "Order Sent",
      "Your order has been sent to the kitchen successfully.",
    );
  }, [dispatch, TABLENO, cartItems]);

  // Quantity modal actions
  const onCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onDecrementQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1));
  }, []);

  const onIncrementQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  const onQuickAddQuantity = useCallback((n: number) => {
    setQuantity((prev) => prev + n);
  }, []);

  const onToggleRemark = useCallback((remark: string) => {
    setActiveRemarks((prev) =>
      prev.includes(remark)
        ? prev.filter((r) => r !== remark)
        : [...prev, remark],
    );
  }, []);

  const onAddToKOT = useCallback(() => {
    if (!selectedItem) return;

    setCartItemsByTable((prevByTable) => {
      const prev = prevByTable[TABLENO] ?? savedOrderItems;
      let next: CartItem[];

      if (quantity <= 0) {
        next = prev.filter((ci) => ci.id !== selectedItem.id);
      } else if (prev.some((ci) => ci.id === selectedItem.id)) {
        next = prev.map((ci) =>
          ci.id === selectedItem.id
            ? {
                ...ci,
                quantity,
                activeRemarks,
                customNote,
              }
            : ci,
        );
      } else {
        next = [
          ...prev,
          {
            id: selectedItem.id,
            name: selectedItem.name,
            category: selectedItem.category,
            code: selectedItem.code,
            unit: selectedItem.unit,
            RATE_A: selectedItem.RATE_A,
            quantity,
            activeRemarks,
            customNote,
          },
        ];
      }

      return { ...prevByTable, [TABLENO]: next };
    });

    setIsModalVisible(false);
  }, [
    TABLENO,
    activeRemarks,
    customNote,
    quantity,
    savedOrderItems,
    selectedItem,
  ]);

  const lineTotalNumber = (selectedItem?.RATE_A || 0) * quantity;
  const lineTotal = `NPR ${lineTotalNumber.toLocaleString()}`;

  const itemMeta = selectedItem
    ? `${selectedItem.category} · CODE ${selectedItem.code} · ${selectedItem.unit}`
    : "";

  const existingOrderItems = cartItems;

  return {
    state: {
      tableLabel: "New order",
      tableMeta: "Select a table to begin",
      searchQuery,
      searchMode,
      categories,
      items,
      cartItemCount,
      cartTotal,
      isCartExpanded,
      cartItems,
      hasExistingOrder,
      existingOrderItems,
      savedOrderItems,
      quantitySheet: {
        visible: isModalVisible,
        itemName: selectedItem?.name || "",
        itemMeta,
        quantity,
        activeRemarks,
        customNote,
        lineTotal,
      },
    },
    action: {
      onBack,
      onNewKOT,
      setSearchQuery,
      setSearchMode,
      onCategorySelect: setActiveCategory,
      onItemPress,
      onSendToKitchen,
      setIsCartExpanded,
      quantitySheet: {
        onClose: onCloseModal,
        onDecrement: onDecrementQuantity,
        onIncrement: onIncrementQuantity,
        onQuickAdd: onQuickAddQuantity,
        onToggleRemark,
        setCustomNote,
        onCancel: onCloseModal,
        onAddToKOT,
      },
    },
  };
}
