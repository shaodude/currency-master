import {
  StyleSheet,
  Text,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AttributionLink from "../components/Attribution";
import { colors } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Spinner, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { fetchRatesData, fetchUserData } from "../redux/ratesSlice";
import AddCurrencyButton from "../components/AddCurrencyButton";
import CurrencyList from "../components/CurrencyList";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const baseCurrency = useSelector((state) => state.rates.baseCurrency);
  const lastUpdatedUnix = useSelector((state) => state.rates.timeLastUpdated);
  const nextUpdateUnix = useSelector((state) => state.rates.timeNextUpdate);
  const lastUpdatedDate = dayjs.unix(lastUpdatedUnix);
  const nextUpdateDate = dayjs.unix(nextUpdateUnix);
  const today = dayjs();
  const lastUpdatedFormatted = lastUpdatedDate.format("MMM D, YYYY h:mm A");
  const nextUpdateDateHours = nextUpdateDate.diff(today, "hour");
  const [disableRefresh, setDisableRefresh] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // fetch user data from Firebase, then fetch rates data from Exchange Rate API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setShowSpinner(true);
        // First, fetch user data
        await dispatch(fetchUserData());
        // Then, fetch rates data after user data is fetched
        await dispatch(fetchRatesData());
        setShowSpinner(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch, baseCurrency]);

  const handleRefresh = () => {
    dispatch(fetchRatesData());
    Toast.show({
      type: "success",
      text1: "Updated Watchlist!",
      text2: "Click to dismiss",
      visibilityTime: 3000,
      autoHide: true,
      position: "bottom",
      onPress: () => Toast.hide(),
    });
    setDisableRefresh(true);

    // Set a timeout to re-enable the button after 20 minutes
    setTimeout(() => {
      setDisableRefresh(false);
    }, 1200000);
  };

  const PageHeader = () => {
    return (
      <YStack alignItems="center" marginTop={20}>
        <Text style={styles.headerText}>Currency WatchList</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Text style={[styles.smallHeaderText, { marginTop: 10 }]}>
            Base currency: {baseCurrency}
          </Text>
        </TouchableOpacity>
      </YStack>
    );
  };

  const UpdateBox = () => {
    return (
      <YStack>
        <YStack alignItems="center" gap={10}>
          <Text style={styles.smallerHeaderText}>
            Last Updated at {lastUpdatedFormatted}
          </Text>
          <Text style={styles.smallerHeaderText}>
            Next update in {nextUpdateDateHours} hours
          </Text>
          <Button
            variant="outlined"
            onPress={handleRefresh}
            color={disableRefresh ? "grey" : colors.lightText}
            icon={<Ionicons name="refresh-outline" size={24} />}
            disabled={disableRefresh}
          >
             <Text style={{color: colors.lightText}}>Refresh Now</Text>
          </Button>
          {disableRefresh && (
            <Text style={{ color: "grey" }}>Try again in 20 minutes</Text>
          )}
        </YStack>
      </YStack>
    );
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <SafeAreaView edges={["bottom"]} style={styles.safeArea} />
        <ScrollView nestedScrollEnabled={true}>
          <YStack>
            <YStack>
              <PageHeader />
            </YStack>
            {showSpinner ? (
              <Spinner size="large" color="$orange10" />
            ) : (
              <YStack
                flex={1}
                gap={25}
                alignSelf="center"
                alignItems="center"
                style={{ marginTop: 20, width: "80%" }}
              >
                <YStack style={Platform.OS === "ios" ? { zIndex: 999 } : {}}>
                  <YStack alignItems="center" marginTop={5}>
                    <CurrencyList />
                  </YStack>
                  <YStack marginTop={5}>
                    <AddCurrencyButton />
                  </YStack>
                </YStack>

                <YStack alignItems="center">
                  <UpdateBox />
                </YStack>

                <YStack marginTop={40} paddingBottom={50}>
                  <AttributionLink />
                </YStack>
              </YStack>
            )}
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>
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
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.14,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  smallerHeaderText: {
    fontFamily: "FinlandicSemiBoldItalic",
    fontSize: windowsWidth * 0.12,
    color: colors.lightText,
    textTransform: "uppercase",
  },
});

export default HomeScreen;
