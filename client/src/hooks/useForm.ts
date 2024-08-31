import React from "react";

interface ValidationRule {
  regex: RegExp;
  message: string;
}

const types: Record<string, ValidationRule> = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um e-mail válido.",
  },
  password: {
    regex: /.{6,}/,
    message: "A senha deve conter pelo menos 6 caracteres.",
  },
};

type UseFormReturn = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string | null;
  validate: () => boolean;
  onBlur: () => boolean;
};

const useForm = (type?: string): UseFormReturn => {
  const [value, setValue] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>("");

  const validate = (value: string): boolean => {
    if (!type) return true;
    if (value.length === 0) {
      setError("Preencha um valor.");
      return false;
    }
    if (type && types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    }
    setError(null);
    return true;
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError('')
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

export default useForm;
