import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "@/screens/auth_stack/signin/SignInScreen";
import HomeScreen from "@/screens/main_stack/home/HomeScreen";
import TableScreen from "@/screens/main_stack/tables/TableScreen";
import OrderScreen from "@/screens/main_stack/order/OrderScreen";
import ReviewKOTScreen from "@/screens/main_stack/kot_review/ReviewKOTScreen";
import SplitTransferScreen from "@/screens/main_stack/splittransfer/SplitTransferScreen";
import KOTMemoScreen from "@/screens/main_stack/kot_memo/KotMemoScreen";
import BillPaymentScreen from "@/screens/main_stack/bill&payment/BillPaymentScreen";
import SettlementScreen from "@/screens/main_stack/settlement/SettlementScreen";
import { SyncScreen } from "@/screens/main_stack/sync/SyncScreen";
import { QRScreen } from "@/screens/main_stack/qr/QRScreen";

export type RootStackParamList = {
  signin: undefined;
  home: undefined;
  table: undefined;
  review: undefined;
  splittransfer: undefined;
  memo: undefined;
  sync: undefined;

  order: {
    TABLENO: string;
  };
  qr: {
    amount: string;
    reference: string;
    tableLabel: string;
  };
  bill:
    | {
        TABLENO?: string;
      }
    | undefined;
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
      <Stack.Screen name="splittransfer" component={SplitTransferScreen} />
      <Stack.Screen name="memo" component={KOTMemoScreen} />
      <Stack.Screen name="bill" component={BillPaymentScreen} />
      <Stack.Screen name="settlement" component={SettlementScreen} />
      <Stack.Screen name="sync" component={SyncScreen} />
      <Stack.Screen
        name="qr"
        component={QRScreen}
        options={{ headerShown: false, animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
