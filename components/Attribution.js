import { Text, Linking, StyleSheet, Dimensions } from "react-native";
import { colors } from "../styles";
const AttributionLink = () => {
  const handlePress = async () => {
    await Linking.openURL("https://www.exchangerate-api.com");
  };

  return (
    <Text style={styles.smallerHeaderText} onPress={handlePress}>
      Rates By Exchange Rate API
    </Text>
  );
};
const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  smallerHeaderText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.12,
    color: colors.lightText,
    textTransform: "uppercase",
  },
});

export default AttributionLink;
