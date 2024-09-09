import { useState, ChangeEvent } from "react";

export const useSelect = (type?: string) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  const validate = (value: string): boolean => {
    if (!type) return true;
    if (value.length === 0) {
      setError("Selecione uma opção.");
      return false;
    }
    setError(null);
    return true;
  };

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setError("");
    setValue(event.target.value);
  };

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};
