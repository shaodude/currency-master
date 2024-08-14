import { Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { colors } from "../styles";
import { XStack, Card, H3, H4, Button, Input, YStack } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useState } from "react";
import { updateWalletData, setWallet } from "../redux/walletSlice";
import { SelectList } from "react-native-dropdown-select-list";
import Toast from "react-native-toast-message";

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

    const handleSave = () => {
      if (!validateAmount(newAmount)) {
        setNewAmount("");
        Toast.show({
          type: "error",
          text1: "Amount must be a valid positive number!",
          text2: "Click to dismiss",
          visibilityTime: 3000,
          autoHide: true,
          position: "top",
          onPress: () => Toast.hide(),
        });
        return;
      }
      let updatedWalletData;
      if (newAmount > 0) {
        updatedWalletData = walletData.map((wallet, index) => {
          if (index === selectedWallet) {
            return {
              ...wallet,
              amount: parseFloat(newAmount),
            };
          }
          return wallet;
        });
      } else {
        const wallet = [...walletData];
        wallet.splice(selectedWallet, 1);
        updatedWalletData = wallet;
      }

      dispatch(setWallet(updatedWalletData));
      dispatch(updateWalletData());
      toggleEditModal();
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
            <Text style={styles.modalText}>New Amount</Text>
            <Input
              onChangeText={(val) => setNewAmount(val)}
              value={newAmount}
              style={styles.inputText}
              size="$5"
            />
          </YStack>

          <XStack gap={80} marginTop={15}>
            <Button
              style={styles.modalCancelButton}
              color={"crimson"}
              onPress={handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={styles.modalSaveButton}
              color={"#228B22"}
              onPress={handleSave}
            >
              Save
            </Button>
          </XStack>
        </YStack>
        <Toast />
      </Modal>
    );
  };

  const AddModal = () => {
    const [amount, setAmount] = useState("");
    const [selected, setSelected] = useState("");
    const ratesList = useSelector((state) => state.rates.ratesList);
    const existingWallets = walletData.map((item) => item.code);
    const data = ratesList.map((currency, index) => ({
      key: String(index + 1),
      value: currency.code,
      disabled: existingWallets.includes(currency.code),
    }));
    const handleSave = () => {
      if (selected == "") {
        Toast.show({
          type: "error",
          text1: "Please select a currency!",
          text2: "Click to dismiss",
          visibilityTime: 3000,
          autoHide: true,
          position: "top",
          onPress: () => Toast.hide(),
        });
        return;
      }
      if (!validateAmount(amount)) {
        setAmount("");
        Toast.show({
          type: "error",
          text1: "Amount must be a valid positive number!",
          text2: "Click to dismiss",
          visibilityTime: 3000,
          autoHide: true,
          position: "top",
          onPress: () => Toast.hide(),
        });
        return;
      }
      const amountFormatted = parseFloat(amount);
      const newWallet = { code: selected, amount: amountFormatted };
      dispatch(setWallet([...walletData, newWallet]));
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
          <YStack zIndex={999} alignItems="center" gap={5}>
            <Text style={styles.modalText}>Currency</Text>

            <SelectList
              setSelected={(val) => setSelected(val)}
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
              onChangeText={(val) => setAmount(val)}
              value={amount}
              style={styles.inputText}
              size="$5"
            />
          </YStack>

          <XStack gap={80} marginTop={15}>
            <Button
              style={styles.modalCancelButton}
              color={"crimson"}
              onPress={handleCancel}
            >
              Cancel
            </Button>
            <Button
              style={styles.modalSaveButton}
              color={"#228B22"}
              onPress={handleSave}
            >
              Save
            </Button>
          </XStack>
        </YStack>
      </Modal>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      {walletData.length > 0 ? (
        walletData.map((wallet, index) => (
          <Card
            elevate
            size="$2"
            bordered
            margin={8}
            key={index}
            width={150}
            borderRadius={10}
            borderWidth={2}
            borderColor={colors.lightText}
          >
            <Card.Header borderRadius={10} padded>
              <H3 color={colors.lightText}>{wallet.code}</H3>
              <H4 color={colors.lightText}>{wallet.amount}</H4>
            </Card.Header>
            <Card.Footer paddingBottom={10} paddingRight={10}>
              <XStack flex={1} />
              <Button
                variant="outlined"
                backgroundColor={colors.darkBackground}
                color={colors.lightText}
                borderRadius="$5"
                onPress={() => handleEdit(index)}
              >
                Edit
              </Button>
            </Card.Footer>
            <Card.Background
              borderRadius={10}
              backgroundColor={colors.darkBackground}
            />
          </Card>
        ))
      ) : (
        <Text
          style={[
            styles.smallerHeaderText,
            { width: "100%", textAlign: "flex-start", padding: 10 },
          ]}
        >
          No Wallets found!
        </Text>
      )}
      <Card
        elevate
        size="$2"
        bordered
        margin={8}
        width={150}
        borderRadius={10}
        borderWidth={2}
        borderColor={colors.lightText}
        onPress={handleAdd}
        height={100}
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
      <EditModal />
      <AddModal />
    </ScrollView>
  );
};
const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
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
  modalNumber: {
    fontFamily: "FinlandicMedium",
    fontSize: windowsWidth * 0.2,
    color: colors.lightText,
    textTransform: "uppercase",
  },
  inputText: {
    width: 120,
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
});

export default Wallets;
