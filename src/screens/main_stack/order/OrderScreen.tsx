import React from "react";
import { OrderContent } from "./OrderContent";
import { useOrder } from "./useOrder";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/root_stack";

type OrderRouteProp = RouteProp<RootStackParamList, "order">;

export default function OrderScreen() {
  const route = useRoute<OrderRouteProp>();
  const { TABLENO } = route.params;
  const { state, action } = useOrder(TABLENO);

  return <OrderContent TABLENO={TABLENO} state={state} action={action} />;
}
