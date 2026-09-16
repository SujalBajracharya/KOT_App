import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../../screens/auth_stack/SignInScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" component={SignInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
