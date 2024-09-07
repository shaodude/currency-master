import { Card, H3, H4, Button } from "tamagui";
import { StyleSheet, Dimensions, Text } from "react-native";
import { colors } from "../styles";
import { Ionicons } from "@expo/vector-icons";

const WalletItem = ({ wallet, onPress }) => {
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
    >
      <Card.Header
        borderRadius={10}
        padded
        maxHeight={"$10"}
        overflow="hidden"
        alignItems="center"
        justifyContent="center"
      >
        <H3 style={{ textAlign: "center", textDecorationLine: "underline" }} color={colors.lightText}>
          {wallet.code}
        </H3>
        <H4 style={{ textAlign: "center" }} color={colors.lightText}>
          {wallet.amount}
        </H4>
      </Card.Header>
      <Card.Footer alignItems="center" justifyContent="center" padding={10}>
        <Button
          variant="outlined"
          backgroundColor={colors.darkBackground}
          color={colors.lightText}
          borderRadius="$5"
          onPress={onPress}
          iconAfter={<Ionicons name="create-outline" size={22} />}
        >
          <Text style={{color: colors.lightText}}>Edit</Text>
        </Button>
      </Card.Footer>
      <Card.Background
        borderRadius={10}
        backgroundColor={colors.darkBackground}
      />
    </Card>
  );
};

const windowsWidth = Dimensions.get("window").width / 4;

const styles = StyleSheet.create({
  dynWidth: {
    width: windowsWidth * 1.3,
  },
});

export default WalletItem;
