import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { colors } from "../styles";
import { useState } from "react";

const CurrencyConverter = ({ pair, base }) => {
  const [baseValue, setBaseValue] = useState("1");
  const [baseCode, setBaseCode] = useState(base);
  const [targetCode, setTargetCode] = useState(pair.code);
  const [rate, setRate] = useState(pair.rate);

  // Calculate the computed value based on the current rates and base value
  const computed = (parseFloat(rate) * parseFloat(baseValue)).toFixed(2);

  const handleSwitch = () => {
    // Switch base and target currencies
    setBaseValue("1"); // Reset the base value to 1
    const newBaseCode = targetCode;
    const newTargetCode = baseCode;
    setBaseCode(newBaseCode);
    setTargetCode(newTargetCode);
    if (newBaseCode === base) {
      setRate(pair.rate);
    } else {
      setRate((1 / pair.rate).toFixed(5));
    }
  };

  return (
    <View style={{ gap: 15 }}>
      <View>
        <Text style={styles.smallHeaderText}>
          1 {baseCode} = {rate} {targetCode}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.smallHeaderText}>{baseCode}</Text>
        <TextInput
          editable
          keyboardType="numeric"
          style={styles.inputText}
          maxLength={20}
          value={baseValue}
          onChangeText={(value) => setBaseValue(value)}
        />
      </View>
      <View>
        <TouchableOpacity
          style={{
            alignItems: "center",
          }}
          onPress={() => handleSwitch()}
        >
          <Text
            style={{
              color: colors.lightText,
              fontSize: 25,
              textAlign: "center",
              width: 45,
            }}
          >
            ↑↓
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.smallHeaderText}>{targetCode}</Text>
        <TextInput
          editable={false}
          style={styles.disabledinputText}
          maxLength={20}
          value={computed}
        />
      </View>
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
  inputText: {
    width: 120,
    fontFamily: "FinlandicMedium",
    fontSize: windowsWidth * 0.18,
    textAlign: "center",
    backgroundColor: "white",
    color: colors.darkText,
    padding: 10,
    borderRadius: 5,
  },
  disabledinputText: {
    width: 120,
    fontFamily: "FinlandicMedium",
    fontSize: windowsWidth * 0.18,
    textAlign: "center",
    backgroundColor: "white",
    color: "grey",
    padding: 10,
    borderRadius: 5,
  },
});

export default CurrencyConverter;
