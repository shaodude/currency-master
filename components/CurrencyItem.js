import { Text, StyleSheet, Dimensions, View } from "react-native";
import { colors } from "../styles";
import { XStack } from "tamagui";

const CurrencyItem = ({ pair }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderColor: "grey",
        paddingHorizontal: 5,
        paddingVertical: 15,
      }}
    >
      <Text style={styles.smallHeaderText}>{pair.code}</Text>
      <Text style={styles.smallHeaderText}>{pair.rate}</Text>
    </View>
  );
};
const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  smallHeaderText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.17,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  image: {
    width: 30,
    height: 20,
    marginLeft: 10,
  },
});

export default CurrencyItem;
