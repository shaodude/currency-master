import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles";
import { XStack, YStack, Button } from "tamagui";
import CurrencyItem from "./CurrencyItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import CurrencyConverter from "./CurrencyConverter";
import { Ionicons } from "@expo/vector-icons";
import { removeFromFavouriteCode, updateUserData } from "../redux/ratesSlice";
import Toast from "react-native-toast-message";

const CurrencyList = () => {
  const ratesList = useSelector((state) => state.rates.ratesList);
  const favouriteCodes = useSelector((state) => state.rates.favouriteCodes);
  const [displayCurrencies, setDisplayCurrencies] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const baseCurrency = useSelector((state) => state.rates.baseCurrency);
  const [selectedCurrency, setSelectedCurrency] = useState({});

  const dispatch = useDispatch();
  const openConverter = (pair) => {
    toggleConverter();
    setSelectedCurrency(pair);
  };

  const toggleConverter = () => {
    setModalVisible(!modalVisible);
  };

  const handleRemove = () => {
    dispatch(removeFromFavouriteCode(selectedCurrency.code));
    dispatch(updateUserData());
    toggleConverter();
    Toast.show({
      type: "success",
      text1: "Removed from Watchlist!",
      text2: "Click to dismiss",
      visibilityTime: 3000,
      autoHide: true,
      position: "bottom",
      onPress: () => Toast.hide(),
    });
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
          <View style={{ position: "absolute", left: 20, top: 20 }}>
            <TouchableOpacity onPress={() => toggleConverter()}>
              <Ionicons
                name="close-circle-outline"
                size={35}
                color={colors.lightText}
              />
            </TouchableOpacity>
          </View>
          <CurrencyConverter pair={selectedCurrency} base={baseCurrency} />

          <YStack gap={80} marginTop={20}>
            <Button
              onPress={() => handleRemove()}
              style={{
                fontFamily: "FinlandicBold",
                fontSize: windowsWidth * 0.14,
                color: "crimson",
                backgroundColor: colors.darkBackground,
                borderColor: "crimson",
                borderWidth: 2,
              }}
            >
              <Text style={{color: "crimson"}}>Remove from Watchlist</Text>
            </Button>
          </YStack>
        </YStack>
      </Modal>
    );
  };

  // render rates list with data, everytime favouriteCodes changes
  useEffect(() => {
    if (favouriteCodes && ratesList) {
      const filteredCurrencies = ratesList.filter((rate) =>
        favouriteCodes.includes(rate.code)
      );
      setDisplayCurrencies(filteredCurrencies);
    }
  }, [favouriteCodes, ratesList]);
  return (
    <View style={{ padding: 8, width: "100%" }}>
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
    </View>
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
