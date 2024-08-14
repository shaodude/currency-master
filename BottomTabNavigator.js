import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/Homepage";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import SettingsScreen from "./screens/Settings";
import WalletScreen from "./screens/Wallet";
import { colors } from "./styles";

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
          if (route.name === "Wallet") {
            iconName = "wallet-outline";
          }
          if (route.name === "Settings") {
            iconName = "settings-outline";
          }
          return <Ionicons name={iconName} size={35} color={color} />;
        },
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#7D7ABC",
        tabBarInactiveTintColor: colors.darkBackground,
        tabBarStyle: {
          backgroundColor: colors.lightText,
          padding: Platform.OS === "ios" ? 5 : 0,
          paddingBottom: Platform.OS === "android" ? 5 : 20,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
