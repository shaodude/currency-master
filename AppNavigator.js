import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Overview"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Overview" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
