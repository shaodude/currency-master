import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Homepage";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Platform } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home-outline";
          }
          return <Ionicons name={iconName} size={35} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'blue',
        tabBarStyle: {
          backgroundColor: 'white',
          padding: Platform.OS === "ios" ? 5 : 0,
          paddingBottom: Platform.OS === "android" ? 5 : 20,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
