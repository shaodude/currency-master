import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Linking } from "react-native";
import getCurrencyData from "./apis/currencyAPI";
import { setBaseCurrency, setRates } from "./redux/ratesSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import store from "./redux/store";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const baseCurrency = useSelector((state) => state.rates.baseCurrency);
  useEffect(() => {
    const getCurrency = async () => {
      const response = await getCurrencyData(selectedBaseCurrency);
      dispatch(setRates(response.rates));
      dispatch(setBaseCurrency(selectedBaseCurrency));
    };
  }, [dispatch]);

  const AttributionLink = () => {
    const handlePress = async () => {
      await Linking.openURL("https://www.exchangerate-api.com");
    };

    return (
      <Text style={styles.link} onPress={handlePress}>
        Rates By Exchange Rate API
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Button onPress={() => getCurrency()} title={"press me!"}></Button>
      <AttributionLink />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
