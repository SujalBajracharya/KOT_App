import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '@/navigation/root_stack';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigation = {
  navigate: (screen: keyof RootStackParamList) => navigationRef.navigate(screen),
  goBack: () => navigationRef.goBack(),
};

export default navigation;
