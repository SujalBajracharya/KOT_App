import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/root_stack/HomeScreen";

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
