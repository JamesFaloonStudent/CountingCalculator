import { defaultCountableMoney } from "@/types/CountableMoney";
import FormTextInput from "./FormTextInput";

export default function FormLayout() {
  return (
    <>
      {defaultCountableMoney.map((money) => (
        <FormTextInput key={money.id} money={money} />
      ))}
    </>
  );
}
