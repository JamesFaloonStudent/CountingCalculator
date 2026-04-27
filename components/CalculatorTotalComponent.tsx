import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Card, useTheme } from "react-native-paper";

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

export default function CalculatorTotalComponent() {
  const theme = useTheme();
  const [total] = useState(0);

  return (
    <Card style={[styles.totalBox, { backgroundColor: theme.colors.surfaceVariant }]}>
      <Card.Content>
        <Text style={[styles.totalText, { color: theme.colors.onSurface }]}> {total} </Text>
      </Card.Content>
    </Card>
  );
}
