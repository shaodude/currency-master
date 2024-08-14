import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { colors } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { XStack, YStack } from "tamagui";
import { fetchWalletData } from "../redux/walletSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Wallets from "../components/Wallets";

const WalletScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWalletData());
  }, [dispatch]);

  return (
    <View style={styles.wrapper}>
      <SafeAreaView edges={["bottom"]} style={styles.safeArea} />
      <YStack
        flex={1}
        gap="25"
        alignSelf="center"
        alignItems="center"
        style={{ marginTop: 20, width: "80%" }}
      >
        <XStack>
          <Text style={styles.headerText}>My Wallets</Text>
        </XStack>
        <Wallets />
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
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: windowsWidth * 0.1,
    paddingHorizontal: windowsWidth * 0.2,
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
  smallerHeaderText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.12,
    color: colors.lightText,
    textTransform: "uppercase",
  },
});

export default WalletScreen;
