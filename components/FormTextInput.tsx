import { CountableMoney } from "@/types/CountableMoney";
import { StyleSheet } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

interface FormTextInputProps {
  money: CountableMoney;
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});


export default function FormTextInput({ money }: FormTextInputProps) {
  const theme = useTheme();

  return (
    <TextInput
      mode="outlined"
      keyboardType="numeric"
      style={styles.textInput}
      label={money.name}
      value="0"
      textColor={theme.colors.onSurface}
      outlineColor={theme.colors.outline}
      activeOutlineColor={theme.colors.primary}
    />
  );
}
