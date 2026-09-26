import { createNavigationContainerRef } from "@react-navigation/native";
import type { RootStackParamList } from "@/navigation/root_stack";

export const navigationRef =
  createNavigationContainerRef<RootStackParamList>();

const navigation = {
  navigate: navigationRef.navigate,
  goBack: navigationRef.goBack,
  resetToSignIn: () =>
    navigationRef.resetRoot({ index: 0, routes: [{ name: "signin" }] }),
};

export default navigation;