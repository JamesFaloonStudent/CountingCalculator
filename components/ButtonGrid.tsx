import { Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

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


export default function ButtonGrid() {
  const theme = useTheme();

  const buttons = [
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: "Tab" },
    { id: 5, value: 4 },
    { id: 6, value: 5 },
    { id: 7, value: 6 },
    { id: 8, value: "Back" },
    { id: 9, value: 7 },
    { id: 10, value: 8 },
    { id: 11, value: 9 },
    { id: 12, value: "CTRL" },
    { id: 13, value: 0 },
    { id: 14, value: "." },
    { id: 15, value: "Enter" },
    { id: 16, value: "Total" },
  ];

  return (
    <View style={styles.gridLayout}>
      {buttons.map((button) => (
        <Pressable
          key={button.id}
          onPress={() => console.log(button.value)}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          <Text style={[styles.text, { color: theme.colors.onPrimary }]}>{button.value.toString()}</Text>
        </Pressable>
      ))}
    </View>
  );
}
