import { Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { colors } from "../styles";

const CurrencyItem = ({ pair, onPress }) => {
  const code = pair.code || "Invalid Code";
  const rate = parseFloat(pair.rate) ? pair.rate : "Rate Error";
  return (
    <TouchableOpacity
    onPress={onPress}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 2,
        borderColor: "grey",
        paddingHorizontal: 5,
        paddingVertical: 15,
      }}
    >
      <Text style={styles.smallHeaderText}>{code}</Text>
      <Text style={styles.smallHeaderText}>{rate}</Text>
    </TouchableOpacity>
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
