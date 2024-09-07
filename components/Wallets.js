import { Text, StyleSheet, Dimensions, View, Platform } from "react-native";
import { colors } from "../styles";
import { XStack, Card, H4, Button, Input, YStack } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useState } from "react";
import {
  updateWalletData,
  editWallet,
  removeFromWallet,
  addToWallet,
} from "../redux/walletSlice";
import { SelectList } from "react-native-dropdown-select-list";
import Toast from "react-native-toast-message";
import WalletItem from "./WalletItem";

const Wallets = () => {
  const dispatch = useDispatch();
  const walletData = useSelector((state) => state.wallet.walletData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(0);

  const toggleEditModal = () => {
    setEditModalVisible(!editModalVisible);
  };

  const toggleAddModal = () => {
    setAddModalVisible(!addModalVisible);
  };

  const handleEdit = (index) => {
    setSelectedWallet(index);
    toggleEditModal();
  };

  const handleAdd = () => {
    toggleAddModal();
  };

  const validateAmount = (amount) => {
    const isValidNumber = /^\d+(\.\d+)?$/.test(amount);

    if (isValidNumber) {
      const parsedAmount = parseFloat(amount);
      return parsedAmount >= 0;
    }

    return false;
  };

  const EditModal = () => {
    const [newAmount, setNewAmount] = useState("");
    const [error, setError] = useState(false);

    const handleSave = () => {
      if (!validateAmount(newAmount)) {
        setNewAmount("");
        setError(true);
        return;
      }
      const selectedCode = walletData[selectedWallet].code;
      if (newAmount > 0) {
        dispatch(editWallet({ amount: newAmount, code: selectedCode }));
      } else {
        dispatch(removeFromWallet(selectedCode));
      }
      dispatch(updateWalletData());
      toggleEditModal();
      Toast.show({
        type: "success",
        text1: "Wallet updated!",
        text2: "Click to dismiss",
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        onPress: () => Toast.hide(),
      });
    };

    const handleCancel = () => {
      setNewAmount("");
      toggleEditModal();
    };

    return (
      <Modal
        animationInTiming={400}
        animationOutTiming={400}
        isVisible={editModalVisible}
        style={{ marginBottom: "20%" }}
      >
        <YStack gap={15} style={styles.modal}>
          <Text style={styles.headerText}>
            {walletData[selectedWallet]
              ? walletData[selectedWallet].code
              : "null"}
          </Text>
          <YStack alignItems="center" justifyContent="center" gap={5}>
            <Text style={styles.modalText}>Current Amount</Text>
            <Text style={styles.modalNumber}>
              {walletData[selectedWallet]
                ? walletData[selectedWallet].amount
                : "null"}
            </Text>
          </YStack>
          <YStack alignItems="center" justifyContent="center" gap={5}>
            <Text style={styles.modalText}>New Amount </Text>
            <Text style={styles.modalSmallText}>(Set to 0 to remove wallet)</Text>

            <Input
              onChangeText={(val) => setNewAmount(val)}
              onChange={() => setError(false)}
              value={newAmount}
              style={styles.inputText}
              size="$5"
              keyboardType="numeric"
              maxLength={16}
            />
            {error && (
              <Text style={{ color: "red" }}>
                Amount must be a valid positive number!
              </Text>
            )}
          </YStack>

          <XStack gap={80} marginTop={15}>
            <Button
              style={styles.modalCancelButton}
              color={"crimson"}
              onPress={handleCancel}
              iconAfter={<Ionicons name="close-circle-outline" size={20} />}
            >
               <Text style={{color: "crimson"}}>Cancel</Text>
            </Button>
            <Button
              style={styles.modalSaveButton}
              color={"#228B22"}
              onPress={handleSave}
              iconAfter={<Ionicons name="checkmark-circle-outline" size={20} />}
            >
               <Text style={{color: "#228B22"}}>Save</Text>
            </Button>
          </XStack>
        </YStack>
      </Modal>
    );
  };

  const AddModal = () => {
    const [amount, setAmount] = useState("");
    const [selected, setSelected] = useState("");
    const [currError, setCurrError] = useState(false);
    const [amountError, setAmountError] = useState(false);
    const ratesList = useSelector((state) => state.rates.ratesList);
    const existingWallets = walletData.map((item) => item.code);
    // populate dropdown list data
    const data = ratesList.map((currency, index) => ({
      key: String(index + 1),
      value: currency.code,
      disabled: existingWallets.includes(currency.code), // disable code that are already in wallet
    }));
    const handleSave = () => {
      if (selected == "") {
        setCurrError(true);
        return;
      }
      if (!validateAmount(amount)) {
        setAmount("");
        setAmountError(true);
        return;
      }
      const amountFormatted = parseFloat(amount);
      dispatch(addToWallet({ code: selected, amount: amountFormatted }))
      dispatch(updateWalletData());
      Toast.show({
        type: "success",
        text1: "Wallet added!",
        text2: "Click to dismiss",
        visibilityTime: 3000,
        autoHide: true,
        position: "bottom",
        onPress: () => Toast.hide(),
      });
      toggleAddModal();
    };

    const handleCancel = () => {
      setAmount("");
      toggleAddModal();
    };

    return (
      <Modal
        animationInTiming={400}
        animationOutTiming={400}
        isVisible={addModalVisible}
        style={{ marginBottom: "20%" }}
      >
        <YStack gap={15} style={styles.modal}>
          <YStack
            alignItems="center"
            gap={5}
            style={Platform.OS === "ios" ? { zIndex: 999 } : {}}
          >
            {currError && (
              <Text style={{ color: "red" }}>Currency must be selected!</Text>
            )}
            <Text style={styles.modalText}>Currency</Text>
            <SelectList
              setSelected={(val) => setSelected(val)}
              onSelect={() => setCurrError(false)}
              data={data}
              save="value"
              maxHeight={180}
              placeholder="Select"
              fontFamily={"FinlandicBold"}
              boxStyles={{
                backgroundColor: colors.lightText,
                alignItems: "center",
                justifyContent: "space-between",
                width: 150,
                color: colors.darkBackground,
              }}
              inputStyles={{
                color: colors.darkBackground,
                fontSize: windowsWidth * 0.16,
              }}
              dropdownStyles={{
                zIndex: 999,
                backgroundColor: colors.darkBackground,
                alignSelf: "center",
                width: 150,
                position: "absolute",
                top: 50,
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
          <YStack alignItems="center" justifyContent="center" gap={5}>
            <Text style={styles.modalText}>Amount</Text>
            <Input
              keyboardType="numeric"
              onChangeText={(val) => setAmount(val)}
              onChange={() => setAmountError(false)}
              value={amount}
              style={styles.inputText}
              size="$5"
              maxLength={16}
              overflow="hidden"
            />
            {amountError && (
              <Text style={{ color: "red" }}>
                Amount must be a valid positive number!
              </Text>
            )}
          </YStack>

          <XStack gap={80} marginTop={15}>
            <Button
              style={styles.modalCancelButton}
              color={"crimson"}
              onPress={handleCancel}
              iconAfter={<Ionicons name="close-circle-outline" size={20} />}

            >
              <Text style={{color: "crimson"}}>Cancel</Text>
            </Button>
            <Button
              style={styles.modalSaveButton}
              color={"#228B22"}
              onPress={handleSave}
              iconAfter={<Ionicons name="checkmark-circle-outline" size={20} />}

            >
               <Text style={{color: "#228B22"}}>Save</Text>
            </Button>
          </XStack>
        </YStack>
      </Modal>
    );
  };

  const AddWallet = ({ onPress }) => {
    return (
      <Card
        elevate
        size="$2"
        bordered
        margin={8}
        padding={5}
        style={styles.dynWidth}
        borderRadius={10}
        borderWidth={2}
        borderColor={colors.lightText}
        onPress={onPress}
      >
        <Card.Header borderRadius={10} padded>
          <H4 color={colors.lightText}>Add a wallet</H4>
        </Card.Header>
        <Card.Footer paddingBottom={10} paddingRight={10}>
          <XStack flex={1} />
          <Ionicons name="add-outline" size={50} color={colors.lightText} />
        </Card.Footer>
        <Card.Background
          borderRadius={10}
          backgroundColor={colors.darkBackground}
        />
      </Card>
    );
  };

  return (
    <View style={styles.wrapper}>
      {walletData.length > 0 ? (
        walletData.map((wallet, index) => (
          <WalletItem
            key={index}
            onPress={() => handleEdit(index)}
            wallet={wallet}
          />
        ))
      ) : (
        <Text
          style={[
            styles.smallerHeaderText,
            { width: "100%", textAlign: "center", padding: 10 },
          ]}
        >
          No Wallets found!
        </Text>
      )}
      <AddWallet onPress={() => handleAdd()} />
      <EditModal />
      <AddModal />
    </View>
  );
};
const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  headerText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.2,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  smallerHeaderText: {
    fontFamily: "FinlandicBold",
    fontSize: windowsWidth * 0.14,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  modalText: {
    fontFamily: "FinlandicSemiBold",
    fontSize: windowsWidth * 0.13,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  modalSmallText: {
    fontFamily: "FinlandicMedium",
    fontSize: windowsWidth * 0.11,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  modalNumber: {
    fontFamily: "FinlandicMedium",
    fontSize: windowsWidth * 0.2,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  inputText: {
    minWidth: 120,
    fontFamily: "FinlandicMedium",
    fontSize: windowsWidth * 0.18,
    textAlign: "center",
    backgroundColor: colors.darkBackground,
    color: colors.lightText,
  },
  modalCancelButton: {
    width: "30%",
    backgroundColor: colors.darkBackground,
    borderColor: "crimson",
    borderWidth: 2,
  },
  modalSaveButton: {
    width: "30%",
    backgroundColor: colors.darkBackground,
    borderColor: "#228B22",
    borderWidth: 2,
  },
  modal: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.darkBackground,
    paddingVertical: 50,
  },
  dynWidth: {
    width: windowsWidth * 1.3,
  },
});

export default Wallets;
