import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, Text } from "react-native";

import AuthStack from "./auth_stack";
const Stack = createNativeStackNavigator();

import RootStack from "./root_stack";

const AppNavigation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");

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
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
        }}
      >
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{ animation: "slide_from_right", headerShown: false }}
    >
      {token ? (
        <Stack.Screen name="root_stack " component={RootStack} />
      ) : (
        <Stack.Screen name="auth_stack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigation;
