import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
} from "react-native";
import { colors } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack, Button } from "tamagui";
import BaseCurrency from "../components/BaseCurrency";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { setBaseCurrency, updateUserData } from "../redux/ratesSlice";
import { useDispatch } from "react-redux";

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const handleSave = () => {
    dispatch(setBaseCurrency(selectedCurrency));
    dispatch(updateUserData());
    Toast.show({
      type: "success",
      text1: "Saved Changes!",
      text2: "Click to dismiss",
      visibilityTime: 3000,
      autoHide: true,
      position: "bottom",
      onPress: () => Toast.hide(),
    });
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView edges={["bottom"]} style={styles.safeArea} />
      <YStack
        flex={1}
        gap={25}
        alignSelf="center"
        alignItems="center"
        style={{ marginTop: 20, width: "80%" }}
      >
        <XStack>
          <Text style={styles.headerText}>My Settings</Text>
        </XStack>
        <YStack justifyContent="center" alignItems="center">
          <Text style={styles.smallHeaderText}>Base Currency</Text>
          <YStack marginTop={10}>
            <BaseCurrency setSelectedCurrency={setSelectedCurrency} />
          </YStack>
        </YStack>
        <YStack position="absolute" bottom={70}>
          <Button
            style={styles.saveButton}
            color={"#228B22"}
            onPress={handleSave}
            iconAfter={<Ionicons name="checkmark-circle-outline" size={25} />}
          >
            Save
          </Button>
        </YStack>
      </YStack>
    </View>
  );
};

const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.darkBackground,
  },
  safeArea: {
    padding: Platform.OS === "ios" ? windowsWidth * 0.04 : windowsWidth * 0.18,
  },
  headerText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.24,
    color: colors.lightText,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  smallHeaderText: {
    textAlign: "left",
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.14,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  saveButton: {
    width: "70%",
    backgroundColor: colors.darkBackground,
    borderColor: colors.lightText,
    color: colors.lightText,
    borderWidth: 2,
    alignSelf: "center",
  },
});

export default SettingsScreen;
