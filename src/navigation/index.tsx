import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';

import { useTheme } from '@/theme/ThemeContext';
import AuthStack from './auth_stack';
import RootStack from './root_stack';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.colors.background,
        }}
      >
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ animation: 'slide_from_right', headerShown: false }}
    >
      <Stack.Screen name="auth_stack" component={AuthStack} />
      <Stack.Screen name="root_stack" component={RootStack} />
    </Stack.Navigator>
  );
};

export default AppNavigation;
