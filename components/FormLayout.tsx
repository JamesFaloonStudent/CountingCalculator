import { defaultCountableMoney } from "@/types/CountableMoney";
import { ValuesByMoneyId } from "@/hooks/useCalculatorInputController";
import FormTextInput from "./FormTextInput";

interface FormLayoutProps {
  valuesByMoneyId: ValuesByMoneyId;
  onInputChange: (moneyId: number, value: string) => void;
  onInputFocus: (moneyId: number) => void;
  registerInputFocusCallback: (moneyId: number, focusCallback: (() => void) | null) => void;
}

export default function FormLayout({
  valuesByMoneyId,
  onInputChange,
  onInputFocus,
  registerInputFocusCallback,
}: FormLayoutProps) {
  return (
    <>
      {defaultCountableMoney.map((money) => (
        <FormTextInput
          key={money.id}
          money={money}
          value={valuesByMoneyId[money.id] ?? ""}
          onChangeText={(value) => onInputChange(money.id, value)}
          onFocus={() => onInputFocus(money.id)}
          registerFocusCallback={(focusCallback) => registerInputFocusCallback(money.id, focusCallback)}
        />
      ))}
    </>
  );
}
