import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SIgnInScreen from "../../screens/auth_stack/SignInScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signin" component={SIgnInScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
