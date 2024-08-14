import { Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { colors } from "../styles";
import { XStack } from "tamagui";
import CurrencyItem from "./CurrencyItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const CurrencyList = () => {
  const ratesList = useSelector((state) => state.rates.ratesList);
  const favouriteCodes = useSelector((state) => state.rates.favouriteCodes);
  const [displayCurrencies, setDisplayCurrencies] = useState([]);
  useEffect(() => {
    if (favouriteCodes && ratesList) {
      const filteredCurrencies = ratesList.filter((rate) =>
        favouriteCodes.includes(rate.code)
      );
      setDisplayCurrencies(filteredCurrencies);
    }
  }, [favouriteCodes, ratesList]);
  return (
    <ScrollView maxHeight={330} style={{ padding: 8, width: "100%" }}>
      <XStack justifyContent="space-between">
        <Text style={styles.smallHeaderText}>code</Text>
        <Text style={styles.smallHeaderText}>rates</Text>
      </XStack>
      {displayCurrencies.length > 0 ? (
        displayCurrencies.map((currencyPair, index) => (
          <CurrencyItem key={currencyPair.code} pair={currencyPair} />
        ))
      ) : (
        <Text>No Currencies in watchlist!</Text>
      )}
    </ScrollView>
  );
};
const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  smallHeaderText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.16,
    color: colors.lightText,
    textTransform: "uppercase",
    textDecorationLine: "underline",
  },
});

export default CurrencyList;
