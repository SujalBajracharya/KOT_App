import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KOTMemoContent } from "./KotMemoContent";
import { useKOTMemo } from "./useKotMemo";
import { MemoItem } from "./types";

type KOTMemoRouteParams = {
  KOTMemo: { memos?: MemoItem[] };
};

type KOTMemoRoute = RouteProp<KOTMemoRouteParams, "KOTMemo">;

async function reprintKOT(memoId: string): Promise<void> {
  // e.g. await api.post(`/kot/${memoId}/reprint`);
  console.log("[KOTMemo] reprint requested for", memoId);
}

export function KOTMemoScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const route = useRoute<KOTMemoRoute>();

  const initialMemos = route.params?.memos ?? [];

  const { state, action } = useKOTMemo({
    initialMemos,
    reprintKOT,
    onBack: () => navigation.goBack(),
    onOpenTable: (_memoId, tableLabel) => {
      // Navigate to the order screen for this table
      navigation.navigate("order", { tableLabel });
    },
  });

  return <KOTMemoContent state={state} action={action} />;
}