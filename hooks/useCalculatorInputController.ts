import { defaultCountableMoney } from "@/types/CountableMoney";
import { useCallback, useMemo, useRef, useState } from "react";

type ArithmeticOperator = "+" | "-" | "*" | "/";
type EvaluationResult = { ok: true; value: number } | { ok: false };

export type ButtonGridKey =
  | number
  | "."
  | "Tab"
  | "Shift-Tab"
  | "Back"
  | "CLR"
  | "Enter"
  | "="
  | ArithmeticOperator;
export type ValuesByMoneyId = Record<number, string>;

const moneyIds = defaultCountableMoney.map((money) => money.id);
const operatorSet = new Set<ArithmeticOperator>(["+", "-", "*", "/"]);
const operatorPrecedence: Record<ArithmeticOperator, number> = {
  "+": 1,
  "-": 1,
  "*": 2,
  "/": 2,
};

const isDigit = (character: string) => /^[0-9]$/.test(character);
const isArithmeticOperator = (character: string): character is ArithmeticOperator => operatorSet.has(character as ArithmeticOperator);

const createInitialValues = (): ValuesByMoneyId =>
  defaultCountableMoney.reduce<ValuesByMoneyId>((values, money) => {
    values[money.id] = "0";
    return values;
  }, {});

const sanitizeExpressionInput = (rawValue: string): string => rawValue.replace(/[^0-9+\-*/.\s]/g, "").replace(/\s+/g, "");

const formatEvaluatedValue = (value: number): string => {
  const rounded = Math.round(value * 1_000_000_000) / 1_000_000_000;

  if (!Number.isFinite(rounded) || Object.is(rounded, -0)) {
    return "0";
  }

  return rounded.toString();
};

const getCurrentNumberSegment = (expression: string): string => {
  const compactExpression = expression.replace(/\s+/g, "");
  let index = compactExpression.length - 1;

  while (index >= 0) {
    const character = compactExpression[index];
    if (isArithmeticOperator(character)) {
      break;
    }
    index -= 1;
  }

  return compactExpression.slice(index + 1);
};

const appendTokenToExpression = (currentValue: string, key: number | "." | ArithmeticOperator): string => {
  const compactExpression = sanitizeExpressionInput(currentValue);

  if (typeof key === "number") {
    const keyText = key.toString();

    if (compactExpression === "0") {
      return keyText;
    }

    if (compactExpression === "-0") {
      return `-${keyText}`;
    }

    return `${compactExpression}${keyText}`;
  }

  if (key === ".") {
    if (compactExpression === "") {
      return "0.";
    }

    if (compactExpression === "-") {
      return "-0.";
    }

    const lastCharacter = compactExpression.at(-1);
    if (lastCharacter && isArithmeticOperator(lastCharacter)) {
      return `${compactExpression}0.`;
    }

    const currentSegment = getCurrentNumberSegment(compactExpression);
    if (currentSegment.includes(".")) {
      return compactExpression;
    }

    return `${compactExpression}.`;
  }

  if (compactExpression === "") {
    return key === "-" ? "-" : "0";
  }

  if (compactExpression === "0") {
    return key === "-" ? "-" : compactExpression;
  }

  const lastCharacter = compactExpression.at(-1);
  if (lastCharacter && isArithmeticOperator(lastCharacter)) {
    return `${compactExpression.slice(0, -1)}${key}`;
  }

  return `${compactExpression}${key}`;
};

const removeLastCharacter = (value: string): string => {
  const compactValue = sanitizeExpressionInput(value);

  if (compactValue.length <= 1) {
    return "0";
  }

  const nextValue = compactValue.slice(0, -1);
  return nextValue === "-" ? "0" : nextValue;
};

const applyOperator = (values: number[], operator: ArithmeticOperator): boolean => {
  const rightOperand = values.pop();
  const leftOperand = values.pop();

  if (rightOperand === undefined || leftOperand === undefined) {
    return false;
  }

  if (operator === "/" && rightOperand === 0) {
    return false;
  }

  let result = 0;

  if (operator === "+") {
    result = leftOperand + rightOperand;
  } else if (operator === "-") {
    result = leftOperand - rightOperand;
  } else if (operator === "*") {
    result = leftOperand * rightOperand;
  } else {
    result = leftOperand / rightOperand;
  }

  if (!Number.isFinite(result)) {
    return false;
  }

  values.push(result);
  return true;
};

const readSignedNumber = (source: string, startIndex: number): { value: number; nextIndex: number } | null => {
  let index = startIndex;
  let sign = 1;

  if (source[index] === "+" || source[index] === "-") {
    sign = source[index] === "-" ? -1 : 1;
    index += 1;
  }

  let hasDigits = false;
  let hasDecimal = false;
  let literal = "";

  while (index < source.length) {
    const character = source[index];
    if (isDigit(character)) {
      hasDigits = true;
      literal += character;
      index += 1;
      continue;
    }

    if (character === "." && !hasDecimal) {
      hasDecimal = true;
      literal += character;
      index += 1;
      continue;
    }

    break;
  }

  if (!hasDigits) {
    return null;
  }

  const parsed = Number(literal);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return {
    value: parsed * sign,
    nextIndex: index,
  };
};

