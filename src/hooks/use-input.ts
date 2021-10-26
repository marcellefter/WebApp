import { useState } from "react";

function useInput(
  validateFunction: (arg0: string, arg1: string) => boolean,
  enteredPassword: string
) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let valueIsValid: boolean = validateFunction(enteredValue, enteredPassword);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredValue(event.target.value);
  };
  const valueInputBlurHandler = () => {
    setIsTouched(true);
  };
  return {
    value: enteredValue,
    hasError,
    valueIsValid,
    valueChangeHandler,
    valueInputBlurHandler,
  };
}

export default useInput;
