import AppDrawerLayout from "@/components/AppDrawerLayout";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function SettingsScreen() {
  const theme = useTheme();

  return (
    <AppDrawerLayout>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Settings</Text>
      </View>
    </AppDrawerLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});
