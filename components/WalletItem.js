import { XStack, Card, H3, H4, Button } from "tamagui";
import { colors } from "../styles";

const WalletItem = ({ wallet, onPress }) => {
  return (
    <Card
      elevate
      size="$2"
      bordered
      margin={8}
      padding={5}
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
          onPress={onPress}
        >
          Edit
        </Button>
      </Card.Footer>
      <Card.Background
        borderRadius={10}
        backgroundColor={colors.darkBackground}
      />
    </Card>
  );
};

export default WalletItem;
