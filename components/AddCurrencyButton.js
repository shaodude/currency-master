import { StyleSheet, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { colors } from "../styles";
import { XStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavouriteCode } from "../redux/ratesSlice";
import Toast from "react-native-toast-message";

const AddCurrencyButton = () => {
  const dispatch = useDispatch();
  const ratesList = useSelector((state) => state.rates.ratesList);
  const favouriteCodes = useSelector((state) => state.rates.favouriteCodes);
  const [selected, setSelected] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const data = ratesList.map((currency, index) => ({
    key: String(index + 1),
    value: currency.code,
    disabled: favouriteCodes.includes(currency.code),
  }));
  const handlePress = () => {
    if (selected.trim().length == 0) {
      console.log("No Currency Selected");
      Toast.show({
        type: "info",
        text1: "No Currency Selected!",
        text2: "Click to dismiss",
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        onPress: () => Toast.hide(),
      });
      return;
    }
    dispatch(addFavouriteCode(selected));
    setSelected("");
    setResetKey(resetKey + 1);
    Toast.show({
      type: "success",
      text1: "Added Currency to Watchlist!",
      text2: "Click to dismiss",
      visibilityTime: 3000,
      autoHide: true,
      position: "bottom",
      onPress: () => Toast.hide(),
    });
  };
  return (
    <XStack
      style={{ width: "95%" }}
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={15}
    >
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={data}
        save="value"
        defaultOption={{key: '', value: ''}}
        key={resetKey} 
        maxHeight={180}
        placeholder={"Add a Currency"}
        fontFamily={"FinlandicBold"}
        boxStyles={{
          backgroundColor: colors.lightText,
          width: 280,
          borderColor: colors.darkBackground,
          borderWidth: 2,
          alignItems: "center",
        }}
        inputStyles={{
          color: colors.darkBackground,
          fontSize: windowsWidth * 0.14,
        }}
        dropdownStyles={{
          width: 280,
          position: "absolute",
          top: 50,
          backgroundColor: colors.darkBackground,
        }}
        dropdownTextStyles={{ color: colors.lightText }}
        arrowicon={
          <Ionicons
            name="chevron-down-circle-outline"
            size={23}
            color={colors.darkBackground}
          />
        }
        searchicon={
          <Ionicons
            name="search-outline"
            size={23}
            color={colors.darkBackground}
          />
        }
        closeicon={
          <Ionicons
            name="close-outline"
            size={23}
            color={colors.darkBackground}
          />
        }
      />
      <TouchableOpacity
        onPress={handlePress}
        style={{ padding: 5, alignItems: "center" }}
      >
        <Ionicons name="add-outline" size={40} color={colors.lightText} />
      </TouchableOpacity>
      
    </XStack>
  );
};
const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  buttonBox: {
    padding: 10,
    borderColor: colors.lightText,
    borderWidth: 2,
    borderRadius: 5,
    width: "100%",
  },
  smallHeaderText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.14,
    color: colors.lightText,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default AddCurrencyButton;
