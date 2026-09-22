import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "@/screens/auth_stack/signin/SignInScreen";
import HomeScreen from "@/screens/main_stack/home/HomeScreen";
import TableScreen from "@/screens/main_stack/tables/TableScreen";
import OrderScreen from "@/screens/main_stack/order/OrderScreen";
import ReviewKOTScreen from "@/screens/main_stack/kot_review/ReviewKOTScreen";
import NotificationsScreen from "@/screens/main_stack/notifications/NotificationsScreen";
import SplitTransferScreen from "@/screens/main_stack/splittransfer/SplitTransferScreen";
import KOTMemoScreen from "@/screens/main_stack/kot_memo/KotMemoScreen";
import BillPaymentScreen from "@/screens/main_stack/bill&payment/BillPaymentScreen";
import SettlementScreen from "@/screens/main_stack/settlement/SettlementScreen";

export type RootStackParamList = {
  signin: undefined;
  home: undefined;
  order: {
    TABLENO: string;
  };
  table: undefined;
  review: undefined;
  notification: undefined;
  splittransfer: undefined;
  memo: undefined;
  bill: undefined;
  settlement: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" component={SignInScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="table" component={TableScreen} />
      <Stack.Screen name="order" component={OrderScreen} />
      <Stack.Screen name="review" component={ReviewKOTScreen} />
      <Stack.Screen name="notification" component={NotificationsScreen} />
      <Stack.Screen name="splittransfer" component={SplitTransferScreen} />
      <Stack.Screen name="memo" component={KOTMemoScreen} />
      <Stack.Screen name="bill" component={BillPaymentScreen} />
      <Stack.Screen name="settlement" component={SettlementScreen} />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