const evaluateExpression = (rawExpression: string): EvaluationResult => {
  const expression = sanitizeExpressionInput(rawExpression);

  if (expression.length === 0) {
    return { ok: false };
  }

  const values: number[] = [];
  const operators: ArithmeticOperator[] = [];
  let index = 0;
  let expectingNumber = true;

  while (index < expression.length) {
    const currentCharacter = expression[index];

    if (expectingNumber) {
      const parsed = readSignedNumber(expression, index);
      if (!parsed) {
        return { ok: false };
      }

      values.push(parsed.value);
      index = parsed.nextIndex;
      expectingNumber = false;
      continue;
    }

    if (!isArithmeticOperator(currentCharacter)) {
      return { ok: false };
    }

    while (operators.length > 0) {
      const topOperator = operators[operators.length - 1];
      if (operatorPrecedence[topOperator] < operatorPrecedence[currentCharacter]) {
        break;
      }

      const didApply = applyOperator(values, topOperator);
      if (!didApply) {
        return { ok: false };
      }

      operators.pop();
    }

    operators.push(currentCharacter);
    index += 1;
    expectingNumber = true;
  }

  if (expectingNumber) {
    return { ok: false };
  }

  while (operators.length > 0) {
    const topOperator = operators.pop();
    if (!topOperator) {
      return { ok: false };
    }

    const didApply = applyOperator(values, topOperator);
    if (!didApply) {
      return { ok: false };
    }
  }

  if (values.length !== 1) {
    return { ok: false };
  }

  return { ok: true, value: values[0] };
};

const toQuantity = (value: string): number => {
  if (value.trim() === "") {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

export default function useCalculatorInputController() {
  const [valuesByMoneyId, setValuesByMoneyId] = useState<ValuesByMoneyId>(() => createInitialValues());
  const [focusedMoneyId, setFocusedMoneyId] = useState<number | null>(moneyIds[0] ?? null);
  const inputFocusCallbacks = useRef<Record<number, (() => void) | undefined>>({});

  const registerInputFocusCallback = useCallback((moneyId: number, focusCallback: (() => void) | null) => {
    if (!focusCallback) {
      delete inputFocusCallbacks.current[moneyId];
      return;
    }

    inputFocusCallbacks.current[moneyId] = focusCallback;
  }, []);

  const handleInputFocus = useCallback((moneyId: number) => {
    setFocusedMoneyId(moneyId);
  }, []);

  const setInputValue = useCallback((moneyId: number, rawValue: string) => {
    const sanitized = sanitizeExpressionInput(rawValue);
    setValuesByMoneyId((currentValues) => ({
      ...currentValues,
      [moneyId]: sanitized === "" ? "0" : sanitized,
    }));
  }, []);

  const moveFocusToNextInput = useCallback(() => {
    if (moneyIds.length === 0) {
      return;
    }

    const currentIndex = focusedMoneyId === null ? 0 : moneyIds.indexOf(focusedMoneyId);
    const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextMoneyId = moneyIds[(safeCurrentIndex + 1) % moneyIds.length];

    setFocusedMoneyId(nextMoneyId);
    inputFocusCallbacks.current[nextMoneyId]?.();
  }, [focusedMoneyId]);

  const moveFocusToPreviousInput = useCallback(() => {
    if (moneyIds.length === 0) {
      return;
    }

    const currentIndex = focusedMoneyId === null ? 0 : moneyIds.indexOf(focusedMoneyId);
    const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;
    const previousMoneyId = moneyIds[(safeCurrentIndex - 1 + moneyIds.length) % moneyIds.length];

    setFocusedMoneyId(previousMoneyId);
    inputFocusCallbacks.current[previousMoneyId]?.();
  }, [focusedMoneyId]);

  const clearAllInputs = useCallback(() => {
    setValuesByMoneyId(createInitialValues());
  }, []);

  const evaluateFocusedInput = useCallback(
    (moneyId: number) => {
      setValuesByMoneyId((currentValues) => {
        const expression = currentValues[moneyId] ?? "0";
        const evaluation = evaluateExpression(expression);
        const nextValue = evaluation.ok ? formatEvaluatedValue(evaluation.value) : "0";

        return {
          ...currentValues,
          [moneyId]: nextValue,
        };
      });
    },
    [],
  );

  const handleGridKeyPress = useCallback(
    (key: ButtonGridKey) => {
      const targetMoneyId = focusedMoneyId ?? moneyIds[0];
      if (targetMoneyId === undefined) {
        return;
      }

      if (key === "Tab") {
        moveFocusToNextInput();
        return;
      }

      if (key === "Shift-Tab") {
        moveFocusToPreviousInput();
        return;
      }

      if (key === "Back") {
        setValuesByMoneyId((currentValues) => ({
          ...currentValues,
          [targetMoneyId]: removeLastCharacter(currentValues[targetMoneyId] ?? "0"),
        }));
        return;
      }

      if (key === "CLR") {
        clearAllInputs();
        return;
      }

      if (key === "=" || key === "Enter") {
        evaluateFocusedInput(targetMoneyId);
        return;
      }

      if (typeof key === "number" || key === "." || isArithmeticOperator(key)) {
        setValuesByMoneyId((currentValues) => ({
          ...currentValues,
          [targetMoneyId]: appendTokenToExpression(currentValues[targetMoneyId] ?? "0", key),
        }));
      }
    },
    [clearAllInputs, evaluateFocusedInput, focusedMoneyId, moveFocusToNextInput, moveFocusToPreviousInput],
  );

  const totalCents = useMemo(
    () =>
      defaultCountableMoney.reduce((total, money) => {
        const quantity = toQuantity(valuesByMoneyId[money.id] ?? "");
        return total + Math.round(quantity * money.value);
      }, 0),
    [valuesByMoneyId],
  );

  return {
    valuesByMoneyId,
    totalCents,
    handleGridKeyPress,
    handleInputFocus,
    registerInputFocusCallback,
    setInputValue,
  };
}
