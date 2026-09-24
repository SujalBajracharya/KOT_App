import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SyncContent } from "./SyncContent";
import { useSync } from "./useSync";

export function SyncScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const { state, action } = useSync({
    onSyncSuccess: () => {
      console.log("[SyncScreen] onSyncSuccess — navigate or show toast here.");
    },
  });

  return <SyncContent state={state} action={action} />;
}
