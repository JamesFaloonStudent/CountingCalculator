import AppDrawerLayout from "@/components/AppDrawerLayout";
import FormLayout from "@/components/FormLayout";
import useCalculatorInputController from "@/hooks/useCalculatorInputController";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ButtonGrid from "../components/ButtonGrid";
import CalculatorTotalComponent from "../components/CalculatorTotalComponent";


export default function Index() {
  const theme = useTheme();
  const {
    valuesByMoneyId,
    totalCents,
    handleGridKeyPress,
    handleInputFocus,
    registerInputFocusCallback,
    setInputValue,
  } = useCalculatorInputController();

  return (
    <SafeAreaProvider>
      <AppDrawerLayout>
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]} edges={["top"]}>

          <View style={[styles.content, { backgroundColor: theme.colors.background }]}>
            <CalculatorTotalComponent totalCents={totalCents} />


            <ScrollView style={styles.formScroll}>
              <FormLayout
                valuesByMoneyId={valuesByMoneyId}
                onInputChange={setInputValue}
                onInputFocus={handleInputFocus}
                registerInputFocusCallback={registerInputFocusCallback}
              />
            </ScrollView>

            <ButtonGrid onKeyPress={handleGridKeyPress} />
          </View>
        </SafeAreaView>
      </AppDrawerLayout>

    </SafeAreaProvider>

  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formScroll: {
    width: "80%",
  },
});


if (StatusBar.currentHeight) {
  styles.container.paddingTop = StatusBar.currentHeight + 10;
}
