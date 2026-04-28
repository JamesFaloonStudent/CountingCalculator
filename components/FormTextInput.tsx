import { CountableMoney } from "@/types/CountableMoney";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { TextInput, useTheme } from "react-native-paper";

interface FormTextInputProps {
  money: CountableMoney;
  value: string;
  onChangeText: (value: string) => void;
  onFocus: () => void;
  registerFocusCallback: (focusCallback: (() => void) | null) => void;
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});


export default function FormTextInput({
  money,
  value,
  onChangeText,
  onFocus,
  registerFocusCallback,
}: FormTextInputProps) {
  const theme = useTheme();
  const textInputRef = useRef<{ focus: () => void } | null>(null);

  useEffect(() => {
    registerFocusCallback(() => {
      textInputRef.current?.focus();
    });

    return () => {
      registerFocusCallback(null);
    };
  }, [registerFocusCallback]);

  return (
    <TextInput
      ref={(instance: unknown) => {
        if (
          instance &&
          typeof instance === "object" &&
          "focus" in instance &&
          typeof instance.focus === "function"
        ) {
          textInputRef.current = instance as { focus: () => void };
          return;
        }

        textInputRef.current = null;
      }}
      mode="outlined"
      style={styles.textInput}
      label={money.name}
      value={value}
      onChangeText={onChangeText}
      onFocus={onFocus}
      textColor={theme.colors.onSurface}
      outlineColor={theme.colors.outline}
      activeOutlineColor={theme.colors.primary}
      showSoftInputOnFocus={false} 
    />
  );
}
