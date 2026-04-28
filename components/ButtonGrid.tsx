import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { ButtonGridKey } from "@/hooks/useCalculatorInputController";

interface ButtonGridProps {
  onKeyPress: (key: ButtonGridKey) => void;
}

const buttons: { id: number; value: ButtonGridKey }[] = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
  { id: 4, value: "+" },
  { id: 5, value: 4 },
  { id: 6, value: 5 },
  { id: 7, value: 6 },
  { id: 8, value: "-" },
  { id: 9, value: 7 },
  { id: 10, value: 8 },
  { id: 11, value: 9 },
  { id: 12, value: "*" },
  { id: 13, value: 0 },
  { id: 14, value: "Back" },
  { id: 15, value: "Tab" },
  { id: 16, value: "/" },
  { id: 17, value: "Tab" },
  { id: 18, value: "Shift-Tab" },
  { id: 19, value: "CLR" },
  { id: 20, value: "=" },
];

const styles = StyleSheet.create({
  button: {
    width: "20%",
    height: 50,
    margin: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "600",
  },
  gridLayout: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
    marginBottom: 20,
  },
});


export default function ButtonGrid({ onKeyPress }: ButtonGridProps) {
  const theme = useTheme();

  return (
    <View style={styles.gridLayout}>
      {buttons.map((button) => (
        <Pressable
          key={button.id}
          onPress={() => onKeyPress(button.value)}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={[styles.text, { color: theme.colors.onPrimary }]}>{button.value.toString()}</Text>
        </Pressable>
      ))}
    </View>
  );
}
