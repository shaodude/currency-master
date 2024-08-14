import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createStackNavigator();

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
