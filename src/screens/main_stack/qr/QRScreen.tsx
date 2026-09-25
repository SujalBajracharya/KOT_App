import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { QRContent } from "./QRContent";
import { useQR } from "./useQR";

type QRRouteParams = {
  QR: {
    amount: string;
    reference: string;
    tableLabel: string;
  };
};

type QRRoute = RouteProp<QRRouteParams, "QR">;

export function QRScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<QRRoute>();

  const { amount, reference, tableLabel } = route.params;

  const { state, action } = useQR({
    amount,
    reference,
    tableLabel,
    onBack: () => navigation.goBack(),
  });

  return <QRContent state={state} action={action} />;
}
