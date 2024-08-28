import { StyleSheet, Dimensions, TouchableOpacity, Text } from "react-native";
import { colors } from "../styles";
import { XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBaseCurrency } from "../redux/ratesSlice";
import Toast from "react-native-toast-message";

const BaseCurrency = () => {
  const dispatch = useDispatch();
  const ratesList = useSelector((state) => state.rates.ratesList);
  const baseCurrency = useSelector((state) => state.rates.baseCurrency);
  const ratesStatus = useSelector((state) => state.rates.status);
  const [selected, setSelected] = useState("");
  const data = ratesList.map((currency, index) => ({
    key: String(index + 1),
    value: currency.code,
  }));
  const defaultBaseCurrency = data.find(
    (currency) => currency.value == baseCurrency
  );

  const handleSave = () => {
    if (ratesStatus == "success") {
      dispatch(setBaseCurrency(selected));
      Toast.show({
        type: "success",
        text1: "Saved Changes!",
        text2: "Click to dismiss",
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        onPress: () => Toast.hide(),
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Unable to save changes!",
        text2: "Click to dismiss",
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        onPress: () => Toast.hide(),
      });
    }
  };

  return (
    <XStack alignItems="flex-start" justifyContent="space-between" gap="$6">
      <YStack>
        <SelectList
          setSelected={(val) => setSelected(val)}
          data={data}
          save="value"
          maxHeight={180}
          defaultOption={defaultBaseCurrency}
          fontFamily={"FinlandicBold"}
          boxStyles={{
            backgroundColor: colors.lightText,
            alignItems: "center",
            justifyContent: "space-between",
            width: 180,
            color: colors.darkBackground,
          }}
          inputStyles={{
            color: colors.darkBackground,
            fontSize: windowsWidth * 0.16,
          }}
          dropdownStyles={{
            color: colors.darkBackground,
            alignSelf: "center",
            width: 180,
          }}
          dropdownTextStyles={{
            fontSize: windowsWidth * 0.16,
            color: colors.lightText,
          }}
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
      </YStack>
      <YStack>
        <TouchableOpacity
          onPress={handleSave}
          style={{
            paddingHorizontal: 15,
            paddingVertical: 7,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 2,
            borderRadius: 10,
            borderColor: colors.lightText,
            marginTop: 3,
          }}
        >
          <Text style={styles.smallHeaderText}>Save</Text>
          <Ionicons
            name="checkmark-circle-outline"
            size={26}
            color={colors.lightText}
          />
        </TouchableOpacity>
      </YStack>
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

export default BaseCurrency;
