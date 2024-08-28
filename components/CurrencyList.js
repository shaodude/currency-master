import { Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { colors } from "../styles";
import { XStack, YStack, Button } from "tamagui";
import CurrencyItem from "./CurrencyItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import CurrencyConverter from "./CurrencyConverter";

const CurrencyList = () => {
  const ratesList = useSelector((state) => state.rates.ratesList);
  const favouriteCodes = useSelector((state) => state.rates.favouriteCodes);
  const [displayCurrencies, setDisplayCurrencies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const baseCurrency = useSelector((state) => state.rates.baseCurrency);
  const [selectedCurrency, setSelectedCurrency] = useState({});

  const openConverter = (pair) => {
    toggleConverter();
    setSelectedCurrency(pair);
  };

  const toggleConverter = () => {
    setModalVisible(!modalVisible);
  };

  const ConverterModal = () => {
    return (
      <Modal
        animationInTiming={400}
        animationOutTiming={400}
        isVisible={modalVisible}
        style={{ marginBottom: "20%" }}
      >
        <YStack gap={15} style={styles.modal}>
          <CurrencyConverter pair={selectedCurrency} base={baseCurrency} />

          <XStack gap={80} marginTop={15}>
            <Button onPress={() => toggleConverter()} style={{fontFamily:"FinlandicBold",    fontSize: windowsWidth * 0.14,
 }}>Close</Button>
          </XStack>
        </YStack>
      </Modal>
    );
  };

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
          <CurrencyItem
            key={index}
            pair={currencyPair}
            onPress={() => openConverter(currencyPair)}
          />
        ))
      ) : (
        <Text>No Currencies in watchlist!</Text>
      )}
      <ConverterModal />
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
  modal: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.darkBackground,
    paddingVertical: 50,
  },
});

export default CurrencyList;
