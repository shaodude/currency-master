import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../styles";
import { YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector } from "react-redux";

const BaseCurrency = ({ setSelectedCurrency }) => {
  const ratesList = useSelector((state) => state.rates.ratesList);
  const baseCurrency = useSelector((state) => state.rates.baseCurrency);
  const data = ratesList.map((currency, index) => ({
    key: String(index + 1),
    value: currency.code,
  }));
  const defaultBaseCurrency = data.find(
    (currency) => currency.value == baseCurrency
  );

  return (
    <YStack alignItems="center" justifyContent="space-between" gap="$6">
      <YStack>
        <SelectList
          setSelected={(val) => setSelectedCurrency(val)}
          data={data}
          save="value"
          maxHeight={180}
          defaultOption={defaultBaseCurrency}
          fontFamily={"FinlandicBold"}
          boxStyles={styles.box}
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
    </YStack>
  );
};
const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  box: {
    backgroundColor: colors.lightText,
    alignItems: "center",
    justifyContent: "space-between",
    width: 180,
    color: colors.darkBackground,
  }
});

export default BaseCurrency;
