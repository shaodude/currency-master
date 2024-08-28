import { StatusBar } from "react-native";
import { Provider } from "react-redux";
import { useEffect } from "react";
import store from "./redux/store";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./AppNavigator";
import * as ScreenOrientation from "expo-screen-orientation";
import { TamaguiProvider, createTamagui } from "tamagui";
import defaultConfig from "@tamagui/config/v3";
import { PortalProvider } from "@tamagui/portal";

// Force Potrait mode
ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

export default function App() {
  const [loaded, error] = useFonts({
    FinlandicBoldItalic: require("./assets/fonts/Finlandica-BoldItalic.ttf"),
    FinlandicBold: require("./assets/fonts/Finlandica-Bold.ttf"),
    FinlandicSemiBoldItalic: require("./assets/fonts/Finlandica-SemiBoldItalic.ttf"),
    FinlandicSemiBold: require("./assets/fonts/Finlandica-SemiBold.ttf"),
    FinlandicMedium: require("./assets/fonts/Finlandica-Medium.ttf"),
    Inter: require("./assets/fonts/Inter_18pt-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter_18pt-Bold.ttf")
  });


  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }
  const config = createTamagui(defaultConfig);

  return (
    <Provider store={store}>
      <TamaguiProvider config={config}>
        <PortalProvider shouldAddRootHost>
          <StatusBar barStyle={"default"} />
          <NavigationContainer>
            <AppNavigator />
            <Toast />
          </NavigationContainer>
        </PortalProvider>
      </TamaguiProvider>
    </Provider>
  );
}

