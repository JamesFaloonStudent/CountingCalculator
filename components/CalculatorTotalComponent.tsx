import { StyleSheet, Text } from "react-native";
import { Card, useTheme } from "react-native-paper";

interface CalculatorTotalComponentProps {
  totalCents: number;
}

const styles = StyleSheet.create({
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  totalBox: {
    width: "80%",
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default function CalculatorTotalComponent({ totalCents }: CalculatorTotalComponentProps) {
  const theme = useTheme();
  const formattedTotal = `$${(totalCents / 100).toFixed(2)}`;

  return (
    <Card style={[styles.totalBox, { backgroundColor: theme.colors.surfaceVariant }]}>
      <Card.Content>
        <Text style={[styles.totalText, { color: theme.colors.onSurface }]}>{formattedTotal}</Text>
      </Card.Content>
    </Card>
  );
}
