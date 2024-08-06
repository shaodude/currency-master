import { StyleSheet, Text, View, StatusBar } from "react-native";
import getCurrencyData from "./apis/currencyAPI";
import { setBaseCurrency, setRates } from "./redux/ratesSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import store from "./redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";

export default function App() {
  const [loaded] = useFonts({
    FinlandicItalic: require("./assets/fonts/Finlandica-Italic-VariableFont_wght.ttf"),
    Finlandic: require("./assets/fonts/Finlandica-VariableFont_wght.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container}></View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
